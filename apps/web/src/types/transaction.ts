import type { Item } from './item'
import type { User } from './user'
import { z } from 'zod'

const TransactionLineFormSchema = z.object({
  item_id: z.number().int().min(1, 'Select an item'),
  quantity: z.number().min(0.01, 'Minimum quantity is 0.01'),
})

export const TransactionFormSchema = z.object({
  type: z.union([z.literal(1), z.literal(2)]),
  remarks: z.string().max(1000),
  transaction_items: z.array(TransactionLineFormSchema).min(1, 'Add at least one line'),
})

export type CreateTransactionFormData = z.input<typeof TransactionFormSchema>

export interface TransactionItem {
  id: number
  quantity: number
  item: Item
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: number
  reference_number: string
  type: 'Stock In' | 'Stock Out' | 'Unknown'
  remarks: string | null
  user: User
  transaction_items: TransactionItem[]
  created_at: string
  updated_at: string
}
