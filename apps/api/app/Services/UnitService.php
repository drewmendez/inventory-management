<?php

namespace App\Services;

use App\Helpers\ListingQuery;
use App\Models\Unit;

class UnitService
{
    private const SEARCHABLE_COLUMNS = [
        'name',
        'symbol',
    ];

    /**
     * @return array{data: list<Unit>, paginator_info?: array{current_page: int, last_page: int, per_page: int, total: int}}
     */
    public function getUnits(array $filters): array
    {
        $query = Unit::query();

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

    public function createUnit(array $data): Unit
    {
        return Unit::query()->create([
            'name' => $data['name'],
            'symbol' => $data['symbol'],
        ]);
    }

    public function updateUnit(Unit $unit, array $data): Unit
    {
        $payload = array_intersect_key($data, array_flip(['name', 'symbol']));

        if ($payload !== []) {
            $unit->update($payload);
        }

        return $unit->fresh();
    }
}
