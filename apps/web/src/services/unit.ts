import type { PaginatedQueryResponse } from '@/types/api'
import type { Unit } from '@/types/unit'
import { api } from '@/lib/api'

export const getUnits = async (queryString: string) => {
  const response = await api(`/api/units?${queryString}`, {
    method: 'GET',
  })

  const jsonData: PaginatedQueryResponse<Unit> = await response.json()

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return jsonData
}
