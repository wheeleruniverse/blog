<template>
  <article
    class="bg-white dark:bg-wheeler-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 sm:p-6 border border-wheeler-gray-200 dark:border-wheeler-gray-700 animate-slide-up overflow-hidden"
  >
    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      <div class="flex-1 min-w-0">
        <h2
          class="text-lg sm:text-xl font-semibold text-wheeler-gray-900 dark:text-white mb-2 leading-tight break-words"
        >
          {{ entry.name }}
        </h2>
        <div
          class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-sm text-wheeler-gray-600 dark:text-wheeler-gray-400"
        >
          <time :datetime="entry.date" class="flex items-center gap-1 shrink-0">
            <CalendarIcon class="w-4 h-4" />
            {{ formatDate(entry.date) }}
          </time>
          <span class="flex items-center gap-1 truncate">
            <LinkIcon class="w-4 h-4 shrink-0" />
            <span class="truncate">{{ getSourceDomain(entry.source) }}</span>
          </span>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-2 sm:ml-4 shrink-0">
        <span
          v-if="entry.collab"
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-wheeler-coral-100 text-wheeler-coral-800 dark:bg-wheeler-coral-900 dark:text-wheeler-coral-200 shrink-0"
        >
          <UsersIcon class="w-3 h-3 mr-1" />
          Collaboration
        </span>
        <div class="flex items-center gap-2 w-full sm:w-auto">
          <button
            @click="copyLocalUrl"
            class="inline-flex items-center justify-center px-3 py-2 text-wheeler-gray-600 hover:text-wheeler-purple-600 dark:text-wheeler-gray-400 dark:hover:text-wheeler-purple-400 hover:bg-wheeler-gray-100 dark:hover:bg-wheeler-gray-700 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-wheeler-purple-500 focus:ring-offset-2 dark:focus:ring-offset-wheeler-gray-800 shrink-0"
            :aria-label="`Copy link to ${entry.name}`"
            :title="copyButtonTitle"
          >
            <ClipboardIcon v-if="!showCopiedFeedback" class="w-4 h-4" />
            <CheckIcon v-else class="w-4 h-4" />
          </button>
          <button
            @click="openBlog"
            class="inline-flex items-center justify-center px-4 py-2 bg-wheeler-purple-600 hover:bg-wheeler-purple-700 text-white text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-wheeler-purple-500 focus:ring-offset-2 dark:focus:ring-offset-wheeler-gray-800 flex-1 sm:flex-none"
            :aria-label="`Read ${entry.name}`"
          >
            <span class="sm:mr-1">Read More</span>
            <ArrowTopRightOnSquareIcon class="w-4 h-4 hidden sm:inline" />
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import type { BlogEntry } from '@/types';
import {
  CalendarIcon,
  LinkIcon,
  UsersIcon,
  ArrowTopRightOnSquareIcon,
  ClipboardIcon,
  CheckIcon,
} from '@heroicons/vue/24/outline';
import { formatDate, getDomainFromUrl } from '@/utils';

interface Props {
  entry: BlogEntry;
}

const props = defineProps<Props>();
const router = useRouter();

const getSourceDomain = getDomainFromUrl;
const showCopiedFeedback = ref(false);

const copyButtonTitle = computed(() =>
  showCopiedFeedback.value ? 'Copied!' : 'Copy local link'
);

const openBlog = (): void => {
  router.push(`/${props.entry.slug}`);
};

const copyLocalUrl = async (): Promise<void> => {
  try {
    const localUrl = `${window.location.origin}/${props.entry.slug}`;
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
    textarea.value = `${window.location.origin}/${props.entry.slug}`;
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
</script>
