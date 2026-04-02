<?php

namespace App\Services;

use App\Helpers\PaginatorInfo;
use App\Models\Transaction;

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
}
