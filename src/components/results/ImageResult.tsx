import React from 'react';
import { SearchResult } from '../../types';

export function ImageResult({ result }: { result: SearchResult }) {
  return (
    <div className="group relative">
      <a href={result.link} target="_blank" rel="noopener noreferrer" 
         className="block aspect-square overflow-hidden rounded-lg">
        <img 
          src={result.imageUrl} 
          alt={result.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <h3 className="text-white text-sm truncate">{result.title}</h3>
        </div>
      </a>
    </div>
  );
}