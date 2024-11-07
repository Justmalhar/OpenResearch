export type SearchSource = 
  | 'search' 
  | 'images' 
  | 'videos' 
  | 'places' 
  | 'news' 
  | 'shopping' 
  | 'scholar' 
  | 'patents';

export interface SearchResult {
  title: string;
  link: string;
  snippet?: string;
  imageUrl?: string;
  thumbnail?: string;
  duration?: string;
  channel?: string;
  views?: string;
  rating?: string;
  reviews?: string;
  price?: string;
  address?: string;
  authors?: string[];
  year?: string;
  publisher?: string;
}