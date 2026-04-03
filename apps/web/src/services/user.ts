import type { PaginatedQueryResponse } from '@/types/api'
import type { User } from '@/types/user'
import { api } from '@/lib/api'

export const getUsers = async (queryString: string) => {
  const response = await api(`/api/users?${queryString}`, {
    method: 'GET',
  })

  const jsonData: PaginatedQueryResponse<User> = await response.json()

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return jsonData
}
