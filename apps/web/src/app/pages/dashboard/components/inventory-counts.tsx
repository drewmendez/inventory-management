import type { DataTableProps } from '@/types/data-table'
import type { Item } from '@/types/item'
import CategoryFilter from '@/app/pages/item-inventories/components/category-filter'
import StatusFilter from '@/app/pages/item-inventories/components/status-filter'
import UnitFilter from '@/app/pages/item-inventories/components/unit-filter'
import { DataTable } from '@/components/data-table'
import { useGetPaginatedItems } from '@/hooks/models/use-item'

export function InventoryCounts() {
  const dataTable = {
    title: 'Inventory Counts',
    query: useGetPaginatedItems,
    columns: [
      {
        header: 'SKU',
        accessorKey: 'sku',
      },
      {
        header: 'Name',
        accessorKey: 'name',
      },
      {
        header: 'Quantity',
        accessorKey: 'quantity',
      },
      {
        header: 'Unit',
        accessorKey: 'unit.name',
        cellFormat: ({ row }) => `${row.original.unit.name} (${row.original.unit.symbol})`,
      },
    ],
    filters: {
      category_id: CategoryFilter,
      unit_id: UnitFilter,
      status: StatusFilter,
    },
  } satisfies DataTableProps<Item>

  return <DataTable dataTable={dataTable} />
}
