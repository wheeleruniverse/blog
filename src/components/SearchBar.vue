<template>
  <div class="relative">
    <div class="relative">
      <div
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <MagnifyingGlassIcon
          class="h-5 w-5 text-wheeler-gray-400 dark:text-wheeler-gray-500"
        />
      </div>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search blog posts..."
        class="block w-full pl-10 pr-10 py-3 text-wheeler-gray-900 dark:text-white placeholder-wheeler-gray-500 dark:placeholder-wheeler-gray-400 bg-white dark:bg-wheeler-gray-800 border border-wheeler-gray-300 dark:border-wheeler-gray-600 rounded-lg focus:ring-2 focus:ring-wheeler-purple-500 focus:border-wheeler-purple-500 dark:focus:ring-wheeler-purple-400 transition-colors duration-200"
        :aria-label="searchAriaLabel"
      />
      <div
        v-if="searchQuery"
        class="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        <button
          @click="clearSearch"
          class="text-wheeler-gray-400 hover:text-wheeler-gray-600 dark:text-wheeler-gray-500 dark:hover:text-wheeler-gray-300 transition-colors duration-200"
          aria-label="Clear search"
        >
          <XMarkIcon class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- Search suggestions/results count -->
    <div
      v-if="showResultsCount && searchQuery"
      class="absolute top-full left-0 right-0 mt-1 px-3 py-2 bg-white dark:bg-wheeler-gray-800 border border-wheeler-gray-200 dark:border-wheeler-gray-700 rounded-md shadow-sm text-sm text-wheeler-gray-600 dark:text-wheeler-gray-400 z-10"
    >
      {{ resultsCount }} result{{ resultsCount !== 1 ? 's' : '' }} found
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/24/outline';

interface Props {
  modelValue: string;
  resultsCount?: number;
  showResultsCount?: boolean;
  placeholder?: string;
}

interface Emits {
  (e: 'update:modelValue', value: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  resultsCount: 0,
  showResultsCount: false,
  placeholder: 'Search blog posts...',
});

const emit = defineEmits<Emits>();

const searchQuery = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
});

const searchAriaLabel = computed(() => {
  if (props.showResultsCount && props.modelValue) {
    return `Search blog posts. ${props.resultsCount} results found for "${props.modelValue}"`;
  }
  return 'Search blog posts';
});

const clearSearch = () => {
  searchQuery.value = '';
};

// Debounce search input for better performance
let debounceTimer: ReturnType<typeof setTimeout> | undefined;

watch(searchQuery, () => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(() => {
    // The v-model binding already handles the emit
  }, 300);
});
</script>
