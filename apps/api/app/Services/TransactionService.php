<?php

namespace App\Services;

use App\Helpers\PaginatorInfo;
use App\Models\InventoryMovement;
use App\Models\Item;
use App\Models\Transaction;
use App\Models\TransactionItem;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class TransactionService
{
    private const SEARCHABLE_COLUMNS = [
        'reference_number',
    ];

    /**
     * @return array{data: list<Transaction>, paginator_info: array{current_page: int, last_page: int, per_page: int, total: int}}
     */
    public function getTransactions(array $filters): array
    {
        $page = $filters['page'] ?? 1;
        $perPage = $filters['per_page'] ?? 25;

        $query = Transaction::query();

        $search = trim((string) ($filters['search'] ?? ''));
        if ($search !== '') {
            $escaped = str_replace(['\\', '%', '_'], ['\\\\', '\%', '\_'], $search);
            $pattern = '%'.$escaped.'%';
            $query->whereAny(self::SEARCHABLE_COLUMNS, 'like', $pattern);
        }

        if (! empty($filters['sort_by'])) {
            $direction = $filters['sort_order'] ?? 'asc';
            $query->orderBy($filters['sort_by'], $direction);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        if (isset($filters['type'])) {
            $query->where('type', $filters['type']);
        }

        $paginator = $query->with([
            'user.role',
            'transactionItems.item.category',
            'transactionItems.item.unit',
        ])->paginate($perPage, ['*'], 'page', $page);

        return [
            'data' => $paginator->items(),
            'paginator_info' => PaginatorInfo::from($paginator),
        ];
    }

    public function createTransaction(array $data, User $user): Transaction
    {
        return DB::transaction(function () use ($data, $user) {
            $type = (int) $data['type'];

            $reference = $this->generateReferenceNumber($type);

            $transaction = Transaction::query()->create([
                'reference_number' => $reference,
                'type' => $type,
                'remarks' => $data['remarks'] ?? null,
                'user_id' => $user->id,
            ]);

            foreach ($data['transaction_items'] as $index => $itemData) {
                $item = Item::query()->lockForUpdate()->findOrFail($itemData['item_id']);

                $delta = (float) $itemData['quantity'];
                $current = (float) $item->quantity;

                if ($type === 2 && $delta > $current) {
                    throw ValidationException::withMessages([
                        "transaction_items.$index.quantity" => sprintf(
                            'Requested quantity %.2f exceeds available stock %.2f for item %s.',
                            $delta,
                            $current,
                            $item->name
                        ),
                    ]);
                }

                $fromQuantity = $current;
                $toQuantity = $type === 1
                    ? $current + $delta
                    : $current - $delta;

                $transactionItem = TransactionItem::query()->create([
                    'quantity' => $delta,
                    'item_id' => $item->id,
                    'transaction_id' => $transaction->id,
                ]);

                InventoryMovement::query()->create([
                    'from_quantity' => $fromQuantity,
                    'to_quantity' => $toQuantity,
                    'transaction_item_id' => $transactionItem->id,
                ]);

                $item->update(['quantity' => $toQuantity]);
            }

            return $transaction->fresh(['user.role', 'transactionItems.item.category', 'transactionItems.item.unit']);
        });
    }

    private function generateReferenceNumber(int $type): string
    {
        $prefix = $type === 1 ? 'SI' : 'SO';
        $pattern = '/^'.preg_quote($prefix, '/').'-(\d{5})$/';

        $maxSerial = Transaction::query()
            ->where('type', $type)
            ->pluck('reference_number')
            ->map(function (string $ref) use ($pattern): int {
                return preg_match($pattern, $ref, $m) ? (int) $m[1] : 0;
            })
            ->max() ?? 0;

        $next = $maxSerial + 1;

        if ($next > 99999) {
            throw new \RuntimeException('Reference sequence exceeds 99999 for this transaction type.');
        }

        return sprintf('%s-%05d', $prefix, $next);
    }
}
