const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export function api(url: string, options?: RequestInit): Promise<Response> {
  const xsrfToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1]

  return fetch(`${BASE_URL}${url}`, {
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(xsrfToken ? { 'X-XSRF-TOKEN': decodeURIComponent(xsrfToken) } : {}),
      ...options?.headers,
    },
  })
}
