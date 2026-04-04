import type { DataTableProps } from '@/types/data-table'
import type { InventoryMovement } from '@/types/inventory-movement'
import { DataTable } from '@/components/data-table'
import { Badge } from '@/components/ui/badge'
import { useGetPaginatedInventoryMovements } from '@/hooks/models/use-inventory-movement'

export default function InventoryLogs() {
  const dataTable = {
    title: 'Inventory Logs',
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
        header: 'Unit',
        accessorKey: 'transaction_item.item.unit.name',
        cellFormat: ({ row }) =>
          `${row.original.transaction_item.item.unit.name} (${row.original.transaction_item.item.unit.symbol})`,
      },
      {
        header: 'Quantity',
        accessorKey: 'transaction_item.quantity',
        cellFormat: ({ row, getValue }) => {
          const from = Number.parseFloat(String(row.original.from_quantity))
          const to = Number.parseFloat(String(row.original.to_quantity))
          const variant = to > from ? 'success' : to < from ? 'destructive' : 'secondary'
          const qty = String(getValue()).trim()
          const unsigned = qty.startsWith('+') || qty.startsWith('-') ? qty.slice(1) : qty
          const label = to > from ? `+${unsigned}` : to < from ? `-${unsigned}` : qty
          return <Badge variant={variant}>{label}</Badge>
        },
      },
      {
        header: 'From Quantity',
        accessorKey: 'from_quantity',
      },
      {
        header: 'To Quantity',
        accessorKey: 'to_quantity',
      },
      {
        header: 'Logged at',
        accessorKey: 'created_at',
      },
    ],
  } satisfies DataTableProps<InventoryMovement>

  return <DataTable dataTable={dataTable} />
}
