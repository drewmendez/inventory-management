import type { DataTableFilterProps } from '@/types/data-table'
import { Filter } from '@/components/data-table'
import { useGetUnits } from '@/hooks/models/use-unit'

export default function UnitFilter(props: DataTableFilterProps) {
  const { data, isPending } = useGetUnits()
  const units = data?.data ?? []

  return <Filter {...props} items={units} isLoading={isPending} placeholder="Unit" />
}
