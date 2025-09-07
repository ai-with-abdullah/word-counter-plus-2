import { motion } from "framer-motion";
import { Home, LifeBuoy } from "lucide-react";

export default function NotFound() {
  // Generate random stars
  const stars = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 5,
  }));

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 dark:from-gray-900 dark:via-gray-950 dark:to-black px-6 overflow-hidden">
      {/* Animated gradient blobs */}
      <motion.div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-red-400/30 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-pink-400/30 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Floating planet ball */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-pink-500 via-red-400 to-orange-400 blur-2xl opacity-60"
        animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Animated stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${star.y}%`,
            left: `${star.x}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center max-w-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-2xl p-10"
      >
        {/* 404 Heading */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-8xl md:text-9xl font-extrabold bg-gradient-to-r from-red-600 via-pink-500 to-red-400 text-transparent bg-clip-text drop-shadow-lg"
        >
          404
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mt-4 text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100"
        >
          Lost in Space?
        </motion.h2>

        {/* Description */}
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          The page you’re looking for doesn’t exist or may have drifted away.  
          Don’t worry, we’ll help you find your way back.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href="/"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-pink-500 text-white font-semibold shadow-lg hover:shadow-2xl transition-all"
          >
            <Home className="w-5 h-5" /> Back to Home
          </motion.a>

          <motion.a
            href="/contact"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-red-500 text-red-600 dark:text-red-400 font-semibold bg-white dark:bg-gray-900 shadow hover:bg-red-50 dark:hover:bg-gray-800 transition-all"
          >
            <LifeBuoy className="w-5 h-5" /> Get Support
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}
// Footer component is not included in the 404 page to keep it clean and focused.