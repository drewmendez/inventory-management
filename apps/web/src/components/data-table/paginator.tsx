import type { Table } from '@tanstack/react-table'
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Paginator<TData>({ table }: { table: Table<TData> }) {
  const { pageIndex, pageSize } = table.getState().pagination
  const total = table.getRowCount()
  const rowsOnPage = table.getRowModel().rows.length
  const rangeStart = total === 0 ? 0 : pageIndex * pageSize + 1
  const rangeEnd = total === 0 ? 0 : Math.min(pageIndex * pageSize + rowsOnPage, total)

  return (
    <nav className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
      <div className="flex items-center gap-2">
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => {
            table.setPageSize(Number(value))
          }}
        >
          <SelectTrigger id="page-size" aria-label="Page size" className="w-25">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <span className="text-xs text-muted-foreground md:text-sm">
          {`Showing ${rangeStart}-${rangeEnd} of ${total} entries`}
        </span>
      </div>

      <div className="flex w-fit items-center justify-between gap-2">
        <Button variant="outline" onClick={() => table.firstPage()}>
          <ChevronsLeftIcon className="size-4" />
        </Button>
        <Button variant="outline" onClick={() => table.previousPage()}>
          <ChevronLeftIcon className="size-4" />
        </Button>

        <span className="text-center text-sm md:w-15">
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>

        <Button variant="outline" onClick={() => table.nextPage()}>
          <ChevronRightIcon className="size-4" />
        </Button>
        <Button variant="outline" onClick={() => table.lastPage()}>
          <ChevronsRightIcon className="size-4" />
        </Button>
      </div>
    </nav>
  )
}
