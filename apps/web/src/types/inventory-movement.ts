import type { Item } from './item'

export interface InventoryMovementTransactionItem {
  id: number
  quantity: string
  item: Item
  created_at: string
  updated_at: string
}

export interface InventoryMovement {
  id: number
  from_quantity: string
  to_quantity: string
  transaction_item: InventoryMovementTransactionItem
  created_at: string
  updated_at: string
}
