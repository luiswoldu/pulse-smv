'use client';

import { motion } from 'framer-motion';
import { ChevronRight, UserCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface ListItem {
  label: string;
  value: string | number;
  change?: number;
  avatar?: string;
  isReference?: boolean;
  comparison?: string;
}

interface MediumCardProps {
  title: string;
  value: string | number;
  list: ListItem[];
  isLoading?: boolean;
  onClick?: () => void;
  className?: string;
}

export function MediumCard({ title, value, list, isLoading = false, onClick, className = "" }: MediumCardProps) {
  if (isLoading) {
    return (
      <Card className={`h-[242px] pulse-card-bg rounded-2xl border-0 shadow-sm ${className}`}>
        <CardContent className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-3">
              <Skeleton className="h-4 w-32 shimmer" />
              <Skeleton className="h-12 w-40 shimmer" />
            </div>
            <Skeleton className="h-6 w-6 rounded shimmer" />
          </div>
          <div className="space-y-3 flex-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full shimmer" />
                  <Skeleton className="h-4 w-24 shimmer" />
                </div>
                <Skeleton className="h-4 w-16 shimmer" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`${className} origin-center`}
    >
      <Card 
        className="h-[242px] pulse-card-bg rounded-2xl border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer w-full"
        onClick={onClick}
      >
        <CardContent className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-2">{title}</p>
              <p className="text-4xl font-bold text-foreground">{value}</p>
            </div>
            <motion.div
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <ChevronRight className="h-6 w-6 text-muted-foreground" />
            </motion.div>
          </div>
          
          <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {list.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex justify-between items-center ${item.isReference ? 'bg-blue-50/50 -mx-2 px-2 py-1 rounded-lg' : ''}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {item.avatar ? (
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
                      <img 
                        src={item.avatar} 
                        alt={item.label}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null; // Prevent infinite loop
                          target.src = './avatars/default.jpg';
                        }}
                      />
                    </div>
                  ) : (
                    <UserCircle className="w-8 h-8 text-muted-foreground flex-shrink-0" />
                  )}
                  <span className="text-sm text-muted-foreground truncate">{item.label}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-sm font-medium text-foreground">
                    {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                  </span>
                  {item.comparison && (
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      {item.comparison}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 