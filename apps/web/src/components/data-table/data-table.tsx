import type { Column, ColumnDef, ExpandedState, HeaderContext, SortingState } from '@tanstack/react-table'
import type { DataTableExpandedColumn, DataTableProps } from '@/types/data-table'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { ChevronDown, ChevronsUpDown, ChevronUp, Edit, EyeIcon, PlusIcon } from 'lucide-react'
import { Fragment, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import Filters from './filters'
import Paginator from './paginator'
import Search from './search'

export function DataTable<TData>({ dataTable }: { dataTable: DataTableProps<TData> }) {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 })
  const [sorting, setSorting] = useState<SortingState>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string> | undefined>(undefined)
  const [viewRow, setViewRow] = useState<TData | null>(null)
  const [updateRow, setUpdateRow] = useState<TData | null>(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [expanded, setExpanded] = useState<ExpandedState>({})

  const primarySort = sorting[0]
  const { data, isPending } = dataTable.query({
    page: pagination.pageIndex + 1,
    perPage: pagination.pageSize,
    sortBy: primarySort?.id,
    sortOrder: primarySort ? (primarySort.desc ? 'desc' : 'asc') : undefined,
    search: searchQuery,
    filters: appliedFilters,
  })

  const ViewRowAction = dataTable.rowActions?.view
  const UpdateRowAction = dataTable.rowActions?.update
  const hasRowActions = Boolean(ViewRowAction || UpdateRowAction)
  const CreateAction = dataTable.tableActions?.create
  const expandableRowConfig = dataTable.expandableRow
  const showActionsColumn = hasRowActions || Boolean(expandableRowConfig)

  const columnDefs = useMemo((): ColumnDef<TData>[] => {
    const dataColumns: ColumnDef<TData>[] = dataTable.columns.map((column) => {
      const sortableHeader = ({ column: tableColumn }: HeaderContext<TData, unknown>) => (
        <SortableHeader column={tableColumn} columnHeader={column.header} />
      )
      const header = column.isSortable ? sortableHeader : column.header

      return {
        header,
        accessorKey: column.accessorKey,
        ...(column.accessorFn ? { accessorFn: column.accessorFn } : {}),
        ...(column.cellFormat ? { cell: column.cellFormat } : {}),
      }
    })

    if (!showActionsColumn) {
      return dataColumns
    }

    const actionsColumn: ColumnDef<TData> = {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center gap-2">
            {ViewRowAction && (
              <Button
                variant="info"
                className="size-8 p-0"
                aria-label="View row"
                onClick={() => setViewRow(row.original)}
              >
                <EyeIcon />
              </Button>
            )}
            {UpdateRowAction && (
              <Button
                variant="warn"
                className="size-8 p-0"
                aria-label="Update row"
                onClick={() => setUpdateRow(row.original)}
              >
                <Edit />
              </Button>
            )}
            {expandableRowConfig && row.getCanExpand() && (
              <Button
                type="button"
                variant="outline"
                className="size-8 p-0"
                aria-label={row.getIsExpanded() ? 'Collapse row details' : 'Expand row details'}
                aria-expanded={row.getIsExpanded()}
                onClick={() => row.toggleExpanded()}
              >
                <ChevronsUpDown className="size-4" />
              </Button>
            )}
          </div>
        )
      },
    }

    return [...dataColumns, actionsColumn]
  }, [dataTable.columns, expandableRowConfig, showActionsColumn, ViewRowAction, UpdateRowAction])

  const table = useReactTable({
    columns: columnDefs,
    data: data?.data ?? [],
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    pageCount: data?.paginator_info.last_page ?? 1,
    rowCount: data?.paginator_info.total ?? 0,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    getRowCanExpand: (row) => {
      if (!expandableRowConfig) {
        return false
      }
      const raw = getValueByPath(row.original, expandableRowConfig.accessorKey)
      return Array.isArray(raw) && raw.length > 0
    },
    state: { pagination, sorting, expanded },
  })

  const filtersConfig = dataTable.filters

  return (
    <Card className="size-full min-w-0 gap-3">
      <CardHeader>
        <CardTitle className="text-xl">{dataTable.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex size-full min-h-0 min-w-0 flex-col gap-3">
        <div className="flex w-full min-w-0 flex-wrap items-center gap-2">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
            <Search onDebouncedSearchChange={setSearchQuery} />
            {filtersConfig ? (
              <Filters
                config={filtersConfig}
                onFiltersChange={setAppliedFilters}
                onFilterPageReset={() => setPagination((p) => ({ ...p, pageIndex: 0 }))}
              />
            ) : null}
          </div>
          <div className="ml-auto space-x-2">
            {CreateAction && (
              <Button variant="success" size="icon-lg" onClick={() => setCreateOpen(true)}>
                <PlusIcon className="size-4" />
              </Button>
            )}
          </div>
        </div>
        <Table>
          <TableHeader className="h-14">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="sticky top-0 z-10">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn('bg-primary px-6 text-primary-foreground', {
                      'sticky right-0 text-center': header.id === 'actions',
                    })}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isPending ? (
              Array.from({ length: pagination.pageSize }, (_, rowIndex) => (
                <TableRow key={`skeleton-${rowIndex}`}>
                  {Array.from({ length: columnDefs.length }, (_, cellIndex) => (
                    <TableCell key={cellIndex}>
                      <Skeleton className="my-2 h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow className="h-12">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn('bg-card px-6', {
                          'sticky right-0': cell.column.id === 'actions',
                        })}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  {expandableRowConfig && row.getIsExpanded() ? (
                    <TableRow className="hover:bg-transparent">
                      <TableCell colSpan={row.getVisibleCells().length} className="bg-muted/25 p-0 px-6 py-3">
                        <ExpandableRowTable config={expandableRowConfig} parentRow={row.original} />
                      </TableCell>
                    </TableRow>
                  ) : null}
                </Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columnDefs.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="flex items-center justify-end gap-2">
        <Paginator table={table} />
      </CardFooter>

      {ViewRowAction && viewRow !== null && (
        <ViewRowAction
          row={viewRow}
          open
          onOpenChange={(open) => {
            if (!open) {
              setViewRow(null)
            }
          }}
        />
      )}

      {UpdateRowAction && updateRow !== null && (
        <UpdateRowAction
          key={String((updateRow as { id: string | number }).id)}
          row={updateRow}
          open
          onOpenChange={(open) => {
            if (!open) {
              setUpdateRow(null)
            }
          }}
        />
      )}

      {CreateAction ? <CreateAction open={createOpen} onOpenChange={setCreateOpen} /> : null}
    </Card>
  )
}

function getValueByPath(obj: unknown, path: string): unknown {
  if (path === '') {
    return obj
  }

  let value: unknown = obj
  for (const key of path.split('.')) {
    if (key === '') {
      continue
    }
    if (value == null || typeof value !== 'object') {
      return undefined
    }
    value = (value as Record<string, unknown>)[key]
  }
  return value
}

function renderExpandedCell(column: DataTableExpandedColumn, original: unknown) {
  const getValue = () => {
    if (column.accessorFn) {
      return column.accessorFn(original)
    }
    return getValueByPath(original, column.accessorKey)
  }
  if (column.cellFormat) {
    return column.cellFormat({ row: { original }, getValue })
  }
  const v = getValue()
  if (v === null || v === undefined) {
    return '—'
  }
  if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
    return String(v)
  }
  return String(v)
}

function ExpandableRowTable<TData>({
  config,
  parentRow,
}: {
  config: NonNullable<DataTableProps<TData>['expandableRow']>
  parentRow: TData
}) {
  const raw = getValueByPath(parentRow, config.accessorKey)
  if (!Array.isArray(raw) || raw.length === 0) {
    return null
  }

  return (
    <Table className="bg-card">
      <TableHeader>
        <TableRow>
          {config.columns.map((col) => (
            <TableHead key={col.accessorKey} className="bg-primary px-6 text-primary-foreground">
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {raw.map((child, rowIndex) => {
          const id =
            typeof child === 'object' && child !== null && 'id' in child
              ? (child as { id: unknown }).id
              : undefined
          const rowKey = typeof id === 'string' || typeof id === 'number' ? String(id) : `row-${rowIndex}`
          return (
            <TableRow key={rowKey} className="hover:bg-transparent">
              {config.columns.map((col) => (
                <TableCell key={col.accessorKey} className="px-6">
                  {renderExpandedCell(col, child)}
                </TableCell>
              ))}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

function SortableHeader<TData>({ column, columnHeader }: { column: Column<TData>; columnHeader: string }) {
  return (
    <Button
      onClick={() => {
        const sorted = column.getIsSorted()
        if (sorted === false) {
          column.toggleSorting(false)
        } else if (sorted === 'asc') {
          column.toggleSorting(true)
        } else {
          column.clearSorting()
        }
      }}
      className="bg-transparent p-0"
    >
      {columnHeader}
      {column.getIsSorted() === 'asc' ? (
        <ChevronUp className="ml-2 h-4 w-4" />
      ) : column.getIsSorted() === 'desc' ? (
        <ChevronDown className="ml-2 h-4 w-4" />
      ) : (
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  )
}
