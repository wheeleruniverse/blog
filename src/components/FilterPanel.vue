<template>
  <div
    class="bg-white dark:bg-wheeler-gray-800 rounded-lg shadow-sm border border-wheeler-gray-200 dark:border-wheeler-gray-700 p-6"
  >
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <h3 class="text-lg font-medium text-wheeler-gray-900 dark:text-white">
          Filters
        </h3>
        <button
          @click="toggleCollapsed"
          class="p-1 rounded-md hover:bg-wheeler-gray-100 dark:hover:bg-wheeler-gray-700 transition-colors duration-200"
          :aria-label="isCollapsed ? 'Expand filters' : 'Collapse filters'"
        >
          <ChevronDownIcon
            v-if="isCollapsed"
            class="w-5 h-5 text-wheeler-gray-500 dark:text-wheeler-gray-400"
          />
          <ChevronUpIcon
            v-else
            class="w-5 h-5 text-wheeler-gray-500 dark:text-wheeler-gray-400"
          />
        </button>
      </div>
      <button
        v-if="hasActiveFilters"
        @click="clearAllFilters"
        class="text-sm text-wheeler-purple-600 hover:text-wheeler-purple-700 dark:text-wheeler-purple-400 dark:hover:text-wheeler-purple-300 underline"
      >
        Clear all
      </button>
    </div>

    <!-- Active Filters Display for Collapsed View -->
    <div
      v-if="isCollapsed && hasActiveFilters"
      class="mt-4 transition-all duration-300 ease-in-out"
    >
      <div class="flex flex-wrap gap-2">
        <span
          v-if="localFilters.datePreset"
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-wheeler-coral-100 text-wheeler-coral-800 dark:bg-wheeler-coral-900 dark:text-wheeler-coral-200"
        >
          {{ getDatePresetLabel(localFilters.datePreset) }}
          <button
            @click="setDatePreset('')"
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
        <span
          v-if="localFilters.showVideoOnly"
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-wheeler-coral-100 text-wheeler-coral-800 dark:bg-wheeler-coral-900 dark:text-wheeler-coral-200"
        >
          Videos only
          <button
            @click="localFilters.showVideoOnly = false"
            class="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-wheeler-coral-200 dark:hover:bg-wheeler-coral-800"
          >
            <XMarkIcon class="w-3 h-3" />
          </button>
        </span>
        <span
          v-if="localFilters.showGithubOnly"
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-wheeler-coral-100 text-wheeler-coral-800 dark:bg-wheeler-coral-900 dark:text-wheeler-coral-200"
        >
          Public repos only
          <button
            @click="localFilters.showGithubOnly = false"
            class="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-wheeler-coral-200 dark:hover:bg-wheeler-coral-800"
          >
            <XMarkIcon class="w-3 h-3" />
          </button>
        </span>
        <span
          v-for="tag in localFilters.tags"
          :key="tag"
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-wheeler-coral-100 text-wheeler-coral-800 dark:bg-wheeler-coral-900 dark:text-wheeler-coral-200"
        >
          {{ tag }}
          <button
            @click="removeTag(tag)"
            class="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-wheeler-coral-200 dark:hover:bg-wheeler-coral-800"
          >
            <XMarkIcon class="w-3 h-3" />
          </button>
        </span>
      </div>
    </div>

    <div
      class="overflow-hidden transition-all duration-300 ease-in-out"
      :class="isCollapsed ? 'max-h-0' : 'max-h-[4000px]'"
    >
      <div class="space-y-6">
        <!-- Date Filter -->
        <div>
          <label
            class="block text-sm font-medium text-wheeler-gray-700 dark:text-wheeler-gray-300 mb-2"
          >
            Time Period
          </label>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="preset in datePresets"
              :key="preset.value"
              @click="setDatePreset(preset.value)"
              :class="[
                'px-3 py-2 text-sm font-medium rounded-md border transition-colors duration-200',
                localFilters.datePreset === preset.value
                  ? 'bg-wheeler-purple-600 text-white border-wheeler-purple-600'
                  : 'bg-white dark:bg-wheeler-gray-700 text-wheeler-gray-700 dark:text-wheeler-gray-300 border-wheeler-gray-300 dark:border-wheeler-gray-600 hover:bg-wheeler-gray-50 dark:hover:bg-wheeler-gray-600',
              ]"
            >
              {{ preset.label }}
            </button>
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

        <!-- Video Filter -->
        <div>
          <label class="flex items-center">
            <input
              v-model="localFilters.showVideoOnly"
              type="checkbox"
              class="h-4 w-4 text-wheeler-purple-600 focus:ring-wheeler-purple-500 border-wheeler-gray-300 dark:border-wheeler-gray-600 rounded"
            />
            <span
              class="ml-2 text-sm text-wheeler-gray-700 dark:text-wheeler-gray-300"
            >
              Show videos only
            </span>
          </label>
        </div>

        <!-- GitHub Filter -->
        <div>
          <label class="flex items-center">
            <input
              v-model="localFilters.showGithubOnly"
              type="checkbox"
              class="h-4 w-4 text-wheeler-purple-600 focus:ring-wheeler-purple-500 border-wheeler-gray-300 dark:border-wheeler-gray-600 rounded"
            />
            <span
              class="ml-2 text-sm text-wheeler-gray-700 dark:text-wheeler-gray-300"
            >
              Show public GitHub repositories only
            </span>
          </label>
        </div>

        <!-- Source Filter -->
        <div v-if="sortedAvailableSources.length > 0">
          <label
            class="block text-sm font-medium text-wheeler-gray-700 dark:text-wheeler-gray-300 mb-2"
          >
            Source
          </label>
          <div class="space-y-2">
            <label
              v-for="source in sortedAvailableSources"
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
                <span class="text-wheeler-gray-500 dark:text-wheeler-gray-400">
                  ({{ sourceCounts[source] || 0 }})
                </span>
              </span>
            </label>
          </div>
        </div>

        <!-- Tags Filter (Grouped & Collapsible) -->
        <div v-if="availableTags.length > 0">
          <label
            class="block text-sm font-medium text-wheeler-gray-700 dark:text-wheeler-gray-300 mb-3"
          >
            Tags
          </label>
          <div class="space-y-3">
            <div
              v-for="category in tagCategories"
              :key="category.name"
              v-show="category.tags.length > 0"
              class="border border-wheeler-gray-200 dark:border-wheeler-gray-700 rounded-md overflow-hidden"
            >
              <button
                @click="toggleCategoryCollapsed(category.name)"
                class="w-full flex items-center justify-between px-3 py-2 bg-wheeler-gray-50 dark:bg-wheeler-gray-750 hover:bg-wheeler-gray-100 dark:hover:bg-wheeler-gray-700 transition-colors duration-200"
              >
                <h4
                  class="text-xs font-semibold text-wheeler-gray-600 dark:text-wheeler-gray-400 uppercase tracking-wide"
                >
                  {{ category.name }}
                </h4>
                <ChevronDownIcon
                  v-if="collapsedCategories.has(category.name)"
                  class="w-4 h-4 text-wheeler-gray-500 dark:text-wheeler-gray-400"
                />
                <ChevronUpIcon
                  v-else
                  class="w-4 h-4 text-wheeler-gray-500 dark:text-wheeler-gray-400"
                />
              </button>
              <div
                class="overflow-hidden transition-all duration-300 ease-in-out"
                :class="
                  collapsedCategories.has(category.name)
                    ? 'max-h-0'
                    : 'max-h-[500px]'
                "
              >
                <div class="space-y-2 p-3">
                  <label
                    v-for="tag in category.tags"
                    :key="tag"
                    class="flex items-center"
                  >
                    <input
                      v-model="localFilters.tags"
                      :value="tag"
                      type="checkbox"
                      class="h-4 w-4 text-wheeler-purple-600 focus:ring-wheeler-purple-500 border-wheeler-gray-300 dark:border-wheeler-gray-600 rounded"
                    />
                    <span
                      class="ml-2 text-sm text-wheeler-gray-700 dark:text-wheeler-gray-300"
                    >
                      {{ tag }}
                      <span
                        class="text-wheeler-gray-500 dark:text-wheeler-gray-400"
                      >
                        ({{ tagCounts[tag] || 0 }})
                      </span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
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
              v-if="localFilters.datePreset"
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-wheeler-coral-100 text-wheeler-coral-800 dark:bg-wheeler-coral-900 dark:text-wheeler-coral-200"
            >
              {{ getDatePresetLabel(localFilters.datePreset) }}
              <button
                @click="setDatePreset('')"
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
            <span
              v-if="localFilters.showVideoOnly"
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-wheeler-coral-100 text-wheeler-coral-800 dark:bg-wheeler-coral-900 dark:text-wheeler-coral-200"
            >
              Videos only
              <button
                @click="localFilters.showVideoOnly = false"
                class="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-wheeler-coral-200 dark:hover:bg-wheeler-coral-800"
              >
                <XMarkIcon class="w-3 h-3" />
              </button>
            </span>
            <span
              v-if="localFilters.showGithubOnly"
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-wheeler-coral-100 text-wheeler-coral-800 dark:bg-wheeler-coral-900 dark:text-wheeler-coral-200"
            >
              Public repos only
              <button
                @click="localFilters.showGithubOnly = false"
                class="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-wheeler-coral-200 dark:hover:bg-wheeler-coral-800"
              >
                <XMarkIcon class="w-3 h-3" />
              </button>
            </span>
            <span
              v-for="tag in localFilters.tags"
              :key="tag"
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-wheeler-coral-100 text-wheeler-coral-800 dark:bg-wheeler-coral-900 dark:text-wheeler-coral-200"
            >
              {{ tag }}
              <button
                @click="removeTag(tag)"
                class="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-wheeler-coral-200 dark:hover:bg-wheeler-coral-800"
              >
                <XMarkIcon class="w-3 h-3" />
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref, onMounted } from 'vue';
import type { FilterOptions, BlogEntry } from '@/types';
import {
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/vue/24/outline';

interface Props {
  filters: FilterOptions;
  availableSources: string[];
  availableTags: string[];
  allEntries: BlogEntry[];
}

interface Emits {
  (e: 'update:filters', filters: FilterOptions): void;
  (e: 'update:collapsed', collapsed: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Collapsible state
const isCollapsed = ref(false);
const collapsedCategories = ref(new Set<string>());

// Set initial collapsed state based on screen size
const setInitialCollapsedState = () => {
  // Collapsed on mobile (< 768px), expanded on tablet/desktop
  isCollapsed.value = window.innerWidth < 768;
};

const toggleCollapsed = () => {
  isCollapsed.value = !isCollapsed.value;
  emit('update:collapsed', isCollapsed.value);
};

const toggleCategoryCollapsed = (categoryName: string) => {
  if (collapsedCategories.value.has(categoryName)) {
    collapsedCategories.value.delete(categoryName);
  } else {
    collapsedCategories.value.add(categoryName);
  }
  // Force reactivity by creating a new Set
  collapsedCategories.value = new Set(collapsedCategories.value);
};

onMounted(() => {
  setInitialCollapsedState();
  emit('update:collapsed', isCollapsed.value);
});

const localFilters = computed({
  get: () => props.filters,
  set: (value: FilterOptions) => emit('update:filters', value),
});

// Count how many blog posts have each source
const sourceCounts = computed(() => {
  const counts: Record<string, number> = {};
  if (!props.allEntries) return counts;

  props.allEntries.forEach(entry => {
    const source = entry.sourceDisplayName;
    if (source) {
      counts[source] = (counts[source] || 0) + 1;
    }
  });

  return counts;
});

// Sort sources alphabetically
const sortedAvailableSources = computed(() => {
  return [...props.availableSources].sort((a, b) => a.localeCompare(b));
});

// Get available years from data
const availableYears = computed(() => {
  if (!props.allEntries || props.allEntries.length === 0) return [];

  const years = new Set<string>();
  props.allEntries.forEach(entry => {
    const year = new Date(entry.date).getFullYear().toString();
    years.add(year);
  });

  return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a)); // Descending order
});

// Static presets + dynamic years
const datePresets = computed(() => {
  const staticPresets = [
    { label: 'All Time', value: '' },
    { label: '3 Months', value: '3months' },
    { label: '6 Months', value: '6months' },
    { label: '1 Year', value: '1year' },
  ];

  const yearPresets = availableYears.value.map(year => ({
    label: year,
    value: year,
  }));

  return [...staticPresets, ...yearPresets];
});

// Count how many blog posts have each tag
const tagCounts = computed(() => {
  const counts: Record<string, number> = {};
  if (!props.allEntries) return counts;

  props.allEntries.forEach(entry => {
    if (entry.tags) {
      entry.tags.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    }
  });

  return counts;
});

// Categorize tags for better UX (alphabetized)
const tagCategories = computed(() => {
  const categories = [
    {
      name: 'AWS Services',
      tags: [
        'Lambda',
        'S3',
        'CloudFront',
        'Route53',
        'ECR',
        'CloudWatch',
        'X-Ray',
        'SageMaker',
        'Lightsail',
      ],
    },
    {
      name: 'Azure & GCP Services',
      tags: ['Functions', '.NET', 'Cloud Run', 'Cloud Functions', 'Firebase'],
    },
    {
      name: 'Career & Learning',
      tags: ['Certification', 'Career Development', 'Leadership', 'Learning'],
    },
    {
      name: 'Cloud Providers',
      tags: ['AWS', 'Azure', 'GCP'],
    },
    {
      name: 'Concepts & Practices',
      tags: [
        'Serverless',
        'AI',
        'Machine Learning',
        'Multi-Cloud',
        'FinOps',
        'Cost Optimization',
        'ETL',
        'Data Engineering',
        'Cloud Strategy',
      ],
    },
    {
      name: 'Frameworks & Tools',
      tags: ['Vue', 'Next.js', 'Blazor', 'Vite', 'Tailwind'],
    },
    {
      name: 'Infrastructure & DevOps',
      tags: [
        'Terraform',
        'IaC',
        'CI/CD',
        'DevOps',
        'Docker',
        'Containers',
        'GitHub Actions',
        'SAM',
      ],
    },
    {
      name: 'Platforms',
      tags: ['Vercel', 'Bref', 'Claude', 'Pluralsight'],
    },
    {
      name: 'Programming Languages',
      tags: ['TypeScript', 'JavaScript', 'Python', 'Ruby', 'C#', 'PHP', 'Java'],
    },
    {
      name: 'Technical Topics',
      tags: [
        'Performance',
        'Networking',
        'Storage',
        'CDN',
        'DNS',
        'Engineering',
        'Hiring',
        'Getting Started',
        'Tech Industry',
        'Cloud',
      ],
    },
  ];

  // Filter each category to only include tags that are actually available and have count > 0
  // Sort categories alphabetically by name, and tags within each category alphabetically
  return categories
    .map(category => ({
      name: category.name,
      tags: category.tags
        .filter(
          tag =>
            props.availableTags.includes(tag) && (tagCounts.value[tag] || 0) > 0
        )
        .sort((a, b) => a.localeCompare(b)),
    }))
    .filter(category => category.tags.length > 0)
    .sort((a, b) => a.name.localeCompare(b.name));
});

const setDatePreset = (preset: string) => {
  const now = new Date();
  let dateFrom = '';
  let dateTo = '';

  if (preset === '3months') {
    const threeMonthsAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 3,
      now.getDate()
    );
    dateFrom = threeMonthsAgo.toISOString().split('T')[0];
    dateTo = now.toISOString().split('T')[0];
  } else if (preset === '6months') {
    const sixMonthsAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 6,
      now.getDate()
    );
    dateFrom = sixMonthsAgo.toISOString().split('T')[0];
    dateTo = now.toISOString().split('T')[0];
  } else if (preset === '1year') {
    const oneYearAgo = new Date(
      now.getFullYear() - 1,
      now.getMonth(),
      now.getDate()
    );
    dateFrom = oneYearAgo.toISOString().split('T')[0];
    dateTo = now.toISOString().split('T')[0];
  } else if (preset && preset.match(/^\d{4}$/)) {
    // Year preset
    dateFrom = `${preset}-01-01`;
    dateTo = `${preset}-12-31`;
  }
  // For empty preset (All Time), both dates remain empty

  localFilters.value = {
    ...localFilters.value,
    dateFrom,
    dateTo,
    datePreset: preset,
  };
};

