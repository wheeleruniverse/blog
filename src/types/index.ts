export interface BlogConfig {
  features: BlogFeature[];
  tagMapping: Record<string, string>;
  tagColors: Record<string, string>;
  data: BlogEntry[];
}

export interface BlogFeature {
  enabled?: boolean; // disabled: false/undefined, enabled: true
  name: string;
}

export interface BlogEntry {
  collab?: boolean; // sole author: false/undefined, co-author: true
  date: string; // YYYY-MM-DD format
  name: string;
  slug: string;
  source: string; // Original blog URL
  sourceDisplayName?: string; // Display name for source (e.g., "YouTube", "Personal Blog")
  video?: boolean; // written content: false/undefined, video: true
  github?: string; // GitHub repository URL
  tags?: string[]; // Tags for the blog post (e.g., "TypeScript", "AWS", "Azure")
}

export interface FilterOptions {
  search: string;
  dateFrom: string;
  dateTo: string;
  datePreset: string; // For 1-click date filters like "1month", "3months", "2024", etc.
  sources: string[];
  tags: string[];
  showCollabOnly: boolean;
  showVideoOnly: boolean;
  showGithubOnly: boolean;
}

export interface ThemeState {
  isDark: boolean;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AppError {
  message: string;
  code?: string;
  details?: unknown;
}
