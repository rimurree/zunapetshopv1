import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Clock, Folder, Package, X } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandInput,
} from '@/components/ui/command'
import { products } from '@/data/products'
import { categories } from '@/data/categories'
import { cn } from '@/lib/utils'

type Suggestion = {
  label: string
  type: 'product' | 'category' | 'query'
  value: string
}

type SearchCommandProps = {
  className?: string
}

const buildSuggestions = (): Suggestion[] => {
  const productSuggestions = products.map((product) => ({
    label: product.name,
    type: 'product' as const,
    value: product.id,
  }))
  const categorySuggestions = categories.map((category) => ({
    label: category.name,
    type: 'category' as const,
    value: category.id,
  }))

  return [...productSuggestions, ...categorySuggestions]
}

function SearchCommand({ className }: SearchCommandProps) {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [history, setHistory] = useState<string[]>(() => {
    if (typeof window === 'undefined') {
      return []
    }
    try {
      const stored = window.localStorage.getItem('zuna-search-history')
      return stored ? (JSON.parse(stored) as string[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!containerRef.current) {
        return
      }
      if (!containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    window.localStorage.setItem('zuna-search-history', JSON.stringify(history))
  }, [history])

  const suggestions = useMemo(() => buildSuggestions(), [])

  const filteredSuggestions = useMemo(() => {
    const normalizedQuery = query.toLowerCase()
    const priority: Record<Suggestion['type'], number> = {
      product: 0,
      category: 1,
      query: 2,
    }
    const matches = query.trim()
      ? suggestions.filter((item) =>
          item.label.toLowerCase().includes(normalizedQuery)
        )
      : suggestions

    const products = matches
      .filter((item) => item.type === 'product')
      .slice(0, 3)
    const categories = matches
      .filter((item) => item.type === 'category')
      .slice(0, 3)

    return [...products, ...categories].sort(
      (a, b) => priority[a.type] - priority[b.type]
    )
  }, [query, suggestions])

  const handleSelect = (item: Suggestion) => {
    if (item.type === 'product') {
      navigate(`/products/${item.value}`)
    } else if (item.type === 'category') {
      navigate(`/products?category=${encodeURIComponent(item.value)}`)
    } else {
      navigate(`/products?query=${encodeURIComponent(item.value)}`)
    }
    if (item.label.trim().length > 0) {
      setHistory((current) => {
        const next = [
          item.label,
          ...current.filter((value) => value !== item.label),
        ]
        return next.slice(0, 5)
      })
    }
    setOpen(false)
    setQuery(item.label)
  }

  const handleRemoveHistory = (entry: string) => {
    setHistory((current) => current.filter((value) => value !== entry))
  }

  const handleClearHistory = () => {
    setHistory([])
  }

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <Command className="w-full">
        <div className="flex items-center gap-2 px-3">
          <Search className="h-4 w-4 text-muted-foreground/70" />
          <CommandInput
            placeholder="Search products, categories, or tips"
            value={query}
            onValueChange={(value) => {
              setQuery(value)
              if (!open) {
                setOpen(true)
              }
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setOpen(false)
              }
            }}
            aria-label="Search the store"
          />
        </div>
        {open ? (
          <CommandList className="absolute left-1/2 top-12 z-40 w-[min(96vw,44rem)] -translate-x-1/2 rounded-2xl border border-input bg-popover shadow-xl sm:left-0 sm:w-full sm:translate-x-0">
            <CommandEmpty>No matches yet. Try another keyword.</CommandEmpty>
            {history.length > 0 ? (
              <>
                <div className="flex items-center justify-between px-4 pt-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
                  <span>Recent searches</span>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      handleClearHistory()
                    }}
                    onMouseDown={(event) => event.preventDefault()}
                    className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/80 transition hover:text-foreground"
                  >
                    Clear
                  </button>
                </div>
                <CommandGroup className="mt-1">
                  {history.map((entry) => (
                    <CommandItem
                      key={entry}
                      onSelect={() =>
                        handleSelect({
                          label: entry,
                          type: 'query',
                          value: entry,
                        })
                      }
                      className="flex items-center justify-between gap-3"
                    >
                      <span className="flex min-w-0 flex-1 items-center gap-2">
                        <Clock className="h-4 w-4 shrink-0 text-muted-foreground/70" />
                        <span className="truncate">{entry}</span>
                      </span>
                      <span className="flex items-center gap-2 text-right">
                        <span className="min-w-14 text-xs text-muted-foreground/70">
                          Search
                        </span>
                        <button
                          type="button"
                          aria-label={`Remove ${entry} from recent searches`}
                          onClick={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            handleRemoveHistory(entry)
                          }}
                          onMouseDown={(event) => event.preventDefault()}
                          className="inline-flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground/70 transition hover:bg-muted/70 hover:text-foreground"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
              </>
            ) : null}
            <CommandGroup
              heading="Suggestions"
              className="pt-2 pb-2 **:[[cmdk-group-heading]]:pb-1"
            >
              {filteredSuggestions.slice(0, 8).map((item) => (
                <CommandItem
                  key={`${item.type}-${item.value}`}
                  onSelect={() => handleSelect(item)}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="flex min-w-0 flex-1 items-center gap-2">
                    {item.type === 'product' ? (
                      <Package className="h-4 w-4 shrink-0 text-muted-foreground/70" />
                    ) : item.type === 'category' ? (
                      <Folder className="h-4 w-4 shrink-0 text-muted-foreground/70" />
                    ) : (
                      <Search className="h-4 w-4 shrink-0 text-muted-foreground/70" />
                    )}
                    <span className="truncate">{item.label}</span>
                  </span>
                  <span className="min-w-18 pb-1 text-right text-xs text-muted-foreground/70">
                    {item.type === 'product'
                      ? 'Product'
                      : item.type === 'category'
                      ? 'Category'
                      : 'Suggestion'}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        ) : null}
      </Command>
    </div>
  )
}

export default SearchCommand
