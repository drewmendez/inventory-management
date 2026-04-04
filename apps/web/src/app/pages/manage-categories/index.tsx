import type { Category } from '@/types/category'
import type { DataTableProps } from '@/types/data-table'
import { DataTable } from '@/components/data-table'
import { useGetPaginatedCategories } from '@/hooks/models/use-category'
import CreateCategory from './components/create-category'
import UpdateCategory from './components/update-category'
import ViewCategory from './components/view-category'

export default function ManageCategories() {
  const dataTable = {
    title: 'Manage Categories',
    query: useGetPaginatedCategories,
    columns: [
      {
        header: 'Name',
        accessorKey: 'name',
        isSortable: true,
      },
      {
        header: 'Prefix',
        accessorKey: 'prefix',
        isSortable: true,
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
    },
    tableActions: {
      create: CreateCategory,
    },
    rowActions: {
      view: ViewCategory,
      update: UpdateCategory,
    },
  } satisfies DataTableProps<Category>

  return <DataTable dataTable={dataTable} />
}
