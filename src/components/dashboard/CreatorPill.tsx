'use client';

import { motion } from 'framer-motion';
import { X, UserCircle } from 'lucide-react';

interface CreatorPillProps {
  name: string;
  onRemove: () => void;
  isActive?: boolean;
  avatar?: string;
}

export function CreatorPill({ name, onRemove, isActive = true, avatar }: CreatorPillProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`
        inline-flex items-center gap-3 px-6 py-4 rounded-full
        ${isActive ? 'bg-primary/10 border border-primary/20' : 'bg-muted border border-border'}
        transition-colors duration-200
      `}
    >
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
        {avatar ? (
          <img 
            src={avatar} 
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = './avatars/default.jpg';
            }}
          />
        ) : (
          <UserCircle className="w-full h-full text-muted-foreground" />
        )}
      </div>
      
      {/* Creator name */}
      <span className={`
        text-lg font-medium
        ${isActive ? 'text-primary' : 'text-muted-foreground'}
      `}>
        {name}
      </span>
      
      {/* Remove button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRemove}
        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-accent transition-colors"
      >
        <X className="w-4 h-4 text-primary" />
      </motion.button>
    </motion.div>
  );
} 