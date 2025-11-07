import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const parseCurrencyValue = (value) => {
  if (!value) return 0
  const numericValue = Number(value.toString().replace(/[^\d.]/g, ''))
  return Number.isNaN(numericValue) ? 0 : numericValue
}

const formatCurrencyInputValue = (value) => {
  if (!value) return ''

  let numericString = value.toString().replace(/[^\d.]/g, '')

  const parts = numericString.split('.')
  if (parts.length > 2) {
    numericString = parts[0] + '.' + parts.slice(1).join('')
  }

  if (parts.length === 2 && parts[1].length > 2) {
    numericString = parts[0] + '.' + parts[1].substring(0, 2)
  }

  if (!numericString) return ''

  const [integerPart, decimalPart] = numericString.split('.')

  const formattedInteger = integerPart
    ? new Intl.NumberFormat('en-KE').format(Number(integerPart))
    : ''

  if (decimalPart !== undefined) {
    return formattedInteger + '.' + decimalPart
  }

  return formattedInteger
}

export function AmountInput({
  control,
  name,
  label,
  placeholder,
  icon: Icon,
  className = '',
  disabled = false,
}) {
  const handleInputChange = (value, onChange) => {
    const stringValue = value?.toString() || ''
    onChange(formatCurrencyInputValue(stringValue))
  }

  const getInputValue = (fieldValue) => {
    return fieldValue?.toString() || ''
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
                      ? 'border-primary focus-visible:ring-primary'
                      : 'border-gray-300'
                  } ${className}`}
                  value={getInputValue(field.value)}
                  onChange={(event) =>
                    handleInputChange(event.target.value, field.onChange)
                  }
                  onBlur={field.onBlur}
                />
              </div>
            </FormControl>
            <div className="mt-2">
              <FormMessage className="text-sm text-primary leading-none" />
            </div>
          </div>
        </FormItem>
      )}
    />
  )
}

export { parseCurrencyValue, formatCurrencyInputValue }
