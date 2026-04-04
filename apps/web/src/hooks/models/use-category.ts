import type { QueryParams } from '@/types/api'
import type { CreateCategoryFormData, UpdateCategoryFormData } from '@/types/category'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { buildQueryString } from '@/lib/utils'
import { createCategory, getCategories, getPaginatedCategories, updateCategory } from '@/services/category'

export const useGetCategories = (params: QueryParams = {}) => {
  const queryString = buildQueryString(params)
  const filtersKey = params.filters ? JSON.stringify(params.filters) : null

  return useQuery({
    queryKey: ['categories', 'list', params.sortBy, params.sortOrder, params.search, filtersKey],
    queryFn: () => getCategories(queryString),
    staleTime: 60_000,
  })
}

export const useGetPaginatedCategories = (params: QueryParams) => {
  const queryString = buildQueryString(params)
  const filtersKey = params.filters ? JSON.stringify(params.filters) : null

  return useQuery({
    queryKey: [
      'categories',
      'paginated',
      params.page,
      params.perPage,
      params.sortBy,
      params.sortOrder,
      params.search,
      filtersKey,
    ],
    queryFn: () => getPaginatedCategories(queryString),
  })
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCategoryFormData) => createCategory(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ categoryId, data }: { categoryId: number; data: UpdateCategoryFormData }) =>
      updateCategory(categoryId, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}
