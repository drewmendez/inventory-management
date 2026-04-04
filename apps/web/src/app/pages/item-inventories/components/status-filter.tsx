import type { ComboboxFilterItem } from '@/components/data-table'
import type { DataTableFilterProps } from '@/types/data-table'
import { ComboboxFilter } from '@/components/data-table'

const statuses: ComboboxFilterItem[] = [
  { id: 'normal', name: 'Normal' },
  { id: 'low_stock', name: 'Low stock' },
]

export default function StatusFilter(props: DataTableFilterProps) {
  return <ComboboxFilter {...props} items={statuses} placeholder="Stock status" />
}
