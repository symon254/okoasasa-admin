import React, { useState } from 'react'
import { CalendarPrimIcon } from '@/assets/icons'

const DateRangeFilter = ({ 
  onDateRangeChange, 
  onApply, 
  onClear, 
  mode = 'range', // 'range' or 'single'
  placeholder = 'Select date range'
}) => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [singleDate, setSingleDate] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleApply = () => {
    if (mode === 'range') {
      if (startDate && endDate) {
        onDateRangeChange({ startDate, endDate })
        onApply?.({ startDate, endDate })
        setIsOpen(false)
      }
    } else {
      if (singleDate) {
        onDateRangeChange({ startDate: singleDate, endDate: singleDate })
        onApply?.({ startDate: singleDate, endDate: singleDate })
        setIsOpen(false)
      }
    }
  }

  const handleClear = () => {
    if (mode === 'range') {
      setStartDate('')
      setEndDate('')
    } else {
      setSingleDate('')
    }
    onDateRangeChange({ startDate: '', endDate: '' })
    onClear?.()
    setIsOpen(false)
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const getDisplayText = () => {
    if (mode === 'range') {
      if (startDate && endDate) {
        // Format as "DD/MM/YYYY - DD/MM/YYYY" on one line
        return `${formatDate(startDate)} - ${formatDate(endDate)}`
      }
      return placeholder
    } else {
      return singleDate ? formatDate(singleDate) : 'Select date'
    }
  }

  const isApplyDisabled = mode === 'range' 
    ? !startDate || !endDate 
    : !singleDate

  return (
    <div className="relative w-full">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-11 border cursor-pointer flex justify-between items-center px-4 py-3 bg-white rounded-lg w-full hover:border-gray-400 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <CalendarPrimIcon />
          <span className="font-medium text-sm text-[#252525] whitespace-nowrap overflow-hidden text-ellipsis">
            {getDisplayText()}
          </span>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path
            d="M10.0003 13.9995C9.41693 13.9995 8.83359 13.7745 8.39193 13.3329L2.95859 7.89954C2.71693 7.65788 2.71693 7.25788 2.95859 7.01621C3.20026 6.77454 3.60026 6.77454 3.84193 7.01621L9.27526 12.4495C9.67526 12.8495 10.3253 12.8495 10.7253 12.4495L16.1586 7.01621C16.4003 6.77454 16.8003 6.77454 17.0419 7.01621C17.2836 7.25788 17.2836 7.65788 17.0419 7.89954L11.6086 13.3329C11.1669 13.7745 10.5836 13.9995 10.0003 13.9995Z"
            fill="#252525"
          />
        </svg>
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-lg z-50 p-4">
          <div className="space-y-4">
            {mode === 'range' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full h-11 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate}
                    className="w-full h-11 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={singleDate}
                  onChange={(e) => setSingleDate(e.target.value)}
                  className="w-full h-11 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            )}
            
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleApply}
                disabled={isApplyDisabled}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Apply
              </button>
              <button
                onClick={handleClear}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DateRangeFilter