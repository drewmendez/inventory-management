import type { QueryParams } from '@/types/api'
import type { UpdateUserPayload } from '@/types/user'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { buildQueryString } from '@/lib/utils'
import { getUsers, updateUser } from '@/services/user'

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

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, data }: { userId: number; data: UpdateUserPayload }) => updateUser(userId, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
