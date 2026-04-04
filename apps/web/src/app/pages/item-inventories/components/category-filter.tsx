import type { DataTableFilterProps } from '@/types/data-table'
import { ComboboxFilter } from '@/components/data-table'
import { useGetCategories } from '@/hooks/models/use-category'

export default function CategoryFilter(props: DataTableFilterProps) {
  const { data, isPending } = useGetCategories()
  const categories = data?.data ?? []

  return <ComboboxFilter {...props} items={categories} isLoading={isPending} placeholder="Category" />
}
