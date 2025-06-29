'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, UserCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Creator {
  id: string;
  name: string;
  handle: string;
  followers: string;
}

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onAddCreator?: (creator: Creator) => void;
  className?: string;
}

const SUGGESTED_CREATORS: Creator[] = [
  { id: '1', name: 'Emma Thompson', handle: '@emmacreates', followers: '1.2M' },
  { id: '2', name: 'Alex Rivera', handle: '@alexrtv', followers: '892K' },
  { id: '3', name: 'Sarah Chen', handle: '@sarahcreative', followers: '756K' },
  { id: '4', name: 'Mike Johnson', handle: '@mikej', followers: '623K' },
  { id: '5', name: 'Lisa Parker', handle: '@lisaparker', followers: '512K' },
];

export function SearchBar({ onSearch, onAddCreator, className = "" }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [expandedHeight, setExpandedHeight] = useState('40px');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setExpandedHeight('320px');
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Prevent closing if clicking inside the expanded area
    if (e.currentTarget.contains(e.relatedTarget as Node)) {
      return;
    }
    setIsFocused(false);
    setExpandedHeight('40px');
  };

  const handleAddToWatchlist = (creator: Creator) => {
    if (onAddCreator) {
      onAddCreator(creator);
    }
    setIsFocused(false);
    setExpandedHeight('40px');
    setSearchValue('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative ${className}`}
    >
      <Card 
        className="w-[300px] pulse-card-bg rounded-xl border-0 shadow-sm overflow-hidden"
        tabIndex={0}
        onBlur={handleBlur}
      >
        <motion.div
          animate={{ height: expandedHeight }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex items-center px-4 h-[40px] gap-3">
            <Search 
              className={`w-4 h-4 transition-colors ${
                isFocused ? 'text-foreground' : 'text-muted-foreground'
              }`}
            />
            <input
              type="text"
              placeholder="Search creators"
              className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
              value={searchValue}
              onChange={handleSearch}
              onFocus={handleFocus}
            />
          </div>

          <AnimatePresence>
            {isFocused && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-2 pb-2"
              >
                <div className="text-xs text-muted-foreground px-2 py-2">Suggested Creators</div>
                <div className="space-y-1">
                  {SUGGESTED_CREATORS.map((creator) => (
                    <motion.div
                      key={creator.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center justify-between p-2 hover:bg-accent rounded-lg cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <UserCircle className="w-8 h-8 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium text-foreground">{creator.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {creator.handle} • {creator.followers} followers
                          </div>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToWatchlist(creator)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Plus className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Card>
    </motion.div>
  );
} 