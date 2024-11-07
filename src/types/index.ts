export type SearchSource = 'search' | 'arxiv' | 'youtube';

export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  source: SearchSource;
}

export interface SearchResponse {
  searchResults: SearchResult[];
  aiResponse: string;
  isLoading: boolean;
  error: string | null;
}