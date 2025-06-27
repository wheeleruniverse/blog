<template>
  <div class="min-h-screen bg-wheeler-gray-50 dark:bg-wheeler-gray-900 flex items-center justify-center">
    <div class="max-w-md mx-auto text-center px-4">
      <!-- Loading State -->
      <div v-if="loading" class="space-y-4">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-wheeler-blue-600 mx-auto"></div>
        <h1 class="text-2xl font-semibold text-wheeler-gray-900 dark:text-white">
          Redirecting...
        </h1>
        <p class="text-wheeler-gray-600 dark:text-wheeler-gray-400">
          Taking you to the blog post
        </p>
      </div>

      <!-- Blog Found -->
      <div v-else-if="blogEntry && !error" class="space-y-6">
        <div class="w-16 h-16 bg-wheeler-blue-600 rounded-full flex items-center justify-center mx-auto">
          <ArrowTopRightOnSquareIcon class="w-8 h-8 text-white" />
        </div>
        
        <div class="space-y-3">
          <h1 class="text-2xl font-semibold text-wheeler-gray-900 dark:text-white">
            {{ blogEntry.name }}
          </h1>
          <div class="flex items-center justify-center gap-3 text-sm text-wheeler-gray-600 dark:text-wheeler-gray-400">
            <time :datetime="blogEntry.date">
              {{ formatDate(blogEntry.date) }}
            </time>
            <span>•</span>
            <span>{{ getSourceDomain(blogEntry.source) }}</span>
          </div>
        </div>

        <div class="space-y-3">
          <p class="text-wheeler-gray-700 dark:text-wheeler-gray-300">
            You'll be redirected automatically in {{ countdown }} seconds.
          </p>
          <div class="flex justify-center space-x-3">
            <button
              @click="redirectNow"
              class="inline-flex items-center px-4 py-2 bg-wheeler-blue-600 hover:bg-wheeler-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-wheeler-blue-500 focus:ring-offset-2 dark:focus:ring-offset-wheeler-gray-900"
            >
              Go Now
              <ArrowTopRightOnSquareIcon class="w-4 h-4 ml-1" />
            </button>
            <router-link
              to="/"
              class="inline-flex items-center px-4 py-2 border border-wheeler-gray-300 dark:border-wheeler-gray-600 text-wheeler-gray-700 dark:text-wheeler-gray-300 text-sm font-medium rounded-md hover:bg-wheeler-gray-50 dark:hover:bg-wheeler-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-wheeler-blue-500 focus:ring-offset-2 dark:focus:ring-offset-wheeler-gray-900"
            >
              ← Back to Blog List
            </router-link>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else class="space-y-6">
        <div class="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto">
          <ExclamationTriangleIcon class="w-8 h-8 text-white" />
        </div>
        
        <div class="space-y-3">
          <h1 class="text-2xl font-semibold text-wheeler-gray-900 dark:text-white">
            Blog Post Not Found
          </h1>
          <p class="text-wheeler-gray-600 dark:text-wheeler-gray-400">
            The blog post you're looking for doesn't exist or may have been moved.
          </p>
        </div>

        <div class="space-y-3">
          <router-link
            to="/"
            class="inline-flex items-center px-6 py-3 bg-wheeler-blue-600 hover:bg-wheeler-blue-700 text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-wheeler-blue-500 focus:ring-offset-2 dark:focus:ring-offset-wheeler-gray-900"
          >
            ← Browse All Posts
          </router-link>
          <p class="text-sm text-wheeler-gray-500 dark:text-wheeler-gray-400">
            Or use the search to find what you're looking for
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowTopRightOnSquareIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'"
import { useBlogData } from '@/composables/useBlogData'
import { useTheme } from '@/composables/useTheme'
import type { BlogEntry } from '@/types'

const route = useRoute()
const { loadBlogData, findBlogBySlug, loading, error } = useBlogData()
const { initializeTheme } = useTheme()

const blogEntry = ref<BlogEntry | null>(null)
const countdown = ref(5)
let redirectTimer: number | undefined
let countdownTimer: number | undefined

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getSourceDomain = (url: string): string => {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return 'External Link'
  }
}

const redirectNow = (): void => {
  if (blogEntry.value) {
    window.open(blogEntry.value.source, '_blank', 'noopener,noreferrer')
  }
}

const startCountdown = (): void => {
  countdownTimer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      redirectNow()
      clearInterval(countdownTimer)
    }
  }, 1000)
}

const initializeRedirect = async (): Promise<void> => {
  const slug = route.params.slug as string
  
  // Load blog data if not already loaded
  await loadBlogData()
  
  // Find the blog entry
  const entry = findBlogBySlug(slug)
  
  if (entry) {
    blogEntry.value = entry
    document.title = `${entry.name} - Wheeler Universe`
    
    // Start automatic redirect countdown
    redirectTimer = setTimeout(() => {
      redirectNow()
    }, 5000)
    
    startCountdown()
  } else {
    document.title = 'Blog Post Not Found - Wheeler Universe'
  }
}

onMounted(async () => {
  initializeTheme()
  await initializeRedirect()
})

onUnmounted(() => {
  if (redirectTimer) {
    clearTimeout(redirectTimer)
  }
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})
</script>