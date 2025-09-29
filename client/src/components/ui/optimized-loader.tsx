// Pure CSS animations - no heavy libraries needed for simple loaders
export const OptimizedLoader = ({ message = "Loading..." }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center space-y-3">
    <div className="relative w-8 h-8">
      <div
        className="absolute inset-0 border-2 border-primary/30 rounded-full animate-spin"
        style={{ animationDuration: '1.5s' }}
      />
      <div
        className="absolute inset-1 border-2 border-primary rounded-full border-t-transparent animate-spin"
        style={{ animationDuration: '1s', animationDirection: 'reverse' }}
      />
    </div>
    
    <p className="text-sm text-muted-foreground animate-pulse">
      {message}
    </p>
  </div>
);

// Minimal text analysis specific loader with CSS animations
export const TextAnalysisLoader = () => (
  <div className="flex items-center justify-center space-x-2">
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
          style={{ 
            animationDelay: `${i * 0.15}s`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
    <span className="text-xs text-muted-foreground">Analyzing...</span>
  </div>
);