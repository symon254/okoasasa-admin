/* eslint-disable prefer-const */
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { EncryptStorage } from 'encrypt-storage'
import { parsePhoneNumber } from 'libphonenumber-js/min'

const isBrowser = typeof window !== 'undefined'

const createMemoryStorage = () => {
  const store = new Map()
  return {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => {
      store.set(key, String(value))
    },
    removeItem: (key) => {
      store.delete(key)
    },
    clear: () => {
      store.clear()
    },
  }
}

const resolveLocalStorage = () => {
  if (!isBrowser) return null

  try {
    const storage = window.localStorage
    const testKey = '__storage_test__'
    storage.setItem(testKey, testKey)
    storage.removeItem(testKey)
    return storage
  } catch (_error) {
    return null
  }
}

const browserLocalStorage = resolveLocalStorage()

export const safeLocalStorage = browserLocalStorage ?? createMemoryStorage()

const createMemoryEncryptStorage = () => {
  const storage = createMemoryStorage()
  return {
    setItem: storage.setItem,
    getItem: storage.getItem,
    removeItem: storage.removeItem,
    clear: storage.clear,
  }
}

const resolveEncryptStorage = () => {
  if (!browserLocalStorage) {
    return createMemoryEncryptStorage()
  }

  try {
    return new EncryptStorage(`SJKXSAJJ898NMSNxs89SJs9snOXNS8}`, {
      prefix: '@',
      encAlgorithm: 'Rabbit',
      doNotEncryptValues: false,
    })
  } catch (_error) {
    return createMemoryEncryptStorage()
  }
}

const encryptStorage = resolveEncryptStorage()
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const setStorageData = (key, value) => {
  return encryptStorage.setItem(key, JSON.stringify(value))
}

export const getStorageData = (key) => {
  const value = encryptStorage.getItem(key)
  return value
}

export const clearStorageData = () => {
  // Preserve theme and other UI settings during logout
  const preserveKeys = ['vite-ui-theme']
  const preserved = {}

  // Save items to preserve
  preserveKeys.forEach((key) => {
    try {
      const value = safeLocalStorage.getItem(key)
      if (value !== null && value !== undefined) {
        preserved[key] = value
      }
    } catch {
      // Swallow storage errors to avoid crashing the app
    }
  })

  // Clear only specific auth-related keys instead of clearing everything
  const authKeys = ['userInfo', 'token', 'name']
  authKeys.forEach((key) => {
    try {
      encryptStorage.removeItem?.(key)
    } catch {
      // ignore
    }
  })

  // Clear encrypted storage
  try {
    encryptStorage.clear?.()
  } catch {
    // ignore
  }

  // Ensure theme is still there (redundant safety check)
  Object.entries(preserved).forEach(([key, value]) => {
    try {
      const existing = safeLocalStorage.getItem(key)
      if (existing === null || existing === undefined) {
        safeLocalStorage.setItem(key, value)
      }
    } catch {
      // ignore
    }
  })
}

export const clearSelectedRows = (tableInstance) => {
  if (!tableInstance) return
  tableInstance.toggleAllRowsSelected(false)
}

export const clearSelectedColumns = (tableInstance) => {
  if (!tableInstance) return
  tableInstance.toggleAllColumnsSelected(false)
}

export const downloadData = (item, fileName = 'receipt') => {
  if (!item) return
  const anchor = document.createElement('a')
  anchor.href = item
  anchor.setAttribute('download', `${fileName}`)
  anchor.click()
}

