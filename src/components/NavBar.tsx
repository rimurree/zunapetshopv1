import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Moon, ShoppingCart, Sun } from 'lucide-react'
import { useCart } from '@/context/useCart'
import SearchCommand from '@/components/SearchCommand'
import { cn } from '@/lib/utils'
import logo from '@/assets/logo.webp'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/products' },
]

const themeStorageKey = 'zuna-theme'

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') {
    return 'light'
  }
  const stored = window.localStorage.getItem(themeStorageKey)
  if (stored === 'light' || stored === 'dark') {
    return stored
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function NavBar() {
  const { itemCount } = useCart()
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme)
  const location = useLocation()
  const searchResetKey = location.pathname === '/' ? 'home' : 'other'

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    window.localStorage.setItem(themeStorageKey, theme)
  }, [theme])

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-muted/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Zuna Pet Essentials logo"
            className="h-12 w-12 object-contain"
          />
          <div className="hidden sm:block">
            <p className="text-lg font-semibold text-foreground">
              Zuna Pet Essentials
            </p>
          </div>
        </Link>
        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-4 py-2 text-sm font-semibold transition',
                  isActive
                    ? 'bg-foreground text-background'
                    : 'text-foreground/80 hover:bg-muted/70'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex flex-1 justify-center">
          <div className="hidden w-full max-w-3xl lg:block">
            <SearchCommand key={searchResetKey} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
            }
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/80 text-foreground shadow-sm transition hover:bg-muted/70 dark:border-foreground/30"
            aria-label={
              theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            }
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          <Link
            to="/cart"
            className="relative inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-2 text-sm font-semibold text-foreground/80 shadow-sm transition hover:bg-muted/70 dark:border-foreground/30"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {itemCount > 0 ? (
              <span className="absolute -top-2 right-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-xs font-semibold text-white">
                {itemCount}
              </span>
            ) : null}
          </Link>
        </div>
      </div>
      <div className="px-4 pb-4 lg:hidden">
        <SearchCommand key={`${searchResetKey}-mobile`} />
        <div className="mt-3 flex flex-wrap gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'rounded-full border border-border/60 bg-card/80 px-4 py-2 text-xs font-semibold text-foreground/80',
                  isActive && 'bg-foreground text-background'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  )
}

export default NavBar
