import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { X } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Slider } from '@/components/ui/slider'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Link, useLocation } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  CurrencyFilterInput,
  formatCurrencyInputValue,
  parseCurrencyValue,
} from '../Inputs/FormFilter'
import { DEFAULT_FILTER_VALUES } from '@/constants/filterDefaults'

const SORT_OPTIONS = [
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'name-ascending', label: 'Name Ascending' },
  { value: 'name-descending', label: 'Name Descending' },
]

const DEFAULT_OPTIONS = {
  price: { min: 0, max: 200000 },
  ...DEFAULT_FILTER_VALUES,
}

const FILTER_CATEGORIES = [
  'category',
  'brand',
  'color',
  'storage',
  'camera',
  'display',
  'ram',
]

const CATEGORY_LABELS = {
  category: 'Category',
  brand: 'Brand',
  color: 'Color',
  storage: 'Storage Capacity',
  camera: 'Camera Megapixel',
  display: 'Display Size',
  ram: 'RAM',
}

const MAX_VISIBLE_CHIPS = 3

const FilterIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 6.5H16"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 6.5H2"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 10C11.933 10 13.5 8.433 13.5 6.5C13.5 4.567 11.933 3 10 3C8.067 3 6.5 4.567 6.5 6.5C6.5 8.433 8.067 10 10 10Z"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 17.5H18"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 17.5H2"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 21C15.933 21 17.5 19.433 17.5 17.5C17.5 15.567 15.933 14 14 14C12.067 14 10.5 15.567 10.5 17.5C10.5 19.433 12.067 21 14 21Z"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_filterbar_check)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.6599 4.55417C17.8161 4.71044 17.9039 4.92237 17.9039 5.14334C17.9039 5.36431 17.8161 5.57623 17.6599 5.7325L8.29158 15.1017C8.20646 15.1868 8.10539 15.2544 7.99414 15.3005C7.8829 15.3466 7.76366 15.3703 7.64325 15.3703C7.52284 15.3703 7.4036 15.3466 7.29236 15.3005C7.18111 15.2544 7.08004 15.1868 6.99492 15.1017L2.33992 10.4467C2.26249 10.3692 2.20107 10.2773 2.15917 10.1762C2.11727 10.075 2.0957 9.96658 2.0957 9.85709C2.0957 9.74759 2.11727 9.63917 2.15917 9.53801C2.20107 9.43684 2.26249 9.34493 2.33992 9.2675C2.41734 9.19008 2.50926 9.12866 2.61042 9.08676C2.71158 9.04486 2.82 9.02329 2.9295 9.02329C3.039 9.02329 3.14742 9.04486 3.24858 9.08676C3.34974 9.12866 3.44166 9.19008 3.51908 9.2675L7.64408 13.3925L16.4808 4.55417C16.637 4.39794 16.8489 4.31018 17.0699 4.31018C17.2909 4.31018 17.5036 4.39794 17.6599 4.55417Z"
        fill="#F47120"
      />
    </g>
    <defs>
      <clipPath id="clip0_filterbar_check">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const ArrowDownIcon = ({ className = '' }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M13.2802 10.0333L8.93355 5.68667C8.42021 5.17333 7.58021 5.17333 7.06688 5.68667L2.72021 10.0333"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CheckedCheckboxIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.4915 1.66666H6.50817C3.47484 1.66666 1.6665 3.475 1.6665 6.50833V13.4833C1.6665 16.525 3.47484 18.3333 6.50817 18.3333H13.4832C16.5165 18.3333 18.3248 16.525 18.3248 13.4917V6.50833C18.3332 3.475 16.5248 1.66666 13.4915 1.66666ZM13.9832 8.08333L9.25817 12.8083C9.1415 12.925 8.98317 12.9917 8.8165 12.9917C8.64984 12.9917 8.4915 12.925 8.37484 12.8083L6.0165 10.45C5.77484 10.2083 5.77484 9.80833 6.0165 9.56666C6.25817 9.325 6.65817 9.325 6.89984 9.56666L8.8165 11.4833L13.0998 7.2C13.3415 6.95833 13.7415 6.95833 13.9832 7.2C14.2248 7.44166 14.2248 7.83333 13.9832 8.08333Z"
      fill="#1C8546"
    />
  </svg>
)

const UncheckedCheckboxIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.4998 18.9583H7.49984C2.97484 18.9583 1.0415 17.025 1.0415 12.5V7.5C1.0415 2.975 2.97484 1.04166 7.49984 1.04166H12.4998C17.0248 1.04166 18.9582 2.975 18.9582 7.5V12.5C18.9582 17.025 17.0248 18.9583 12.4998 18.9583ZM7.49984 2.29166C3.65817 2.29166 2.2915 3.65833 2.2915 7.5V12.5C2.2915 16.3417 3.65817 17.7083 7.49984 17.7083H12.4998C16.3415 17.7083 17.7082 16.3417 17.7082 12.5V7.5C17.7082 3.65833 16.3415 2.29166 12.4998 2.29166H7.49984Z"
      fill="#A0A4AC"
    />
  </svg>
)

const FilterSection = ({ title, children, isOpen, onToggle }) => (
  <div className="flex flex-col items-start gap-3 self-stretch">
    <button
      onClick={onToggle}
      className="flex items-center justify-between self-stretch"
    >
      <span className="font-['Public_Sans'] text-sm font-medium leading-[140%] text-black">
        {title}
      </span>
      <ArrowDownIcon
        className={`transition-transform duration-200 ${isOpen ? '' : 'rotate-180'}`}
      />
    </button>
    {isOpen && children}
  </div>
)

