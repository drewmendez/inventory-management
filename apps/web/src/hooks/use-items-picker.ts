import { useQuery } from '@tanstack/react-query'
import { buildQueryString } from '@/lib/utils'
import { getItems } from '@/services/item'

/** Loads up to 100 items for transaction line pickers (combobox client filter). */
export const useItemsPicker = () => {
  const queryString = buildQueryString({ page: 1, perPage: 100 })

  return useQuery({
    queryKey: ['items', 'picker'],
    queryFn: () => getItems(queryString),
    staleTime: 60_000,
  })
}
