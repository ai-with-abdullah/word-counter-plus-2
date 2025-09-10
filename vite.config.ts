import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    target: "esnext",
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Critical vendor chunks - only React essentials
          if (id.includes("react") || id.includes("react-dom")) {
            return "vendor";
          }
          
          // Essential routing and state management
          if (id.includes("wouter")) {
            return "routing";
          }
          if (id.includes("@tanstack/react-query")) {
            return "query";
          }
          
          // Minimal UI core - only essential components
          if (id.includes("@radix-ui") && 
              (id.includes("slot") || id.includes("primitive"))) {
            return "ui-core";
          }
          
          // Heavy libraries - load dynamically only when needed
          if (id.includes("jspdf") || id.includes("html2canvas") || 
              id.includes("recharts") || id.includes("framer-motion") || 
              id.includes("html2canvas")) {
            return null; // Don't bundle - load dynamically
          }
          
          // Icons - minimal essential set
          if (id.includes("lucide-react")) {
            return "icons";
          }
          
          // Only core utilities
          if (id.includes("clsx") || id.includes("tailwind-merge")) {
            return "utils";
          }
          
          // Form handling
          if (id.includes("react-hook-form") || id.includes("@hookform/resolvers") || id.includes("zod")) {
            return "form";
          }
          
          // Heavy UI components - lazy load
          if (id.includes("@radix-ui") || id.includes("input-otp") || 
              id.includes("react-day-picker") || id.includes("embla-carousel")) {
            return null; // Load when actually used
          }
        },
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(assetInfo.name || '')) {
            return `images/[name]-[hash][extname]`;
          }
          if (/\.(css)$/i.test(assetInfo.name || '')) {
            return `css/[name]-[hash][extname]`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name || '')) {
            return `fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
      // Treeshaking optimizations
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false,
      },
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === "production",
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info", "console.debug", "console.trace"],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    // Enable gzip compression hint
    reportCompressedSize: true,
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom", "wouter", "@tanstack/react-query"],
    exclude: ["@replit/vite-plugin-cartographer"],
  },
  // Aggressive CSS optimization
  css: {
    devSourcemap: false,
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        ...(process.env.NODE_ENV === 'production' ? [
          require('cssnano')({
            preset: ['default', {
              discardComments: { removeAll: true },
              normalizeWhitespace: true,
              mergeLonghand: true,
              mergeRules: true,
            }]
          })
        ] : [])
      ]
    }
  },
});
