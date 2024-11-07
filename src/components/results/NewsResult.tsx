import React from 'react';
import { SearchResult } from '../../types';

export function NewsResult({ result }: { result: SearchResult }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex">
      {result.imageUrl && (
        <div className="w-48 flex-shrink-0">
          <img 
            src={result.imageUrl} 
            alt={result.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-6 flex-grow">
        <a href={result.link} target="_blank" rel="noopener noreferrer" className="block">
          <h3 className="text-lg font-semibold text-[#1877F2] mb-2 hover:underline">
            {result.title}
          </h3>
          <p className="text-gray-600 line-clamp-2">{result.snippet}</p>
        </a>
      </div>
    </div>
  );
}