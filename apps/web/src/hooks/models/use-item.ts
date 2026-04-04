import type { QueryParams } from '@/types/api'
import type { CreateItemFormData, UpdateItemFormData } from '@/types/item'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { buildQueryString } from '@/lib/utils'
import { createItem, getItems, getPaginatedItems, updateItem } from '@/services/item'

export const useGetItems = (params: QueryParams = {}) => {
  const queryString = buildQueryString(params)
  const filtersKey = params.filters ? JSON.stringify(params.filters) : null

  return useQuery({
    queryKey: ['items', 'list', params.sortBy, params.sortOrder, params.search, filtersKey],
    queryFn: () => getItems(queryString),
    staleTime: 60_000,
  })
}

export const useGetPaginatedItems = (params: QueryParams) => {
  const queryString = buildQueryString(params)
  const filtersKey = params.filters ? JSON.stringify(params.filters) : null

  return useQuery({
    queryKey: [
      'items',
      'paginated',
      params.page,
      params.perPage,
      params.sortBy,
      params.sortOrder,
      params.search,
      filtersKey,
    ],
    queryFn: () => getPaginatedItems(queryString),
  })
}

export const useGetTotalItems = () => {
  return useQuery({
    queryKey: ['items', 'total-count'],
    queryFn: () => getItems(buildQueryString({})),
    select: (response) => response.data.length,
    staleTime: 60_000,
  })
}

export const useCreateItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateItemFormData) => createItem(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['items'] })
    },
  })
}

export const useUpdateItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ itemId, data }: { itemId: number; data: UpdateItemFormData }) => updateItem(itemId, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['items'] })
    },
  })
}
