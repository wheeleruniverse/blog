<template>
  <header
    class="bg-white dark:bg-wheeler-purple-900 shadow-sm border-b border-wheeler-gray-200 dark:border-wheeler-purple-700"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo and Title -->
        <div class="flex items-center">
          <router-link
            to="/"
            class="flex items-center space-x-3 text-wheeler-gray-900 dark:text-white hover:text-wheeler-purple-600 dark:hover:text-wheeler-coral-400 transition-colors duration-200"
            @contextmenu="handleHeaderRightClick"
          >
            <!-- Wheeler Universe Logo -->
            <img
              src="/wheeler-logo.jpg"
              alt="Wheeler Universe Logo"
              class="w-10 h-10 rounded-lg object-cover"
            />
            <div>
              <h1 class="text-xl font-bold">Wheeler Universe</h1>
              <p
                class="text-sm text-wheeler-gray-600 dark:text-wheeler-gray-400 -mt-1"
              >
                Blog Aggregator
              </p>
            </div>
          </router-link>
        </div>

        <!-- Navigation and Actions -->
        <div class="flex items-center space-x-4">
          <!-- Search (Mobile Toggle) -->
          <button
            v-if="showMobileSearch"
            @click="toggleMobileSearch"
            class="md:hidden p-2 rounded-md text-wheeler-gray-500 hover:text-wheeler-gray-900 hover:bg-wheeler-gray-100 dark:text-wheeler-gray-400 dark:hover:text-white dark:hover:bg-wheeler-purple-700 focus:outline-none focus:ring-2 focus:ring-wheeler-purple-500"
            aria-label="Toggle search"
          >
            <MagnifyingGlassIcon class="w-5 h-5" />
          </button>

          <!-- Desktop Search -->
          <div v-if="showDesktopSearch" class="hidden md:block w-64">
            <SearchBar
              v-model="searchQuery"
              placeholder="Search blogs..."
              :show-results-count="false"
            />
          </div>

          <!-- Theme Toggle -->
          <ThemeToggle />

          <!-- Stats -->
          <div
            class="hidden sm:flex items-center space-x-1 text-sm text-wheeler-gray-600 dark:text-wheeler-gray-400"
          >
            <span>{{ totalPosts }}</span>
            <span>{{ totalPosts === 1 ? 'post' : 'posts' }}</span>
          </div>
        </div>
      </div>

      <!-- Mobile Search Bar -->
      <div v-if="showMobileSearchBar" class="md:hidden pb-4">
        <SearchBar
          v-model="searchQuery"
          placeholder="Search blogs..."
          :show-results-count="false"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import SearchBar from './SearchBar.vue';
import ThemeToggle from './ThemeToggle.vue';

interface Props {
  totalPosts?: number;
  showMobileSearch?: boolean;
  showDesktopSearch?: boolean;
}

interface Emits {
  (e: 'update:search', value: string): void;
}

withDefaults(defineProps<Props>(), {
  totalPosts: 0,
  showMobileSearch: true,
  showDesktopSearch: true,
});

const emit = defineEmits<Emits>();

const showMobileSearchBar = ref(false);

const searchQuery = computed({
  get: () => '',
  set: (value: string) => emit('update:search', value),
});

const toggleMobileSearch = () => {
  showMobileSearchBar.value = !showMobileSearchBar.value;
};

const handleHeaderRightClick = (event: MouseEvent) => {
  event.preventDefault();
  window.open(window.location.origin, '_blank');
};
</script>
