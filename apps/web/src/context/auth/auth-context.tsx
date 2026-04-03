import type { User } from '@/types/user'
import { createContext } from 'react'

export interface AuthContextValue {
  user?: User
  isAdmin: boolean
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextValue | null>(null)
