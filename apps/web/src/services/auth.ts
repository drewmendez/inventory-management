import type { LoginFormData } from '@/types/auth'
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
