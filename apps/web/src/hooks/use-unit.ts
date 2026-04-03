import type { QueryParams } from '@/types/api'
import type { UnitPayload } from '@/types/unit'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { buildQueryString } from '@/lib/utils'
import { createUnit, getUnits, updateUnit } from '@/services/unit'

export const useGetUnits = (params: QueryParams) => {
  const queryString = buildQueryString(params)
  const filtersKey = params.filters ? JSON.stringify(params.filters) : null

  return useQuery({
    queryKey: [
      'units',
      params.page,
      params.perPage,
      params.sortBy,
      params.sortOrder,
      params.search,
      filtersKey,
    ],
    queryFn: () => getUnits(queryString),
  })
}

export const useCreateUnit = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UnitPayload) => createUnit(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['units'] })
    },
  })
}

export const useUpdateUnit = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ unitId, data }: { unitId: number; data: UnitPayload }) => updateUnit(unitId, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['units'] })
    },
  })
}
