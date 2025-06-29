'use client';

import { motion } from 'framer-motion';
import { ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface SmallCardProps {
  title: string;
  value: string | number;
  change: number;
  isLoading?: boolean;
  onClick?: () => void;
  className?: string;
}

export function SmallCard({ title, value, change, isLoading = false, onClick, className = "" }: SmallCardProps) {
  const isPositive = change >= 0;
  
  if (isLoading) {
    return (
      <Card className={`h-[222px] pulse-card-bg rounded-2xl border-0 shadow-sm ${className}`}>
        <CardContent className="p-4 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="space-y-3">
              <Skeleton className="h-4 w-24 shimmer" />
              <Skeleton className="h-12 w-32 shimmer" />
            </div>
            <Skeleton className="h-6 w-6 rounded shimmer" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4 rounded shimmer" />
            <Skeleton className="h-4 w-16 shimmer" />
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
        className="h-[222px] pulse-card-bg rounded-2xl border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer w-full"
        onClick={onClick}
      >
        <CardContent className="p-4 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-2">{title}</p>
              <p className="text-4xl font-bold text-foreground">{value.toLocaleString()}</p>
            </div>
            <motion.div
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <ChevronRight className="h-6 w-6 text-muted-foreground" />
            </motion.div>
          </div>
          
          <div className="flex items-center space-x-2">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 pulse-green" />
            ) : (
              <TrendingDown className="h-4 w-4 pulse-red" />
            )}
            <span className={`text-sm font-medium ${isPositive ? 'pulse-green' : 'pulse-red'}`}>
              {isPositive ? '+' : ''}{change}%
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 