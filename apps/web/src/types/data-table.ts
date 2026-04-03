import type { UseQueryResult } from '@tanstack/react-query'
import type { PaginatedQueryResponse, QueryParams } from '@/types/api'

interface Column<T> {
  header: string
  accessorKey: string
  accessorFn?: (row: T) => string
  isSortable?: boolean
}

/**
 * A TanStack Query hook used to load table data (e.g. `useGetUsers`).
 * Pass the function reference, not its return value.
 */
export type DataTableQueryHook<TData, TParams extends QueryParams = QueryParams> = (
  params: TParams,
) => UseQueryResult<TData, Error>

export interface DataTableProps<TData, TParams extends QueryParams = QueryParams> {
  columns: Column<TData>[]
  query: DataTableQueryHook<PaginatedQueryResponse<TData>, TParams>
}
