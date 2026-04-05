import { useGetMe } from '@/hooks/use-auth'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: user, isPending, isFetching, isError } = useGetMe()

  if (isPending || isFetching) {
    return <p className="flex h-screen items-center justify-center bg-background">Authenticating…</p>
  }

  const isAdmin = user?.role?.name === 'Admin'
  const isAuthenticated = Boolean(user) && !isError

  const value = {
    user,
    isAdmin,
    isAuthenticated,
  }

  return <AuthContext value={value}>{children}</AuthContext>
}
