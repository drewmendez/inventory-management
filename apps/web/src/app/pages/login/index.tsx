import { Navigate } from 'react-router'
import LoginForm from '@/components/login-form'
import { useAuth } from '@/context/auth'

export default function Login() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <LoginForm />
    </main>
  )
}
