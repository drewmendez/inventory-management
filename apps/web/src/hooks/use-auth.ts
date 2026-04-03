import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { getMe, login, logout } from '@/services/auth'

export const useLogin = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate('/dashboard')
    },
  })
}
export const useLogout = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate('/login')
    },
  })
}

export const useGetMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: getMe,
  })
}
