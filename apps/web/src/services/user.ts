import type { PaginatedQueryResponse } from '@/types/api'
import type { UpdateUserPayload, User } from '@/types/user'
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

export const updateUser = async (userId: number, payload: UpdateUserPayload) => {
  const response = await api(`/api/users/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      ...payload,
      middle_name: payload.middle_name === null || payload.middle_name === '' ? null : payload.middle_name,
    }),
  })

  const jsonData = await response.json()

  if (!response.ok) {
    const message =
      typeof jsonData.message === 'string'
        ? jsonData.message
        : jsonData.errors
          ? Object.values(jsonData.errors as Record<string, string[]>)
              .flat()
              .join(' ')
          : response.statusText
    throw new Error(message)
  }

  return jsonData.data as User
}
