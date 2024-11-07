import React from 'react';
import { SearchResult } from '../../types';
import { MapPin, Star } from 'lucide-react';

export function PlaceResult({ result }: { result: SearchResult }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <a href={result.link} target="_blank" rel="noopener noreferrer" className="block">
        <h3 className="text-lg font-semibold text-[#1877F2] mb-2">
          {result.title}
        </h3>
        {result.address && (
          <p className="text-gray-600 flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4" />
            {result.address}
          </p>
        )}
        <div className="flex items-center gap-4">
          {result.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-medium">{result.rating}</span>
              {result.reviews && (
                <span className="text-gray-500 text-sm">
                  ({result.reviews} reviews)
                </span>
              )}
            </div>
          )}
        </div>
      </a>
    </div>
  );
}