import React, { useState } from 'react';
import { SearchSource, SearchResult } from './types';
import { searchSerper, generateAIResponse } from './services/api';
import { SearchBar } from './components/SearchBar';
import { SourceSelector } from './components/SourceSelector';
import { SearchResults } from './components/SearchResults';
import { AIResponse } from './components/AIResponse';
import { Globe } from 'lucide-react';

export function App() {
  const [query, setQuery] = useState('');
  const [source, setSource] = useState<SearchSource>('search');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [aiResponse, setAIResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSourceChange = (newSource: SearchSource) => {
    setSource(newSource);
    setResults([]);
    setAIResponse('');
    setError('');
  };

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const searchResults = await searchSerper(query, source);
      setResults(searchResults);
      
      const response = await generateAIResponse(query, searchResults, source);
      setAIResponse(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#F0F2F5] to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Globe className="w-10 h-10 text-[#1877F2]" />
            <h1 className="text-4xl font-bold text-[#1877F2]">
              OpenSearch
            </h1>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <SearchBar
              query={query}
              onQueryChange={setQuery}
              onSearch={handleSearch}
              isLoading={loading}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 flex-grow">
        <div className="max-w-6xl mx-auto">
          {/* Source Selector */}
          <SourceSelector
            selectedSource={source}
            onSourceChange={handleSourceChange}
          />

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1877F2]"></div>
            </div>
          )}

          {/* Results */}
          <div className="space-y-6">
            {aiResponse && !loading && (
              <AIResponse response={aiResponse} />
            )}
            
            {results.length > 0 && !loading && (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Search Results
                </h2>
                <SearchResults results={results} source={source} />
              </>
            )}

            {/* Empty State */}
            {!loading && !results.length && !error && (
              <div className="text-center py-12">
                <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Enter your search query to explore the web
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-500 text-sm">
            OpenSearch - Powered by AI and Open Source Technology
          </p>
        </div>
      </footer>
    </div>
  );
}
