import { InventoryCounts } from './inventory-counts'
import { LowStockItems } from './low-stock-items'
import { RecentTransactions } from './recent-transactions'
import { TotalItems } from './total-items'

export function Dashboard() {
  return (
    <div className="grid h-full gap-4 md:grid-cols-5 md:grid-rows-3">
      <div className="size-full">
        <TotalItems />
      </div>
      <div className="size-full md:col-span-2">
        <LowStockItems />
      </div>
      <div className="size-full md:col-span-2 md:row-span-3">
        <InventoryCounts />
      </div>
      <div className="size-full md:col-span-3 md:row-span-2">
        <RecentTransactions />
      </div>
    </div>
  )
}
