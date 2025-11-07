import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Slider } from '@/components/ui/slider'

export function RepaymentPeriodSlider({
  control,
  name,
  label = "",
  min = 6,
  max = 24,
  defaultValue = 13,
}) {
  const handleSliderChange = (value, field) => {
    field.onChange(value[0])
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="relative">
          <div className="flex flex-col">
            <FormControl>
              <div>
                {/* Header with current value badge */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-base font-medium text-gray-900">
                    {label}
                  </p>
                  <div className="flex flex-row justify-center items-center px-3.5 py-2.5 gap-2.5 w-[104px] h-[38px] border border-[#F47120] rounded-full">
                    <p className="text-sm font-normal text-center text-[#333333]">
                      {field.value ?? defaultValue} Months
                    </p>
                  </div>
                  <div className="w-[104px]"></div>
                </div>

                {/* Slider section */}
                <div className="flex items-center mt-2 gap-1.5 sm:gap-2.5 -mx-2 px-2">
                  <span className="text-base font-normal leading-[140%] capitalize text-[#252525] whitespace-nowrap">
                    Min {min}
                  </span>
                  <div className="relative mt-0.5 flex-1 min-w-0">
                    <Slider
                      value={[field.value ?? defaultValue]}
                      onValueChange={(value) => handleSliderChange(value, field)}
                      min={min}
                      max={max}
                      step={1}
                      className="w-full [&_[data-slot=slider-track]]:h-3.5 [&_[data-slot=slider-track]]:rounded-full [&_[data-slot=slider-track]]:border [&_[data-slot=slider-track]]:border-black/[0.06] [&_[data-slot=slider-track]]:bg-[#F5F5F5] [&_[data-slot=slider-range]]:bg-gradient-to-b [&_[data-slot=slider-range]]:from-[#F8971D] [&_[data-slot=slider-range]]:to-[#EE3124] [&_[data-slot=slider-thumb]]:size-5 [&_[data-slot=slider-thumb]]:border [&_[data-slot=slider-thumb]]:border-black/15 [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:shadow-[0_6px_14px_0_rgba(0,0,0,0.15)]"
                    />
                  </div>
                  <span className="text-base font-normal leading-[140%] capitalize text-[#252525] whitespace-nowrap">
                    Max {max}
                  </span>
                </div>
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