<?php

namespace App\Services;

use App\Helpers\PaginatorInfo;
use App\Models\Category;

class CategoryService
{
    private const SEARCHABLE_COLUMNS = [
        'name',
        'prefix',
    ];

    /**
     * @return array{data: list<Category>, paginator_info: array{current_page: int, last_page: int, per_page: int, total: int}}
     */
    public function getCategories(array $filters): array
    {
        $page = $filters['page'] ?? 1;
        $perPage = $filters['per_page'] ?? 25;

        $query = Category::query();

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

        $paginator = $query->paginate($perPage, ['*'], 'page', $page);

        return [
            'data' => $paginator->items(),
            'paginator_info' => PaginatorInfo::from($paginator),
        ];
    }
}
