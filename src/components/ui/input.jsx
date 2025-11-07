import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef(
  ({ className, type, fieldState = {}, ...props }, ref) => {
    const hasError = fieldState?.error
    const isValid = fieldState?.isValid || props.value

    return (
      <input
        type={type}
        ref={ref}
        data-slot="input"
        aria-invalid={hasError ? 'true' : undefined}
        className={cn(
          // Base styles
          'w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow]',
          'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'placeholder:text-muted-foreground file:text-foreground',
          'selection:bg-primary selection:text-primary-foreground',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',

          // Focus and ring
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]',

          // Validation states
          hasError &&
            'border-destructive ring-destructive/20 dark:ring-destructive/40',
          !hasError && isValid && 'border-success',

          className,
        )}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'

export { Input }
