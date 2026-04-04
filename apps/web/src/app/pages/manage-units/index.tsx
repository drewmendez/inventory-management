import type { DataTableProps } from '@/types/data-table'
import type { Unit } from '@/types/unit'
import { DataTable } from '@/components/data-table'
import { useGetPaginatedUnits } from '@/hooks/use-unit'
import CreateUnit from './components/create-unit'
import UpdateUnit from './components/update-unit'
import ViewUnit from './components/view-unit'

export default function ManageUnits() {
  const dataTable = {
    query: useGetPaginatedUnits,
    createActionLabel: 'Add unit',
    columns: [
      {
        header: 'Name',
        accessorKey: 'name',
        isSortable: true,
      },
      {
        header: 'Symbol',
        accessorKey: 'symbol',
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
    crud: {
      view: ViewUnit,
      create: CreateUnit,
      update: UpdateUnit,
    },
  } satisfies DataTableProps<Unit>

  return <DataTable dataTable={dataTable} />
}
