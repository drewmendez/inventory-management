import type { FilterItem } from '@/components/data-table'
import type { DataTableFilterProps } from '@/types/data-table'
import { Filter } from '@/components/data-table'

const roles: FilterItem[] = [
  { id: 1, name: 'Admin' },
  { id: 2, name: 'Warehouse Staff' },
]

export default function RoleFilter(props: DataTableFilterProps) {
  return <Filter {...props} items={roles} placeholder="Select a role" />
}
