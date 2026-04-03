import type { DataTableProps } from '@/types/data-table'
import type { Item } from '@/types/item'
import { DataTable } from '@/components/data-table'
import { useGetItems } from '@/hooks/use-item'
import CategoryFilter from './category-filter'
import CreateItem from './create-item'
import StatusFilter from './status-filter'
import UnitFilter from './unit-filter'
import UpdateItem from './update-item'
import ViewItem from './view-item'

export function ItemInventories() {
  const dataTable = {
    query: useGetItems,
    createActionLabel: 'Add item',
    columns: [
      {
        header: 'SKU',
        accessorKey: 'sku',
        isSortable: true,
      },
      {
        header: 'Name',
        accessorKey: 'name',
        isSortable: true,
      },
      {
        header: 'Quantity',
        accessorKey: 'quantity',
        isSortable: true,
      },
      {
        header: 'Reorder level',
        accessorKey: 'reorder_level',
        isSortable: true,
      },
      {
        header: 'Status',
        accessorKey: 'status',
      },
      {
        header: 'Category',
        accessorKey: 'category.name',
      },
      {
        header: 'Unit',
        accessorKey: 'unit.name',
        accessorFn: (row) => `${row.unit.name} (${row.unit.symbol})`,
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
      category_id: CategoryFilter,
      unit_id: UnitFilter,
      status: StatusFilter,
    },
    crud: {
      view: ViewItem,
      create: CreateItem,
      update: UpdateItem,
    },
  } satisfies DataTableProps<Item>

  return <DataTable dataTable={dataTable} />
}
