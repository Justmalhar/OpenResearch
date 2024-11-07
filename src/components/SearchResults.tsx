import React from 'react';
import { SearchResult, SearchSource } from '../types';
import { WebResult } from './results/WebResult';
import { ImageResult } from './results/ImageResult';
import { VideoResult } from './results/VideoResult';
import { PlaceResult } from './results/PlaceResult';
import { NewsResult } from './results/NewsResult';
import { ShoppingResult } from './results/ShoppingResult';
import { ScholarResult } from './results/ScholarResult';

interface SearchResultsProps {
  results: SearchResult[];
  source: SearchSource;
}

export function SearchResults({ results, source }: SearchResultsProps) {
  const getResultComponent = (result: SearchResult) => {
    switch (source) {
      case 'search':
        return <WebResult result={result} />;
      case 'images':
        return <ImageResult result={result} />;
      case 'videos':
        return <VideoResult result={result} />;
      case 'places':
        return <PlaceResult result={result} />;
      case 'news':
        return <NewsResult result={result} />;
      case 'shopping':
        return <ShoppingResult result={result} />;
      case 'scholar':
      case 'patents':
        return <ScholarResult result={result} />;
      default:
        return <WebResult result={result} />;
    }
  };

  const getGridClass = () => {
    switch (source) {
      case 'images':
        return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
      case 'videos':
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8';
      case 'shopping':
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      default:
        return 'grid-cols-1';
    }
  };

  return (
    <div className={`grid gap-6 ${getGridClass()}`}>
      {results.map((result, index) => (
        <div key={`${result.link}-${index}`} className="h-full">
          {getResultComponent(result)}
        </div>
      ))}
    </div>
  );
}