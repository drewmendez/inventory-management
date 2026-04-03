import type { PaginatedQueryResponse } from '@/types/api'
import type { Transaction } from '@/types/transaction'
import { api } from '@/lib/api'

export const getTransactions = async (queryString: string) => {
  const response = await api(`/api/transactions?${queryString}`, {
    method: 'GET',
  })

  const jsonData: PaginatedQueryResponse<Transaction> = await response.json()

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return jsonData
}
