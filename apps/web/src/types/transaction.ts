import type { Item } from './item'
import type { User } from './user'

export interface TransactionItemLine {
  id: number
  quantity: string
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
  transaction_items: TransactionItemLine[]
  created_at: string
  updated_at: string
}
