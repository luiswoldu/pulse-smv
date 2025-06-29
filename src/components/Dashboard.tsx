'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SmallCard } from './dashboard/SmallCard';
import { MediumCard } from './dashboard/MediumCard';
import { LargeCard } from './dashboard/LargeCard';
import { ReelsCard } from './dashboard/ReelsCard';
import { SearchBar } from './dashboard/SearchBar';
import { CreatorPill } from './dashboard/CreatorPill';

interface Creator {
  id: string;
  name: string;
  avatar?: string;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCreators, setSelectedCreators] = useState<Creator[]>([
    { id: '1', name: 'kehaulanisanares', avatar: './avatars/keha.jpg' }
  ]);
  const [activeCreatorId, setActiveCreatorId] = useState('1');

  // Simulate loading
  useState(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  });

  const handleCardClick = (cardName: string) => {
    console.log(`${cardName} card clicked - would expand to detailed view`);
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Implement search functionality here
  };

  const handleRemoveCreator = (creatorId: string) => {
    setSelectedCreators(prev => prev.filter(c => c.id !== creatorId));
    if (activeCreatorId === creatorId) {
      setActiveCreatorId(selectedCreators[0]?.id || '');
    }
  };

  const handleAddCreator = (creator: Creator) => {
    if (!selectedCreators.find(c => c.id === creator.id)) {
      setSelectedCreators(prev => [...prev, creator]);
    }
  };

  const handleSelectCreator = (creatorId: string) => {
    setActiveCreatorId(creatorId);
    setIsLoading(true);
    // Simulate loading new creator data
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Search */}
        <div className="flex justify-between items-start mb-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-foreground mb-2">PI MTRX</h1>
          </motion.div>
          
          <SearchBar 
            onSearch={handleSearch} 
            onAddCreator={(creator) => handleAddCreator({
              id: creator.id,
              name: creator.handle,
              avatar: `./avatars/${creator.handle.replace('@', '')}.jpg`
            })}
            className="py-3" 
          />
        </div>

        {/* Creator Pills */}
        <div className="mb-6 flex flex-wrap gap-2">
          <AnimatePresence>
            {selectedCreators.map((creator) => (
              <motion.div
                key={creator.id}
                layout
                onClick={() => handleSelectCreator(creator.id)}
              >
                <CreatorPill
                  name={creator.name}
                  isActive={creator.id === activeCreatorId}
                  onRemove={() => handleRemoveCreator(creator.id)}
                  avatar={creator.avatar}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dashboard Grid */}
        <div className="space-y-6">
          {/* Row 1 - Large Card (Engagement Trends) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <LargeCard
                title="Engagement Trends"
                subtitle="7-day performance overview"
                isLoading={isLoading}
                onClick={() => handleCardClick('Engagement Trends')}
              />
            </motion.div>
          </motion.div>

          {/* Row 2 - Two Medium Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 xl:grid-cols-2 gap-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <MediumCard
                title="Top Performing Posts"
                value="This Week"
                list={[
                  { label: "Summer Campaign Video", value: "45.2K", change: 15.3 },
                  { label: "Product Launch Carousel", value: "32.8K", change: 8.9 },
                  { label: "Behind the Scenes Story", value: "28.1K", change: -3.2 },
                  { label: "User Generated Content", value: "24.7K", change: 12.1 }
                ]}
                isLoading={isLoading}
                onClick={() => handleCardClick('Top Performing Posts')}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <MediumCard
                title="Platform Breakdown"
                value="All Platforms"
                list={[
                  { label: "Instagram", value: "52.3K", change: 5.7 },
                  { label: "TikTok", value: "38.9K", change: 12.3 },
                  { label: "Twitter", value: "24.1K", change: -1.8 },
                  { label: "LinkedIn", value: "10.4K", change: 8.9 }
                ]}
                isLoading={isLoading}
                onClick={() => handleCardClick('Platform Breakdown')}
              />
            </motion.div>
          </motion.div>

          {/* Row 3 - Three Small Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <SmallCard
                title="Total Followers"
                value={125847}
                change={12.5}
                isLoading={isLoading}
                onClick={() => handleCardClick('Total Followers')}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <SmallCard
                title="Engagement Rate"
                value="4.2%"
                change={-2.1}
                isLoading={isLoading}
                onClick={() => handleCardClick('Engagement Rate')}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <SmallCard
                title="Monthly Reach"
                value={2456789}
                change={8.7}
                isLoading={isLoading}
                onClick={() => handleCardClick('Monthly Reach')}
              />
            </motion.div>
          </motion.div>

          {/* Row 4 - Two Medium Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 xl:grid-cols-2 gap-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <ReelsCard
                title="Top 5 Performing Reels"
                reels={[
                  {
                    id: '1',
                    thumbnail: '/reels/reel1.jpg',
                    views: '1.2M',
                    likes: '45.2K'
                  },
                  {
                    id: '2',
                    thumbnail: '/reels/reel2.jpg',
                    views: '892K',
                    likes: '38.9K'
                  },
                  {
                    id: '3',
                    thumbnail: '/reels/reel3.jpg',
                    views: '756K',
                    likes: '32.1K'
                  },
                  {
                    id: '4',
                    thumbnail: '/reels/reel4.jpg',
                    views: '623K',
                    likes: '28.7K'
                  },
                  {
                    id: '5',
                    thumbnail: '/reels/reel5.jpg',
                    views: '512K',
                    likes: '24.3K'
                  }
                ]}
                isLoading={isLoading}
                onClick={() => handleCardClick('Top 5 Performing Reels')}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <MediumCard
                title="Related"
                value="Conversion Rate"
                list={[
                  { 
                    label: "kehaulanisanares",
                    value: "4.2%",
                    change: 0,
                    avatar: "./avatars/keha.jpg",
                    isReference: true
                  },
                  { 
                    label: "alexsmith",
                    value: "6.3%",
                    change: 50,
                    avatar: "./avatars/alex.jpg",
                    comparison: "1.5x"
                  },
                  { 
                    label: "mariajones",
                    value: "8.4%",
                    change: 100,
                    avatar: "./avatars/maria.jpg",
                    comparison: "2x"
                  },
                  { 
                    label: "davidchen",
                    value: "2.1%",
                    change: -50,
                    avatar: "./avatars/david.jpg",
                    comparison: "0.5x"
                  }
                ]}
                isLoading={isLoading}
                onClick={() => handleCardClick('Related')}
              />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 py-4 text-center text-sm text-gray-500 border-t border-gray-100"
        >
          Disclaimer: This is not financial advice. Investments carry risks.
        </motion.div>
      </div>
    </div>
  );
} 