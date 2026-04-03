import { useQuery } from '@tanstack/react-query'
import { buildQueryString } from '@/lib/utils'
import { getCategories } from '@/services/category'

export const useCategoryOptions = () => {
  const queryString = buildQueryString({ page: 1, perPage: 100 })

  return useQuery({
    queryKey: ['categories', 'options'],
    queryFn: () => getCategories(queryString),
  })
}
