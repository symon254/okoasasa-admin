import { useState, useCallback } from 'react'

export const useTableFilters = (initialFilters = {}) => {
  const [filters, setFilters] = useState(initialFilters)
  const [activeFilters, setActiveFilters] = useState([])

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  const updateActiveFilters = useCallback((newFilters) => {
    const newActiveFilters = []

    // Status filter
    if (newFilters.status) {
      newActiveFilters.push({
        id: 'status',
        label: 'Status',
        value: newFilters.status,
      })
    }

    // Amount range filters
    if (newFilters.minAmount) {
      newActiveFilters.push({
        id: 'minAmount',
        label: 'Min Amount',
        value: `${newFilters.minAmount} KES`,
      })
    }

    if (newFilters.maxAmount) {
      newActiveFilters.push({
        id: 'maxAmount',
        label: 'Max Amount',
        value: `${newFilters.maxAmount} KES`,
      })
    }

    // Date range filter
    if (newFilters.dateRange?.startDate && newFilters.dateRange?.endDate) {
      newActiveFilters.push({
        id: 'dateRange',
        label: 'Date Range',
        value: `${formatDate(newFilters.dateRange.startDate)} - ${formatDate(newFilters.dateRange.endDate)}`,
      })
    }

    // Single date filter
    if (newFilters.singleDate) {
      newActiveFilters.push({
        id: 'singleDate',
        label: 'Specific Date',
        value: formatDate(newFilters.singleDate),
      })
    }

    // Employer filter
    if (newFilters.employer) {
      newActiveFilters.push({
        id: 'employer',
        label: 'Employer',
        value: newFilters.employer,
      })
    }

    // Device filter
    if (newFilters.device) {
      newActiveFilters.push({
        id: 'device',
        label: 'Device',
        value: newFilters.device,
      })
    }

    // Custom filters - add any additional filters here
    Object.keys(newFilters).forEach(key => {
      if (!['status', 'minAmount', 'maxAmount', 'dateRange', 'singleDate', 'employer', 'device'].includes(key) && newFilters[key]) {
        newActiveFilters.push({
          id: key,
          label: key.charAt(0).toUpperCase() + key.slice(1),
          value: newFilters[key],
        })
      }
    })

    setActiveFilters(newActiveFilters)
  }, [])

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters)
    updateActiveFilters(newFilters)
  }, [updateActiveFilters])

  const removeFilter = useCallback((filterId) => {
    const newFilters = { ...filters }
    
    switch (filterId) {
      case 'status':
        newFilters.status = ''
        break
      case 'minAmount':
        newFilters.minAmount = ''
        break
      case 'maxAmount':
        newFilters.maxAmount = ''
        break
      case 'dateRange':
        newFilters.dateRange = { startDate: '', endDate: '' }
        break
      case 'singleDate':
        newFilters.singleDate = ''
        break
      case 'employer':
        newFilters.employer = ''
        break
      case 'device':
        newFilters.device = ''
        break
      default:
        // Handle custom filters
        newFilters[filterId] = ''
    }

    setFilters(newFilters)
    updateActiveFilters(newFilters)
  }, [filters, updateActiveFilters])

  const clearAllFilters = useCallback(() => {
    const clearedFilters = Object.keys(filters).reduce((acc, key) => {
      if (typeof filters[key] === 'object' && filters[key] !== null) {
        acc[key] = Object.keys(filters[key]).reduce((childAcc, childKey) => {
          childAcc[childKey] = ''
          return childAcc
        }, {})
      } else {
        acc[key] = ''
      }
      return acc
    }, {})

    setFilters(clearedFilters)
    setActiveFilters([])
  }, [filters])

  return {
    filters,
    activeFilters,
    setFilters: handleFiltersChange,
    removeFilter,
    clearAllFilters,
    updateActiveFilters
  }
}