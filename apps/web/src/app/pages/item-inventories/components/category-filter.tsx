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
import { useGetCategories } from '@/hooks/use-category'

export default function CategoryFilter({ value, onValueChange }: DataTableFilterProps) {
  const { data, isPending } = useGetCategories()
  const categories = data?.data ?? []
  const selected = categories.find((c) => String(c.id) === value) ?? null

  if (isPending && categories.length === 0) {
    return <Skeleton className="h-11 w-48" />
  }

  return (
    <Combobox
      items={categories}
      value={selected}
      onValueChange={(v) => onValueChange(v ? String(v.id) : '', v?.name)}
      itemToStringLabel={(c) => c.name}
    >
      <ComboboxInput placeholder="Category" className="py-5" showClear />
      <ComboboxContent>
        <ComboboxEmpty>No categories found.</ComboboxEmpty>
        <ComboboxList>
          {(category) => (
            <ComboboxItem key={category.id} value={category}>
              {category.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
