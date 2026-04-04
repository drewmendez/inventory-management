import type { FilterItem } from '@/components/data-table'
import type { DataTableFilterProps } from '@/types/data-table'
import { Filter } from '@/components/data-table'

const types: FilterItem[] = [
  { id: '1', name: 'Stock In' },
  { id: '2', name: 'Stock Out' },
]

export default function TypeFilter(props: DataTableFilterProps) {
  return <Filter {...props} items={types} placeholder="Transaction type" />
}
