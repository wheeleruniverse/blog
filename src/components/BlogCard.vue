<template>
  <article
    class="bg-white dark:bg-wheeler-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-wheeler-gray-200 dark:border-wheeler-gray-700 animate-slide-up"
  >
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1">
        <h2 class="text-xl font-semibold text-wheeler-gray-900 dark:text-white mb-2 leading-tight">
          {{ entry.name }}
        </h2>
        <div
          class="flex items-center gap-3 text-sm text-wheeler-gray-600 dark:text-wheeler-gray-400"
        >
          <time :datetime="entry.date" class="flex items-center gap-1">
            <CalendarIcon class="w-4 h-4" />
            {{ formatDate(entry.date) }}
          </time>
          <span class="flex items-center gap-1">
            <LinkIcon class="w-4 h-4" />
            {{ getSourceDomain(entry.source) }}
          </span>
        </div>
      </div>
      <div class="flex items-center gap-2 ml-4">
        <span
          v-if="entry.collab"
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-wheeler-coral-100 text-wheeler-coral-800 dark:bg-wheeler-coral-900 dark:text-wheeler-coral-200"
        >
          <UsersIcon class="w-3 h-3 mr-1" />
          Collaboration
        </span>
        <button
          @click="openBlog"
          class="inline-flex items-center px-4 py-2 bg-wheeler-purple-600 hover:bg-wheeler-purple-700 text-white text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-wheeler-purple-500 focus:ring-offset-2 dark:focus:ring-offset-wheeler-gray-800"
          :aria-label="`Read ${entry.name}`"
        >
          Read More
          <ArrowTopRightOnSquareIcon class="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { BlogEntry } from '@/types'
import {
  CalendarIcon,
  LinkIcon,
  UsersIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/vue/24/outline'
import { formatDate, getDomainFromUrl } from '@/utils'

interface Props {
  entry: BlogEntry
}

const props = defineProps<Props>()

const getSourceDomain = getDomainFromUrl

const openBlog = (): void => {
  window.open(props.entry.source, '_blank', 'noopener,noreferrer')
}
</script>
