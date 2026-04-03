import type { UseQueryResult } from '@tanstack/react-query'
import type { ComponentType } from 'react'
import type { PaginatedQueryResponse, QueryParams } from '@/types/api'

export interface DataTableFilterProps {
  value: string
  onValueChange: (value: string) => void
}

export interface DataTableModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export interface DataTableRowModalProps<TData = unknown> extends DataTableModalProps {
  row: TData
}

interface Column<T> {
  header: string
  accessorKey: string
  accessorFn?: (row: T) => string
  isSortable?: boolean
}

export type DataTableQueryHook<TData, TParams extends QueryParams = QueryParams> = (
  params: TParams,
) => UseQueryResult<TData, Error>

export interface DataTableProps<TData, TParams extends QueryParams = QueryParams> {
  columns: Column<TData>[]
  query: DataTableQueryHook<PaginatedQueryResponse<TData>, TParams>
  createActionLabel?: string
  filters?: Record<string, ComponentType<DataTableFilterProps>>
  crud?: {
    view?: ComponentType<DataTableRowModalProps<TData>>
    create?: ComponentType<DataTableModalProps>
    update?: ComponentType<DataTableRowModalProps<TData>>
  }
}
