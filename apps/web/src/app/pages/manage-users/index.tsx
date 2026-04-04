import type { DataTableProps } from '@/types/data-table'
import type { User } from '@/types/user'
import { DataTable } from '@/components/data-table'
import { useGetPaginatedUsers } from '@/hooks/models/use-user'
import RoleFilter from './components/role-filter'
import UpdateUser from './components/update-user'
import ViewUser from './components/view-user'

export default function ManageUsers() {
  const dataTable = {
    query: useGetPaginatedUsers,
    columns: [
      {
        header: 'First Name',
        accessorKey: 'first_name',
        isSortable: true,
      },
      {
        header: 'Middle Name',
        accessorKey: 'middle_name',
        accessorFn: (row) => row.middle_name ?? '—',
        isSortable: true,
      },
      {
        header: 'Last Name',
        accessorKey: 'last_name',
        isSortable: true,
      },
      {
        header: 'Email',
        accessorKey: 'email',
        isSortable: true,
      },
      {
        header: 'Role',
        accessorKey: 'role.name',
      },
      {
        header: 'Created At',
        accessorKey: 'created_at',
        isSortable: true,
      },
      {
        header: 'Updated At',
        accessorKey: 'updated_at',
        isSortable: true,
      },
    ],
    filters: {
      search: true,
      role_id: RoleFilter,
    },
    rowActions: {
      view: ViewUser,
      update: UpdateUser,
    },
  } satisfies DataTableProps<User>

  return <DataTable dataTable={dataTable} />
}
