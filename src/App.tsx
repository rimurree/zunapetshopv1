import { useEffect, useState, type ReactNode } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from '@/pages/Home'
import Products from '@/pages/Products'
import ProductDetails from '@/pages/ProductDetails'
import Cart from '@/pages/Cart'
import Checkout from '@/pages/Checkout'
import NotFound from '@/pages/NotFound'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import LoadingAnimation from '@/components/LoadingAnimation'
import { CartProvider } from '@/context/CartContext'
import ScrollToTop from '@/components/ScrollToTop'

type RouteLoaderProps = {
  children: ReactNode
}

function RouteLoader({ children }: RouteLoaderProps) {
  const [isRouteLoading, setIsRouteLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsRouteLoading(false)
    }, 1000)
    return () => window.clearTimeout(timer)
  }, [])

  if (isRouteLoading) {
    return (
      <LoadingAnimation className="min-h-[40vh]" label="Loading page..." />
    )
  }

  return <>{children}</>
}

function App() {
  const location = useLocation()

  return (
    <CartProvider>
      <ScrollToTop />
      <div className="min-h-screen bg-background text-foreground">
        <NavBar />
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-16 pt-10">
          <RouteLoader key={location.pathname}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:productId" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </RouteLoader>
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App
