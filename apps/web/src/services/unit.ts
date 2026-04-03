import type { PaginatedQueryResponse } from '@/types/api'
import type { Unit, UnitPayload } from '@/types/unit'
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

export const createUnit = async (payload: UnitPayload) => {
  const response = await api('/api/units', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  const jsonData = await response.json()

  if (!response.ok) {
    throw new Error(jsonData.message ?? response.statusText)
  }

  return jsonData.data as Unit
}

export const updateUnit = async (unitId: number, payload: UnitPayload) => {
  const response = await api(`/api/units/${unitId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })

  const jsonData = await response.json()

  if (!response.ok) {
    throw new Error(jsonData.message ?? response.statusText)
  }

  return jsonData.data as Unit
}
