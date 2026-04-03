import type { Role } from './role'

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
