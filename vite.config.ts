import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import viteImagemin from "vite-plugin-imagemin";
import webp from "imagemin-webp";

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
    // Image optimization - only in production
    ...(process.env.NODE_ENV === "production"
      ? [
          viteImagemin({
            gifsicle: { optimizationLevel: 7, interlaced: false },
            optipng: { optimizationLevel: 7 },
            mozjpeg: { quality: 85, progressive: true },
            pngquant: { quality: [0.65, 0.8], speed: 4 },
            svgo: {
              plugins: [
                { name: "removeViewBox", active: false },
                { name: "removeEmptyAttrs", active: false },
              ],
            },
          }),
        ]
      : []),
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
        manualChunks: (id) => {
          if (id.includes("react") || id.includes("react-dom")) return "vendor";
          if (id.includes("wouter")) return "routing";
          if (id.includes("@tanstack/react-query")) return "query";
          if (id.includes("@radix-ui") && (id.includes("slot") || id.includes("primitive"))) return "ui-core";
          if (id.includes("jspdf") || id.includes("html2canvas") || id.includes("recharts") || id.includes("framer-motion")) return null;
          if (id.includes("lucide-react")) return "icons";
          if (id.includes("clsx") || id.includes("tailwind-merge")) return "utils";
          if (id.includes("react-hook-form") || id.includes("@hookform/resolvers") || id.includes("zod")) return "form";
          if (id.includes("@radix-ui") || id.includes("input-otp") || id.includes("react-day-picker") || id.includes("embla-carousel")) return null;
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
