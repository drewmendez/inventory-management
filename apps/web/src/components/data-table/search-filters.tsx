import type { ComponentType } from 'react'
import type { DataTableFilterProps, DataTableProps } from '@/types/data-table'
import { CheckIcon, FilterIcon, XIcon } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverHeader, PopoverTitle, PopoverTrigger } from '@/components/ui/popover'
import { useDebounce } from '@/hooks/use-debounce'
import { cn } from '@/lib/utils'

type FiltersConfig = NonNullable<DataTableProps<unknown>['filters']>

function getFilterComponentEntries(filters: FiltersConfig): [string, ComponentType<DataTableFilterProps>][] {
  return Object.entries(filters).filter(
    (entry): entry is [string, ComponentType<DataTableFilterProps>] =>
      entry[0] !== 'search' && typeof entry[1] === 'function',
  )
}

interface SearchFiltersProps {
  filters: FiltersConfig
  onDebouncedSearchChange: (search: string) => void
  onFiltersChange: (filters: Record<string, string> | undefined) => void
  onFilterPageReset: () => void
}

export default function SearchFilters({
  filters: filtersConfig,
  onDebouncedSearchChange,
  onFiltersChange,
  onFilterPageReset,
}: SearchFiltersProps) {
  const [searchInput, setSearchInput] = useState('')
  const [filterValues, setFilterValues] = useState<Record<string, string>>({})
  const [filterPopoverOpen, setFilterPopoverOpen] = useState(false)
  const [draftFilterValues, setDraftFilterValues] = useState<Record<string, string>>({})
  const [filterOptionLabels, setFilterOptionLabels] = useState<Record<string, string>>({})
  const [draftFilterOptionLabels, setDraftFilterOptionLabels] = useState<Record<string, string>>({})

  const debouncedSearch = useDebounce(searchInput)
  const searchEnabled = filtersConfig.search

  const filterEntries = useMemo(() => getFilterComponentEntries(filtersConfig), [filtersConfig])
  const filterKeys = useMemo(() => filterEntries.map(([key]) => key), [filterEntries])
  const hasFilterFields = filterEntries.length > 0

  const appliedFilters = useMemo(() => {
    const out: Record<string, string> = {}
    for (const [key, val] of Object.entries(filterValues)) {
      if (val !== '') {
        out[key] = val
      }
    }
    return Object.keys(out).length > 0 ? out : undefined
  }, [filterValues])

  const onDebouncedSearchChangeRef = useRef(onDebouncedSearchChange)
  onDebouncedSearchChangeRef.current = onDebouncedSearchChange
  useEffect(() => {
    if (searchEnabled) {
      onDebouncedSearchChangeRef.current(debouncedSearch.trim())
    } else {
      onDebouncedSearchChangeRef.current('')
    }
  }, [debouncedSearch, searchEnabled])

  const onFiltersChangeRef = useRef(onFiltersChange)
  onFiltersChangeRef.current = onFiltersChange
  useEffect(() => {
    onFiltersChangeRef.current(appliedFilters)
  }, [appliedFilters])

  const handleFilterPopoverOpenChange = (open: boolean) => {
    setFilterPopoverOpen(open)
    if (open) {
      setDraftFilterValues({ ...filterValues })
      setDraftFilterOptionLabels({ ...filterOptionLabels })
    }
  }

  const applyDraftFilters = useCallback(() => {
    setFilterValues(draftFilterValues)
    setFilterOptionLabels(() => {
      const next: Record<string, string> = {}
      for (const key of filterKeys) {
        const v = draftFilterValues[key]
        if (v !== undefined && v !== '') {
          const label = draftFilterOptionLabels[key]
          if (label) {
            next[key] = label
          }
        }
      }
      return next
    })
    onFilterPageReset()
    setFilterPopoverOpen(false)
  }, [draftFilterOptionLabels, draftFilterValues, filterKeys, onFilterPageReset])

  const clearAllFilters = useCallback(() => {
    setDraftFilterValues({})
    setDraftFilterOptionLabels({})
    setFilterValues({})
    setFilterOptionLabels({})
    onFilterPageReset()
    setFilterPopoverOpen(false)
  }, [onFilterPageReset])

  const removeFilter = useCallback(
    (key: string) => {
      setFilterValues((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
      setDraftFilterValues((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
      setFilterOptionLabels((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
      setDraftFilterOptionLabels((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
      onFilterPageReset()
    },
    [onFilterPageReset],
  )

  const activeFilterChips = useMemo(() => {
    return filterKeys
      .filter((key) => {
        const v = filterValues[key]
        return v !== undefined && v !== ''
      })
      .map((key) => ({
        key,
        name: filterOptionLabels[key] ?? formatFilterValueDisplay(filterValues[key] ?? ''),
      }))
  }, [filterKeys, filterValues, filterOptionLabels])

  const showSearch = searchEnabled
  const showFilters = hasFilterFields

  if (!showSearch && !showFilters) {
    return null
  }

  return (
    <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
      {showSearch && (
        <Input
          type="search"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="max-w-md flex-1 py-5"
          aria-label="Search table"
        />
      )}
      {showFilters && (
        <Popover open={filterPopoverOpen} onOpenChange={handleFilterPopoverOpenChange}>
          <div
            className={cn(
              'flex max-w-full flex-wrap items-center justify-start gap-1 rounded-md border border-border/60 px-1.5 py-1',
              !showSearch && 'flex-1',
            )}
          >
            <PopoverTrigger asChild>
              <Button
                size="icon-sm"
                variant="ghost"
                className="size-8 shrink-0 text-muted-foreground"
                aria-label="Open table filters"
                aria-expanded={filterPopoverOpen}
              >
                <FilterIcon className="size-4" />
              </Button>
            </PopoverTrigger>
            {activeFilterChips.map(({ key, name }) => (
              <Badge
                key={key}
                asChild
                className="h-6 max-w-40 shrink gap-1 rounded-md py-0 pr-0.5 pl-1.5 text-xs has-[>button]:hover:bg-secondary/80"
              >
                <button
                  type="button"
                  className="inline-flex max-w-full min-w-0 cursor-pointer items-center gap-0.5 outline-none"
                  onClick={() => removeFilter(key)}
                  aria-label={`Remove filter ${name}`}
                >
                  <span className="min-w-0 truncate">{name}</span>
                  <XIcon className="size-2.5 shrink-0 opacity-70" aria-hidden />
                </button>
              </Badge>
            ))}
          </div>
          <PopoverContent
            align="end"
            className="w-auto max-w-md min-w-[min(100vw-2rem,20rem)] gap-0 p-0"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <PopoverHeader className="shrink-0 border-b border-border px-4 pt-4 pb-3">
              <PopoverTitle>Available Filters</PopoverTitle>
            </PopoverHeader>
            <div className="flex max-h-[min(70vh,24rem)] min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pt-3 pb-4">
              {filterEntries.map(([key, Filter]) => (
                <Filter
                  key={key}
                  value={draftFilterValues[key] ?? ''}
                  onValueChange={(value, selectionLabel) => {
                    setDraftFilterValues((prev) => ({ ...prev, [key]: value }))
                    setDraftFilterOptionLabels((prev) => {
                      const next = { ...prev }
                      if (value === '') {
                        delete next[key]
                      } else if (selectionLabel !== undefined) {
                        next[key] = selectionLabel
                      }
                      return next
                    })
                  }}
                />
              ))}
            </div>
            <div className="flex shrink-0 items-center justify-end gap-2 border-t border-border px-4 py-2">
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                aria-label="Clear filters"
                onClick={clearAllFilters}
              >
                <XIcon className="size-4" />
              </Button>
              <Button type="button" size="icon-sm" aria-label="Apply filters" onClick={applyDraftFilters}>
                <CheckIcon className="size-4" />
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}

function formatFilterFieldLabel(key: string): string {
  return key
    .split('_')
    .map((word) => (word.length > 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(' ')
}

function formatFilterValueDisplay(value: string): string {
  if (value.includes('_')) {
    return formatFilterFieldLabel(value)
  }
  return value
}
