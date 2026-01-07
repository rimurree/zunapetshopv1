export type Product = {
  id: string
  name: string
  price: number
  categoryId: string
  rating: number
  reviewCount: number
  description: string
  highlights: string[]
  tags: string[]
  image: string
  inStock: boolean
}

const svgCard = (label: string, accent: string, bg: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240" viewBox="0 0 320 240">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="${bg}" />
      <stop offset="100%" stop-color="${accent}" />
    </linearGradient>
  </defs>
  <rect width="320" height="240" rx="28" fill="url(#g)" />
  <circle cx="80" cy="80" r="36" fill="rgba(255,255,255,0.6)" />
  <circle cx="240" cy="160" r="44" fill="rgba(255,255,255,0.5)" />
  <text x="24" y="206" font-family="'Plus Jakarta Sans', sans-serif" font-size="22" font-weight="700" fill="#3f2d1d">${label}</text>
</svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export const products: Product[] = [
  {
    id: 'zuna-bone-chew',
    name: 'Zuna Classic Bone Chew',
    price: 14.5,
    categoryId: 'toys',
    rating: 4.8,
    reviewCount: 124,
    description: 'A durable chew with a gentle mint scent to keep pups calm and focused.',
    highlights: ['BPA-free', 'Textured grip', 'Calming mint aroma'],
    tags: ['Durable', 'Chew'],
    image: svgCard('Classic Bone', '#ffd7c2', '#fff2e2'),
    inStock: true,
  },
  {
    id: 'zuna-tug-rope',
    name: 'Rainbow Tug Rope',
    price: 12,
    categoryId: 'toys',
    rating: 4.6,
    reviewCount: 98,
    description: 'Hand-twisted rope for gentle tug sessions and teeth-safe play.',
    highlights: ['Cotton blend', 'Easy to grip', 'Great for fetch'],
    tags: ['Playtime'],
    image: svgCard('Tug Rope', '#b9e7ff', '#ffe3f1'),
    inStock: true,
  },
  {
    id: 'zuna-soft-bed',
    name: 'Cloud Cocoon Bed',
    price: 48,
    categoryId: 'beds',
    rating: 4.9,
    reviewCount: 201,
    description: 'A calming nest that keeps pets warm with supportive cushions.',
    highlights: ['Machine-washable', 'Anti-slip base', 'Cooling inner layer'],
    tags: ['Comfort'],
    image: svgCard('Cocoon Bed', '#ffd6b3', '#fef0dc'),
    inStock: true,
  },
  {
    id: 'zuna-gentle-shampoo',
    name: 'Gentle Oat Shampoo',
    price: 18.5,
    categoryId: 'grooming',
    rating: 4.7,
    reviewCount: 76,
    description: 'Soothing oatmeal wash for sensitive skin and shiny coats.',
    highlights: ['Hypoallergenic', 'No harsh sulfates', 'Lavender scent'],
    tags: ['Care'],
    image: svgCard('Oat Shampoo', '#d8f7d2', '#f6fde6'),
    inStock: true,
  },
  {
    id: 'zuna-training-kit',
    name: 'Positive Training Kit',
    price: 24,
    categoryId: 'training',
    rating: 4.5,
    reviewCount: 63,
    description: 'Clicker, treat pouch, and guide for friendly training sessions.',
    highlights: ['Step-by-step guide', 'Easy clip pouch', 'Gentle clicker'],
    tags: ['Training'],
    image: svgCard('Training Kit', '#f1f0ff', '#dbe6ff'),
    inStock: true,
  },
  {
    id: 'zuna-travel-bowl',
    name: 'Foldable Travel Bowl',
    price: 9.5,
    categoryId: 'travel',
    rating: 4.4,
    reviewCount: 44,
    description: 'Lightweight silicone bowl for walks, hikes, and day trips.',
    highlights: ['Leak resistant', 'Carabiner hook', 'Easy clean'],
    tags: ['Travel'],
    image: svgCard('Travel Bowl', '#ffe7c7', '#fef1d3'),
    inStock: true,
  },
  {
    id: 'zuna-fresh-bites',
    name: 'Fresh Bites Treat Mix',
    price: 16,
    categoryId: 'food',
    rating: 4.6,
    reviewCount: 142,
    description: 'Soft-baked treats with pumpkin, apple, and chia for happy tummies.',
    highlights: ['Vet-approved recipe', 'No fillers', 'Resealable pouch'],
    tags: ['Treats'],
    image: svgCard('Treat Mix', '#ffd9c7', '#fff3e5'),
    inStock: true,
  },
  {
    id: 'zuna-walk-harness',
    name: 'Everyday Walk Harness',
    price: 32,
    categoryId: 'travel',
    rating: 4.7,
    reviewCount: 89,
    description: 'Soft padded harness with reflective trims for evening strolls.',
    highlights: ['Breathable mesh', 'Quick adjust straps', 'Reflective piping'],
    tags: ['Walks'],
    image: svgCard('Walk Harness', '#ffe5d1', '#f7f0ff'),
    inStock: true,
  },
  {
    id: 'zuna-care-wipes',
    name: 'Daily Care Wipes',
    price: 11,
    categoryId: 'grooming',
    rating: 4.3,
    reviewCount: 51,
    description: 'Gentle wipes for paws and fur between baths.',
    highlights: ['Biodegradable', 'Aloe infusion', 'Travel size'],
    tags: ['Care'],
    image: svgCard('Care Wipes', '#e5f3ff', '#fdf1ff'),
    inStock: true,
  },
]

export const productLookup = Object.fromEntries(
  products.map((product) => [product.id, product]),
)
