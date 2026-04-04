import type { ComboboxFilterItem } from '@/components/data-table'
import type { DataTableFilterProps } from '@/types/data-table'
import { ComboboxFilter } from '@/components/data-table'

const types: ComboboxFilterItem[] = [
  { id: '1', name: 'Stock In' },
  { id: '2', name: 'Stock Out' },
]

export default function TypeFilter(props: DataTableFilterProps) {
  return <ComboboxFilter {...props} items={types} placeholder="Transaction type" />
}
