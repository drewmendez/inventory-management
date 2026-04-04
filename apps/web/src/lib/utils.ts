import type { ClassValue } from 'clsx'
import type { QueryParams } from '@/types/api'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function buildQueryString({ page, perPage, sortBy, sortOrder, search, filters }: QueryParams) {
  const params = new URLSearchParams()
  if (page !== undefined) {
    params.set('page', String(page))
  }
  if (perPage !== undefined) {
    params.set('per_page', String(perPage))
  }
  if (sortBy) {
    params.set('sort_by', sortBy)
    params.set('sort_order', sortOrder ?? 'asc')
  }
  const trimmedSearch = search?.trim()
  if (trimmedSearch) {
    params.set('search', trimmedSearch)
  }
  if (filters) {
    for (const [key, val] of Object.entries(filters)) {
      if (val !== '') {
        params.set(key, val)
      }
    }
  }
  return params.toString()
}
