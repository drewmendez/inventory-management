import { ArrowUpRightIcon, ChevronLeftIcon, ChevronRightIcon, TriangleAlertIcon } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { useGetPaginatedItems } from '@/hooks/use-item'
import { cn } from '@/lib/utils'

const PER_PAGE = 10

export function LowStockItems() {
  const [page, setPage] = useState(1)
  const { data, isPending, isError, isFetching } = useGetPaginatedItems({
    page,
    perPage: PER_PAGE,
    filters: { status: 'low_stock' },
  })

  const total = data?.paginator_info.total ?? 0
  const lastPage = Math.max(1, data?.paginator_info.last_page ?? 1)
  const items = data?.data ?? []
  const canPrev = page > 1
  const canNext = page < lastPage

  return (
    <Card className="size-full">
      <CardContent className="flex size-full min-h-0 flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-6">
        <div className="flex shrink-0 flex-col justify-between gap-3 sm:max-w-44">
          <TriangleAlertIcon className="size-15" aria-hidden />
          <div className="space-y-1">
            <p className="text-xl font-medium">Low Stock Items</p>
            <div>
              {isPending && !data ? (
                <Spinner className="size-7" />
              ) : isError ? (
                <p className="text-[4rem] leading-none font-semibold">--</p>
              ) : (
                <p className="text-[4rem] leading-none font-semibold tabular-nums">{total}</p>
              )}
            </div>
          </div>
        </div>

        <div
          className={cn(
            'flex min-h-36 min-w-0 flex-1 flex-col gap-3 transition-opacity',
            isFetching && 'opacity-60',
          )}
        >
          <div className="flex justify-end">
            <Button variant="outline" size="icon" asChild>
              <Link to="/dashboard/item-inventories" aria-label="View item inventories">
                <ArrowUpRightIcon className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="flex min-h-0 flex-1 items-stretch gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="mt-auto mb-auto shrink-0"
              disabled={!canPrev || isPending}
              aria-label="Previous low-stock items"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeftIcon className="size-4" />
            </Button>

            <div className="grid min-h-0 flex-1 grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {isPending && !data ? (
                <div className="col-span-2 flex items-center justify-center py-6">
                  <Spinner className="size-6" />
                </div>
              ) : total === 0 ? (
                <p className="col-span-2 self-center text-center text-muted-foreground">
                  No low-stock items.
                </p>
              ) : (
                Array.from({ length: PER_PAGE }, (_, i) => {
                  const item = items[i]
                  return (
                    <div
                      key={item?.id ?? `empty-${i}`}
                      className="truncate text-foreground"
                      title={item?.name}
                    >
                      {item ? item.name : ''}
                    </div>
                  )
                })
              )}
            </div>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="mt-auto mb-auto shrink-0"
              disabled={!canNext || isPending}
              aria-label="Next low-stock items"
              onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
            >
              <ChevronRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
