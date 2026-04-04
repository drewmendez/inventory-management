import type { PaginatedQueryResponse, QueryResponse } from '@/types/api'
import type { CreateItemFormData, Item, UpdateItemFormData } from '@/types/item'
import { api } from '@/lib/api'

export const getPaginatedItems = async (queryString: string) => {
  const response = await api(`/api/items?${queryString}`, {
    method: 'GET',
  })

  const jsonData: PaginatedQueryResponse<Item> = await response.json()

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return jsonData
}

export const getItems = async (queryString: string) => {
  const response = await api(`/api/items?${queryString}`, {
    method: 'GET',
  })

  const jsonData: QueryResponse<Item[]> = await response.json()

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return jsonData
}

export const createItem = async (payload: CreateItemFormData) => {
  const response = await api('/api/items', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  const jsonData = await response.json()

  if (!response.ok) {
    throw new Error(jsonData.message ?? response.statusText)
  }

  return jsonData.data as Item
}

export const updateItem = async (itemId: number, payload: UpdateItemFormData) => {
  const response = await api(`/api/items/${itemId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })

  const jsonData = await response.json()

  if (!response.ok) {
    throw new Error(jsonData.message ?? response.statusText)
  }

  return jsonData.data as Item
}
