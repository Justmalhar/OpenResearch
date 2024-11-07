import React from 'react';
import { SearchResult } from '../../types';
import { BookOpen, Users } from 'lucide-react';

export function ScholarResult({ result }: { result: SearchResult }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <a href={result.link} target="_blank" rel="noopener noreferrer" className="block">
        <h3 className="text-lg font-semibold text-[#1877F2] mb-2 hover:underline">
          {result.title}
        </h3>
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
          {result.authors && result.authors.length > 0 && (
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {result.authors.join(', ')}
            </span>
          )}
          {result.year && (
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {result.year}
            </span>
          )}
        </div>
        <p className="text-gray-600">{result.snippet}</p>
        {result.publisher && (
          <p className="text-sm text-gray-500 mt-2">
            Published in: {result.publisher}
          </p>
        )}
      </a>
    </div>
  );
}