import { Navigate } from 'react-router'
import { useAuth } from '@/context/auth'
import LoginForm from './components/login-form'

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
