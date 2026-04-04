<?php

namespace App\Services;

use App\Helpers\ListingQuery;
use App\Models\InventoryMovement;

class InventoryMovementService
{
    private const SEARCHABLE_COLUMNS = [
        'sku',
        'name',
    ];

    /**
     * @return array{data: list<InventoryMovement>, paginator_info: array{current_page: int, last_page: int, per_page: int, total: int}}
     */
    public function getInventoryMovements(array $filters): array
    {
        $page = $filters['page'] ?? 1;
        $perPage = $filters['per_page'] ?? 25;

        $query = InventoryMovement::query();

        $search = trim((string) ($filters['search'] ?? ''));
        if ($search !== '') {
            $escaped = str_replace(['\\', '%', '_'], ['\\\\', '\%', '\_'], $search);
            $pattern = '%'.$escaped.'%';
            $query->whereHas('transactionItem.item', function ($itemQuery) use ($pattern): void {
                $itemQuery->whereAny(self::SEARCHABLE_COLUMNS, 'like', $pattern);
            });
        }

        $query->orderBy('created_at', 'desc');

        $query->with([
            'transactionItem.item.category',
            'transactionItem.item.unit',
        ]);

        return ListingQuery::paginateOrAll($query, $filters);
    }
}
