import type { DataTableFilterProps } from '@/types/data-table'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'

type Role = { id: number; name: string }

const roles: Role[] = [
  { id: 1, name: 'Admin' },
  { id: 2, name: 'Warehouse Staff' },
]

export default function RoleFilter({ value, onValueChange }: DataTableFilterProps) {
  const selected = roles.find((r) => String(r.id) === value) ?? null

  return (
    <Combobox
      items={roles}
      value={selected}
      onValueChange={(v) => onValueChange(v ? String(v.id) : '', v?.name)}
      itemToStringLabel={(role) => role.name}
    >
      <ComboboxInput placeholder="Select a role" className="py-5" showClear />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(role) => (
            <ComboboxItem key={role.id} value={role}>
              {role.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
