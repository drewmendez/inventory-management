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

export type FilterItem = {
  id: string | number
  name: string
}

export interface FilterProps extends DataTableFilterProps {
  items: FilterItem[]
  isLoading?: boolean
  placeholder: string
}

function itemIdString(item: FilterItem): string {
  return String(item.id)
}

export function Filter({ value, onValueChange, items, isLoading = false, placeholder }: FilterProps) {
  const selected = items.find((item) => itemIdString(item) === value) ?? null

  if (isLoading && items.length === 0) {
    return <Skeleton className="h-11 w-40" />
  }

  return (
    <Combobox
      items={items}
      value={selected}
      onValueChange={(v) => onValueChange(v ? itemIdString(v) : '', v?.name)}
      itemToStringLabel={(item) => item.name}
    >
      <ComboboxInput placeholder={placeholder} className="py-5" showClear />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={itemIdString(item)} value={item}>
              {item.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
