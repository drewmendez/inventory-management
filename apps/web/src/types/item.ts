import type { Category } from './category'
import type { Unit } from './unit'
import { z } from 'zod'

export interface Item {
  id: number
  sku: string
  name: string
  quantity: string
  reorder_level: string
  status: 'Low Stock' | 'Normal'
  category: Category
  unit: Unit
  created_at: string
  updated_at: string
}

const quantityField = z
  .string()
  .superRefine((raw, ctx) => {
    const t = raw.trim()
    if (t === '') return
    const n = Number(t)
    if (Number.isNaN(n) || n < 0) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Enter a valid non-negative number' })
    }
  })
  .transform((s) => (s.trim() === '' ? 0 : Number(s.trim())))

const reorderLevelField = z
  .string()
  .superRefine((raw, ctx) => {
    const t = raw.trim()
    if (t === '') {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Reorder level is required' })
      return
    }
    const n = Number(t)
    if (Number.isNaN(n) || n < 0) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Enter a valid non-negative number' })
    }
  })
  .transform((s) => Number(s.trim()))

export const CreateItemSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(255),
  quantity: quantityField,
  reorder_level: reorderLevelField,
  category_id: z.number().int().positive(),
  unit_id: z.number().int().positive(),
})

export const UpdateItemSchema = CreateItemSchema
export type ItemFormValues = z.input<typeof CreateItemSchema>
export type CreateItemPayload = z.output<typeof CreateItemSchema>
export type CreateItemFormData = ItemFormValues
export type UpdateItemFormData = ItemFormValues
export type UpdateItemPayload = CreateItemPayload
