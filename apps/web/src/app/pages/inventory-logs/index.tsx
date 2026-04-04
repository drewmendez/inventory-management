import type { DataTableProps } from '@/types/data-table'
import type { InventoryMovement } from '@/types/inventory-movement'
import { DataTable } from '@/components/data-table'
import { useGetPaginatedInventoryMovements } from '@/hooks/use-inventory-movement'
import ViewInventoryMovement from './components/view-inventory-movement'

export default function InventoryLogs() {
  const dataTable = {
    query: useGetPaginatedInventoryMovements,
    columns: [
      {
        header: 'SKU',
        accessorKey: 'transaction_item.item.sku',
      },
      {
        header: 'Item',
        accessorKey: 'transaction_item.item.name',
      },
      {
        header: 'Line qty',
        accessorKey: 'transaction_item.quantity',
      },
      {
        header: 'From',
        accessorKey: 'from_quantity',
      },
      {
        header: 'To',
        accessorKey: 'to_quantity',
      },
      {
        header: 'Category',
        accessorKey: 'transaction_item.item.category.name',
      },
      {
        header: 'Unit',
        accessorKey: 'transaction_item.item.unit.name',
        accessorFn: (row) =>
          `${row.transaction_item.item.unit.name} (${row.transaction_item.item.unit.symbol})`,
      },
      {
        header: 'Logged at',
        accessorKey: 'created_at',
      },
    ],
    crud: {
      view: ViewInventoryMovement,
    },
  } satisfies DataTableProps<InventoryMovement>

  return <DataTable dataTable={dataTable} />
}
