<template>
  <article
    class="bg-white dark:bg-wheeler-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 sm:p-6 border border-wheeler-gray-200 dark:border-wheeler-gray-700 animate-slide-up overflow-hidden"
  >
    <div class="flex flex-col gap-4">
      <div
        class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
      >
        <div class="flex-1 min-w-0">
          <a
            :href="`/${entry.video ? 'watch' : 'read'}/${entry.slug}`"
            class="text-lg sm:text-xl font-semibold text-wheeler-gray-900 dark:text-white mb-2 leading-tight break-words hover:text-wheeler-purple-600 dark:hover:text-wheeler-purple-400 transition-colors duration-200 block"
          >
            {{ entry.name }}
          </a>
          <div
            class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-sm text-wheeler-gray-600 dark:text-wheeler-gray-400"
          >
            <time
              :datetime="entry.date"
              class="flex items-center gap-1 shrink-0"
            >
              <CalendarIcon class="w-4 h-4" />
              {{ formatDate(entry.date) }}
            </time>
            <span class="flex items-center gap-1 truncate">
              <LinkIcon class="w-4 h-4 shrink-0" />
              <span class="truncate">{{
                entry.sourceDisplayName || getSourceDomain(entry.source)
              }}</span>
            </span>
          </div>
        </div>
        <div class="flex items-center gap-2 w-full sm:w-auto sm:ml-4 shrink-0">
          <a
            v-if="entry.github"
            :href="entry.github"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center px-3 py-2 text-wheeler-gray-600 hover:text-wheeler-gray-900 dark:text-wheeler-gray-400 dark:hover:text-white hover:bg-wheeler-gray-100 dark:hover:bg-wheeler-gray-700 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-wheeler-purple-500 focus:ring-offset-2 dark:focus:ring-offset-wheeler-gray-800 shrink-0"
            :aria-label="`View public GitHub repository for ${entry.name}`"
            title="View public GitHub repository"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
          <button
            @click="copyLocalUrl"
            class="inline-flex items-center justify-center px-3 py-2 text-wheeler-gray-600 hover:text-wheeler-purple-600 dark:text-wheeler-gray-400 dark:hover:text-wheeler-purple-400 hover:bg-wheeler-gray-100 dark:hover:bg-wheeler-gray-700 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-wheeler-purple-500 focus:ring-offset-2 dark:focus:ring-offset-wheeler-gray-800 shrink-0"
            :aria-label="`Copy link to ${entry.name}`"
            :title="copyButtonTitle"
          >
            <ClipboardIcon v-if="!showCopiedFeedback" class="w-4 h-4" />
            <CheckIcon v-else class="w-4 h-4" />
          </button>
          <a
            :href="`/${entry.video ? 'watch' : 'read'}/${entry.slug}`"
            class="inline-flex items-center justify-center px-4 py-2 bg-wheeler-purple-600 hover:bg-wheeler-purple-700 text-white text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-wheeler-purple-500 focus:ring-offset-2 dark:focus:ring-offset-wheeler-gray-800 flex-1 sm:flex-none"
            :aria-label="`Read ${entry.name}`"
          >
            <span class="sm:mr-1">{{
              entry.video ? 'Watch Now' : 'Read More'
            }}</span>
            <ArrowTopRightOnSquareIcon class="w-4 h-4 hidden sm:inline" />
          </a>
        </div>
      </div>

      <!-- Badges Section -->
      <div
        v-if="
          entry.collab || entry.video || (entry.tags && entry.tags.length > 0)
        "
        class="flex items-center gap-2 pt-2 border-t border-wheeler-gray-100 dark:border-wheeler-gray-700 flex-wrap"
      >
        <!-- Collaboration badge -->
        <span
          v-if="entry.collab"
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-wheeler-coral-100 text-wheeler-coral-800 dark:bg-wheeler-coral-900 dark:text-wheeler-coral-200 shrink-0"
        >
          <UsersIcon class="w-3 h-3 mr-1" />
          Collaboration
        </span>

        <!-- Video badge -->
        <span
          v-if="entry.video"
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-wheeler-pink-100 text-wheeler-pink-800 dark:bg-wheeler-pink-900 dark:text-wheeler-pink-200 shrink-0"
        >
          <PlayIcon class="w-3 h-3 mr-1" />
          Video
        </span>

        <!-- Separator between special badges and tags -->
        <span
          v-if="(entry.collab || entry.video) && displayedTags.length > 0"
          class="text-wheeler-gray-400 dark:text-wheeler-gray-500 text-sm shrink-0"
          aria-hidden="true"
        >
          |
        </span>

        <!-- Tags (responsive limit: 3 on mobile, 5 on desktop) -->
        <span
          v-for="tag in displayedTags"
          :key="tag"
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium shrink-0"
          :class="getTagColorClass(tag)"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import type { BlogEntry } from '@/types';
import {
  CalendarIcon,
  LinkIcon,
  UsersIcon,
  ArrowTopRightOnSquareIcon,
  ClipboardIcon,
  CheckIcon,
  PlayIcon,
} from '@heroicons/vue/24/outline';
import { formatDate, getDomainFromUrl } from '@/utils';
import { useBlogData } from '@/composables/useBlogData';

interface Props {
  entry: BlogEntry;
}

const props = defineProps<Props>();

const getSourceDomain = getDomainFromUrl;
const showCopiedFeedback = ref(false);

// Get tag conversion function and config from composable
const { convertTag, blogConfig } = useBlogData();

// Track window width for responsive tag display
const windowWidth = ref(
  typeof window !== 'undefined' ? window.innerWidth : 1024
);

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth;
    window.addEventListener('resize', updateWindowWidth);
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateWindowWidth);
  }
});

// Responsive tag limit: 3 on mobile (<640px), 5 on desktop
// Convert tags to broad or specific based on toggle, and remove duplicates
const displayedTags = computed(() => {
  if (!props.entry.tags) return [];

  // Convert tags and remove duplicates (in broad mode, multiple specific tags may map to same broad)
  const convertedTags = props.entry.tags.map(tag => convertTag(tag));
  const uniqueTags = Array.from(new Set(convertedTags));

  const isMobile = windowWidth.value < 640;
  const limit = isMobile ? 3 : 5;
  return uniqueTags.slice(0, limit);
});

const copyButtonTitle = computed(() =>
  showCopiedFeedback.value ? 'Copied!' : 'Copy local link'
);

const copyLocalUrl = async (): Promise<void> => {
  try {
    const localUrl = `${window.location.origin}/${props.entry.video ? 'watch' : 'read'}/${props.entry.slug}`;
    await navigator.clipboard.writeText(localUrl);

    // Show feedback
    showCopiedFeedback.value = true;
    setTimeout(() => {
      showCopiedFeedback.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy URL:', err);
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = `${window.location.origin}/${props.entry.video ? 'watch' : 'read'}/${props.entry.slug}`;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    // Show feedback
    showCopiedFeedback.value = true;
    setTimeout(() => {
      showCopiedFeedback.value = false;
    }, 2000);
  }
};

// Map tags to color classes from config
const getTagColorClass = (tag: string): string => {
  const tagColorMap = blogConfig.value?.tagColors || {};
  return (
    tagColorMap[tag] ||
    'bg-wheeler-gray-100 text-wheeler-gray-800 dark:bg-wheeler-gray-700 dark:text-wheeler-gray-200'
  );
};
</script>
