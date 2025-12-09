import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

// Small helper to resolve paths
const r = (...segments: string[]) => path.resolve(process.cwd(), ...segments);

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined
      ? [
          (await import("@replit/vite-plugin-cartographer")).cartographer(),
        ]
      : []),
    // Production optimizations - disabled for memory-constrained environments
    // Enable these locally if needed for analysis
  ],

  resolve: {
    alias: {
      "@": r("client", "src"),
      "@shared": r("shared"),
      "@assets": r("attached_assets"),
      "react": path.resolve("./node_modules/react"),
      "react-dom": path.resolve("./node_modules/react-dom"),
    },
  },

  root: r("client"),

  build: {
    outDir: r("dist/public"),
    emptyOutDir: true,
    target: "esnext", // ✅ modern browsers only
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'routing': ['wouter'],
          'query': ['@tanstack/react-query'],
        },
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(assetInfo.name || "")) return `images/[name]-[hash][extname]`;
          if (/\.css$/i.test(assetInfo.name || "")) return `css/[name]-[hash][extname]`;
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name || "")) return `fonts/[name]-[hash][extname]`;
          return `assets/[name]-[hash][extname]`;
        },
      },
      treeshake: {
        moduleSideEffects: true,
        propertyReadSideEffects: true,
        unknownGlobalSideEffects: true,
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
      mangle: true, // ✅ modern, no safari10 legacy fix
      format: { comments: false },
    },
    reportCompressedSize: true,
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

  optimizeDeps: {
    include: ["react", "react-dom", "wouter", "@tanstack/react-query"],
    exclude: ["@replit/vite-plugin-cartographer"],
    esbuildOptions: {
      target: "esnext", // ✅ force modern deps
    },
  },

  css: {
    devSourcemap: false,
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
        ...(process.env.NODE_ENV === "production"
          ? [
              cssnano({
                preset: [
                  "default",
                  {
                    discardComments: { removeAll: true },
                    normalizeWhitespace: true,
                    mergeLonghand: true,
                    mergeRules: true,
                  },
                ],
              }),
            ]
          : []),
      ],
    },
  },
});
