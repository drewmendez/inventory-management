import type { LoginFormData } from '@/types/auth'
import type { User } from '@/types/user'
import { api } from '@/lib/api'

const getCsrfToken = () =>
  api('/sanctum/csrf-cookie', {
    method: 'GET',
  })

export const login = async (data: LoginFormData) => {
  await getCsrfToken()

  const response = await api('/login', {
    method: 'POST',
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const jsonData = await response.json()
    throw new Error(jsonData.message ?? response.statusText)
  }
}

export const logout = async () => {
  const response = await api('/logout', {
    method: 'POST',
  })

  if (!response.ok) {
    const jsonData = await response.json()
    throw new Error(jsonData.message ?? response.statusText)
  }
}

export const getMe = async () => {
  const response = await api('/api/me', {
    method: 'GET',
  })

  const jsonData = await response.json()

  if (!response.ok) {
    throw new Error(jsonData.message ?? response.statusText)
  }

  return jsonData.data as User
}
