import React, { createContext, useContext, useEffect, useState } from 'react'
import { safeLocalStorage } from '@/lib/utils'

const ThemeContext = createContext(null)

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'vite-ui-theme',
}) {
  const [theme, setTheme] = useState(() => {
    try {
      return safeLocalStorage.getItem(storageKey) || defaultTheme
    } catch {
      return defaultTheme
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (newTheme) => {
      try {
        safeLocalStorage.setItem(storageKey, newTheme)
      } catch {
        // Ignored – storage might be unavailable (private browsing, etc.)
      }
      setTheme(newTheme)
    },
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
