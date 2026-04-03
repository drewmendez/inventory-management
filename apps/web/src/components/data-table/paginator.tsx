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

export function Paginator<TData>({ table }: { table: Table<TData> }) {
  const pageSize = table.getState().pagination.pageSize

  return (
    <nav className="flex w-full items-center justify-between">
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

      <div className="flex items-center justify-between gap-2">
        <Button variant="outline" onClick={() => table.firstPage()}>
          <ChevronsLeftIcon className="size-4" />
        </Button>
        <Button variant="outline" onClick={() => table.previousPage()}>
          <ChevronLeftIcon className="size-4" />
        </Button>

        <span className="w-15 text-center text-sm">
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
