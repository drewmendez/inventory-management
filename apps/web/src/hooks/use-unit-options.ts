import { useQuery } from '@tanstack/react-query'
import { buildQueryString } from '@/lib/utils'
import { getUnits } from '@/services/unit'

export const useUnitOptions = () => {
  const queryString = buildQueryString({ page: 1, perPage: 100 })

  return useQuery({
    queryKey: ['units', 'options'],
    queryFn: () => getUnits(queryString),
  })
}
