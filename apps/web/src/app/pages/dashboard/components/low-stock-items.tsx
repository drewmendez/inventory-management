import { ArrowUpRightIcon, TriangleAlertIcon } from 'lucide-react'
import { Link } from 'react-router'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Spinner } from '@/components/ui/spinner'
import { useGetItems } from '@/hooks/models/use-item'
import { cn } from '@/lib/utils'

export function LowStockItems() {
  const { data, isPending, isError, isFetching } = useGetItems({
    filters: { status: 'low_stock' },
  })

  const items = data?.data ?? []
  const total = items.length

  return (
    <Card className="size-full min-w-0 border-l-7 border-l-primary">
      <CardContent className="flex size-full min-h-0 flex-col justify-between gap-4">
        <div className="flex justify-between gap-2">
          <TriangleAlertIcon className="size-13 md:size-15" aria-hidden />
          <Button variant="outline" size="icon" asChild>
            <Link to="/dashboard/item-inventories" aria-label="View item inventories">
              <ArrowUpRightIcon className="size-4" />
            </Link>
          </Button>
        </div>
        <p className="text-xl font-medium">Low Stock Items</p>

        <div className="flex min-h-0 min-w-0 flex-col gap-3 md:flex-row md:items-center md:gap-4">
          <div className="shrink-0">
            {isPending && !data ? (
              <Spinner className="size-7" />
            ) : isError ? (
              <p className="font-semibold md:text-[4rem]">--</p>
            ) : (
              <p className="text-5xl leading-none font-semibold tabular-nums md:text-[4rem]">{total}</p>
            )}
          </div>

          <div className={cn('min-h-11 w-full min-w-0 md:-mb-12 md:flex-1', isFetching && 'opacity-60')}>
            <ScrollArea className="min-h-11 w-full min-w-0">
              <div
                className={cn(
                  'flex min-h-7 flex-nowrap items-center gap-2',
                  !isPending && total === 0 && 'w-full justify-center py-0.5',
                  !isPending && total > 0 && 'w-max pr-3',
                )}
              >
                {isPending && !data ? (
                  <div className="min-h-7 min-w-0 flex-1" aria-hidden />
                ) : total === 0 ? (
                  <p className="px-1 text-center text-sm text-muted-foreground">No low-stock items.</p>
                ) : (
                  items.map((item) => (
                    <Badge
                      key={item.id}
                      variant="destructive"
                      className="max-w-[min(16rem,70vw)] shrink-0 truncate md:max-w-xs"
                      title={item.name}
                    >
                      {item.name}
                    </Badge>
                  ))
                )}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
