import type { DataTableProps } from '@/types/data-table'
import type { Transaction } from '@/types/transaction'
import TypeFilter from '@/app/pages/transactions/components/type-filter'
import { DataTable } from '@/components/data-table'
import { Badge } from '@/components/ui/badge'
import { useGetPaginatedTransactions } from '@/hooks/models/use-transaction'

export function RecentTransactions() {
  const dataTable = {
    query: useGetPaginatedTransactions,
    columns: [
      {
        header: 'Reference',
        accessorKey: 'reference_number',
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
        accessorFn: (row) => String(row.transaction_items.length),
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
      },
    ],
    filters: {
      search: true,
      type: TypeFilter,
    },
  } satisfies DataTableProps<Transaction>

  return <DataTable dataTable={dataTable} />
}
