import type { DataTableFilterProps } from '@/types/data-table'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'

type TypeOption = { id: string; name: string }

const types: TypeOption[] = [
  { id: '1', name: 'Stock In' },
  { id: '2', name: 'Stock Out' },
]

export default function TypeFilter({ value, onValueChange }: DataTableFilterProps) {
  const selected = types.find((t) => t.id === value) ?? null

  return (
    <Combobox
      items={types}
      value={selected}
      onValueChange={(v) => onValueChange(v?.id ?? '')}
      itemToStringLabel={(t) => t.name}
    >
      <ComboboxInput placeholder="Transaction type" className="py-5" showClear />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(opt) => (
            <ComboboxItem key={opt.id} value={opt}>
              {opt.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
