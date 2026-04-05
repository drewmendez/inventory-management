import type { QueryParams } from '@/types/api'
import type { CreateUnitFormData, UpdateUnitFormData } from '@/types/unit'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { buildQueryString } from '@/lib/utils'
import { createUnit, getPaginatedUnits, getUnits, updateUnit } from '@/services/unit'

export const useGetUnits = (params: QueryParams = {}) => {
  const queryString = buildQueryString(params)
  const filtersKey = params.filters ? JSON.stringify(params.filters) : null

  return useQuery({
    queryKey: ['units', 'list', params.sortBy, params.sortOrder, params.search, filtersKey],
    queryFn: () => getUnits(queryString),
    staleTime: 60_000,
  })
}

export const useGetPaginatedUnits = (params: QueryParams) => {
  const queryString = buildQueryString(params)
  const filtersKey = params.filters ? JSON.stringify(params.filters) : null

  return useQuery({
    queryKey: [
      'units',
      'paginated',
      params.page,
      params.perPage,
      params.sortBy,
      params.sortOrder,
      params.search,
      filtersKey,
    ],
    queryFn: () => getPaginatedUnits(queryString),
  })
}

export const useCreateUnit = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateUnitFormData) => createUnit(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['units'] })
      toast.success('Unit created successfully', { position: 'top-center' })
    },
  })
}

export const useUpdateUnit = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ unitId, data }: { unitId: number; data: UpdateUnitFormData }) => updateUnit(unitId, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['units'] })
      toast.success('Unit updated successfully', { position: 'top-center' })
    },
  })
}
