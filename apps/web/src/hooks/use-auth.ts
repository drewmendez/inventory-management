import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { login } from '@/services/auth'

export const useLogin = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate('/dashboard')
    },
  })
}
