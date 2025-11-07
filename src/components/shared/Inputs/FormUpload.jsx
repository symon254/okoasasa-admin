import React, { useState } from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

export function FileUpload({
  control,
  name,
  label,
  accept = ".pdf,.jpg,.jpeg,.png",
  placeholder = "Document Type",
  className = "",
  disabled = false,
}) {
  const [fileName, setFileName] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e, field) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      setUploadProgress(0)

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsUploading(false)
            setFileName(file.name)
            field.onChange(file)
            return 100
          }
          return prev + 10
        })
      }, 100)
    }
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
                <input
                  type="file"
                  id={`${name}-upload`}
                  className="hidden"
                  accept={accept}
                  onChange={(e) => handleFileChange(e, field)}
                  disabled={disabled}
                />
                <label
                  htmlFor={`${name}-upload`}
                  className={`flex items-center justify-between h-11 bg-gray-50 px-4 border rounded-lg cursor-pointer hover:bg-gray-100 transition-colors ${
                    fieldState.error
                      ? 'border-primary focus-visible:ring-primary'
                      : 'border-gray-300'
                  } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
                >
                  <span
                    className={`text-sm ${fileName ? 'text-gray-900' : 'text-gray-400'}`}
                  >
                    {fileName || placeholder}
                  </span>

                  <div className="flex items-center gap-2">
                    {/* Progress Bar */}
                    {isUploading && (
                      <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-orange-500 to-red-500 transition-all duration-300 ease-out"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    )}

                    {/* Upload Icon */}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.50003 14.7917C7.15837 14.7917 6.87503 14.5084 6.87503 14.1667V10.6751L6.27503 11.2751C6.03337 11.5167 5.63337 11.5167 5.3917 11.2751C5.15003 11.0334 5.15003 10.6334 5.3917 10.3917L7.05837 8.72507C7.23337 8.55007 7.50837 8.49174 7.7417 8.59174C7.97503 8.68341 7.97503 8.68341 8.12503 9.16674V14.1667C8.12503 14.5084 7.8417 14.7917 7.50003 14.7917Z"
                        fill="#A0A4AC"
                      />
                      <path
                        d="M9.16654 11.4585C9.0082 11.4585 8.84987 11.4002 8.72487 11.2752L7.0582 9.60853C6.81654 9.36686 6.81654 8.96686 7.0582 8.7252C7.29987 8.48353 7.69987 8.48353 7.94154 8.7252L9.6082 10.3919C9.84987 10.6335 9.84987 11.0335 9.6082 11.2752C9.4832 11.4002 9.32487 11.4585 9.16654 11.4585Z"
                        fill="#A0A4AC"
                      />
                      <path
                        d="M12.4998 18.9582H7.4998C2.97484 18.9582 1.0415 17.0248 1.0415 12.4998V7.49984C1.0415 2.97484 2.97484 1.0415 7.4998 1.0415H11.6665C12.0082 1.0415 12.2915 1.32484 12.2915 1.6665C12.2915 2.00817 12.0082 2.2915 11.6665 2.2915H7.4998C3.65817 2.2915 2.2915 3.65817 2.2915 7.49984V12.4998C2.2915 16.3415 3.65817 17.7082 7.4998 17.7082H12.4998C16.3415 17.7082 17.7082 16.3415 17.7082 12.4998V8.33317C17.7082 7.9915 17.9915 7.70817 18.3332 7.70817C18.6748 7.70817 18.9582 7.9915 18.9582 8.33317V12.4998C18.9582 17.0248 17.0248 18.9582 12.4998 18.9582Z"
                        fill="#A0A4AC"
                      />
                      <path
                        d="M18.3332 8.9584H14.9998C12.1498 8.9584 11.0415 7.85007 11.0415 5.00007V1.66674C11.0415 1.41674 11.1915 1.18341 11.4248 1.09174C11.6582 0.991739 11.9248 1.05007 12.1082 1.22507L18.7748 7.89174C18.9498 8.06674 19.0082 8.34174 18.9082 8.57507C18.8082 8.8084 18.5832 8.9584 18.3332 8.9584ZM12.2915 3.17507V5.00007C12.2915 7.15007 12.8498 7.70841 14.9998 7.70841H16.8248L12.2915 3.17507Z"
                        fill="#A0A4AC"
                      />
                    </svg>
                  </div>
                </label>
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