import type {
  AppError,
  BlogConfig,
  BlogEntry,
  FilterOptions,
  LoadingState,
} from '@/types';
import { computed, ref, type Ref } from 'vue';

export function useBlogData() {
  const blogConfig: Ref<BlogConfig | null> = ref(null);
  const loading: Ref<LoadingState> = ref('idle');
  const error: Ref<AppError | null> = ref(null);

  const filters: Ref<FilterOptions> = ref({
    search: '',
    dateFrom: '',
    dateTo: '',
    datePreset: '',
    sources: [],
    tags: [],
    showCollabOnly: false,
    showVideoOnly: false,
    showGithubOnly: false,
  });

  // Toggle for specific vs. broad tag display
  const useSpecificTags = ref(true);

  // Get tag mapping from config
  const tagMapping = computed(() => {
    return blogConfig.value?.tagMapping || {};
  });

  // Convert tag to broad or specific based on toggle
  const convertTag = (tag: string): string => {
    return useSpecificTags.value ? tag : (tagMapping.value[tag] || tag);
  };

  // Get all specific tags that map to a broad category (for filtering)
  const getSpecificTagsForBroad = (tagToCheck: string): string[] => {
    if (useSpecificTags.value) return [tagToCheck];

    const specificTags = Object.entries(tagMapping.value)
      .filter(([_, broad]) => broad === tagToCheck)
      .map(([specific, _]) => specific);

    return specificTags.length > 0 ? specificTags : [tagToCheck];
  };

  const loadBlogData = async (): Promise<void> => {
    loading.value = 'loading';
    error.value = null;

    try {
      const response = await fetch('/blog-config.json');
      if (!response.ok) {
        throw new Error(`Failed to load blog data: ${response.statusText}`);
      }

      const data: BlogConfig = await response.json();
      blogConfig.value = data;
      loading.value = 'success';
    } catch (err) {
      error.value = {
        message:
          err instanceof Error ? err.message : 'Failed to load blog data',
        details: err,
      };
      loading.value = 'error';
    }
  };

  const sortedBlogEntries = computed((): BlogEntry[] => {
    if (!blogConfig.value?.data) return [];

    return [...blogConfig.value.data].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  });

  const filteredBlogEntries = computed((): BlogEntry[] => {
    let entries = sortedBlogEntries.value;

    // Search filter
    if (filters.value.search) {
      const searchTerm = filters.value.search.toLowerCase();
      entries = entries.filter(entry =>
        entry.name.toLowerCase().includes(searchTerm)
      );
    }

    // Date range filter
    if (filters.value.dateFrom) {
      entries = entries.filter(entry => entry.date >= filters.value.dateFrom);
    }

    if (filters.value.dateTo) {
      entries = entries.filter(entry => entry.date <= filters.value.dateTo);
    }

    // Source filter
    if (filters.value.sources.length > 0) {
      entries = entries.filter(entry => {
        const sourceToCheck =
          entry.sourceDisplayName || new URL(entry.source).hostname;
        return filters.value.sources.includes(sourceToCheck);
      });
    }

    // Collaboration filter
    if (filters.value.showCollabOnly) {
      entries = entries.filter(entry => entry.collab === true);
    }

    // Video filter
    if (filters.value.showVideoOnly) {
      entries = entries.filter(entry => entry.video === true);
    }

    // GitHub filter
    if (filters.value.showGithubOnly) {
      entries = entries.filter(entry => !!entry.github);
    }

    // Tags filter (OR logic - entry matches if it has ANY of the selected tags)
    // When using broad tags, match against all specific tags that map to the broad category
    if (filters.value.tags.length > 0) {
      entries = entries.filter(entry => {
        if (!entry.tags || entry.tags.length === 0) return false;
        return filters.value.tags.some(selectedTag => {
          const specificTagsToMatch = getSpecificTagsForBroad(selectedTag);
          return specificTagsToMatch.some(specificTag =>
            entry.tags!.includes(specificTag)
          );
        });
      });
    }

    return entries;
  });

  const availableSources = computed((): string[] => {
    if (!blogConfig.value?.data) return [];

    const sources = new Set<string>();
    blogConfig.value.data.forEach(entry => {
      if (entry.sourceDisplayName) {
        sources.add(entry.sourceDisplayName);
      } else {
        try {
          const domain = new URL(entry.source).hostname;
          sources.add(domain);
        } catch {
          // Ignore invalid URLs
        }
      }
    });

    return Array.from(sources).sort();
  });

  const availableTags = computed((): string[] => {
    if (!blogConfig.value?.data) return [];

    const tags = new Set<string>();
    blogConfig.value.data.forEach(entry => {
      if (entry.tags) {
        entry.tags.forEach(tag => tags.add(tag));
      }
    });

    return Array.from(tags).sort();
  });

  const isFeatureEnabled = (featureName: string): boolean => {
    if (!blogConfig.value?.features) return false;

    const feature = blogConfig.value.features.find(f => f.name === featureName);
    return feature?.enabled === true;
  };

  const findBlogBySlug = (slug: string): BlogEntry | undefined => {
    return blogConfig.value?.data.find(entry => entry.slug === slug);
  };

  return {
    blogConfig,
    loading,
    error,
    filters,
    loadBlogData,
    sortedBlogEntries,
    filteredBlogEntries,
    availableSources,
    availableTags,
    isFeatureEnabled,
    findBlogBySlug,
    useSpecificTags,
    convertTag,
    tagMapping,
  };
}
