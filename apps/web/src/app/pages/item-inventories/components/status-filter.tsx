import type { FilterItem } from '@/components/data-table'
import type { DataTableFilterProps } from '@/types/data-table'
import { Filter } from '@/components/data-table'

const statuses: FilterItem[] = [
  { id: 'normal', name: 'Normal' },
  { id: 'low_stock', name: 'Low stock' },
]

export default function StatusFilter(props: DataTableFilterProps) {
  return <Filter {...props} items={statuses} placeholder="Stock status" />
}
