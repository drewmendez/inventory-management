import type { Role } from './role'
import { z } from 'zod'

export interface User {
  id: number
  first_name: string
  middle_name: string | null
  last_name: string
  full_name: string
  email: string
  role: Role
  created_at: string
  updated_at: string
}

export const USER_ROLE_OPTIONS = [
  { id: 1, name: 'Admin' },
  { id: 2, name: 'Warehouse Staff' },
] as const

export const UpdateUserSchema = z.object({
  first_name: z.string().trim().min(1, 'First name is required').max(255),
  middle_name: z.string().max(255),
  last_name: z.string().trim().min(1, 'Last name is required').max(255),
  email: z.string().trim().min(1, 'Email is required').pipe(z.email()),
  role_id: z.number().int().positive(),
})

export type UpdateUserFormData = z.infer<typeof UpdateUserSchema>

export type UpdateUserPayload = {
  first_name: string
  middle_name: string | null
  last_name: string
  email: string
  role_id: number
}
