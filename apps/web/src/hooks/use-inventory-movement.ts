import type { QueryParams } from '@/types/api'
import { useQuery } from '@tanstack/react-query'
import { buildQueryString } from '@/lib/utils'
import { getInventoryMovements } from '@/services/inventory-movement'

export const useGetInventoryMovements = (params: QueryParams) => {
  const queryString = buildQueryString(params)
  const filtersKey = params.filters ? JSON.stringify(params.filters) : null

  return useQuery({
    queryKey: [
      'inventory-movements',
      params.page,
      params.perPage,
      params.sortBy,
      params.sortOrder,
      params.search,
      filtersKey,
    ],
    queryFn: () => getInventoryMovements(queryString),
  })
}
