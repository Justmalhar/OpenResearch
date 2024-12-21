import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export function SearchBar({ query, onQueryChange, onSearch, isLoading }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="ماذا تريد أن تبحث عنه؟"
          className="w-full px-6 py-4 text-lg rounded-full border border-gray-300 focus:border-[#1877F2] focus:ring-2 focus:ring-[#1877F2]/20 transition-all pr-14 bg-white shadow-sm hover:shadow-md text-right font-tajawal"
          dir="rtl"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          title="Search"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 text-[#1877F2] hover:bg-[#1877F2]/10 rounded-full transition-colors"
        >
          <Search className="w-6 h-6" />
        </button>
      </div>
    </form>
  );
}