import { ref, computed, type Ref } from 'vue'
import type { BlogConfig, BlogEntry, FilterOptions, LoadingState, AppError } from '@/types'

export function useBlogData() {
  const blogConfig: Ref<BlogConfig | null> = ref(null)
  const loading: Ref<LoadingState> = ref('idle')
  const error: Ref<AppError | null> = ref(null)

  const filters: Ref<FilterOptions> = ref({
    search: '',
    dateFrom: '',
    dateTo: '',
    sources: [],
    showCollabOnly: false,
  })

  const loadBlogData = async (): Promise<void> => {
    loading.value = 'loading'
    error.value = null

    try {
      const response = await fetch('/blog-config.json')
      if (!response.ok) {
        throw new Error(`Failed to load blog data: ${response.statusText}`)
      }
      
      const data: BlogConfig = await response.json()
      blogConfig.value = data
      loading.value = 'success'
    } catch (err) {
      error.value = {
        message: err instanceof Error ? err.message : 'Failed to load blog data',
        details: err,
      }
      loading.value = 'error'
    }
  }

  const sortedBlogEntries = computed((): BlogEntry[] => {
    if (!blogConfig.value?.data) return []
    
    return [...blogConfig.value.data].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  })

  const filteredBlogEntries = computed((): BlogEntry[] => {
    let entries = sortedBlogEntries.value

    // Search filter
    if (filters.value.search) {
      const searchTerm = filters.value.search.toLowerCase()
      entries = entries.filter(entry =>
        entry.name.toLowerCase().includes(searchTerm)
      )
    }

    // Date range filter
    if (filters.value.dateFrom) {
      entries = entries.filter(entry => entry.date >= filters.value.dateFrom)
    }

    if (filters.value.dateTo) {
      entries = entries.filter(entry => entry.date <= filters.value.dateTo)
    }

    // Source filter
    if (filters.value.sources.length > 0) {
      entries = entries.filter(entry => {
        const domain = new URL(entry.source).hostname
        return filters.value.sources.some(source => domain.includes(source))
      })
    }

    // Collaboration filter
    if (filters.value.showCollabOnly) {
      entries = entries.filter(entry => entry.collab === true)
    }

    return entries
  })

  const availableSources = computed((): string[] => {
    if (!blogConfig.value?.data) return []
    
    const sources = new Set<string>()
    blogConfig.value.data.forEach(entry => {
      try {
        const domain = new URL(entry.source).hostname
        sources.add(domain)
      } catch {
        // Ignore invalid URLs
      }
    })
    
    return Array.from(sources).sort()
  })

  const isFeatureEnabled = (featureName: string): boolean => {
    if (!blogConfig.value?.features) return false
    
    const feature = blogConfig.value.features.find(f => f.name === featureName)
    return feature?.enabled === true
  }

  const findBlogBySlug = (slug: string): BlogEntry | undefined => {
    return blogConfig.value?.data.find(entry => entry.slug === slug)
  }

  return {
    blogConfig,
    loading,
    error,
    filters,
    loadBlogData,
    sortedBlogEntries,
    filteredBlogEntries,
    availableSources,
    isFeatureEnabled,
    findBlogBySlug,
  }
}