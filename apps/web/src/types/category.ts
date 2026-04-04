import { z } from 'zod'

export const CategoryFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(255),
  prefix: z
    .string()
    .trim()
    .length(3, 'Prefix must be exactly 3 characters')
    .regex(/^[A-Z0-9]{3}$/i, 'Prefix must be 3 letters or digits')
    .transform((s) => s.toUpperCase()),
})
export const CreateCategoryFormSchema = CategoryFormSchema
export const UpdateCategoryFormSchema = CategoryFormSchema

export type CreateCategoryFormData = z.input<typeof CreateCategoryFormSchema>
export type UpdateCategoryFormData = z.input<typeof UpdateCategoryFormSchema>

export interface Category {
  id: number
  name: string
  prefix: string
  created_at: string
  updated_at: string
}
