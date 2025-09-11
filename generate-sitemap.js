import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Site configuration
const SITE_URL = 'https://wordcounterplusapp.com';
const DIST_PUBLIC_PATH = join(__dirname, 'dist', 'public');

// Function to get static pages from src/pages directory
function getStaticPages() {
  // Use allowlist of actual routes instead of scanning files
  // This prevents including components like BlogPost.tsx that aren't standalone pages
  const staticRoutes = [
    { page: 'Home', url: '/', priority: 1.0 },
    { page: 'About', url: '/about', priority: 0.8 },
    { page: 'Blog', url: '/blog', priority: 0.8 },
    { page: 'Contact', url: '/contact', priority: 0.8 },
    { page: 'FAQ', url: '/faq', priority: 0.8 },
    { page: 'Privacy', url: '/privacy', priority: 0.8 },
    { page: 'Terms', url: '/terms', priority: 0.8 },
    { page: 'Disclaimer', url: '/disclaimer', priority: 0.8 }
  ];

  return staticRoutes.map(route => ({
    url: route.url,
    changefreq: 'weekly',
    priority: route.priority
  }));
}

// Function to get blog posts from blogData.ts
async function getBlogPosts() {
  try {
    // Try to import the blog data from source (during development)
    const { allBlogPosts } = await import('./client/src/data/blogData.js');
    
    return allBlogPosts.map(post => ({
      url: `/blog/${post.slug}`,
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: new Date(post.publishDate).toISOString()
    }));
  } catch (error) {
    console.warn('Could not load blog data from source, trying alternative methods...');
    
    // Alternative approach: read the file as text and extract blog post data
    try {
      const fs = await import('fs');
      const path = await import('path');
      
      const blogDataPath = path.join(__dirname, 'client', 'src', 'data', 'blogData.ts');
      const content = fs.readFileSync(blogDataPath, 'utf8');
      
      // Extract slug information using regex
      const slugMatches = content.match(/slug:\s*["']([^"']+)["']/g);
      const publishDateMatches = content.match(/publishDate:\s*["']([^"']+)["']/g);
      
      if (slugMatches && publishDateMatches) {
        const slugs = slugMatches.map(match => match.match(/["']([^"']+)["']/)[1]);
        const dates = publishDateMatches.map(match => match.match(/["']([^"']+)["']/)[1]);
        
        return slugs.map((slug, index) => ({
          url: `/blog/${slug}`,
          changefreq: 'monthly',
          priority: 0.6,
          lastmod: new Date(dates[index] || '2025-01-01').toISOString()
        }));
      }
    } catch (parseError) {
      console.warn('Could not parse blog data:', parseError.message);
    }
    
    return [];
  }
}

// Function to generate robots.txt
function generateRobotsTxt() {
  const robotsContent = `User-agent: *
Allow: /

# Disallow admin, API, and draft areas
Disallow: /admin
Disallow: /api
Disallow: /drafts

# Sitemap location
Sitemap: ${SITE_URL}/sitemap.xml
`;

  writeFileSync(join(DIST_PUBLIC_PATH, 'robots.txt'), robotsContent);
  console.log('✅ Generated robots.txt');
}

// Main function to generate sitemap
async function generateSitemap() {
  try {
    console.log('🚀 Generating sitemap and robots.txt...');

    // Get all URLs
    const staticPages = getStaticPages();
    const blogPosts = await getBlogPosts();
    const allUrls = [...staticPages, ...blogPosts];

    console.log(`📄 Found ${staticPages.length} static pages`);
    console.log(`📝 Found ${blogPosts.length} blog posts`);
    console.log(`🔗 Total URLs: ${allUrls.length}`);

    // Create sitemap stream
    const sitemapStream = new SitemapStream({ hostname: SITE_URL });
    const writeStream = createWriteStream(join(DIST_PUBLIC_PATH, 'sitemap.xml'));
    
    sitemapStream.pipe(writeStream);

    // Add all URLs to sitemap
    allUrls.forEach(urlData => {
      sitemapStream.write(urlData);
    });

    sitemapStream.end();

    // Wait for sitemap generation to complete
    await streamToPromise(sitemapStream);
    
    console.log('✅ Generated sitemap.xml');

    // Generate robots.txt
    generateRobotsTxt();

    console.log('🎉 Sitemap generation completed successfully!');
    console.log(`📍 Files generated in: ${DIST_PUBLIC_PATH}`);

  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run the script
generateSitemap();