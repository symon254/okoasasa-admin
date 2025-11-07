import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function CustomSelect({
  icon: Icon,
  placeholder,
  options = [],
  onValueChange,
  value,
  className = '',
}) {
  return (
    <Select onValueChange={onValueChange} value={value}>
      <div className={`relative ${className}`}>
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10 pointer-events-none" />
        )}
        <SelectTrigger
          className={`${Icon ? 'pl-10' : 'pl-4'} py-3.5 h-11 w-full border-gray-300 bg-gray-50`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </div>
      <SelectContent className="bg-white gap-0.5 rounded-lg border border-gray-200 p-1 shadow-lg">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="px-4 py-3 cursor-pointer rounded-2xl data-[state=checked]:bg-orange-50 data-[state=checked]:text-orange-500 data-[state=checked]:font-medium hover:bg-gray-50 relative data-[state=checked]:pr-10"
          >
            {option.label}
            <span className="hidden data-[state=checked]:inline absolute right-4 top-1/2 -translate-y-1/2 text-orange-500 font-bold">
              ✓
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
