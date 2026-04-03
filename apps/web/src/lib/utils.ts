import type { ClassValue } from 'clsx'
import type { QueryParams } from '@/types/api'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function buildQueryString({ page = 1, perPage = 25, sortBy, sortOrder, search }: QueryParams) {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  })
  if (sortBy) {
    params.set('sort_by', sortBy)
    params.set('sort_order', sortOrder ?? 'asc')
  }
  const trimmedSearch = search?.trim()
  if (trimmedSearch) {
    params.set('search', trimmedSearch)
  }
  return params.toString()
}
