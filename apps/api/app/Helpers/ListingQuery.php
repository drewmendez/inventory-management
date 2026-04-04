<?php

namespace App\Helpers;

use Illuminate\Database\Eloquent\Builder;

class ListingQuery
{
    /**
     * Returns every row when neither `page` nor `per_page` appear in `$filters`.
     * If either is present, runs a length-aware paginator (defaults: page 1, per page 25).
     *
     * @template TModel of \Illuminate\Database\Eloquent\Model
     *
     * @param  Builder<TModel>  $query
     * @param  array<string, mixed>  $filters
     * @return array{data: list<TModel>, paginator_info?: array{current_page: int, last_page: int, per_page: int, total: int}}
     */
    public static function paginateOrAll(Builder $query, array $filters, int $defaultPerPage = 25): array
    {
        $hasPage = \array_key_exists('page', $filters);
        $hasPerPage = \array_key_exists('per_page', $filters);

        if (! $hasPage && ! $hasPerPage) {
            return [
                'data' => $query->get()->all(),
            ];
        }

        $page = $hasPage ? (int) $filters['page'] : 1;
        $perPage = $hasPerPage ? (int) $filters['per_page'] : $defaultPerPage;

        $paginator = $query->paginate($perPage, ['*'], 'page', $page);

        return [
            'data' => $paginator->items(),
            'paginator_info' => PaginatorInfo::from($paginator),
        ];
    }
}
