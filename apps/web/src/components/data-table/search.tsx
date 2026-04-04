import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debounce'

export interface SearchProps {
  onDebouncedSearchChange: (search: string) => void
}

export default function Search({ onDebouncedSearchChange }: SearchProps) {
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearch = useDebounce(searchInput)

  const onDebouncedSearchChangeRef = useRef(onDebouncedSearchChange)
  onDebouncedSearchChangeRef.current = onDebouncedSearchChange
  useEffect(() => {
    onDebouncedSearchChangeRef.current(debouncedSearch.trim())
  }, [debouncedSearch])

  return (
    <Input
      type="search"
      placeholder="Search"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      className="max-w-xs flex-1"
      aria-label="Search table"
    />
  )
}
