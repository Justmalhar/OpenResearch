import React from 'react';
import { Search, Image, Youtube, MapPin, Newspaper, ShoppingBag, BookOpen, FileText } from 'lucide-react';
import { SearchSource } from '../types';

interface SourceSelectorProps {
  selectedSource: SearchSource;
  onSourceChange: (source: SearchSource) => void;
}

export function SourceSelector({ selectedSource, onSourceChange }: SourceSelectorProps) {
  const sources: { id: SearchSource; label: string; icon: React.ReactNode }[] = [
    { id: 'search', label: 'الويب', icon: <Search className="w-5 h-5" /> },
    { id: 'images', label: 'الصور', icon: <Image className="w-5 h-5" /> },
    { id: 'videos', label: 'الفيديو', icon: <Youtube className="w-5 h-5" /> },
    { id: 'places', label: 'الأماكن', icon: <MapPin className="w-5 h-5" /> },
    { id: 'news', label: 'الأخبار', icon: <Newspaper className="w-5 h-5" /> },
    { id: 'shopping', label: 'التسوق', icon: <ShoppingBag className="w-5 h-5" /> },
    { id: 'scholar', label: 'البحث العلمي', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'patents', label: 'براءات الاختراع', icon: <FileText className="w-5 h-5" /> },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {sources.map(({ id, label, icon }) => (
        <button
          key={id}
          onClick={() => onSourceChange(id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
            selectedSource === id
              ? 'bg-[#1877F2] text-white shadow-md'
              : 'bg-white text-[#65676B] hover:bg-gray-50'
          }`}
        >
          {icon}
          <span className="font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
}