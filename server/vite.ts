import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { type Server } from "http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Helper function to escape HTML content for safe attribute injection
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Blog post meta tag injection for social media crawlers
async function injectBlogPostMeta(template: string, slug: string): Promise<string> {
  try {
    log(`Attempting to inject meta tags for blog post slug: ${slug}`);
    // Import blog data from client location (server-safe)
    const { blogPosts } = await import("../client/src/data/blogData.ts");
    log(`Successfully imported blog data, found ${blogPosts.length} posts`);
    const post = blogPosts.find((p: any) => p.slug === slug);
    
    if (!post) {
      log(`Blog post not found for slug: ${slug}. Available slugs: ${blogPosts.map((p: any) => p.slug).slice(0, 5).join(', ')}`);
      return template;
    }
    
    log(`Found blog post: ${post.title}`)

    // Derive base URL from request host (more robust than hardcoding)
    const baseUrl = process.env.PUBLIC_BASE_URL || "https://wordcounterplusapp.com";
    
    // Truncate description to optimal length for social sharing
    const truncateDescription = (text: string, maxLength: number = 155) => {
      if (text.length <= maxLength) return text;
      const truncated = text.substring(0, maxLength);
      const lastSpace = truncated.lastIndexOf(' ');
      return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
    };

    const title = escapeHtml(`${post.title} | Word Counter Plus Blog`);
    const description = escapeHtml(truncateDescription(post.excerpt));
    const postTitle = escapeHtml(post.title);
    const imageUrl = post.image ? `${baseUrl}${post.image}` : `${baseUrl}/og-image.png`;
    const pageUrl = `${baseUrl}/blog/${post.slug}`;
    const keywords = escapeHtml(`${post.tags.join(', ')}, writing tips, content creation, word counter, text analysis`);

    // Remove existing meta tags that we're about to replace to avoid duplicates
    let processedTemplate = template
      // Remove existing title
      .replace(/<title[^>]*>.*?<\/title>/gi, '')
      // Remove existing meta description
      .replace(/<meta\s+name=["']description["'][^>]*>/gi, '')
      // Remove existing Open Graph tags
      .replace(/<meta\s+property=["']og:[^"']*["'][^>]*>/gi, '')
      // Remove existing Twitter cards
      .replace(/<meta\s+name=["']twitter:[^"']*["'][^>]*>/gi, '')
      // Remove existing canonical
      .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '')
      // Remove existing keywords and author
      .replace(/<meta\s+name=["'](keywords|author)["'][^>]*>/gi, '');

    // Create meta tags for social sharing with properly escaped content
    const socialMetaTags = `
    <!-- Social Media Meta Tags - Server Rendered -->
    <title>${title}</title>
    <meta name="description" content="${description}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:title" content="${postTitle}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="${postTitle}">
    <meta property="og:url" content="${pageUrl}">
    <meta property="og:site_name" content="Word Counter Plus">
    <meta property="article:published_time" content="${post.publishDate}">
    <meta property="article:modified_time" content="${post.publishDate}">
    <meta property="article:author" content="Word Counter Plus Team">
    <meta property="article:section" content="Writing Tips">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${postTitle}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${imageUrl}">
    <meta name="twitter:image:alt" content="${postTitle}">
    <meta name="twitter:site" content="@wordcounterplusapp">
    <meta name="twitter:creator" content="@wordcounterplusapp">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${pageUrl}">
    
    <!-- Additional Meta Tags -->
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="keywords" content="${keywords}">
    <meta name="author" content="Word Counter Plus Team">`;

    // Inject the meta tags into the head section
    return processedTemplate.replace('<head>', `<head>${socialMetaTags}`);
    
  } catch (error) {
    log(`Error injecting blog meta tags for slug ${slug}: ${error}`);
    return template;
  }
}

export function log(message: string, source = "express") {
  // Only log in development mode
  if (process.env.NODE_ENV === 'development') {
    const formattedTime = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    console.log(`${formattedTime} [${source}] ${message}`);
  }
}

export async function setupVite(app: Express, server: Server) {
  // Lazy-load vite modules to avoid bundling dev dependencies in production
  const { createServer: createViteServer, createLogger } = await import("vite");
  const viteLogger = createLogger();
  
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  let vite;
  try {
    // Lazy-load vite config only in development to avoid bundling dev plugins in production
    const { default: viteConfig } = await import("../vite.config");

    vite = await createViteServer({
      ...viteConfig,
      configFile: false,
      customLogger: {
        ...viteLogger,
        error: (msg: any, options: any) => {
          viteLogger.error(msg, options);
          process.exit(1);
        },
      },
      server: serverOptions,
      appType: "custom",
    });
  } catch (error) {
    throw new Error(`Failed to load Vite config: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    // Skip Vite's HTML handler for API routes
    if (url.startsWith('/api/')) {
      return next();
    }

    try {
      const clientTemplate = path.resolve(
        __dirname,
        "..",
        "client",
        "index.html",
      );

      // Cache template in memory for better performance  
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      
      // Check if this is a blog post route and inject meta tags for social sharing
      const blogPostMatch = url.match(/^\/blog\/([^/?]+)/);
      if (blogPostMatch) {
        const slug = blogPostMatch[1];
        log(`Matched blog post route with slug: ${slug}`);
        template = await injectBlogPostMeta(template, slug);
      }
      
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${Date.now()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Serve static files with aggressive caching for production performance
  app.use(express.static(distPath, {
    maxAge: '1y', // Cache static assets for 1 year
    etag: true,
    lastModified: true,
    setHeaders: (res, path) => {
      // Different cache strategies for different file types
      if (path.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache'); // HTML should not be cached
      } else if (path.match(/\.(js|css|woff2?|png|jpg|jpeg|gif|svg|ico)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year cache for assets
      }
    }
  }));

  // fall through to index.html if the file doesn't exist
  app.use("*", async (req, res) => {
    const url = req.originalUrl;
    res.setHeader('Cache-Control', 'no-cache'); // Don't cache the fallback HTML
    
    // Check if this is a blog post route and inject meta tags for social sharing
    const blogPostMatch = url.match(/^\/blog\/([^/?]+)/);
    if (blogPostMatch) {
      try {
        const slug = blogPostMatch[1];
        const indexPath = path.resolve(distPath, "index.html");
        let template = await fs.promises.readFile(indexPath, "utf-8");
        template = await injectBlogPostMeta(template, slug);
        res.send(template);
        return;
      } catch (error) {
        log(`Error serving blog post ${blogPostMatch[1]}: ${error}`);
      }
    }
    
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
