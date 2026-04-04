import type { DataTableFilterProps } from '@/types/data-table'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'

type StatusOption = { id: string; name: string }

const statuses: StatusOption[] = [
  { id: 'normal', name: 'Normal' },
  { id: 'low_stock', name: 'Low stock' },
]

export default function StatusFilter({ value, onValueChange }: DataTableFilterProps) {
  const selected = statuses.find((s) => s.id === value) ?? null

  return (
    <Combobox
      items={statuses}
      value={selected}
      onValueChange={(v) => onValueChange(v?.id ?? '', v?.name)}
      itemToStringLabel={(s) => s.name}
    >
      <ComboboxInput placeholder="Stock status" className="py-5" showClear />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(status) => (
            <ComboboxItem key={status.id} value={status}>
              {status.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
