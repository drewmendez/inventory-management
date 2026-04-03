import { Navigate, Outlet } from 'react-router'
import { useAuth } from '@/context/auth'

export default function AuthLayout() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
