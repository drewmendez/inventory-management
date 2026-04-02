<?php

namespace App\Services;

use App\Helpers\PaginatorInfo;
use App\Models\User;

class UserService
{
    private const SEARCHABLE_COLUMNS = [
        'first_name',
        'middle_name',
        'last_name',
        'email',
    ];

    /**
     * @return array{data: list<User>, paginator_info: array{current_page: int, last_page: int, per_page: int, total: int}}
     */
    public function getUsers(array $filters): array
    {
        $page = $filters['page'] ?? 1;
        $perPage = $filters['per_page'] ?? 25;

        $query = User::query();

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

        if (isset($filters['role_id'])) {
            $query->where('role_id', $filters['role_id']);
        }

        $paginator = $query->with(['role'])->paginate($perPage, ['*'], 'page', $page);

        return [
            'data' => $paginator->items(),
            'paginator_info' => PaginatorInfo::from($paginator),
        ];
    }

    public function updateUser(User $user, array $data): User
    {
        $payload = [
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'role_id' => $data['role_id'],
        ];

        if (array_key_exists('middle_name', $data)) {
            $payload['middle_name'] = $data['middle_name'];
        }

        $user->update($payload);

        return $user->fresh(['role']);
    }
}
