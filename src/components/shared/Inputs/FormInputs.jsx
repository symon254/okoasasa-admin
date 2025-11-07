import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export function FormInput({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  icon: Icon,
  className = '',
  disabled = false,
  numbersOnly = false,
}) {
  const handleNumberInput = (e, field) => {
    // Allow only numbers
    const value = e.target.value.replace(/[^0-9]/g, '')
    field.onChange(value)
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
                  type={type}
                  placeholder={placeholder}
                  disabled={disabled}
                  className={`${Icon ? 'pl-10' : 'pl-4'} h-11 bg-gray-50  ${
                    fieldState.error ? 'border-primary ' : 'border-gray-300'
                  } ${className}`}
                  {...field}
                  onChange={
                    numbersOnly
                      ? (e) => handleNumberInput(e, field)
                      : field.onChange
                  }
                  value={field.value}
                />
              </div>
            </FormControl>
            {/* Minimal space for error message */}
            <div className=" mt-2">
              <FormMessage className="text-sm text-primary leading-none" />
            </div>
          </div>
        </FormItem>
      )}
    />
  )
}
