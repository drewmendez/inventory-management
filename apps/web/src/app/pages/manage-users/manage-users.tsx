import type { DataTableProps } from '@/types/data-table'
import type { User } from '@/types/user'
import { DataTable } from '@/components/data-table'
import { useGetUsers } from '@/hooks/use-user'

export function ManageUsers() {
  const dataTable = {
    query: useGetUsers,
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
  } satisfies DataTableProps<User>

  return <DataTable dataTable={dataTable} />
}