const FilterCheckboxItem = ({ label, checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className="cursor-pointer flex items-center justify-center gap-2 self-stretch rounded-lg px-2 py-1 "
  >
    {checked ? <CheckedCheckboxIcon /> : <UncheckedCheckboxIcon />}
    <span className="flex-1 text-left font-['Public_Sans'] text-sm font-medium leading-[140%] text-[#252525]">
      {label}
    </span>
  </button>
)

const ShowMoreButton = ({ category, isExpanded, totalCount, onToggle }) => {
  const limit = 5
  if (totalCount <= limit) return null

  const remainingCount = Math.max(0, totalCount - limit)

  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-[#F9FAFB]"
      aria-expanded={isExpanded}
      aria-controls={`${category}-filters`}
    >
      <span className="text-sm font-medium text-[#F47120]">
        {isExpanded ? '− Show Less' : `+ Show More (${remainingCount} more)`}
      </span>
    </button>
  )
}

const SelectedFilterChip = ({ label, onRemove }) => (
  <div className="flex items-center gap-2 rounded-3xl bg-[#F9FAFB] px-3 py-1.5 md:px-4 md:py-2">
    <span className="text-sm font-normal capitalize text-black md:text-base">
      {label}
    </span>
    <button
      onClick={onRemove}
      className="flex items-center justify-center"
      aria-label={`Remove ${label}`}
    >
      <X className="h-5 w-5 text-[#09244B] md:h-6 md:w-6" />
    </button>
  </div>
)

const uniqueList = (items = []) =>
  Array.from(new Set(items.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' }),
  )

const buildToggleState = (items) =>
  items.reduce((acc, item) => ({ ...acc, [item]: false }), {})

const buildToggleStateFromSelection = (items, selected = []) =>
  items.reduce((acc, item) => ({ ...acc, [item]: selected.includes(item) }), {})

const areFilterStatesEqual = (a, b, categories) => {
  if (!a || !b) return false
  if (
    a.priceRange[0] !== b.priceRange[0] ||
    a.priceRange[1] !== b.priceRange[1]
  ) {
    return false
  }
  if (a.priceMin !== b.priceMin || a.priceMax !== b.priceMax) {
    return false
  }
  return categories.every((category) => {
    const aEntries = a[category] ?? {}
    const bEntries = b[category] ?? {}
    const keys = new Set([...Object.keys(aEntries), ...Object.keys(bEntries)])
    for (const key of keys) {
      if (!!aEntries[key] !== !!bEntries[key]) {
        return false
      }
    }
    return true
  })
}

const buildDefaultFilters = (options) => ({
  priceRange: [options.price.min, options.price.max],
  priceMin: `${options.price.min}`,
  priceMax: `${options.price.max}`,
  category: buildToggleState(options.category),
  brand: buildToggleState(options.brand),
  color: buildToggleState(options.color),
  storage: buildToggleState(options.storage),
  camera: buildToggleState(options.camera),
  display: buildToggleState(options.display),
  ram: buildToggleState(options.ram),
})

const toSelectedList = (filtersState, category) =>
  Object.entries(filtersState?.[category] ?? {})
    .filter(([, isSelected]) => isSelected)
    .map(([value]) => value)

const buildSelectedFiltersPayload = (filtersState) => {
  if (!filtersState) {
    return {
      priceRange: [DEFAULT_OPTIONS.price.min, DEFAULT_OPTIONS.price.max],
      brand: [],
      color: [],
      storage: [],
      camera: [],
      display: [],
      ram: [],
    }
  }

  return {
    priceRange: filtersState.priceRange,
    category: toSelectedList(filtersState, 'category'),
    brand: toSelectedList(filtersState, 'brand'),
    color: toSelectedList(filtersState, 'color'),
    storage: toSelectedList(filtersState, 'storage'),
    camera: toSelectedList(filtersState, 'camera'),
    display: toSelectedList(filtersState, 'display'),
    ram: toSelectedList(filtersState, 'ram'),
  }
}

const buildFiltersStateFromSelection = (selection, options) => {
  const priceMinValue = selection?.priceRange?.[0] ?? options.price.min
  const priceMaxValue = selection?.priceRange?.[1] ?? options.price.max

  const clampedMin = Math.max(
    options.price.min,
    Math.min(priceMinValue, options.price.max),
  )
  const clampedMax = Math.max(
    clampedMin,
    Math.min(priceMaxValue, options.price.max),
  )

  return {
    priceRange: [clampedMin, clampedMax],
    priceMin: `${clampedMin}`,
    priceMax: `${clampedMax}`,
    brand: buildToggleStateFromSelection(options.brand, selection?.brand ?? []),
    color: buildToggleStateFromSelection(options.color, selection?.color ?? []),
    storage: buildToggleStateFromSelection(
      options.storage,
      selection?.storage ?? [],
    ),
    camera: buildToggleStateFromSelection(
      options.camera,
      selection?.camera ?? [],
    ),
    display: buildToggleStateFromSelection(
      options.display,
      selection?.display ?? [],
    ),
    ram: buildToggleStateFromSelection(options.ram, selection?.ram ?? []),
    category: buildToggleStateFromSelection(
      options.category,
      selection?.category ?? [],
    ),
  }
}

export function FilterBar({
  className = '',
  onLoanCalculatorOpen,
  onFiltersChange,
  onSortChange,
  initialSort = 'price-low-high',
  options = DEFAULT_OPTIONS,
  selectedFilters,
  selectedSort,
  loanLimit,
  onLoanLimitClear,
  isLoanCalculatorOpen = false,
}) {
  const [isOpen, setIsOpen] = useState(false)

  const normalizedOptions = useMemo(() => {
    const priceMin = options?.price?.min ?? DEFAULT_OPTIONS.price.min
    const priceMaxRaw = options?.price?.max ?? DEFAULT_OPTIONS.price.max
    const priceMax = priceMaxRaw < priceMin ? priceMin : priceMaxRaw

    return {
      price: { min: priceMin, max: priceMax },
      category: uniqueList([
        ...(DEFAULT_FILTER_VALUES.category ?? []),
        ...(options?.category ?? []),
      ]),
      brand: uniqueList([
        ...(DEFAULT_FILTER_VALUES.brand ?? []),
        ...(options?.brand ?? []),
      ]),
      color: uniqueList([
        ...(DEFAULT_FILTER_VALUES.color ?? []),
        ...(options?.color ?? []),
      ]),
      storage: uniqueList([
        ...(DEFAULT_FILTER_VALUES.storage ?? []),
        ...(options?.storage ?? []),
      ]),
      camera: uniqueList([
        ...(DEFAULT_FILTER_VALUES.camera ?? []),
        ...(options?.camera ?? []),
      ]),
      display: uniqueList([
        ...(DEFAULT_FILTER_VALUES.display ?? []),
        ...(options?.display ?? []),
      ]),
      ram: uniqueList([
        ...(DEFAULT_FILTER_VALUES.ram ?? []),
        ...(options?.ram ?? []),
      ]),
    }
  }, [options])

  const [filters, setFilters] = useState(() =>
    buildFiltersStateFromSelection(selectedFilters, normalizedOptions),
  )
  const [expandedCategories, setExpandedCategories] = useState({
    color: false,
    storage: false,
    camera: false,
    display: false,
    ram: false,
    category: false,
    brand: false,
  })
  const [selectedPaymentType, setSelectedPaymentType] = useState('basic')
  const validInitialSort = SORT_OPTIONS.some(
    (item) => item.value === initialSort,
  )
    ? initialSort
    : SORT_OPTIONS[0].value
  const [sortSelection, setSortSelection] = useState(validInitialSort)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [openSections, setOpenSections] = useState({
    price: true,
    color: true,
    storage: true,
    camera: true,
    display: true,
    ram: true,
    category: true,
    brand: true,
  })
  const location = useLocation()
  const pathname = location?.pathname ?? ''
  const isFaqRouteActive = pathname.toLowerCase().startsWith('/faqs')

  useEffect(() => {
    const nextFilters = buildFiltersStateFromSelection(
      selectedFilters,
      normalizedOptions,
    )

    setFilters((prev) =>
      areFilterStatesEqual(prev, nextFilters, FILTER_CATEGORIES)
        ? prev
        : nextFilters,
    )
  }, [normalizedOptions, selectedFilters])

  useEffect(() => {
    const nextSort =
      selectedSort && SORT_OPTIONS.some((item) => item.value === selectedSort)
        ? selectedSort
        : validInitialSort
    setSortSelection(nextSort)
  }, [validInitialSort, selectedSort])

  const handleApplyFilters = useCallback(() => {
    const minBound = normalizedOptions.price.min
    const maxBound = normalizedOptions.price.max

    let minValue = parseCurrencyValue(filters.priceMin || '')
    let maxValue = parseCurrencyValue(filters.priceMax || '')

    if (Number.isNaN(minValue)) minValue = filters.priceRange[0]
    if (Number.isNaN(maxValue)) maxValue = filters.priceRange[1]

    minValue = Math.max(minBound, Math.min(minValue, maxBound))
    maxValue = Math.max(minBound, Math.min(maxValue, maxBound))

    if (minValue > maxValue) {
      ;[minValue, maxValue] = [maxValue, minValue]
    }

    const nextFilters = {
      ...filters,
      priceRange: [minValue, maxValue],
      priceMin: formatCurrencyInputValue(`${minValue}`),
      priceMax: formatCurrencyInputValue(`${maxValue}`),
    }

    setFilters(nextFilters)
    onFiltersChange?.(buildSelectedFiltersPayload(nextFilters))
    setIsFiltersOpen(false)
  }, [
    filters,
    normalizedOptions.price.max,
    normalizedOptions.price.min,
    onFiltersChange,
  ])

  useEffect(() => {
    if (onSortChange) {
      onSortChange(sortSelection)
    }
  }, [sortSelection, onSortChange])

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handlePriceRangeChange = (value) => {
    const [minValue, maxValue] = value
    setFilters((prev) => ({
      ...prev,
      priceRange: [minValue, maxValue],
      priceMin: `${minValue}`,
      priceMax: `${maxValue}`,
    }))
  }

  const handlePriceInputChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCheckboxToggle = (category, value, checked) => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [value]: checked,
      },
    }))
  }

  const handleClearAll = () => {
    const resetState = buildDefaultFilters(normalizedOptions)

    setFilters(resetState)
    onLoanLimitClear?.()
    setExpandedCategories({
      category: false,
      color: false,
      storage: false,
      camera: false,
      display: false,
      ram: false,
      brand: false,
    })
    onFiltersChange?.(buildSelectedFiltersPayload(resetState))
  }

  const getVisibleItems = useCallback(
    (items, category) => {
      const limit = 5
      if (expandedCategories[category] || items.length <= limit) {
        return items
      }

      const selectedEntries = filters[category] ?? {}
      const selectedValues = Object.keys(selectedEntries).filter(
        (value) => selectedEntries[value],
      )

      const baseItems = items.slice(0, limit)
      const merged = [...baseItems]

      selectedValues.forEach((value) => {
        if (!merged.includes(value) && items.includes(value)) {
          merged.push(value)
        }
      })

      return merged
    },
    [expandedCategories, filters],
  )

  const toggleCategoryExpansion = useCallback((category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }, [])

  const activeFilterChips = useMemo(() => {
    const chips = []
    const appliedFilters = selectedFilters ?? {}
    const priceRange = appliedFilters.priceRange ?? [
      normalizedOptions.price.min,
      normalizedOptions.price.max,
    ]
    const [minPrice, maxPrice] = priceRange

    if (
      minPrice > normalizedOptions.price.min ||
      maxPrice < normalizedOptions.price.max
    ) {
      chips.push({
        category: 'price',
        label: `KES ${minPrice.toLocaleString()} - KES ${maxPrice.toLocaleString()}`,
      })
    }

    FILTER_CATEGORIES.forEach((category) => {
      const values = appliedFilters?.[category] ?? []
      values.forEach((value) => {
        chips.push({
          category,
          value,
          label: value,
        })
      })
    })

    if (loanLimit) {
      chips.push({
        category: 'loanLimit',
        value: loanLimit,
        label: `Loan limit ≤ KES ${loanLimit.toLocaleString()}`,
      })
    }

    return chips
  }, [
    normalizedOptions.price.max,
    normalizedOptions.price.min,
    selectedFilters,
    loanLimit,
  ])

  const visibleChips = useMemo(
    () => activeFilterChips.slice(0, MAX_VISIBLE_CHIPS),
    [activeFilterChips],
  )

  const overflowChips = useMemo(
    () => activeFilterChips.slice(MAX_VISIBLE_CHIPS),
    [activeFilterChips],
  )

  const handleRemoveChip = (chip) => {
    if (chip.category === 'loanLimit') {
      onLoanLimitClear?.()
      return
    }

    if (!onFiltersChange) return

    const nextSelected = {
      priceRange: selectedFilters?.priceRange ?? [
        normalizedOptions.price.min,
        normalizedOptions.price.max,
      ],
    }

    FILTER_CATEGORIES.forEach((category) => {
      nextSelected[category] = [...(selectedFilters?.[category] ?? [])]
    })

    if (chip.category === 'price') {
      nextSelected.priceRange = [
        normalizedOptions.price.min,
        normalizedOptions.price.max,
      ]
    } else {
      nextSelected[chip.category] = nextSelected[chip.category].filter(
        (value) => value !== chip.value,
      )
    }

    setFilters(buildFiltersStateFromSelection(nextSelected, normalizedOptions))
  }

  const handleChipRemove = (chip) => {
    if (chip.category === 'loanLimit') {
      onLoanLimitClear?.()
    } else {
      handleRemoveChip(chip)
    }
  }

  const basePillClasses =
    'rounded-3xl px-3 py-1.5 md:px-4 md:py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#F8971D]/40'

  const allFiltersButtonClass = cn(
    'flex items-center gap-2 border',
    basePillClasses,
    isFiltersOpen
      ? 'border-[#F8971D] bg-[#FFF4EE] text-[#F47120] shadow-sm'
      : 'border-transparent bg-[#F9FAFB] text-[#252525] hover:bg-[#F1F5F9] active:bg-[#E6EDF7]',
  )

  const howItWorksLinkClass = cn(
    'group border',
    basePillClasses,
    isFaqRouteActive
      ? 'border-transparent bg-gradient-to-b from-[#F8971D] to-[#EE3124] text-white shadow-sm'
      : 'border-[#F8971D] bg-gradient-to-b from-transparent to-transparent text-[#F47120] hover:bg-[#FFF4EE]',
  )

  const howItWorksTextClass = cn(
    'text-sm font-normal capitalize md:text-base transition-colors',
    isFaqRouteActive
      ? 'text-white'
      : 'bg-gradient-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-transparent group-hover:bg-none group-hover:text-[#F47120]',
  )

  const loanLimitButtonClass = cn(
    'flex items-center gap-2 border',
    basePillClasses,
    isLoanCalculatorOpen
      ? 'border-[#F8971D] bg-[#FFF4EE] text-[#F47120] shadow-sm'
      : 'border-[#E8ECF4] text-[#252525] hover:bg-[#F1F5F9]',
  )

  const sortButtonClass = cn(
    'flex items-center gap-2 border',
    basePillClasses,
    isOpen
      ? 'border-[#F8971D] bg-[#FFF4EE] text-[#F47120] shadow-sm'
      : 'border-[#E8ECF4] text-[#252525] hover:bg-[#F1F5F9]',
  )

  return (
    <div
      className={`flex flex-col gap-4 border-b border-[#E8ECF4] py-4 md:py-6 lg:flex-row lg:items-center lg:justify-between lg:py-8 ${className}`}
    >
      <div className="flex flex-wrap items-center gap-2 md:gap-[26px]">
        <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <PopoverTrigger asChild className="cursor-pointer">
            <button
              className={allFiltersButtonClass}
              aria-pressed={isFiltersOpen}
            >
              <span className="text-sm font-normal capitalize text-black md:text-base">
                All Filters
              </span>
              <FilterIcon />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-[300px] rounded-2xl border-none bg-white p-0 shadow-[0_4px_24px_0_rgba(37,37,37,0.08)]"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-4 pt-4 pb-3">
                <span className="font-['Public_Sans'] text-base font-medium leading-[140%] text-black">
                  Filters
                </span>
                <button
                  onClick={handleClearAll}
                  className="cursor-pointer rounded-3xl border border-transparent px-3 py-1 text-sm font-medium leading-[140%] text-[#F25E5E] transition-colors hover:bg-[#FFF4EE]"
                >
                  Clear
                </button>
              </div>

              {/* Scrollable Content */}
              <ScrollArea className="h-[calc(60vh-72px)] w-full">
                <div className="flex flex-col gap-4 px-4 pb-4">
                 {/* Price Section */}
                 <FilterSection
                   title="Price"
                    isOpen={openSections.price}
                    onToggle={() => toggleSection('price')}
                  >
                    <div className="flex flex-col items-start gap-3 self-stretch">
                      <Slider
                        value={filters.priceRange}
                        min={normalizedOptions.price.min}
                        max={normalizedOptions.price.max}
                        step={1000}
                        onValueChange={handlePriceRangeChange}
                        className="w-full [&_[data-slot=slider-track]]:h-3.5 [&_[data-slot=slider-track]]:rounded-full [&_[data-slot=slider-track]]:border [&_[data-slot=slider-track]]:border-black/[0.06] [&_[data-slot=slider-track]]:bg-[#F5F5F5] [&_[data-slot=slider-range]]:bg-gradient-to-b [&_[data-slot=slider-range]]:from-[#F8971D] [&_[data-slot=slider-range]]:to-[#EE3124] [&_[data-slot=slider-thumb]]:size-5 [&_[data-slot=slider-thumb]]:border [&_[data-slot=slider-thumb]]:border-black/15 [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:shadow-[0_6px_14px_0_rgba(0,0,0,0.15)]"
                      />

                      <div className="flex items-start gap-2 self-stretch">
                        <CurrencyFilterInput
                          value={filters.priceMin}
                          onChange={(value) =>
                            handlePriceInputChange('priceMin', value)
                          }
                          placeholder="KES Min"
                        />
                        <CurrencyFilterInput
                          value={filters.priceMax}
                          onChange={(value) =>
                            handlePriceInputChange('priceMax', value)
                          }
                          placeholder="KES Max"
                        />
                      </div>

                      <div className="h-px self-stretch bg-[#E8ECF4]" />
                    </div>
                  </FilterSection>

                  {/* Category Section */}
                  {normalizedOptions.category.length > 0 && (
                    <FilterSection
                      title={CATEGORY_LABELS.category}
                      isOpen={openSections.category}
                      onToggle={() => toggleSection('category')}
                    >
                      <div
                        id="category-filters"
                        className="flex flex-col items-start gap-3 self-stretch"
                      >
                        {getVisibleItems(
                          normalizedOptions.category,
                          'category',
                        ).map((category) => (
                          <FilterCheckboxItem
                            key={category}
                            label={category}
                            checked={filters.category[category]}
                            onChange={(checked) =>
                              handleCheckboxToggle(
                                'category',
                                category,
                                checked,
                              )
                            }
                          />
                        ))}
                        <ShowMoreButton
                          category="category"
                          isExpanded={expandedCategories.category}
                          totalCount={normalizedOptions.category.length}
                          onToggle={() => toggleCategoryExpansion('category')}
                        />
                        <div className="h-px self-stretch bg-[#E8ECF4]" />
                      </div>
                    </FilterSection>
                  )}

                 {/* Color Section */}
                  {normalizedOptions.color.length > 0 && (
                    <FilterSection
                      title={CATEGORY_LABELS.color}
                      isOpen={openSections.color}
                      onToggle={() => toggleSection('color')}
                    >
                    <div
                      id="color-filters"
                      className="flex flex-col items-start gap-3 self-stretch"
                    >
                      {getVisibleItems(normalizedOptions.color, 'color').map(
                        (color) => (
                          <FilterCheckboxItem
                            key={color}
                            label={color}
                            checked={filters.color[color]}
                            onChange={(checked) =>
                              handleCheckboxToggle('color', color, checked)
                            }
                          />
                        ),
                      )}
                      <ShowMoreButton
                        category="color"
                        isExpanded={expandedCategories.color}
                        totalCount={normalizedOptions.color.length}
                        onToggle={() => toggleCategoryExpansion('color')}
                      />
                      <div className="h-px self-stretch bg-[#E8ECF4]" />
                    </div>
                    </FilterSection>
                  )}

                  {/* Storage Section */}
                  {normalizedOptions.storage.length > 0 && (
                    <FilterSection
                      title={CATEGORY_LABELS.storage}
                      isOpen={openSections.storage}
                      onToggle={() => toggleSection('storage')}
                    >
                    <div
                      id="storage-filters"
                      className="flex flex-col items-start gap-3 self-stretch"
                    >
                      {getVisibleItems(
                        normalizedOptions.storage,
                        'storage',
                      ).map((storage) => (
                        <FilterCheckboxItem
                          key={storage}
                          label={storage}
                          checked={filters.storage[storage]}
                          onChange={(checked) =>
                            handleCheckboxToggle('storage', storage, checked)
                          }
                        />
                      ))}
                      <ShowMoreButton
                        category="storage"
                        isExpanded={expandedCategories.storage}
                        totalCount={normalizedOptions.storage.length}
                        onToggle={() => toggleCategoryExpansion('storage')}
                      />
                      <div className="h-px self-stretch bg-[#E8ECF4]" />
                    </div>
                    </FilterSection>
                  )}

                  {/* Camera Section */}
                  {normalizedOptions.camera.length > 0 && (
                    <FilterSection
                      title={CATEGORY_LABELS.camera}
                      isOpen={openSections.camera}
                      onToggle={() => toggleSection('camera')}
                    >
                    <div
                      id="camera-filters"
                      className="flex flex-col items-start gap-3 self-stretch"
                    >
                      {getVisibleItems(normalizedOptions.camera, 'camera').map(
                        (camera) => (
                          <FilterCheckboxItem
                            key={camera}
                            label={camera}
                            checked={filters.camera[camera]}
                            onChange={(checked) =>
                              handleCheckboxToggle('camera', camera, checked)
                            }
                          />
                        ),
                      )}
                      <ShowMoreButton
                        category="camera"
                        isExpanded={expandedCategories.camera}
                        totalCount={normalizedOptions.camera.length}
                        onToggle={() => toggleCategoryExpansion('camera')}
                      />
                      <div className="h-px self-stretch bg-[#E8ECF4]" />
                    </div>
                    </FilterSection>
                  )}

                  {/* Display Section */}
                  {normalizedOptions.display.length > 0 && (
                    <FilterSection
                      title={CATEGORY_LABELS.display}
                      isOpen={openSections.display}
                      onToggle={() => toggleSection('display')}
                    >
                    <div
                      id="display-filters"
                      className="flex flex-col items-start gap-3 self-stretch"
                    >
                      {getVisibleItems(
                        normalizedOptions.display,
                        'display',
                      ).map((display) => (
                        <FilterCheckboxItem
                          key={display}
                          label={display}
                          checked={filters.display[display]}
                          onChange={(checked) =>
                            handleCheckboxToggle('display', display, checked)
                          }
                        />
                      ))}
                      <ShowMoreButton
                        category="display"
                        isExpanded={expandedCategories.display}
                        totalCount={normalizedOptions.display.length}
                        onToggle={() => toggleCategoryExpansion('display')}
                      />
                      <div className="h-px self-stretch bg-[#E8ECF4]" />
                    </div>
                    </FilterSection>
                  )}

                  {/* RAM Section */}
                  {normalizedOptions.ram.length > 0 && (
                    <FilterSection
                      title={CATEGORY_LABELS.ram}
                      isOpen={openSections.ram}
                      onToggle={() => toggleSection('ram')}
                    >
                    <div
                      id="ram-filters"
                      className="flex flex-col items-start gap-3 self-stretch"
                    >
                      {getVisibleItems(normalizedOptions.ram, 'ram').map(
                        (ram) => (
                          <FilterCheckboxItem
                            key={ram}
                            label={ram}
                            checked={filters.ram[ram]}
                            onChange={(checked) =>
                              handleCheckboxToggle('ram', ram, checked)
                            }
                          />
                        ),
                      )}
                      <ShowMoreButton
                        category="ram"
                        isExpanded={expandedCategories.ram}
                        totalCount={normalizedOptions.ram.length}
                        onToggle={() => toggleCategoryExpansion('ram')}
                      />
                      <div className="h-px self-stretch bg-[#E8ECF4]" />
                    </div>
                    </FilterSection>
                  )}

                  {/* Brand Section */}
                  {normalizedOptions.brand.length > 0 && (
                    <FilterSection
                      title={CATEGORY_LABELS.brand}
                      isOpen={openSections.brand}
                      onToggle={() => toggleSection('brand')}
                    >
                    <div
                      id="brand-filters"
                      className="flex flex-col items-start gap-3 self-stretch"
                    >
                      {getVisibleItems(normalizedOptions.brand, 'brand').map(
                        (brand) => (
                          <FilterCheckboxItem
                            key={brand}
                            label={brand}
                            checked={filters.brand[brand]}
                            onChange={(checked) =>
                              handleCheckboxToggle('brand', brand, checked)
                            }
                          />
                        ),
                      )}
                      <ShowMoreButton
                        category="brand"
                        isExpanded={expandedCategories.brand}
                        totalCount={normalizedOptions.brand.length}
                        onToggle={() => toggleCategoryExpansion('brand')}
                      />
                      <div className="h-px self-stretch bg-[#E8ECF4]" />
                    </div>
                    </FilterSection>
                  )}
                </div>
                <ScrollBar orientation="vertical" />
              </ScrollArea>

              {/* Fixed Footer with Apply Button */}
              <div className="border-t border-[#E8ECF4] bg-white px-4 py-3">
                <Button
                  onClick={handleApplyFilters}
                  variant="gradient"
                  className="w-full flex-1 rounded-3xl px-4 py-3 text-base font-medium leading-[140%] capitalize text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Apply
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {visibleChips.map((chip) => (
          <SelectedFilterChip
            key={`${chip.category}-${chip.label}`}
            label={chip.label}
            onRemove={() => handleChipRemove(chip)}
          />
        ))}

        {overflowChips.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-3xl bg-[#F9FAFB] px-3 py-1.5 text-sm font-medium text-[#252525] outline-none transition-colors hover:bg-[#F1F5F9] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#F8971D]/40">
                View more (+{overflowChips.length})
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-2xl border border-[#E8ECF4] bg-white p-2 shadow-[0_8px_24px_rgba(9,36,75,0.12)]">
              {overflowChips.map((chip) => (
                <DropdownMenuItem
                  key={`${chip.category}-${chip.label}`}
                  onSelect={(event) => {
                    event.preventDefault()
                    handleChipRemove(chip)
                  }}
                  className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm text-[#252525] focus:text-[#252525]"
                >
                  <span className="truncate">{chip.label}</span>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      handleChipRemove(chip)
                    }}
                    className="flex items-center justify-center rounded-full bg-[#F9FAFB] p-1 text-[#09244B] transition-colors hover:bg-[#F1F5F9]"
                    aria-label={`Remove ${chip.label}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {activeFilterChips.length > 0 && (
          <Button
            type="button"
            variant="outlineGradient"
            onClick={handleClearAll}
            className="h-auto rounded-3xl px-4 py-2 text-sm font-medium capitalize text-[#F47120]"
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 md:justify-end md:gap-3">
        <Link to="/FAQs" className={howItWorksLinkClass}>
          <span className={howItWorksTextClass}>How it works</span>
        </Link>

        <button
          onClick={() => {
            onLoanCalculatorOpen?.()
          }}
          className={`cursor-pointer ${loanLimitButtonClass}`}
          aria-pressed={isLoanCalculatorOpen}
        >
          <span className="text-sm font-normal capitalize text-black md:text-base">
            My Loan Limit
          </span>
        </button>

        {/* <Button
          onClick={() => {
            onLoanCalculatorOpen?.()
          }}
          variant={'outline'}
          className="flex h-11 w-full items-center justify-center gap-2.5 self-stretch rounded-3xl px-4 py-3 text-base font-medium capitalize leading-[140%]"
          size="lg"
        >
          My Loan Limit
        </Button> */}

        <DropdownMenu onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <button className={sortButtonClass} aria-pressed={isOpen}>
              <span className="text-sm font-normal capitalize text-black md:text-base">
                Sort By
              </span>
              <span
                className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.2802 10.0333L8.93355 5.68667C8.42021 5.17333 7.58021 5.17333 7.06688 5.68667L2.72021 10.0333"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-[210px] border-none bg-white p-2 shadow-[0_4px_24px_0_rgba(37,37,37,0.08)]"
          >
            {SORT_OPTIONS.map((option) => {
              const isActive = sortSelection === option.value
              return (
                <DropdownMenuItem
                  key={option.value}
                  onSelect={() => setSortSelection(option.value)}
                  className={`flex items-center justify-between gap-2 rounded-lg px-3 py-3 text-sm font-normal leading-[140%] ${
                    isActive
                      ? 'bg-[rgba(244,113,32,0.12)] text-[#F47120]'
                      : 'text-[#252525]'
                  }`}
                >
                  <span>{option.label}</span>
                  {isActive && <CheckIcon />}
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
