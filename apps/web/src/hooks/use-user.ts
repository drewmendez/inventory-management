import type { QueryParams } from '@/types/api'
import { useQuery } from '@tanstack/react-query'
import { buildQueryString } from '@/lib/utils'
import { getUsers } from '@/services/user'

export const useGetUsers = ({ page, perPage, sortBy, sortOrder, search }: QueryParams) => {
  const queryString = buildQueryString({ page, perPage, sortBy, sortOrder, search })

  return useQuery({
    queryKey: ['users', page, perPage, sortBy, sortOrder, search],
    queryFn: () => getUsers(queryString),
  })
}
