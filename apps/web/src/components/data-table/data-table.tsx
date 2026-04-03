import type { Column, ColumnDef, HeaderContext, SortingState } from '@tanstack/react-table'
import type { DataTableProps } from '@/types/data-table'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { ChevronDown, ChevronsUpDown, ChevronUp, Edit, Trash } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Skeleton } from '../ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Paginator } from './paginator'

export function DataTable<TData>({ dataTable }: { dataTable: DataTableProps<TData> }) {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 })
  const [sorting, setSorting] = useState<SortingState>([])
  const primarySort = sorting[0]
  const { data, isPending } = dataTable.query({
    page: pagination.pageIndex + 1,
    perPage: pagination.pageSize,
    sortBy: primarySort?.id,
    sortOrder: primarySort ? (primarySort.desc ? 'desc' : 'asc') : undefined,
  })

  const getColumns = (): ColumnDef<TData>[] => {
    const actionsColumn: ColumnDef<TData> = {
      id: 'actions',
      header: 'Actions',
      cell: () => {
        return (
          <div className="flex items-center justify-center gap-2">
            <Button variant="outline" className="h-8 w-8 p-0">
              <Edit />
            </Button>
            <Button variant="destructive" className="h-8 w-8 p-0">
              <Trash />
            </Button>
          </div>
        )
      },
    }

    const columns: ColumnDef<TData>[] = dataTable.columns.map((column) => {
      const sortableHeader = ({ column: tableColumn }: HeaderContext<TData, unknown>) => (
        <SortableHeader column={tableColumn} columnHeader={column.header} />
      )
      const header = column.isSortable ? sortableHeader : column.header

      return {
        header,
        accessorKey: column.accessorKey,
        ...(column.accessorFn ? { accessorFn: column.accessorFn } : {}),
      }
    })

    return [...columns, actionsColumn]
  }

  const table = useReactTable({
    columns: getColumns(),
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

  return (
    <Card className="size-full">
      <CardContent className="size-full min-h-0">
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
                  {Array.from({ length: getColumns().length }, (_, cellIndex) => (
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
                <TableCell colSpan={getColumns().length} className="h-24 text-center">
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
