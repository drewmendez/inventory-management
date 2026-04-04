import type { ComboboxFilterItem } from '@/components/data-table'
import type { DataTableFilterProps } from '@/types/data-table'
import { ComboboxFilter } from '@/components/data-table'

const roles: ComboboxFilterItem[] = [
  { id: 1, name: 'Admin' },
  { id: 2, name: 'Warehouse Staff' },
]

export default function RoleFilter(props: DataTableFilterProps) {
  return <ComboboxFilter {...props} items={roles} placeholder="Select a role" />
}
