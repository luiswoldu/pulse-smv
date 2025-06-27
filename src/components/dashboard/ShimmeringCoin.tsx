'use client';

import { motion } from 'framer-motion';

export function ShimmeringCoin() {
  return (
    <motion.div
      className="relative w-5 h-5"
      animate={{
        rotateY: [0, 180, 360],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {/* Main coin body */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 shadow-sm">
        {/* Inner highlight */}
        <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-500" />
        {/* Top shine */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-100/40 to-transparent" />
        {/* Moving shimmer effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      {/* Dollar sign */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-yellow-800 text-xs font-bold">$</span>
      </div>
    </motion.div>
  );
} 