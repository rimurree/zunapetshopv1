/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  buttonVariants,
  type ButtonVariantProps,
} from '@/components/ui/buttonVariants'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
)
Button.displayName = 'Button'

export { Button, buttonVariants }
