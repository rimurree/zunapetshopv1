import toyBone from '@/assets/zunabone (copy).png'
import rope from '@/assets/pisu.png'
import cocoonBed from '@/assets/petbed.jpg'
import zunaShampoo from '@/assets/zunashampoo1.png'
import trainingKit from '@/assets/trainingkit.png'
import travelBowl from '@/assets/travelbowl.jpg'
import treats from '@/assets/treats.png'
import harness from '@/assets/harness.png'
import wipes from '@/assets/wipes.png'

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

export const products: Product[] = [
  {
    id: 'zuna-bone-chew',
    name: 'Zuna Classic Bone Chew',
    price: 67.05,
    categoryId: 'toys',
    rating: 4.8,
    reviewCount: 124,
    description:
      'A durable chew with a gentle mint scent to keep pups calm and focused.',
    highlights: ['BPA-free', 'Textured grip', 'Calming mint aroma'],
    tags: ['Durable', 'Chew'],
    image: toyBone,
    inStock: true,
  },
  {
    id: 'zuna-tug-rope',
    name: 'Rainbow Tug Rope',
    price: 59.99,
    categoryId: 'toys',
    rating: 4.6,
    reviewCount: 98,
    description:
      'Hand-twisted rope for gentle tug sessions and teeth-safe play.',
    highlights: ['Cotton blend', 'Easy to grip', 'Great for fetch'],
    tags: ['Playtime'],
    image: rope,
    inStock: true,
  },
  {
    id: 'zuna-soft-bed',
    name: 'Cloud Cocoon Bed',
    price: 399.99,
    categoryId: 'beds',
    rating: 4.9,
    reviewCount: 201,
    description:
      'A calming nest that keeps pets warm with supportive cushions.',
    highlights: ['Machine-washable', 'Anti-slip base', 'Cooling inner layer'],
    tags: ['Comfort'],
    image: cocoonBed,
    inStock: true,
  },
  {
    id: 'zuna-gentle-shampoo',
    name: 'Gentle Oat Shampoo',
    price: 99.05,
    categoryId: 'grooming',
    rating: 4.7,
    reviewCount: 76,
    description: 'Soothing oatmeal wash for sensitive skin and shiny coats.',
    highlights: ['Hypoallergenic', 'No harsh sulfates', 'Lavender scent'],
    tags: ['Care'],
    image: zunaShampoo,
    inStock: true,
  },
  {
    id: 'zuna-training-kit',
    name: 'Positive Training Kit',
    price: 732.0,
    categoryId: 'training',
    rating: 4.5,
    reviewCount: 63,
    description:
      'Clicker, treat pouch, and guide for friendly training sessions.',
    highlights: ['Step-by-step guide', 'Easy clip pouch', 'Gentle clicker'],
    tags: ['Training'],
    image: trainingKit,
    inStock: true,
  },
  {
    id: 'zuna-travel-bowl',
    name: 'Foldable Travel Bowl',
    price: 20.0,
    categoryId: 'travel',
    rating: 4.4,
    reviewCount: 44,
    description: 'Lightweight silicone bowl for walks, hikes, and day trips.',
    highlights: ['Leak resistant', 'Carabiner hook', 'Easy clean'],
    tags: ['Travel'],
    image: travelBowl,
    inStock: true,
  },
  {
    id: 'zuna-fresh-bites',
    name: 'Fresh Bites Treat Mix',
    price: 181.25,
    categoryId: 'food',
    rating: 4.6,
    reviewCount: 142,
    description:
      'Soft-baked treats with pumpkin, apple, and chia for happy tummies.',
    highlights: ['Vet-approved recipe', 'No fillers', 'Resealable pouch'],
    tags: ['Treats'],
    image: treats,
    inStock: true,
  },
  {
    id: 'zuna-walk-harness',
    name: 'Everyday Walk Harness',
    price: 92.0,
    categoryId: 'travel',
    rating: 4.7,
    reviewCount: 89,
    description:
      'Soft padded harness with reflective trims for evening strolls.',
    highlights: ['Breathable mesh', 'Quick adjust straps', 'Reflective piping'],
    tags: ['Walks'],
    image: harness,
    inStock: true,
  },
  {
    id: 'zuna-care-wipes',
    name: 'Daily Care Wipes',
    price: 99,
    categoryId: 'grooming',
    rating: 4.3,
    reviewCount: 51,
    description: 'Gentle wipes for paws and fur between baths.',
    highlights: ['Biodegradable', 'Aloe infusion', 'Travel size'],
    tags: ['Care'],
    image: wipes,
    inStock: true,
  },
]

export const productLookup = Object.fromEntries(
  products.map((product) => [product.id, product])
)
