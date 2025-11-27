# Word Counter Plus

## Overview

Word Counter Plus is a comprehensive web application for text analysis and writing optimization. The platform provides multiple tools for counting words, characters, analyzing readability, checking SEO content, and more. Built as a modern React single-page application with TypeScript, it offers both a main word counter tool and specialized utilities for writers, students, bloggers, and content creators.

The application is designed to be fast, privacy-focused (all processing happens client-side), and SEO-optimized for high visibility in search engines. It includes a browser extension, blog content, and multiple domain support for specialized tools.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast builds and hot module replacement
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom theme configuration
- **State Management**: React hooks with TanStack React Query for server state

**Performance Optimizations:**
- Lazy loading for all route components to reduce initial bundle size
- Code splitting with React.lazy() and Suspense
- Service worker for offline support and aggressive caching
- Image optimization with vite-plugin-imagemin
- Brotli and Gzip compression for production builds
- CSS purging with PurgeCSS to remove unused styles
- Optimized text analysis with caching and debouncing

**Key Design Patterns:**
- Component composition with Radix UI for accessibility
- Custom hooks for text analysis (useTextAnalysis, useTextAnalysisOptimized)
- Custom hooks for theme management (useTheme)
- SEO management through useSEO hook with structured data support
- File upload handling with support for TXT, PDF, DOCX formats

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript
- Dual deployment modes:
  - Development: Full Express server with Vite middleware
  - Production: Serverless functions on Vercel

**API Structure:**
- RESTful endpoints for contact form submissions
- GitHub integration for content management (via Octokit)
- Separate route handlers for serverless (routes-serverless.ts) and full server (routes.ts)

**Server-Side Rendering:**
- Dynamic HTML template injection for SEO (meta tags, structured data)
- Tool-specific SEO configurations injected at request time
- Sitemap generation with dynamic blog post inclusion

### Data Storage Solutions

**Database:**
- Drizzle ORM configured for PostgreSQL
- Schema defined in shared/schema.ts
- Database migrations managed through drizzle-kit
- Environment-based connection via DATABASE_URL

**Firebase Integration:**
- Firestore for contact form data persistence
- Service account authentication via environment variables
- Graceful degradation if Firebase credentials not configured
- Admin SDK initialization in server/firebase.ts

**Client-Side Storage:**
- LocalStorage for theme preferences and text auto-save
- SessionStorage for download data passing between routes
- Service worker cache for static assets

### Authentication and Authorization

**Current State:**
- No user authentication system implemented
- All tools work anonymously and client-side
- Privacy-first approach: no user data sent to servers

**Admin Features:**
- Admin page exists (/admin) for internal management
- No authentication guards currently implemented

### External Dependencies

**Third-Party Services:**

1. **Firebase/Firestore**
   - Purpose: Contact form data storage
   - Configuration: Service account credentials via environment variables
   - Fallback: Logs warning if not configured, app continues functioning

2. **GitHub API (Octokit)**
   - Purpose: Content management integration
   - Authentication: OAuth via Replit connector system
   - Used for: Blog post management and content updates

3. **Vercel**
   - Purpose: Hosting and serverless deployment
   - Configuration: vercel.json for build settings
   - Static build output to dist/public

**Frontend Libraries:**

1. **PDF Processing**
   - pdfjs-dist for PDF text extraction
   - Worker configured locally (not CDN)

2. **Word Document Processing**
   - mammoth.js for DOCX file reading

3. **UI Components**
   - Radix UI for accessible primitives
   - React Icons for icon library
   - cmdk for command palette

4. **Text Analysis**
   - Custom implementation (no external API)
   - Client-side readability calculations (Flesch-Kincaid)
   - Keyword density and frequency analysis

**SEO and Performance:**

1. **Sitemap Generation**
   - sitemap package for XML generation
   - Dynamic blog post inclusion
   - Server-side generation during build

2. **Image Optimization**
   - vite-plugin-imagemin with multiple format support
   - WebP conversion

3. **Compression**
   - vite-plugin-compression for Brotli and Gzip
   - Express compression middleware

**Development Tools:**
- esbuild for server bundling
- TypeScript for type safety
- ESLint and Prettier for code quality

**Multi-Domain Configuration:**
- Main domain: wordcounterplusapp.com (Word Counter)
- Subdomain: textcase.wordcounterplusapp.com (Text Case Converter)
- Environment-based domain configuration in lib/site.ts
- Automatic canonical URL and SEO tag management per domain

**Browser Extension:**
- Manifest V3 for Chrome, Firefox, Edge, Opera
- Standalone JavaScript implementation (no React)
- Local text analysis (fully offline)
- Context menu integration for selected text analysis