import React, { useRef, useEffect } from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

export function FormTextarea({
  control,
  name,
  label,
  placeholder,
  className = '',
  minRows = 3,
  maxRows = 8,
  disabled = false,
}) {
  const textareaRef = useRef(null)

  const autoResize = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    // Reset height to get the correct scrollHeight
    textarea.style.height = 'auto'

    // Calculate content height
    const contentHeight = textarea.scrollHeight

    // Calculate min and max heights
    const lineHeight = 24 // Approximate line height in pixels
    const minHeight = minRows * lineHeight
    const maxHeight = maxRows * lineHeight

    // Set the appropriate height
    if (contentHeight < minHeight) {
      textarea.style.height = `${minHeight}px`
    } else if (contentHeight > maxHeight) {
      textarea.style.height = `${maxHeight}px`
      textarea.style.overflowY = 'auto'
    } else {
      textarea.style.height = `${contentHeight}px`
      textarea.style.overflowY = 'hidden'
    }
  }

  // Auto-resize when component mounts and when value changes
  useEffect(() => {
    autoResize()
  }, [])

  const handleInput = (e, field) => {
    autoResize()
    field.onChange(e) // Call the original onChange
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="relative">
          <div className="flex flex-col">
            <FormLabel className="text-sm mb-[3px] font-medium text-gray-900">
              {label}
            </FormLabel>
            <FormControl>
              <Textarea
                ref={textareaRef}
                placeholder={placeholder}
                disabled={disabled}
                rows={minRows}
                onInput={(e) => handleInput(e, field)}
                className={`border-gray-300 bg-gray-50 resize-none transition-all duration-150 ${className}`}
                style={{ overflow: 'hidden' }}
                {...field}
              />
            </FormControl>
            {/* Ultra minimal space for error message */}
            <div className=" mt-2">
              <FormMessage className="text-sm text-primary leading-none" />
            </div>
          </div>
        </FormItem>
      )}
    />
  )
}
