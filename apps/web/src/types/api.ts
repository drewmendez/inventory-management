interface PaginatorInfo {
  current_page: number
  per_page: number
  last_page: number
  total: number
}

export interface PaginatedQueryResponse<T> {
  data: T[]
  paginator_info: PaginatorInfo
}

export interface QueryParams {
  page?: number
  perPage?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
}
