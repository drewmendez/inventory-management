import type { Item } from './item'

export interface InventoryMovementTransactionItem {
  id: number
  quantity: number
  item: Item
  created_at: string
  updated_at: string
}

export interface InventoryMovement {
  id: number
  from_quantity: number
  to_quantity: number
  transaction_item: InventoryMovementTransactionItem
  created_at: string
  updated_at: string
}
