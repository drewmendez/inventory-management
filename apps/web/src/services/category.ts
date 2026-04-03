import type { PaginatedQueryResponse } from '@/types/api'
import type { Category } from '@/types/category'
import { api } from '@/lib/api'

export const getCategories = async (queryString: string) => {
  const response = await api(`/api/categories?${queryString}`, {
    method: 'GET',
  })

  const jsonData: PaginatedQueryResponse<Category> = await response.json()

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return jsonData
}
