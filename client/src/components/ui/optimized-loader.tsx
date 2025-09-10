import { motion } from 'framer-motion';

// Lightweight loading animation optimized for performance
export const OptimizedLoader = ({ message = "Loading..." }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center space-y-3">
    <div className="relative w-8 h-8">
      <motion.div
        className="absolute inset-0 border-2 border-primary/30 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-1 border-2 border-primary rounded-full border-t-transparent"
        animate={{ rotate: -360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
    
    <motion.p 
      className="text-sm text-muted-foreground"
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      {message}
    </motion.p>
  </div>
);

// Minimal text analysis specific loader
export const TextAnalysisLoader = () => (
  <div className="flex items-center justify-center space-x-2">
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 bg-primary rounded-full"
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            opacity: [0.5, 1, 0.5] 
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
    <span className="text-xs text-muted-foreground">Analyzing...</span>
  </div>
);