export const comma = (num) => {
  if (!num) return num
  const number = Number(num).toLocaleString().split('.')
  number[0] = number[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return number.join('.')
}

export const getInitials = (name) => {
  if (!name) return '' // Handle null/undefined

  let initials
  const nameSplit = name.trim().split(/\s+/) // Trim and split on any whitespace
  const nameLength = nameSplit.length

  if (nameLength > 1) {
    initials =
      nameSplit[0].substring(0, 1).toUpperCase() +
      '.' +
      nameSplit[nameLength - 1].substring(0, 1).toUpperCase()
  } else if (nameLength === 1) {
    initials = nameSplit[0].substring(0, 1).toUpperCase()
  } else {
    return ''
  }

  return initials
}

export const formatEmail = (email) => {
  if (!email) return 'N/A'
  if (email.length > 20) {
    return email.substring(0, 15) + '...'
  }
  return email
}

export const formatNoteContent = (content) => {
  if (!content) return ''

  // Simple markdown parsing for display
  let formatted = content
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<strong>$1</strong>')
    .replace(/_([^_]+)_/g, '<em>$1</em>')
    .replace(/~([^~]+)~/g, '<del>$1</del>')
    .replace(/@(\w+)/g, '<span style="color: #3b82f6;">@$1</span>')

  return formatted
}

// Function to disable any accidental use of console logs
export const GlobalDebug = (() => {
  const saved = {
    log: console.log?.bind(console),
    info: console.info?.bind(console),
    warn: console.warn?.bind(console),
    error: console.error?.bind(console),
  }

  const noop = () => {}

  /**
   * @param {boolean} debugOn
   * @param {boolean} suppressAll
   */
  return (debugOn, suppressAll) => {
    const suppress = suppressAll || false

    if (debugOn === false) {
      console.log = noop
      if (suppress) {
        console.info = noop
        console.warn = noop
        console.error = noop
      } else {
        console.info = saved.info || noop
        console.warn = saved.warn || noop
        console.error = saved.error || noop
      }
    } else {
      console.log = saved.log || noop
      console.info = saved.info || noop
      console.warn = saved.warn || noop
      console.error = saved.error || noop
    }
  }
})()

export const formatPhoneNumber = (msisdn) => {
  if (!msisdn) return
  const {
    countryCallingCode: countryCallingCode,
    country: country,
    number: phone,
  } = parsePhoneNumber(msisdn)
  let phoneNumber = phone.replace('+', '')
  return { phoneNumber, country, countryCallingCode }
}

// Format currency helper with KES guarantee
export const formatCurrency = (amount) => {
  const formatted = new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    currencyDisplay: 'code', // Prefer KES
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount || 0)

  // Extra safety: ensure no "Ksh" sneaks in
  return formatted.replace(/Ksh|KSh/gi, 'KES')
}

// Unified Safe & Flexible Date Formatter
const formatDateCore = (
  dateString,
  { withTime = false, useKenyaTZ = false, locale = 'en-US' } = {},
) => {
  if (!dateString) return 'N/A'

  try {
    const date = new Date(dateString)

    if (isNaN(date.getTime())) {
      return 'Invalid Date'
    }

    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...(withTime && { hour: '2-digit', minute: '2-digit' }),
      ...(useKenyaTZ && { timeZone: 'Africa/Nairobi' }),
    }

    return date.toLocaleString(locale, options)
  } catch {
    return 'Invalid Date'
  }
}

// Public API — keeps your old function names intact
export const formatDate = (dateString, opts = {}) =>
  formatDateCore(dateString, { ...opts, withTime: false })

export const formatDateTime = (dateString, opts = {}) =>
  formatDateCore(dateString, { ...opts, withTime: true })

// utils/deriveAmounts.js
export const deriveAmounts = (invoice) => {
  const toNum = (v) => Number(v ?? 0) || 0

  const discount = toNum(invoice?.discount)
  const amountDue = toNum(invoice?.amountDue)
  const amountPaid = toNum(invoice?.amountPaid)
  const balance = toNum(invoice?.balance)
  const amountFld = invoice?.amount != null ? toNum(invoice?.amount) : null

  const businessTotal = Array.isArray(invoice?.business)
    ? invoice.business.reduce((sum, b) => sum + toNum(b?.amount), 0)
    : 0

  // Preferred sources for original (pre-discount) amount, in order of trust:
  // 1) Sum of business line items (single or consolidated)
  // 2) amountDue + discount
  // 3) "amount" field if provided
  const originalFromBusiness = businessTotal > 0 ? businessTotal : null
  const originalFromDueDisc =
    amountDue || discount ? amountDue + discount : null

  const originalAmount =
    originalFromBusiness ?? originalFromDueDisc ?? amountFld ?? 0

  // Expectations & checks
  const expectedAmountDue = Math.max(originalAmount - discount, 0)
  const computedBalance = Math.max(amountDue - amountPaid, 0)

  const TOL = 1 // shilling rounding tolerance
  const dueMismatch =
    amountDue > 0 && Math.abs(expectedAmountDue - amountDue) > TOL
  const balanceMismatch =
    balance > 0 && Math.abs(computedBalance - balance) > TOL

  const effectiveDiscountPercent =
    originalAmount > 0
      ? Number(((discount / originalAmount) * 100).toFixed(2))
      : 0

  const percentMismatch =
    invoice?.discountPercent != null
      ? Math.abs(effectiveDiscountPercent - toNum(invoice?.discountPercent)) >
        0.5
      : false

  const isConsolidated =
    Array.isArray(invoice?.business) && invoice.business.length > 1

  return {
    // core numbers
    originalAmount,
    businessTotal,
    expectedAmountDue,
    computedBalance,
    effectiveDiscountPercent,

    // flags
    dueMismatch,
    balanceMismatch,
    percentMismatch,
    isConsolidated,
  }
}

export const maskPhoneNumber = (str) => {
  if (!str) return
  let phone = str?.startsWith(0) ? '254' + str.slice(1, str.length) : str
  const regex = /^(\d{4})\d{5}(\d{3})$/
  const match = phone.match(regex)
  if (match) {
    return match[1] + '*****' + match[2]
  }
  return null
}
