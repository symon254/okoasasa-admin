import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2 } from 'lucide-react'

export function FormSelect({
  control,
  name,
  label,
  placeholder,
  options = [],
  icon: Icon,
  className = '',
  disabled = false,
  isLoading = false,
}) {
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
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={disabled || isLoading}
              >
                <div className={`relative ${className}`}>
                  {/* Show loading spinner or regular icon */}
                  {isLoading ? (
                    <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10 pointer-events-none animate-spin" />
                  ) : Icon ? (
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10 pointer-events-none" />
                  ) : null}
                  
                  <SelectTrigger
                    className={`${Icon || isLoading ? 'pl-10' : 'pl-4'} py-3.5 h-11 w-full bg-gray-50 ${
                      fieldState.error
                        ? 'border-primary'
                        : 'border-gray-300'
                    } ${isLoading ? 'cursor-wait opacity-60' : ''}`}
                  >
                    <SelectValue 
                      placeholder={isLoading ? 'Loading...' : placeholder} 
                    />
                  </SelectTrigger>
                </div>
                <SelectContent className="bg-white gap-0.5 rounded-lg border border-gray-200 p-1 shadow-lg">
                  {isLoading ? (
                    <div className="px-4 py-6 text-center text-gray-500 text-sm">
                      <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
                      Loading options...
                    </div>
                  ) : options.length === 0 ? (
                    <div className="px-4 py-6 text-center text-gray-500 text-sm">
                      No options available
                    </div>
                  ) : (
                    options.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="px-4 py-3 cursor-pointer rounded-2xl data-[state=checked]:bg-orange-50 data-[state=checked]:text-primary data-[state=checked]:font-medium hover:bg-gray-50 relative data-[state=checked]:pr-10"
                      >
                        {option.label}
                        <span className="hidden data-[state=checked]:inline absolute right-4 top-1/2 -translate-y-1/2 text-primary font-bold">
                          ✓
                        </span>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </FormControl>
            {/* Ultra minimal space for error message */}
            <div className="mt-2">
              <FormMessage className="text-sm text-primary leading-none" />
            </div>
          </div>
        </FormItem>
      )}
    />
  )
}