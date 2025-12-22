import React from 'react';
import { motion } from 'framer-motion';
import { Search, FileText } from 'lucide-react';

const NoteSkeleton = () => {
  return (
    <div className="w-full">
      <motion.div
        key="notes"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
      

        {/* Empty State / Loading Skeleton */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-40 rounded-2xl bg-white/10 border border-white/10 p-4 animate-pulse"
            >
              <div className="h-5 w-1/2 bg-white/20 rounded mb-3"></div>
              <div className="h-4 w-full bg-white/20 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-white/20 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-white/20 rounded"></div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NoteSkeleton;
