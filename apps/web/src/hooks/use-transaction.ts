import type { QueryParams } from '@/types/api'
import { useQuery } from '@tanstack/react-query'
import { buildQueryString } from '@/lib/utils'
import { getTransactions } from '@/services/transaction'

export const useGetTransactions = (params: QueryParams) => {
  const queryString = buildQueryString(params)
  const filtersKey = params.filters ? JSON.stringify(params.filters) : null

  return useQuery({
    queryKey: [
      'transactions',
      params.page,
      params.perPage,
      params.sortBy,
      params.sortOrder,
      params.search,
      filtersKey,
    ],
    queryFn: () => getTransactions(queryString),
  })
}
