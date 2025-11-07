import React from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

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

const parseCurrencyValue = (value) => {
  if (!value) return 0
  const numericValue = Number(value.toString().replace(/[^\d.]/g, ''))
  return Number.isNaN(numericValue) ? 0 : numericValue
}

export function FilterInput({
  value,
  onChange,
  placeholder,
  type = 'text',
  icon: Icon,
  className = '',
  disabled = false,
  numbersOnly = false,
  currencyFormat = false,
  size = 'md',
}) {
  const handleInputChange = (e) => {
    let newValue = e.target.value
    
    if (numbersOnly) {
      newValue = newValue.replace(/[^\d]/g, '')
    } else if (currencyFormat) {
      newValue = formatCurrencyInputValue(newValue)
    }
    
    onChange(newValue)
  }

  const getDisplayValue = () => {
    if (currencyFormat && value) {
      return formatCurrencyInputValue(value)
    }
    return value
  }

  const sizeClasses = {
    sm: 'h-8 text-sm px-3',
    md: 'h-11 text-base px-4',
    lg: 'h-12 text-lg px-4'
  }

  return (
    <div className="relative flex-1">
      <div className="relative">
        {Icon && (
          <Icon className={cn(
            "absolute top-1/2 -translate-y-1/2 text-gray-400",
            size === 'sm' ? 'left-2 w-3 h-3' : 'left-3 w-4 h-4'
          )} />
        )}
        <Input
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          value={getDisplayValue()}
          onChange={handleInputChange}
          className={cn(
            Icon ? (size === 'sm' ? 'pl-7' : 'pl-10') : '',
            sizeClasses[size],
            'w-full bg-white border border-[#E8ECF4] text-[#686869]',
            'transition-colors focus:border-[#F8971D] focus:ring-2 focus:ring-[#F8971D]/20 focus:text-[#252525]',
            'rounded-[12px] font-medium leading-[1.4] font-["Public_Sans"]',
            className
          )}
        />
      </div>
    </div>
  )
}

// Specialized filter input components
export function PriceFilterInput({ value, onChange, placeholder = 'Min', ...props }) {
  return (
    <FilterInput
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      numbersOnly={true}
      size="sm"
      {...props}
    />
  )
}

export function CurrencyFilterInput({ value, onChange, placeholder, ...props }) {
  return (
    <FilterInput
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      currencyFormat={true}
      {...props}
    />
  )
}

export function TextFilterInput({ value, onChange, placeholder, ...props }) {
  return (
    <FilterInput
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  )
}

export { parseCurrencyValue, formatCurrencyInputValue }