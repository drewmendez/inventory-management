import type { QueryParams } from '@/types/api'
import type { UpdateUserFormData } from '@/types/user'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { buildQueryString } from '@/lib/utils'
import { getPaginatedUsers, getUsers, updateUser } from '@/services/user'

export const useGetUsers = (params: QueryParams = {}) => {
  const queryString = buildQueryString(params)
  const filtersKey = params.filters ? JSON.stringify(params.filters) : null

  return useQuery({
    queryKey: ['users', 'list', params.sortBy, params.sortOrder, params.search, filtersKey],
    queryFn: () => getUsers(queryString),
    staleTime: 60_000,
  })
}

export const useGetPaginatedUsers = (params: QueryParams) => {
  const queryString = buildQueryString(params)
  const filtersKey = params.filters ? JSON.stringify(params.filters) : null

  return useQuery({
    queryKey: [
      'users',
      'paginated',
      params.page,
      params.perPage,
      params.sortBy,
      params.sortOrder,
      params.search,
      filtersKey,
    ],
    queryFn: () => getPaginatedUsers(queryString),
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, data }: { userId: number; data: UpdateUserFormData }) => updateUser(userId, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User updated successfully', { position: 'top-center' })
    },
  })
}
