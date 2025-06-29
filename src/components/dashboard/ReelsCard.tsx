'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface ReelItem {
  id: string;
  thumbnail: string;
  views: string;
  likes: string;
}

interface ReelsCardProps {
  title: string;
  reels: ReelItem[];
  isLoading?: boolean;
  onClick?: () => void;
  className?: string;
}

const ReelThumbnail = ({ reel }: { reel: ReelItem }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative flex-shrink-0 w-[120px] h-[213px] rounded-xl overflow-hidden cursor-pointer"
    >
      <img 
        src={reel.thumbnail}
        alt="Reel thumbnail"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex flex-col justify-between p-3">
        <div className="flex justify-end">
          <Play className="w-4 h-4 text-white" />
        </div>
        <div className="text-white text-xs">
          <div className="font-medium">{reel.views} views</div>
          <div className="opacity-80">{reel.likes} likes</div>
        </div>
      </div>
    </motion.div>
  );
};

export function ReelsCard({ title, reels, isLoading = false, onClick, className = "" }: ReelsCardProps) {
  if (isLoading) {
    return (
      <Card className={`h-[242px] pulse-card-bg rounded-2xl border-0 shadow-sm ${className}`}>
        <CardContent className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <Skeleton className="h-4 w-48 shimmer" />
            <Skeleton className="h-6 w-6 rounded shimmer" />
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="w-[120px] h-[213px] flex-shrink-0 rounded-xl shimmer" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className={`h-[242px] pulse-card-bg rounded-2xl border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 ${className}`}
      onClick={onClick}
    >
      <CardContent className="p-4 h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <motion.div
            whileHover={{ x: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <ChevronRight className="h-6 w-6 text-muted-foreground" />
          </motion.div>
        </div>
        
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
          {reels.map((reel, index) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ReelThumbnail reel={reel} />
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 