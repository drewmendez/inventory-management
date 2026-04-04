import { ArrowUpRightIcon, BoxIcon } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { useGetTotalItems } from '@/hooks/models/use-item'

export function TotalItems() {
  const { data: total, isPending, isError } = useGetTotalItems()

  return (
    <Card className="size-full border-l-7 border-l-primary">
      <CardContent className="flex size-full flex-col justify-between">
        <div className="flex justify-between gap-2">
          <BoxIcon className="size-15" />
          <Button variant="outline" size="icon" asChild>
            <Link to="/dashboard/item-inventories">
              <ArrowUpRightIcon className="size-4" />
            </Link>
          </Button>
        </div>
        <p className="text-xl font-medium">Total Items</p>
        <div>
          {isPending ? (
            <Spinner className="size-7" />
          ) : isError ? (
            <p className="text-[4rem] font-semibold">--</p>
          ) : (
            <p className="text-[4rem] leading-none font-semibold tabular-nums">{total}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
