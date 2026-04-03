import type { QueryParams } from '@/types/api'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '@/services/user'

function buildUsersQueryString({ page = 1, perPage = 10, sortBy, sortOrder, search }: QueryParams): string {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  })
  if (sortBy) {
    params.set('sort_by', sortBy)
    params.set('sort_order', sortOrder ?? 'asc')
  }
  const trimmedSearch = search?.trim()
  if (trimmedSearch) {
    params.set('search', trimmedSearch)
  }
  return params.toString()
}

export const useGetUsers = ({ page = 1, perPage = 10, sortBy, sortOrder, search }: QueryParams) => {
  return useQuery({
    queryKey: ['users', page, perPage, sortBy, sortOrder, search],
    queryFn: () => getUsers(buildUsersQueryString({ page, perPage, sortBy, sortOrder, search })),
  })
}
