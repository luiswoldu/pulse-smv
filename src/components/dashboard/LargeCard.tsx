'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ShimmeringCoin } from './ShimmeringCoin';

interface DataPoint {
  x: number;
  y: number;
  cpa: number;
  date: string;
}

interface LargeCardProps {
  title: string;
  subtitle?: string;
  isLoading?: boolean;
  onClick?: () => void;
  className?: string;
}

// Generate trend data points with CPA values
const generateTrendData = () => {
  const points: DataPoint[] = [];
  const width = 800;
  const height = 120;
  const dataPoints = 30;
  const baseCPA = 45; // Base CPA value in dollars
  
  for (let i = 0; i < dataPoints; i++) {
    const x = (i / (dataPoints - 1)) * width;
    let cpa;
    
    if (i < dataPoints * 0.7) {
      // First 70% - relatively flat with small variations
      cpa = baseCPA + Math.sin(i * 0.3) * 8 + (Math.random() * 6 - 3);
    } else {
      // Last 30% - upward trend (higher CPA)
      const progress = (i - dataPoints * 0.7) / (dataPoints * 0.3);
      cpa = baseCPA + progress * 20 + Math.sin(i * 0.2) * 4;
    }
    
    // Convert CPA to y position (higher CPA = higher on chart)
    const normalizedCPA = (cpa - baseCPA + 15) / 35; // Normalize to 0-1 range
    const y = height - (normalizedCPA * (height - 20)) - 10; // Invert for SVG coordinates
    
    // Generate date
    const date = new Date();
    date.setDate(date.getDate() - (dataPoints - i - 1));
    
    points.push({
      x,
      y: Math.max(10, Math.min(height - 10, y)),
      cpa: Math.max(20, cpa), // Ensure minimum CPA
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    });
  }
  
  return points;
};

const TrendChart = () => {
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const points = generateTrendData();
  const width = 800;
  const height = 120;
  
  // Create path string for the line
  const pathData = points.reduce((path, point, index) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`;
    }
    
    // Use smooth curves between points
    const prevPoint = points[index - 1];
    const controlPoint1X = prevPoint.x + (point.x - prevPoint.x) * 0.5;
    const controlPoint1Y = prevPoint.y;
    const controlPoint2X = prevPoint.x + (point.x - prevPoint.x) * 0.5;
    const controlPoint2Y = point.y;
    
    return `${path} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${point.x} ${point.y}`;
  }, '');
  
  // Create area path for gradient fill
  const areaPath = `${pathData} L ${width} ${height} L 0 ${height} Z`;
  
  // Handle mouse movement for custom cursor
  const handleMouseMove = (event: React.MouseEvent<SVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * width;
    const y = ((event.clientY - rect.top) / rect.height) * height;
    setMousePosition({ x, y });
  };
  
  const handleMouseLeave = () => {
    setMousePosition(null);
    setHoveredPoint(null);
  };
  
  // Get cursor position - use mouse position if hovering, otherwise use final data point
  const cursorPosition = mousePosition || {
    x: points[points.length - 1]?.x || 0,
    y: points[points.length - 1]?.y || 0
  };
  
  return (
    <div className="w-full h-32 flex items-center justify-center relative -mx-4">
      <svg 
        width="100%" 
        height={height} 
        viewBox={`0 0 ${width} ${height}`} 
        className="w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: 'none' }}
      >
        <defs>
          {/* Gradient for the area fill */}
          <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#42B8FE" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#42B8FE" stopOpacity="0" />
          </linearGradient>
          
          {/* Gradient for the line */}
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00A9FF" />
            <stop offset="100%" stopColor="#42B8FE" />
          </linearGradient>
        </defs>
        
        {/* Area fill */}
        <motion.path
          d={areaPath}
          fill="url(#trendGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        
        {/* Main trend line */}
        <motion.path
          d={pathData}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
        />
        
        {/* Interactive hover areas and data points */}
        {points.map((point, index) => (
          <g key={index}>
            {/* Larger invisible hover area */}
            <circle
              cx={point.x}
              cy={point.y}
              r="12"
              fill="transparent"
              onMouseEnter={() => setHoveredPoint(point)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
            {/* Visible data points (show every 5th point when not hovered) */}
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="3"
              fill="#00A9FF"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: hoveredPoint === point ? 1.5 : 1,
                opacity: hoveredPoint === point ? 1 : (index % 5 === 0 ? 1 : 0)
              }}
              transition={{ 
                duration: 0.2,
                delay: hoveredPoint === point ? 0 : 0.3 + (index * 0.05)
              }}
            />
          </g>
        ))}
        
        {/* Custom cursor - blue circle with white border that follows mouse */}
        <motion.circle
          cx={cursorPosition.x}
          cy={cursorPosition.y}
          r="6"
          fill="#00A9FF"
          stroke="white"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ 
            scale: 1,
            x: mousePosition ? 0 : 0,
            y: mousePosition ? 0 : 0
          }}
          transition={{ 
            duration: mousePosition ? 0.1 : 0.5, 
            delay: mousePosition ? 0 : 2.5, 
            ease: mousePosition ? "easeOut" : "easeOut"
          }}
        />
      </svg>
      
      {/* Interactive tooltip */}
      <AnimatePresence>
        {hoveredPoint && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bg-popover rounded-lg shadow-lg border p-3 text-sm transform -translate-x-1/2 pointer-events-none z-10"
            style={{
              left: `${(hoveredPoint.x / width) * 100}%`,
              top: hoveredPoint.y - 60
            }}
          >
            <div className="font-semibold text-popover-foreground">
              ${hoveredPoint.cpa.toFixed(2)} CPA
            </div>
            <div className="text-muted-foreground text-xs">
              {hoveredPoint.date}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function LargeCard({ title, subtitle, isLoading = false, onClick, className = "" }: LargeCardProps) {
  if (isLoading) {
    return (
      <Card className={`h-[242px] pulse-card-bg rounded-2xl border-0 shadow-sm ${className}`}>
        <CardContent className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-48 shimmer" />
              <Skeleton className="h-3 w-32 shimmer" />
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right space-y-1">
                <Skeleton className="h-6 w-16 shimmer" />
                <Skeleton className="h-4 w-12 shimmer" />
              </div>
              <Skeleton className="h-6 w-6 rounded shimmer" />
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full h-32 shimmer rounded-lg"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`${className} origin-center`}
    >
      <Card 
        className="h-[242px] pulse-card-bg rounded-2xl border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer w-full"
        onClick={onClick}
      >
        <CardContent className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <ShimmeringCoin />
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-1">{title}</p>
                {subtitle && (
                  <p className="text-xs text-muted-foreground">{subtitle}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Cash Indicator */}
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">214.29</div>
                <div className="text-sm font-medium text-chart-1">+29.28</div>
              </div>
              <motion.div
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <ChevronRight className="h-6 w-6 text-muted-foreground" />
              </motion.div>
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-center">
            <TrendChart />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 