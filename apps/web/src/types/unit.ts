import { z } from 'zod'

export interface Unit {
  id: number
  name: string
  symbol: string
  created_at: string
  updated_at: string
}

export const UnitFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(255),
  symbol: z.string().trim().min(1, 'Symbol is required').max(255),
})

export type UnitFormInput = z.input<typeof UnitFormSchema>

export type UnitPayload = z.output<typeof UnitFormSchema>

export const CreateUnitSchema = UnitFormSchema
export const UpdateUnitSchema = UnitFormSchema
