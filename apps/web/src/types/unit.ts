import { z } from 'zod'

export const UnitFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(255),
  symbol: z.string().trim().min(1, 'Symbol is required').max(255),
})
export const CreateUnitSchema = UnitFormSchema
export const UpdateUnitSchema = UnitFormSchema

export type CreateUnitFormData = z.input<typeof CreateUnitSchema>
export type UpdateUnitFormData = z.input<typeof UpdateUnitSchema>

export interface Unit {
  id: number
  name: string
  symbol: string
  created_at: string
  updated_at: string
}
