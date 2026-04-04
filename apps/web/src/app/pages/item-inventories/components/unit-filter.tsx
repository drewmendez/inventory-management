import type { DataTableFilterProps } from '@/types/data-table'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetUnits } from '@/hooks/use-unit'

export default function UnitFilter({ value, onValueChange }: DataTableFilterProps) {
  const { data, isPending } = useGetUnits()
  const units = data?.data ?? []
  const selected = units.find((u) => String(u.id) === value) ?? null

  if (isPending && units.length === 0) {
    return <Skeleton className="h-11 w-40" />
  }

  return (
    <Combobox
      items={units}
      value={selected}
      onValueChange={(v) => onValueChange(v ? String(v.id) : '', v?.name)}
      itemToStringLabel={(u) => `${u.name} (${u.symbol})`}
    >
      <ComboboxInput placeholder="Unit" className="py-5" showClear />
      <ComboboxContent>
        <ComboboxEmpty>No units found.</ComboboxEmpty>
        <ComboboxList>
          {(unit) => (
            <ComboboxItem key={unit.id} value={unit}>
              {unit.name} ({unit.symbol})
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
