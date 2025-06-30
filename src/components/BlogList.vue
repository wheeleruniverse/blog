<template>
  <div class="space-y-6">
    <!-- Results Summary -->
    <div class="flex items-center justify-between">
      <p class="text-wheeler-gray-600 dark:text-wheeler-gray-400">
        Showing {{ filteredEntries.length }} of {{ totalEntries }} blog posts
      </p>
      <div v-if="hasActiveFilters" class="flex items-center gap-2">
        <span class="text-sm text-wheeler-gray-500 dark:text-wheeler-gray-400"
          >Filters active</span
        >
        <button
          @click="clearFilters"
          class="text-sm text-wheeler-purple-600 hover:text-wheeler-purple-700 dark:text-wheeler-purple-400 dark:hover:text-wheeler-purple-300 underline"
        >
          Clear all
        </button>
      </div>
    </div>

    <!-- Blog Grid -->
    <div v-if="filteredEntries.length > 0" class="grid gap-6 md:gap-8">
      <BlogCard
        v-for="entry in filteredEntries"
        :key="entry.slug"
        :entry="entry"
        class="animate-fade-in"
      />
    </div>

    <!-- Empty State -->
    <div v-else-if="!loading && totalEntries > 0" class="text-center py-12">
      <div class="mx-auto max-w-md">
        <MagnifyingGlassIcon
          class="mx-auto h-12 w-12 text-wheeler-gray-400 dark:text-wheeler-gray-500"
        />
        <h3
          class="mt-4 text-lg font-medium text-wheeler-gray-900 dark:text-white"
        >
          No posts found
        </h3>
        <p class="mt-2 text-wheeler-gray-600 dark:text-wheeler-gray-400">
          Try adjusting your filters or search terms to find what you're looking
          for.
        </p>
        <button
          @click="clearFilters"
          class="mt-4 inline-flex items-center px-4 py-2 bg-wheeler-purple-600 hover:bg-wheeler-purple-700 text-white text-sm font-medium rounded-md transition-colors duration-200"
        >
          Clear Filters
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else-if="loading" class="grid gap-6 md:gap-8">
      <div
        v-for="i in 3"
        :key="i"
        class="bg-white dark:bg-wheeler-gray-800 rounded-lg shadow-md p-6 border border-wheeler-gray-200 dark:border-wheeler-gray-700 animate-pulse"
      >
        <div class="space-y-4">
          <div
            class="h-6 bg-wheeler-gray-200 dark:bg-wheeler-gray-700 rounded w-3/4"
          ></div>
          <div class="flex gap-4">
            <div
              class="h-4 bg-wheeler-gray-200 dark:bg-wheeler-gray-700 rounded w-24"
            ></div>
            <div
              class="h-4 bg-wheeler-gray-200 dark:bg-wheeler-gray-700 rounded w-32"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { BlogEntry, FilterOptions } from '@/types';
import BlogCard from './BlogCard.vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

interface Props {
  entries: BlogEntry[];
  totalEntries: number;
  filters: FilterOptions;
  loading: boolean;
}

interface Emits {
  (e: 'clear-filters'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const filteredEntries = computed(() => props.entries);

const hasActiveFilters = computed(() => {
  return !!(
    props.filters.search ||
    props.filters.dateFrom ||
    props.filters.dateTo ||
    props.filters.sources.length > 0 ||
    props.filters.showCollabOnly
  );
});

const clearFilters = () => {
  emit('clear-filters');
};
</script>
