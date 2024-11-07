import React from 'react';
import { SearchResult } from '../../types';
import { Star } from 'lucide-react';

export function ShoppingResult({ result }: { result: SearchResult }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <a href={result.link} target="_blank" rel="noopener noreferrer" className="block">
        {result.imageUrl && (
          <div className="aspect-square overflow-hidden">
            <img 
              src={result.imageUrl} 
              alt={result.title}
              className="w-full h-full object-contain p-4"
              loading="lazy"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {result.title}
          </h3>
          {result.price && (
            <p className="text-lg font-bold text-[#1877F2] mb-2">
              {result.price}
            </p>
          )}
          {result.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-medium">{result.rating}</span>
            </div>
          )}
        </div>
      </a>
    </div>
  );
}