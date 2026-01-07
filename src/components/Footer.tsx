import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/70">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <h3 className="text-lg font-semibold">Zuna Pet Essentials</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Thoughtful essentials for joyful pets. Designed with consistency,
            clarity, and comfort in mind.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground/80">Explore</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/checkout">Checkout</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground/80">Support</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            <span>help@zunapetessentials.com</span>
            <span>+63 912 345 6789</span>
            <span>Mon-Sat · 8:00 AM - 5:00 PM</span>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground/70">
        © 2026 Zuna Pet Essentials. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
