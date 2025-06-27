<template>
  <button
    @click="toggleTheme"
    class="relative inline-flex items-center justify-center w-10 h-10 rounded-md text-wheeler-gray-500 hover:text-wheeler-gray-900 hover:bg-wheeler-gray-100 dark:text-wheeler-gray-400 dark:hover:text-white dark:hover:bg-wheeler-gray-700 focus:outline-none focus:ring-2 focus:ring-wheeler-purple-500 transition-colors duration-200"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <transition name="theme-icon" mode="out-in">
      <SunIcon v-if="isDark" key="sun" class="w-5 h-5" />
      <MoonIcon v-else key="moon" class="w-5 h-5" />
    </transition>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()

const isDark = computed(() => theme.value.isDark)
</script>

<style scoped>
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: all 0.2s ease-in-out;
}

.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.8);
}

.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.8);
}

.theme-icon-enter-to,
.theme-icon-leave-from {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}
</style>
