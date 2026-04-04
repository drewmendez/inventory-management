import { InventoryCounts } from './components/inventory-counts'
import { LowStockItems } from './components/low-stock-items'
import { RecentTransactions } from './components/recent-transactions'
import { TotalItems } from './components/total-items'

export default function Dashboard() {
  return (
    <div className="grid h-full min-w-0 gap-4 md:grid-cols-5 md:grid-rows-3">
      <div className="size-full min-w-0">
        <TotalItems />
      </div>
      <div className="size-full min-w-0 md:col-span-2">
        <LowStockItems />
      </div>
      <div className="size-full max-h-144 min-w-0 md:col-span-2 md:row-span-3 md:max-h-none">
        <InventoryCounts />
      </div>
      <div className="size-full max-h-144 min-w-0 md:col-span-3 md:row-span-2 md:max-h-none">
        <RecentTransactions />
      </div>
    </div>
  )
}
