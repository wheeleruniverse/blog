export interface BlogConfig {
  features: BlogFeature[];
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
}

export interface FilterOptions {
  search: string;
  dateFrom: string;
  dateTo: string;
  sources: string[];
  showCollabOnly: boolean;
  showVideoOnly: boolean;
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
