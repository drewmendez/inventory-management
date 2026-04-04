import type { DataTableProps } from '@/types/data-table'
import type { Transaction } from '@/types/transaction'
import { DataTable } from '@/components/data-table'
import { Badge } from '@/components/ui/badge'
import { useGetPaginatedTransactions } from '@/hooks/models/use-transaction'
import CreateTransaction from './components/create-transaction'
import TypeFilter from './components/type-filter'
import ViewTransaction from './components/view-transaction'

export default function Transactions() {
  const dataTable = {
    query: useGetPaginatedTransactions,
    columns: [
      {
        header: 'Reference',
        accessorKey: 'reference_number',
        isSortable: true,
      },
      {
        header: 'Type',
        accessorKey: 'type',
        cellFormat: ({ row }) => (
          <Badge variant={row.original.type === 'Stock In' ? 'success' : 'destructive'}>
            {row.original.type}
          </Badge>
        ),
      },
      {
        header: 'Lines',
        accessorKey: 'transaction_items',
        cellFormat: ({ row }) => row.original.transaction_items.length,
      },
      {
        header: 'Remarks',
        accessorKey: 'remarks',
        cellFormat: ({ row }) => (row.original.remarks?.trim() ? row.original.remarks : 'No remarks'),
      },
      {
        header: 'Recorded by',
        accessorKey: 'user.full_name',
      },
      {
        header: 'Created at',
        accessorKey: 'created_at',
        isSortable: true,
      },
    ],
    filters: {
      search: true,
      type: TypeFilter,
    },
    tableActions: {
      create: CreateTransaction,
    },
    rowActions: {
      view: ViewTransaction,
    },
  } satisfies DataTableProps<Transaction>

  return <DataTable dataTable={dataTable} />
}
