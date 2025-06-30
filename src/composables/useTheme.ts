import { ref, watch, type Ref } from 'vue'
import type { ThemeState } from '@/types'

const THEME_STORAGE_KEY = 'wheeler-blog-theme'

// Global theme state (singleton)
const theme: Ref<ThemeState> = ref({ isDark: false })
let isInitialized = false

// Global document class update function
const updateDocumentClass = (): void => {
  const htmlElement = document.documentElement

  if (theme.value.isDark) {
    htmlElement.classList.add('dark')
  } else {
    htmlElement.classList.remove('dark')
  }
}

// Global watchers and listeners (only set up once)
let watchersInitialized = false

const setupGlobalWatchers = (): void => {
  if (watchersInitialized) return
  
  // Watch for theme changes and persist to localStorage
  watch(
    () => theme.value,
    (newTheme) => {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(newTheme))
      updateDocumentClass()
    },
    { deep: true }
  )

  // Listen for system theme changes
  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleSystemThemeChange = (e: MediaQueryListEvent): void => {
      // Only update if user hasn't explicitly set a preference
      const hasUserPreference = localStorage.getItem(THEME_STORAGE_KEY)
      if (!hasUserPreference) {
        theme.value.isDark = e.matches
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)
  }
  
  watchersInitialized = true
}

export function useTheme() {

  const initializeTheme = (): void => {
    if (isInitialized) return // Prevent multiple initializations
    
    setupGlobalWatchers() // Setup watchers only once
    
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)

    if (savedTheme) {
      try {
        theme.value = JSON.parse(savedTheme)
      } catch {
        // Use system preference as fallback
        theme.value.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
    } else {
      // Use system preference
      theme.value.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    updateDocumentClass()
    isInitialized = true
  }

  const toggleTheme = (): void => {
    theme.value.isDark = !theme.value.isDark
  }

  const setTheme = (isDark: boolean): void => {
    theme.value.isDark = isDark
  }


  return {
    theme,
    initializeTheme,
    toggleTheme,
    setTheme,
  }
}
