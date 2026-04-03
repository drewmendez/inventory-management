import { useGetMe } from '@/hooks/use-auth'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: user } = useGetMe()

  const isAdmin = user?.role.name === 'Admin'
  const isAuthenticated = Boolean(user)

  const value = {
    user,
    isAdmin,
    isAuthenticated,
  }

  return <AuthContext value={value}>{children}</AuthContext>
}
