import type { Column, ColumnDef, HeaderContext, SortingState } from '@tanstack/react-table'
import type { DataTableProps } from '@/types/data-table'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { ChevronDown, ChevronsUpDown, ChevronUp, Edit, EyeIcon, PlusIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import Paginator from './paginator'
import SearchFilters from './search-filters'

export function DataTable<TData>({ dataTable }: { dataTable: DataTableProps<TData> }) {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 })
  const [sorting, setSorting] = useState<SortingState>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string> | undefined>(undefined)
  const [viewRow, setViewRow] = useState<TData | null>(null)
  const [updateRow, setUpdateRow] = useState<TData | null>(null)
  const [createOpen, setCreateOpen] = useState(false)

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

    if (!hasRowActions) {
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
                type="button"
                variant="outline"
                className="h-8 w-8 p-0"
                aria-label="View row"
                onClick={() => setViewRow(row.original)}
              >
                <EyeIcon />
              </Button>
            )}
            {UpdateRowAction && (
              <Button
                type="button"
                variant="outline"
                className="h-8 w-8 p-0"
                aria-label="Update row"
                onClick={() => setUpdateRow(row.original)}
              >
                <Edit />
              </Button>
            )}
          </div>
        )
      },
    }

    return [...dataColumns, actionsColumn]
  }, [dataTable.columns, hasRowActions, ViewRowAction, UpdateRowAction])

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
    state: { pagination, sorting },
  })

  const filtersConfig = dataTable.filters

  return (
    <Card className="size-full gap-3">
      <CardContent className="flex size-full min-h-0 flex-col gap-3">
        <div className="flex w-full min-w-0 flex-wrap items-center gap-2">
          {filtersConfig ? (
            <SearchFilters
              filters={filtersConfig}
              onDebouncedSearchChange={setSearchQuery}
              onFiltersChange={setAppliedFilters}
              onFilterPageReset={() => setPagination((p) => ({ ...p, pageIndex: 0 }))}
            />
          ) : null}
          {CreateAction ? (
            <Button
              type="button"
              className="ml-auto inline-flex shrink-0 items-center gap-2 py-5"
              onClick={() => setCreateOpen(true)}
            >
              <PlusIcon className="size-4" />
              Add
            </Button>
          ) : null}
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="sticky top-0 z-10">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn('bg-primary px-6 py-2 text-primary-foreground', {
                      'sticky right-0 min-w-35 text-center': header.id === 'actions',
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
                <TableRow key={row.id}>
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
