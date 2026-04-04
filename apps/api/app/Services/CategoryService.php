<?php

namespace App\Services;

use App\Helpers\ListingQuery;
use App\Models\Category;

class CategoryService
{
    private const SEARCHABLE_COLUMNS = [
        'name',
        'prefix',
    ];

    /**
     * @return array{data: list<Category>, paginator_info?: array{current_page: int, last_page: int, per_page: int, total: int}}
     */
    public function getCategories(array $filters): array
    {
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

        return ListingQuery::paginateOrAll($query, $filters);
    }

    public function createCategory(array $data): Category
    {
        return Category::query()->create([
            'name' => $data['name'],
            'prefix' => $data['prefix'],
        ]);
    }

    public function updateCategory(Category $category, array $data): Category
    {
        $payload = array_intersect_key($data, array_flip(['name', 'prefix']));

        if ($payload !== []) {
            $category->update($payload);
        }

        return $category->fresh();
    }
}
