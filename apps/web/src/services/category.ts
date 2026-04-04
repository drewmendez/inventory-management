import type { PaginatedQueryResponse, QueryResponse } from '@/types/api'
import type { Category, CategoryPayload } from '@/types/category'
import { api } from '@/lib/api'

export const getPaginatedCategories = async (queryString: string) => {
  const response = await api(`/api/categories?${queryString}`, {
    method: 'GET',
  })

  const jsonData: PaginatedQueryResponse<Category> = await response.json()

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return jsonData
}

export const getCategories = async (queryString: string) => {
  const response = await api(`/api/categories?${queryString}`, {
    method: 'GET',
  })

  const jsonData: QueryResponse<Category[]> = await response.json()

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return jsonData
}

export const createCategory = async (payload: CategoryPayload) => {
  const response = await api('/api/categories', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  const jsonData = await response.json()

  if (!response.ok) {
    throw new Error(jsonData.message ?? response.statusText)
  }

  return jsonData.data as Category
}

export const updateCategory = async (categoryId: number, payload: CategoryPayload) => {
  const response = await api(`/api/categories/${categoryId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })

  const jsonData = await response.json()

  if (!response.ok) {
    throw new Error(jsonData.message ?? response.statusText)
  }

  return jsonData.data as Category
}
