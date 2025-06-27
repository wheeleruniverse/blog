import { ref, watch, onMounted, type Ref } from 'vue'
import type { ThemeState } from '@/types'

const THEME_STORAGE_KEY = 'wheeler-blog-theme'

export function useTheme() {
  const theme: Ref<ThemeState> = ref({ isDark: false })

  const initializeTheme = (): void => {
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
  }

  const updateDocumentClass = (): void => {
    const htmlElement = document.documentElement
    
    if (theme.value.isDark) {
      htmlElement.classList.add('dark')
    } else {
      htmlElement.classList.remove('dark')
    }
  }

  const toggleTheme = (): void => {
    theme.value.isDark = !theme.value.isDark
  }

  const setTheme = (isDark: boolean): void => {
    theme.value.isDark = isDark
  }

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
  onMounted(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleSystemThemeChange = (e: MediaQueryListEvent): void => {
      // Only update if user hasn't explicitly set a preference
      const hasUserPreference = localStorage.getItem(THEME_STORAGE_KEY)
      if (!hasUserPreference) {
        theme.value.isDark = e.matches
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)
    
    // Return cleanup function
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  })

  return {
    theme,
    initializeTheme,
    toggleTheme,
    setTheme,
  }
}