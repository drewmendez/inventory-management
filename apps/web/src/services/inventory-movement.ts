import type { PaginatedQueryResponse } from '@/types/api'
import type { InventoryMovement } from '@/types/inventory-movement'
import { api } from '@/lib/api'

export const getInventoryMovements = async (queryString: string) => {
  const response = await api(`/api/inventory-movements?${queryString}`, {
    method: 'GET',
  })

  const jsonData: PaginatedQueryResponse<InventoryMovement> = await response.json()

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return jsonData
}
