import type { QueryParams } from '@/types/api'
import type { CreateTransactionFormData } from '@/types/transaction'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { buildQueryString } from '@/lib/utils'
import { createTransaction, getPaginatedTransactions, getTransactions } from '@/services/transaction'

export const useGetTransactions = (params: QueryParams = {}) => {
  const queryString = buildQueryString(params)
  const filtersKey = params.filters ? JSON.stringify(params.filters) : null

  return useQuery({
    queryKey: ['transactions', 'list', params.sortBy, params.sortOrder, params.search, filtersKey],
    queryFn: () => getTransactions(queryString),
    staleTime: 60_000,
  })
}

export const useGetPaginatedTransactions = (params: QueryParams) => {
  const queryString = buildQueryString(params)
  const filtersKey = params.filters ? JSON.stringify(params.filters) : null

  return useQuery({
    queryKey: [
      'transactions',
      'paginated',
      params.page,
      params.perPage,
      params.sortBy,
      params.sortOrder,
      params.search,
      filtersKey,
    ],
    queryFn: () => getPaginatedTransactions(queryString),
  })
}

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateTransactionFormData) => createTransaction(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['transactions'] })
      void queryClient.invalidateQueries({ queryKey: ['items'] })
      void queryClient.invalidateQueries({ queryKey: ['inventory-movements'] })
      toast.success('Transaction created successfully', { position: 'top-center' })
    },
  })
}
