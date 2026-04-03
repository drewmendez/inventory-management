import type { QueryParams } from '@/types/api'
import { useQuery } from '@tanstack/react-query'
import { buildQueryString } from '@/lib/utils'
import { getUsers } from '@/services/user'

export const useGetUsers = (params: QueryParams) => {
  const queryString = buildQueryString(params)
  const filtersKey = params.filters ? JSON.stringify(params.filters) : null

  return useQuery({
    queryKey: [
      'users',
      params.page,
      params.perPage,
      params.sortBy,
      params.sortOrder,
      params.search,
      filtersKey,
    ],
    queryFn: () => getUsers(queryString),
  })
}
