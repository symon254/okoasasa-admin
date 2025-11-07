import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export function PhoneInput({
  control,
  name,
  label,
  placeholder = '+254712345678 or 0712345678',
  icon: Icon,
  className = '',
  disabled = false,
}) {
  const handlePhoneChange = (e, field) => {
    const value = e.target.value

    // Allow only + symbol, numbers, and handle backspace
    const filteredValue = value
      .split('')
      .filter((char, index) => {
        // Allow + only at the beginning
        if (char === '+') return index === 0
        // Allow only numbers
        return /\d/.test(char)
      })
      .join('')

    // Enforce maximum length based on format
    let maxLength
    if (filteredValue.startsWith('+254')) {
      maxLength = 13 // +254 + 9 digits
    } else if (filteredValue.startsWith('0')) {
      maxLength = 10 // 0 + 9 digits
    } else {
      // Allow typing to begin
      maxLength = 13
    }

    const finalValue = filteredValue.slice(0, maxLength)
    field.onChange(finalValue)
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
              <div className="relative">
                {Icon && (
                  <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                )}
                <Input
                  type="text"
                  placeholder={placeholder}
                  disabled={disabled}
                  className={`${Icon ? 'pl-10' : 'pl-4'} h-11 bg-gray-50 ${
                    fieldState.error
                      ? 'border-primary '
                      : 'border-gray-300'
                  } ${className}`}
                  value={field.value}
                  onChange={(e) => handlePhoneChange(e, field)}
                  onBlur={field.onBlur}
                  name={field.name}
                />
              </div>
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
