<template>
  <div class="min-h-screen bg-wheeler-gray-50 dark:bg-wheeler-gray-900">
    <AppHeader :total-posts="sortedBlogEntries.length" @update:search="updateSearch" />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Hero Section -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-wheeler-gray-900 dark:text-white mb-4">
          Technical Insights & Experiences
        </h1>
        <p class="text-xl text-wheeler-gray-600 dark:text-wheeler-gray-400 max-w-3xl mx-auto">
          Discover articles on cloud computing, software development, and technology leadership from
          across the web, curated and organized in one place.
        </p>
      </div>

      <!-- Search and Filters -->
      <div class="mb-8 space-y-6">
        <!-- Main Search -->
        <div class="max-w-2xl mx-auto">
          <SearchBar
            v-model="filters.search"
            :results-count="filteredBlogEntries.length"
            :show-results-count="true"
            placeholder="Search by title, technology, or topic..."
          />
        </div>

        <!-- Filters -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div class="lg:col-span-1">
            <FilterPanel
              :filters="filters"
              :available-sources="availableSources"
              @update:filters="updateFilters"
            />
          </div>

          <div class="lg:col-span-3">
            <!-- Error State -->
            <div
              v-if="error"
              class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6"
            >
              <div class="flex">
                <ExclamationTriangleIcon class="h-5 w-5 text-red-400 dark:text-red-300" />
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-red-800 dark:text-red-200">
                    Error Loading Blog Data
                  </h3>
                  <p class="mt-1 text-sm text-red-700 dark:text-red-300">
                    {{ error.message }}
                  </p>
                  <button
                    @click="retryLoad"
                    class="mt-2 text-sm text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 underline"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>

            <!-- Blog List -->
            <BlogList
              :entries="filteredBlogEntries"
              :total-entries="sortedBlogEntries.length"
              :filters="filters"
              :loading="loading === 'loading'"
              @clear-filters="clearAllFilters"
            />
          </div>
        </div>
      </div>
    </main>

    <AppFooter
      :total-posts="sortedBlogEntries.length"
      :collaboration-count="collaborationCount"
      :source-count="availableSources.length"
      :latest-post-date="latestPostDate"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import { useBlogData } from '@/composables/useBlogData'
import { useTheme } from '@/composables/useTheme'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SearchBar from '@/components/SearchBar.vue'
import FilterPanel from '@/components/FilterPanel.vue'
import BlogList from '@/components/BlogList.vue'
import type { FilterOptions } from '@/types'
import { formatDate } from '@/utils'

const {
  loadBlogData,
  loading,
  error,
  filters,
  sortedBlogEntries,
  filteredBlogEntries,
  availableSources,
} = useBlogData()

const { initializeTheme } = useTheme()

const collaborationCount = computed(() => {
  return sortedBlogEntries.value.filter((entry) => entry.collab === true).length
})

const latestPostDate = computed(() => {
  if (sortedBlogEntries.value.length === 0) return 'N/A'
  const latestPost = sortedBlogEntries.value[0]
  return formatDate(latestPost.date, 'en-US')
})

const updateSearch = (searchTerm: string) => {
  filters.value.search = searchTerm
}

const updateFilters = (newFilters: FilterOptions) => {
  Object.assign(filters.value, newFilters)
}

const clearAllFilters = () => {
  filters.value = {
    search: '',
    dateFrom: '',
    dateTo: '',
    sources: [],
    showCollabOnly: false,
  }
}

const retryLoad = () => {
  loadBlogData()
}

onMounted(async () => {
  initializeTheme()
  await loadBlogData()
})
</script>
