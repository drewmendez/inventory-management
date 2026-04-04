import type { DataTableProps } from '@/types/data-table'
import type { Item } from '@/types/item'
import { DataTable } from '@/components/data-table'
import { Badge } from '@/components/ui/badge'
import { useGetPaginatedItems } from '@/hooks/models/use-item'
import CategoryFilter from './components/category-filter'
import CreateItem from './components/create-item'
import StatusFilter from './components/status-filter'
import UnitFilter from './components/unit-filter'
import UpdateItem from './components/update-item'
import ViewItem from './components/view-item'

export default function ItemInventories() {
  const dataTable = {
    query: useGetPaginatedItems,
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
        cellFormat: (item) => (
          <Badge variant={item.getValue() === 'Low Stock' ? 'destructive' : 'success'}>
            {item.row.original.status}
          </Badge>
        ),
      },
      {
        header: 'Category',
        accessorKey: 'category.name',
      },
      {
        header: 'Unit',
        accessorKey: 'unit.name',
        cellFormat: ({ row }) => `${row.original.unit.name} (${row.original.unit.symbol})`,
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
      category_id: CategoryFilter,
      unit_id: UnitFilter,
      status: StatusFilter,
    },
    tableActions: {
      create: CreateItem,
    },
    rowActions: {
      view: ViewItem,
      update: UpdateItem,
    },
  } satisfies DataTableProps<Item>

  return <DataTable dataTable={dataTable} />
}
