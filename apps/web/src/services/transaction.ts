import type { PaginatedQueryResponse, QueryResponse } from '@/types/api'
import type { CreateTransactionFormData, Transaction } from '@/types/transaction'
import { api } from '@/lib/api'

export const getPaginatedTransactions = async (queryString: string) => {
  const response = await api(`/api/transactions?${queryString}`, {
    method: 'GET',
  })

  const jsonData: PaginatedQueryResponse<Transaction> = await response.json()

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return jsonData
}

export const getTransactions = async (queryString: string) => {
  const response = await api(`/api/transactions?${queryString}`, {
    method: 'GET',
  })

  const jsonData: QueryResponse<Transaction[]> = await response.json()

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return jsonData
}

export const createTransaction = async (payload: CreateTransactionFormData) => {
  const response = await api('/api/transactions', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  const jsonData = await response.json()

  if (!response.ok) {
    let message = response.statusText
    if (typeof jsonData.message === 'string') {
      message = jsonData.message
    } else if (jsonData.errors && typeof jsonData.errors === 'object') {
      const parts = Object.values(jsonData.errors as Record<string, string[]>)
        .flat()
        .filter(Boolean)
      if (parts.length > 0) {
        message = parts.join(' ')
      }
    }
    throw new Error(message)
  }

  return jsonData.data as Transaction
}
