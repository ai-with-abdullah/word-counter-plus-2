import { motion } from 'framer-motion';

// Option 1: Elegant Word Counter Themed Animation
export const WordCounterLoader = () => (
  <div className="flex flex-col items-center justify-center space-y-4">
    <div className="relative">
      {/* Rotating circles representing words/text */}
      <div className="w-16 h-16 relative">
        <motion.div
          className="absolute inset-0 border-4 border-primary/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 border-4 border-primary/60 rounded-full border-t-primary"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-4 border-4 border-primary rounded-full border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Floating text elements */}
      <motion.div
        className="absolute -top-2 -left-2 w-3 h-3 bg-primary rounded-full"
        animate={{
          y: [-10, 10, -10],
          x: [-5, 5, -5],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -top-2 -right-2 w-2 h-2 bg-primary/70 rounded-full"
        animate={{
          y: [10, -10, 10],
          x: [5, -5, 5],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <motion.h3 
        className="text-lg font-semibold text-foreground mb-2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Analyzing Text...
      </motion.h3>
      <motion.div 
        className="flex space-x-1 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-primary rounded-full"
            animate={{ 
              scale: [0.8, 1.2, 0.8],
              opacity: [0.5, 1, 0.5] 
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  </div>
);

// Option 2: Minimalist Pulse Animation
export const MinimalistLoader = () => (
  <div className="flex flex-col items-center justify-center space-y-6">
    <div className="relative">
      <motion.div
        className="w-20 h-20 border-4 border-primary/20 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-2 w-16 h-16 border-4 border-primary/40 rounded-full"
        animate={{ scale: [1, 0.8, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute inset-6 w-8 h-8 bg-primary rounded-full flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <span className="text-white text-xs font-bold">W</span>
      </motion.div>
    </div>
    
    <motion.p 
      className="text-muted-foreground text-sm"
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      Loading...
    </motion.p>
  </div>
);

// Option 3: Text Wave Animation
export const TextWaveLoader = () => {
  const letters = "WORD COUNTER".split("");
  
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="flex space-x-1">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="text-2xl font-bold text-primary"
            animate={{
              y: [0, -20, 0],
              color: ["#6366f1", "#8b5cf6", "#6366f1"]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </div>
      
      <motion.div
        className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
        animate={{ x: [-50, 50, -50] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

// Option 4: Sophisticated Geometric Animation
export const GeometricLoader = () => (
  <div className="flex flex-col items-center justify-center space-y-6">
    <div className="relative w-24 h-24">
      {/* Outer rotating square */}
      <motion.div
        className="absolute inset-0 border-2 border-primary/30 rotate-45"
        animate={{ rotate: [45, 405] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Middle hexagon */}
      <motion.div
        className="absolute inset-3 w-18 h-18"
        style={{
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
        }}
        animate={{ 
          background: [
            "linear-gradient(45deg, #6366f1, #8b5cf6)",
            "linear-gradient(180deg, #8b5cf6, #6366f1)",
            "linear-gradient(45deg, #6366f1, #8b5cf6)"
          ],
          rotate: [0, -360]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Inner circle */}
      <motion.div
        className="absolute inset-6 w-12 h-12 bg-primary rounded-full flex items-center justify-center"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="w-2 h-2 bg-white rounded-full"
          animate={{ scale: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
    
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h4 className="text-lg font-semibold text-foreground">Processing</h4>
      <motion.p 
        className="text-sm text-muted-foreground"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Please wait...
      </motion.p>
    </motion.div>
  </div>
);

// Option 5: Typewriter Effect with Cursor
export const TypewriterLoader = () => {
  const text = "Counting words...";
  
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex items-center space-x-2">
        <motion.div
          className="text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {text.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.1 }}
              className="text-foreground font-mono"
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
        
        <motion.div
          className="w-0.5 h-6 bg-primary"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </div>
      
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex space-x-1">
          {["Words", "Chars", "Paras"].map((item, i) => (
            <motion.div
              key={item}
              className="px-3 py-1 bg-primary/10 rounded-full text-xs text-primary font-medium"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2 + i * 0.2, type: "spring" }}
            >
              {item}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// Demo component to showcase all animations
export const LoadingAnimationDemo = () => {
  const animations = [
    { name: "Word Counter Theme", component: WordCounterLoader },
    { name: "Minimalist", component: MinimalistLoader },
    { name: "Text Wave", component: TextWaveLoader },
    { name: "Geometric", component: GeometricLoader },
    { name: "Typewriter", component: TypewriterLoader }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Loading Animation Options
        </h1>
        <p className="text-muted-foreground">
          Choose your favorite loading animation for the Word Counter Plus app
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {animations.map(({ name, component: Component }, index) => (
          <div 
            key={name}
            className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="h-48 flex items-center justify-center mb-4">
              <Component />
            </div>
            <h3 className="text-lg font-semibold text-center text-foreground">
              {name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};