const hasActiveFilters = computed(() => {
  return !!(
    localFilters.value.dateFrom ||
    localFilters.value.dateTo ||
    localFilters.value.datePreset ||
    localFilters.value.sources.length > 0 ||
    localFilters.value.tags.length > 0 ||
    localFilters.value.showCollabOnly ||
    localFilters.value.showVideoOnly ||
    localFilters.value.showGithubOnly
  );
});

const clearAllFilters = () => {
  localFilters.value = {
    search: localFilters.value.search, // Keep search term
    dateFrom: '',
    dateTo: '',
    datePreset: '',
    sources: [],
    tags: [],
    showCollabOnly: false,
    showVideoOnly: false,
    showGithubOnly: false,
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

const removeTag = (tagToRemove: string) => {
  localFilters.value = {
    ...localFilters.value,
    tags: localFilters.value.tags.filter(tag => tag !== tagToRemove),
  };
};

const getDatePresetLabel = (preset: string): string => {
  const presetObj = datePresets.value.find(p => p.value === preset);
  return presetObj?.label || preset;
};

// Watch for changes and emit updates
watch(
  localFilters,
  newFilters => {
    emit('update:filters', newFilters);
  },
  { deep: true }
);

defineExpose({
  isCollapsed,
  setInitialCollapsedState,
});
</script>
