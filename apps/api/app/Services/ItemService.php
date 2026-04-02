<?php

namespace App\Services;

use App\Helpers\PaginatorInfo;
use App\Models\Item;

class ItemService
{
    private const SEARCHABLE_COLUMNS = [
        'sku',
        'name',
    ];

    /**
     * @return array{data: list<Item>, paginator_info: array{current_page: int, last_page: int, per_page: int, total: int}}
     */
    public function getItems(array $filters): array
    {
        $page = $filters['page'] ?? 1;
        $perPage = $filters['per_page'] ?? 25;

        $query = Item::query();

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

        if (isset($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }

        if (isset($filters['unit_id'])) {
            $query->where('unit_id', $filters['unit_id']);
        }

        if (isset($filters['status'])) {
            match ($filters['status']) {
                'normal' => $query->whereColumn('quantity', '>', 'reorder_level'),
                'low_stock' => $query->whereColumn('quantity', '<=', 'reorder_level')
            };
        }

        $paginator = $query->with(['category', 'unit'])->paginate($perPage, ['*'], 'page', $page);

        return [
            'data' => $paginator->items(),
            'paginator_info' => PaginatorInfo::from($paginator),
        ];
    }
}
