<template>
  <div
    class="min-h-screen bg-wheeler-gray-50 dark:bg-wheeler-gray-900 flex items-center justify-center"
  >
    <div class="max-w-md mx-auto text-center px-4">
      <div class="space-y-6">
        <!-- 404 Icon -->
        <div
          class="w-20 h-20 bg-wheeler-gray-200 dark:bg-wheeler-gray-700 rounded-full flex items-center justify-center mx-auto"
        >
          <span
            class="text-3xl font-bold text-wheeler-gray-600 dark:text-wheeler-gray-400"
            >404</span
          >
        </div>

        <div class="space-y-3">
          <h1 class="text-3xl font-bold text-wheeler-gray-900 dark:text-white">
            Page Not Found
          </h1>
          <p class="text-lg text-wheeler-gray-600 dark:text-wheeler-gray-400">
            The page you're looking for doesn't exist.
          </p>
        </div>

        <div class="space-y-4">
          <router-link
            to="/"
            class="inline-flex items-center px-6 py-3 bg-wheeler-purple-600 hover:bg-wheeler-purple-700 text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-wheeler-purple-500 focus:ring-offset-2 dark:focus:ring-offset-wheeler-gray-900"
          >
            ← Back to Home
          </router-link>

          <div
            class="text-sm text-wheeler-gray-500 dark:text-wheeler-gray-400 space-y-2"
          >
            <p>Looking for a specific blog post?</p>
            <p>
              Try browsing our complete collection or use the search feature.
            </p>
          </div>
        </div>

        <!-- Helpful Links -->
        <div
          class="pt-6 border-t border-wheeler-gray-200 dark:border-wheeler-gray-700"
        >
          <h3
            class="text-sm font-medium text-wheeler-gray-900 dark:text-white mb-3"
          >
            Popular Topics
          </h3>
          <div class="flex flex-wrap gap-2 justify-center">
            <router-link
              to="/?search=AWS"
              class="px-3 py-1 bg-wheeler-gray-100 dark:bg-wheeler-gray-800 text-wheeler-gray-700 dark:text-wheeler-gray-300 text-sm rounded-full hover:bg-wheeler-pink-100 dark:hover:bg-wheeler-pink-900 hover:text-wheeler-pink-700 dark:hover:text-wheeler-pink-300 transition-colors duration-200"
            >
              AWS
            </router-link>
            <router-link
              to="/?search=certification"
              class="px-3 py-1 bg-wheeler-gray-100 dark:bg-wheeler-gray-800 text-wheeler-gray-700 dark:text-wheeler-gray-300 text-sm rounded-full hover:bg-wheeler-pink-100 dark:hover:bg-wheeler-pink-900 hover:text-wheeler-pink-700 dark:hover:text-wheeler-pink-300 transition-colors duration-200"
            >
              Certification
            </router-link>
            <router-link
              to="/?search=development"
              class="px-3 py-1 bg-wheeler-gray-100 dark:bg-wheeler-gray-800 text-wheeler-gray-700 dark:text-wheeler-gray-300 text-sm rounded-full hover:bg-wheeler-pink-100 dark:hover:bg-wheeler-pink-900 hover:text-wheeler-pink-700 dark:hover:text-wheeler-pink-300 transition-colors duration-200"
            >
              Development
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

// Theme is now initialized at app level

onMounted(() => {
  // Theme initialization moved to App.vue
  document.title = 'Page Not Found - Wheeler Universe';
});
</script>
