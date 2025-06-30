<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTheme } from '@/composables/useTheme'

// Global app setup
const { initializeTheme } = useTheme()

onMounted(() => {
  initializeTheme()
})
</script>

<style>
/* Global styles are handled in style.css */
</style>
