<?php

namespace App\Services;

use App\Helpers\ListingQuery;
use App\Models\Category;
use App\Models\Item;
use Illuminate\Support\Facades\DB;

class ItemService
{
    private const SEARCHABLE_COLUMNS = [
        'sku',
        'name',
    ];

    /**
     * @return array{data: list<Item>, paginator_info?: array{current_page: int, last_page: int, per_page: int, total: int}}
     */
    public function getItems(array $filters): array
    {
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
            $query->orderBy('updated_at', 'desc');
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

        $query->with(['category', 'unit']);

        return ListingQuery::paginateOrAll($query, $filters);
    }

    public function createItem(array $data): Item
    {
        return DB::transaction(function () use ($data) {
            $category = Category::query()->lockForUpdate()->findOrFail($data['category_id']);

            $sku = $this->generateSkuForCategory($category);

            return Item::query()->create([
                'sku' => $sku,
                'name' => $data['name'],
                'quantity' => $data['quantity'],
                'reorder_level' => $data['reorder_level'],
                'category_id' => $data['category_id'],
                'unit_id' => $data['unit_id'],
            ]);
        });
    }

    public function updateItem(Item $item, array $data): Item
    {
        $payload = array_intersect_key(
            $data,
            array_flip(['name', 'reorder_level', 'category_id', 'unit_id'])
        );

        if ($payload !== []) {
            $item->update($payload);
        }

        return $item->fresh(['category', 'unit']);
    }

    private function generateSkuForCategory(Category $category): string
    {
        $prefix = $category->prefix;
        $pattern = '/^'.preg_quote($prefix, '/').'-(\d{4})$/';

        $maxSerial = Item::query()
            ->where('category_id', $category->id)
            ->pluck('sku')
            ->map(function (string $sku) use ($pattern): int {
                return preg_match($pattern, $sku, $m) ? (int) $m[1] : 0;
            })
            ->max() ?? 0;

        $next = $maxSerial + 1;

        if ($next > 9999) {
            throw new \RuntimeException('SKU sequence exceeds 9999 for this category.');
        }

        return sprintf('%s-%04d', $prefix, $next);
    }
}
