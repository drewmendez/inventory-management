import type { UseQueryResult } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import type { ComponentType, ReactNode } from 'react'
import type { PaginatedQueryResponse, QueryParams } from '@/types/api'

export interface DataTableFilterProps {
  value: string
  onValueChange: (value: string, selectionLabel?: string) => void
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
  cellFormat?: ColumnDef<T>['cell']
}

export interface DataTableExpandedColumn {
  header: string
  accessorKey: string
  accessorFn?: (row: unknown) => string
  cellFormat?: (ctx: { row: { original: unknown }; getValue: () => unknown }) => ReactNode
}

export type DataTableQueryHook<TData, TParams extends QueryParams = QueryParams> = (
  params: TParams,
) => UseQueryResult<TData, Error>

export interface DataTableProps<TData, TParams extends QueryParams = QueryParams> {
  title: string
  query: DataTableQueryHook<PaginatedQueryResponse<TData>, TParams>
  columns: Column<TData>[]
  expandableRow?: {
    accessorKey: string
    columns: DataTableExpandedColumn[]
  }
  tableActions?: {
    create?: ComponentType<DataTableModalProps>
  }
  rowActions?: {
    view?: ComponentType<DataTableRowModalProps<TData>>
    update?: ComponentType<DataTableRowModalProps<TData>>
  }
  filters?: Record<string, ComponentType<DataTableFilterProps>>
}
