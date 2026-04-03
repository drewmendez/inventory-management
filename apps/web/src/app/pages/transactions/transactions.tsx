import type { DataTableProps } from '@/types/data-table'
import type { Transaction } from '@/types/transaction'
import { DataTable } from '@/components/data-table'
import { useGetTransactions } from '@/hooks/use-transaction'
import TypeFilter from './type-filter'
import ViewTransaction from './view-transaction'

export function Transactions() {
  const dataTable = {
    query: useGetTransactions,
    columns: [
      {
        header: 'Reference',
        accessorKey: 'reference_number',
        isSortable: true,
      },
      {
        header: 'Type',
        accessorKey: 'type',
      },
      {
        header: 'Lines',
        accessorKey: 'transaction_items',
        accessorFn: (row) => String(row.transaction_items.length),
      },
      {
        header: 'Remarks',
        accessorKey: 'remarks',
        accessorFn: (row) => (row.remarks?.trim() ? row.remarks : '—'),
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
      type: TypeFilter,
    },
    crud: {
      view: ViewTransaction,
    },
  } satisfies DataTableProps<Transaction>

  return <DataTable dataTable={dataTable} />
}
