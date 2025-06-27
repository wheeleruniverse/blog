<template>
  <footer class="bg-white dark:bg-wheeler-gray-900 border-t border-wheeler-gray-200 dark:border-wheeler-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Brand Section -->
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-br from-wheeler-blue-500 to-wheeler-blue-700 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">W</span>
            </div>
            <div>
              <h3 class="text-lg font-bold text-wheeler-gray-900 dark:text-white">Wheeler Universe</h3>
            </div>
          </div>
          <p class="text-wheeler-gray-600 dark:text-wheeler-gray-400 text-sm leading-relaxed">
            Aggregating technical insights and experiences from across the web. 
            Explore articles on cloud computing, software development, and technology leadership.
          </p>
        </div>

        <!-- Quick Stats -->
        <div class="space-y-4">
          <h4 class="text-sm font-semibold text-wheeler-gray-900 dark:text-white uppercase tracking-wide">
            Blog Stats
          </h4>
          <div class="space-y-2 text-sm text-wheeler-gray-600 dark:text-wheeler-gray-400">
            <div class="flex justify-between">
              <span>Total Posts:</span>
              <span class="font-medium">{{ totalPosts }}</span>
            </div>
            <div class="flex justify-between">
              <span>Collaborations:</span>
              <span class="font-medium">{{ collaborationCount }}</span>
            </div>
            <div class="flex justify-between">
              <span>Sources:</span>
              <span class="font-medium">{{ sourceCount }}</span>
            </div>
            <div class="flex justify-between">
              <span>Latest Post:</span>
              <span class="font-medium">{{ latestPostDate }}</span>
            </div>
          </div>
        </div>

        <!-- Links & Info -->
        <div class="space-y-4">
          <h4 class="text-sm font-semibold text-wheeler-gray-900 dark:text-white uppercase tracking-wide">
            Connect
          </h4>
          <div class="space-y-2">
            <a
              href="https://github.com/wheeleruniverse"
              class="text-wheeler-gray-600 dark:text-wheeler-gray-400 hover:text-wheeler-blue-600 dark:hover:text-wheeler-blue-400 text-sm flex items-center space-x-2 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
            <a
              href="https://dev.to/wheeleruniverse"
              class="text-wheeler-gray-600 dark:text-wheeler-gray-400 hover:text-wheeler-blue-600 dark:hover:text-wheeler-blue-400 text-sm flex items-center space-x-2 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45h.56c.42 0 .63-.05.84-.23.18-.16.28-.42.28-.84V10.9c0-.42-.1-.68-.28-.84zm12.37-7.92H4.21C1.88 2.13 0 4.01 0 6.34v11.32c0 2.33 1.88 4.21 4.21 4.21h15.58c2.33 0 4.21-1.88 4.21-4.21V6.34c0-2.33-1.88-4.21-4.21-4.21zM8.1 14.93c-.48.4-1.04.61-1.67.61H5.28V8.46h1.15c.63 0 1.19.21 1.67.61.48.4.72.98.72 1.73v2.4c0 .75-.24 1.33-.72 1.73zm6.79-4.52h-2.8v1.33h1.54v1.17h-1.54v1.33h2.8v1.17h-4.24V8.46h4.24v1.17zm7.96 0h-2.8v1.33h1.54v1.17h-1.54v1.33h2.8v1.17h-4.24V8.46h4.24v1.17z"/>
              </svg>
              <span>Dev.to</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-8 pt-6 border-t border-wheeler-gray-200 dark:border-wheeler-gray-700">
        <div class="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <p class="text-sm text-wheeler-gray-600 dark:text-wheeler-gray-400">
            &copy; {{ currentYear }} Wheeler Universe. Built with Vue 3 & TypeScript.
          </p>
          <div class="flex items-center space-x-4 text-sm text-wheeler-gray-600 dark:text-wheeler-gray-400">
            <span>Last updated: {{ lastUpdated }}</span>
            <button
              @click="scrollToTop"
              class="hover:text-wheeler-blue-600 dark:hover:text-wheeler-blue-400 transition-colors duration-200"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  totalPosts?: number
  collaborationCount?: number
  sourceCount?: number
  latestPostDate?: string
}

const props = withDefaults(defineProps<Props>(), {
  totalPosts: 0,
  collaborationCount: 0,
  sourceCount: 0,
  latestPostDate: 'N/A'
})

const currentYear = computed(() => new Date().getFullYear())
const lastUpdated = computed(() => new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
}))

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>