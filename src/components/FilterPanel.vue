<template>
  <div
    class="bg-white dark:bg-wheeler-gray-800 rounded-lg shadow-sm border border-wheeler-gray-200 dark:border-wheeler-gray-700 p-6"
  >
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-medium text-wheeler-gray-900 dark:text-white">
        Filters
      </h3>
      <button
        v-if="hasActiveFilters"
        @click="clearAllFilters"
        class="text-sm text-wheeler-purple-600 hover:text-wheeler-purple-700 dark:text-wheeler-purple-400 dark:hover:text-wheeler-purple-300 underline"
      >
        Clear all
      </button>
    </div>

    <div class="space-y-6">
      <!-- Date Range Filter -->
      <div>
        <label
          class="block text-sm font-medium text-wheeler-gray-700 dark:text-wheeler-gray-300 mb-2"
        >
          Date Range
        </label>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label for="date-from" class="sr-only">From date</label>
            <input
              id="date-from"
              v-model="localFilters.dateFrom"
              type="date"
              placeholder="From"
              class="block w-full px-3 py-2 text-wheeler-gray-900 dark:text-white bg-white dark:bg-wheeler-gray-700 border border-wheeler-gray-300 dark:border-wheeler-gray-600 rounded-md focus:ring-2 focus:ring-wheeler-purple-500 focus:border-wheeler-purple-500 text-sm"
            />
          </div>
          <div>
            <label for="date-to" class="sr-only">To date</label>
            <input
              id="date-to"
              v-model="localFilters.dateTo"
              type="date"
              placeholder="To"
              class="block w-full px-3 py-2 text-wheeler-gray-900 dark:text-white bg-white dark:bg-wheeler-gray-700 border border-wheeler-gray-300 dark:border-wheeler-gray-600 rounded-md focus:ring-2 focus:ring-wheeler-purple-500 focus:border-wheeler-purple-500 text-sm"
            />
          </div>
        </div>
      </div>

      <!-- Source Filter -->
      <div v-if="availableSources.length > 0">
        <label
          class="block text-sm font-medium text-wheeler-gray-700 dark:text-wheeler-gray-300 mb-2"
        >
          Source
        </label>
        <div class="space-y-2 max-h-32 overflow-y-auto">
          <label
            v-for="source in availableSources"
            :key="source"
            class="flex items-center"
          >
            <input
              v-model="localFilters.sources"
              :value="source"
              type="checkbox"
              class="h-4 w-4 text-wheeler-purple-600 focus:ring-wheeler-purple-500 border-wheeler-gray-300 dark:border-wheeler-gray-600 rounded"
            />
            <span
              class="ml-2 text-sm text-wheeler-gray-700 dark:text-wheeler-gray-300"
            >
              {{ source }}
            </span>
          </label>
        </div>
      </div>

      <!-- Collaboration Filter -->
      <div>
        <label class="flex items-center">
          <input
            v-model="localFilters.showCollabOnly"
            type="checkbox"
            class="h-4 w-4 text-wheeler-purple-600 focus:ring-wheeler-purple-500 border-wheeler-gray-300 dark:border-wheeler-gray-600 rounded"
          />
          <span
            class="ml-2 text-sm text-wheeler-gray-700 dark:text-wheeler-gray-300"
          >
            Show collaborations only
          </span>
        </label>
      </div>

      <!-- Active Filters Display -->
      <div
        v-if="hasActiveFilters"
        class="pt-4 border-t border-wheeler-gray-200 dark:border-wheeler-gray-700"
      >
        <h4
          class="text-sm font-medium text-wheeler-gray-700 dark:text-wheeler-gray-300 mb-2"
        >
          Active Filters:
        </h4>
        <div class="flex flex-wrap gap-2">
          <span
            v-if="localFilters.dateFrom"
            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-wheeler-coral-100 text-wheeler-coral-800 dark:bg-wheeler-coral-900 dark:text-wheeler-coral-200"
          >
            From: {{ formatDate(localFilters.dateFrom) }}
            <button
              @click="localFilters.dateFrom = ''"
              class="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-wheeler-coral-200 dark:hover:bg-wheeler-coral-800"
            >
              <XMarkIcon class="w-3 h-3" />
            </button>
          </span>
          <span
            v-if="localFilters.dateTo"
            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-wheeler-coral-100 text-wheeler-coral-800 dark:bg-wheeler-coral-900 dark:text-wheeler-coral-200"
          >
            To: {{ formatDate(localFilters.dateTo) }}
            <button
              @click="localFilters.dateTo = ''"
              class="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-wheeler-coral-200 dark:hover:bg-wheeler-coral-800"
            >
              <XMarkIcon class="w-3 h-3" />
            </button>
          </span>
          <span
            v-for="source in localFilters.sources"
            :key="source"
            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-wheeler-coral-100 text-wheeler-coral-800 dark:bg-wheeler-coral-900 dark:text-wheeler-coral-200"
          >
            {{ source }}
            <button
              @click="removeSource(source)"
              class="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-wheeler-coral-200 dark:hover:bg-wheeler-coral-800"
            >
              <XMarkIcon class="w-3 h-3" />
            </button>
          </span>
          <span
            v-if="localFilters.showCollabOnly"
            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-wheeler-coral-100 text-wheeler-coral-800 dark:bg-wheeler-coral-900 dark:text-wheeler-coral-200"
          >
            Collaborations only
            <button
              @click="localFilters.showCollabOnly = false"
              class="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-wheeler-coral-200 dark:hover:bg-wheeler-coral-800"
            >
              <XMarkIcon class="w-3 h-3" />
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import type { FilterOptions } from '@/types';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { formatDate } from '@/utils';

interface Props {
  filters: FilterOptions;
  availableSources: string[];
}

interface Emits {
  (e: 'update:filters', filters: FilterOptions): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const localFilters = computed({
  get: () => props.filters,
  set: (value: FilterOptions) => emit('update:filters', value),
});

const hasActiveFilters = computed(() => {
  return !!(
    localFilters.value.dateFrom ||
    localFilters.value.dateTo ||
    localFilters.value.sources.length > 0 ||
    localFilters.value.showCollabOnly
  );
});

const clearAllFilters = () => {
  localFilters.value = {
    search: localFilters.value.search, // Keep search term
    dateFrom: '',
    dateTo: '',
    sources: [],
    showCollabOnly: false,
  };
};

const removeSource = (sourceToRemove: string) => {
  localFilters.value = {
    ...localFilters.value,
    sources: localFilters.value.sources.filter(
      source => source !== sourceToRemove
    ),
  };
};

// Watch for changes and emit updates
watch(
  localFilters,
  newFilters => {
    emit('update:filters', newFilters);
  },
  { deep: true }
);
</script>
