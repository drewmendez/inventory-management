import { InventoryCounts } from './components/inventory-counts'
import { LowStockItems } from './components/low-stock-items'
import { RecentTransactions } from './components/recent-transactions'
import { TotalItems } from './components/total-items'

export default function Dashboard() {
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
