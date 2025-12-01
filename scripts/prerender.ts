/**
 * Pre-render script - Generates static HTML files with SEO content baked in
 * 
 * This script:
 * 1. Reads all routes from sitemap.xml
 * 2. Imports SEO data from server/seo-config.ts for static pages
 * 3. Loads blog metadata from client/src/data/blogData.ts for blog posts
 * 4. Generates HTML files with proper SEO for each route
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '../dist/public');

const BASE_URL = 'https://wordcounterplusapp.com';

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

interface PageSEO {
  title: string;
  description: string;
  h1: string;
  keywords?: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image?: string;
  slug: string;
  tags: string[];
}

// Navigation links
const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/tools', label: 'Tools' },
  { href: '/extension', label: 'Extension' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
];

// Tool links
const toolLinks = [
  { href: '/character-counter', label: 'Character Counter' },
  { href: '/text-case-convert', label: 'Text Case Converter' },
  { href: '/word-frequency-counter', label: 'Word Frequency Counter' },
  { href: '/random-word-generator', label: 'Random Word Generator' },
  { href: '/words-per-page', label: 'Words Per Page Calculator' },
  { href: '/plagiarism-checker', label: 'Plagiarism Checker' },
  { href: '/resume-cv-checker', label: 'Resume/CV Checker' },
  { href: '/seo-content-analyzer', label: 'SEO Content Analyzer' },
  { href: '/speech-to-text', label: 'Speech to Text' },
  { href: '/readability-calculator', label: 'Readability Calculator' },
  { href: '/grammar-checker', label: 'Grammar Checker' },
  { href: '/text-compare', label: 'Text Compare' },
  { href: '/letter-counter', label: 'Letter Counter' },
  { href: '/sentence-counter', label: 'Sentence Counter' },
  { href: '/paragraph-counter', label: 'Paragraph Counter' },
  { href: '/line-counter', label: 'Line Counter' },
];

// Footer links
const footerLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/disclaimer', label: 'Disclaimer' },
  { href: '/cookies', label: 'Cookie Policy' },
  { href: '/faq', label: 'FAQ' },
];

function generateMetaTags(page: PageSEO, pagePath: string): string {
  const canonical = `${BASE_URL}${pagePath === '/' ? '' : pagePath}`;
  const ogImage = `${BASE_URL}/og-image.png`;

  return `
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}">
    <link rel="canonical" href="${canonical}">
    
    <!-- Hreflang Tags -->
    <link rel="alternate" hreflang="en" href="${canonical}">
    <link rel="alternate" hreflang="x-default" href="${canonical}">
    
    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="${escapeHtml(page.title)}">
    <meta property="og:description" content="${escapeHtml(page.description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:site_name" content="Word Counter Plus">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(page.title)}">
    <meta name="twitter:description" content="${escapeHtml(page.description)}">
    <meta name="twitter:image" content="${ogImage}">
    <meta name="twitter:site" content="@wordcounterplusapp">
    
    ${page.keywords ? `<meta name="keywords" content="${escapeHtml(page.keywords)}">` : ''}
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  `;
}

function generateSSRContent(page: PageSEO): string {
  const headerNav = navigationLinks.map(link => 
    `<a href="${link.href}">${escapeHtml(link.label)}</a>`
  ).join('\n          ');

  const toolLinksHtml = toolLinks.map(link => 
    `<a href="${link.href}">${escapeHtml(link.label)}</a>`
  ).join('\n            ');

  const footerLinksHtml = footerLinks.map(link => 
    `<a href="${link.href}">${escapeHtml(link.label)}</a>`
  ).join('\n            ');

  return `
    <!-- SSR Static Content for SEO - Crawlers see this content -->
    <noscript>
      <style>#ssr-content { position: static !important; left: auto !important; top: auto !important; visibility: visible !important; }</style>
    </noscript>
    <div id="ssr-content">
      <!-- Header Navigation -->
      <nav aria-label="Main navigation">
        <a href="/">Word Counter Plus</a>
        ${headerNav}
      </nav>
      
      <!-- Main Content -->
      <main>
        <h1>${escapeHtml(page.h1)}</h1>
        <p>${escapeHtml(page.description)}</p>
        
        <!-- Tool Links -->
        <section aria-label="Available Tools">
          <h2>Free Writing Tools</h2>
          ${toolLinksHtml}
        </section>
      </main>
      
      <!-- Footer -->
      <footer>
        <nav aria-label="Footer navigation">
          ${footerLinksHtml}
        </nav>
        <p>Word Counter Plus - Free online word counter, character counter, and text analysis tools.</p>
      </footer>
    </div>
  `;
}

// Extract all routes from sitemap.xml
function extractRoutesFromSitemap(): string[] {
  try {
    const sitemapPath = path.resolve(distPath, 'sitemap.xml');
    if (!fs.existsSync(sitemapPath)) {
      console.log('Warning: sitemap.xml not found');
      return [];
    }
    
    const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
    const urlMatches = sitemap.matchAll(/<loc>https:\/\/wordcounterplusapp\.com([^<]*)<\/loc>/g);
    const routes = [...urlMatches].map(m => m[1] || '/');
    return routes;
  } catch (error) {
    console.error('Error reading sitemap:', error);
    return [];
  }
}

// Load blog posts from blogData
async function loadBlogPosts(): Promise<BlogPost[]> {
  try {
    const blogDataPath = path.resolve(__dirname, '../client/src/data/blogData.ts');
    const content = fs.readFileSync(blogDataPath, 'utf-8');
    
    // Extract blog post objects using regex
    const posts: BlogPost[] = [];
    
    // Match individual blog post objects
    const postMatches = content.matchAll(/\{\s*id:\s*["']([^"']+)["'][^}]*title:\s*["']([^"']+)["'][^}]*excerpt:\s*["']([^"']+)["'][^}]*slug:\s*["']([^"']+)["']/gs);
    
    for (const match of postMatches) {
      posts.push({
        id: match[1],
        title: match[2],
        excerpt: match[3],
        slug: match[4],
        tags: []
      });
    }
    
    return posts;
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

// Import static pages SEO from seo-config
async function loadStaticPagesSEO(): Promise<Record<string, PageSEO>> {
  try {
    const { getSEODataForUrl } = await import('../server/seo-config.js');
    
    // Define all static routes
    const staticRoutes = [
      '/', '/character-counter', '/text-case-convert', '/word-frequency-counter',
      '/random-word-generator', '/words-per-page', '/plagiarism-checker',
      '/resume-cv-checker', '/seo-content-analyzer', '/speech-to-text',
      '/readability-calculator', '/grammar-checker', '/text-compare',
      '/letter-counter', '/sentence-counter', '/paragraph-counter', '/line-counter',
      '/tools', '/blog', '/about', '/contact', '/faq', '/privacy', '/terms',
      '/disclaimer', '/cookies', '/extension', '/comparisons',
      '/vs-wordcounter', '/vs-charactercount', '/vs-grammarly', '/vs-wordcounttool',
      '/download'
    ];
    
    const seoData: Record<string, PageSEO> = {};
    
    for (const route of staticRoutes) {
      const data = await getSEODataForUrl(route);
      seoData[route] = {
        title: data.title,
        description: data.description,
        h1: data.title.split(' - ')[0] || data.title.split(' | ')[0] || 'Word Counter Plus',
        keywords: data.keywords
      };
    }
    
    return seoData;
  } catch (error) {
    console.error('Error loading SEO config, using fallback:', error);
    // Return empty - will use fallback in getSEOForRoute
    return {};
  }
}

async function prerender() {
  console.log('Starting pre-render process...\n');

  // Check if dist/public exists
  if (!fs.existsSync(distPath)) {
    console.error('Error: dist/public directory not found. Run npm run build first.');
    process.exit(1);
  }

  // Read the base template
  const templatePath = path.join(distPath, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('Error: dist/public/index.html not found.');
    process.exit(1);
  }
  
  const baseTemplate = fs.readFileSync(templatePath, 'utf-8');
  
  // Verify template has placeholders
  if (!baseTemplate.includes('<!--ssr-head-->') || !baseTemplate.includes('<!--ssr-outlet-->')) {
    console.error('Error: Template is missing SSR placeholders. Make sure dist/public/index.html has <!--ssr-head--> and <!--ssr-outlet-->');
    process.exit(1);
  }

  // Load SEO data
  console.log('Loading SEO configuration...');
  const staticSEO = await loadStaticPagesSEO();
  console.log(`  Loaded ${Object.keys(staticSEO).length} static page SEO configs`);
  
  // Load blog posts
  console.log('Loading blog posts...');
  const blogPosts = await loadBlogPosts();
  const blogPostsBySlug = new Map(blogPosts.map(p => [p.slug, p]));
  console.log(`  Loaded ${blogPosts.length} blog posts\n`);

  // Extract all routes from sitemap
  const routes = extractRoutesFromSitemap();
  console.log(`Found ${routes.length} routes in sitemap\n`);

  let processedCount = 0;
  let errorCount = 0;

  // Helper to get SEO for any route
  function getSEOForRoute(route: string): PageSEO {
    // Check static pages first
    if (staticSEO[route]) {
      return staticSEO[route];
    }
    
    // Check blog posts
    if (route.startsWith('/blog/')) {
      const slug = route.replace('/blog/', '');
      const post = blogPostsBySlug.get(slug);
      
      if (post) {
        return {
          title: `${post.title} | Word Counter Plus Blog`,
          description: post.excerpt.length > 155 
            ? post.excerpt.substring(0, 152) + '...' 
            : post.excerpt,
          h1: post.title,
          keywords: 'writing tips, content creation, word counter'
        };
      }
    }
    
    // Fallback for any unknown route
    const titleFromRoute = route
      .replace(/^\//, '')
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') || 'Page';
    
    return {
      title: `${titleFromRoute} | Word Counter Plus`,
      description: `${titleFromRoute} - Free text analysis tools from Word Counter Plus.`,
      h1: titleFromRoute,
      keywords: 'word counter, text analysis'
    };
  }

  // Process each route
  for (const route of routes) {
    try {
      // Security: Validate route doesn't contain path traversal
      if (route.includes('..') || route.includes('//') || !route.startsWith('/')) {
        console.warn(`  [SKIP] Invalid route: ${route}`);
        continue;
      }
      
      const pageData = getSEOForRoute(route);
      let html = baseTemplate;

      // Inject meta tags
      const metaTags = generateMetaTags(pageData, route);
      html = html.replace('<!--ssr-head-->', metaTags);

      // Inject SSR content
      const ssrContent = generateSSRContent(pageData);
      html = html.replace('<!--ssr-outlet-->', ssrContent);

      // Normalize route for file path (remove leading slash)
      const normalizedRoute = route.replace(/^\//, '');

      if (route === '/' || normalizedRoute === '') {
        // Overwrite the main index.html
        fs.writeFileSync(templatePath, html);
        console.log(`  [OK] / (index.html)`);
      } else {
        // Create directory for clean URLs: /character-counter -> character-counter/index.html
        const dirPath = path.resolve(distPath, normalizedRoute);
        const filePath = path.join(dirPath, 'index.html');
        
        // Security: Verify resolved path is within distPath
        if (!dirPath.startsWith(distPath)) {
          console.warn(`  [SKIP] Path escape attempt: ${route}`);
          continue;
        }
        
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }
        fs.writeFileSync(filePath, html);
        console.log(`  [OK] /${normalizedRoute}/index.html`);
      }

      processedCount++;
    } catch (error) {
      console.error(`  [ERROR] ${route}: ${error}`);
      errorCount++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Pre-render complete!`);
  console.log(`  Total routes in sitemap: ${routes.length}`);
  console.log(`  Successfully processed: ${processedCount}`);
  console.log(`  Errors: ${errorCount}`);
  console.log(`========================================\n`);

  if (errorCount > 0) {
    process.exit(1);
  }
}

prerender().catch(console.error);
