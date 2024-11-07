import React from 'react';
import { SearchResult } from '../../types';

export function WebResult({ result }: { result: SearchResult }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <a href={result.link} target="_blank" rel="noopener noreferrer" className="block">
        <h3 className="text-lg font-semibold text-[#1877F2] mb-2 hover:underline">
          {result.title}
        </h3>
        <p className="text-gray-600">{result.snippet}</p>
        <span className="text-sm text-green-700 hover:underline mt-2 block">
          {result.link}
        </span>
      </a>
    </div>
  );
}