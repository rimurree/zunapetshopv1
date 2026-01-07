import { cva, type VariantProps } from 'class-variance-authority'

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border border-transparent px-3 py-1 text-xs font-semibold uppercase tracking-wide',
  {
    variants: {
      variant: {
        default: 'bg-foreground text-background',
        soft: 'bg-muted text-foreground/80',
        accent: 'bg-accent text-accent-foreground',
      },
    },
    defaultVariants: {
      variant: 'soft',
    },
  },
)

export type BadgeVariantProps = VariantProps<typeof badgeVariants>
