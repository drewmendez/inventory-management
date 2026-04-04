import type { Category } from './category'
import type { Unit } from './unit'
import { z } from 'zod'

export const ItemFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(255),
  quantity: z.number().min(0),
  reorder_level: z.number().min(0),
  category_id: z.number().int().positive(),
  unit_id: z.number().int().positive(),
})
export const CreateItemFormSchema = ItemFormSchema
export const UpdateItemFormSchema = ItemFormSchema.omit({ quantity: true })

export type CreateItemFormData = z.input<typeof CreateItemFormSchema>
export type UpdateItemFormData = z.input<typeof UpdateItemFormSchema>

export interface Item {
  id: number
  sku: string
  name: string
  quantity: number
  reorder_level: number
  status: 'Low Stock' | 'Normal'
  category: Category
  unit: Unit
  created_at: string
  updated_at: string
}
