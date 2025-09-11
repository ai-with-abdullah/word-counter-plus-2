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

// Function to get blog posts from built module
async function getBlogPosts() {
  try {
    // Try to import from built module first
    const fs = await import('fs');
    const path = await import('path');
    const { pathToFileURL } = await import('url');
    
    const jsDir = join(DIST_PUBLIC_PATH, 'js');
    
    if (fs.existsSync(jsDir)) {
      const jsFiles = fs.readdirSync(jsDir);
      const blogDataFile = jsFiles.find(file => file.startsWith('blogData-') && file.endsWith('.js'));
      
      if (blogDataFile) {
        const blogDataPath = join(jsDir, blogDataFile);
        const fileUrl = pathToFileURL(blogDataPath);
        console.log(`Loading blog data from built module: ${blogDataFile}`);
        
        const module = await import(fileUrl.href);
        console.log('Available exports:', Object.keys(module));
        
        // Try different export patterns, including minified names
        let blogPosts = module.blogPosts || module.default?.blogPosts || module.default;
        
        // If no standard exports found, check all exports for arrays that look like blog posts
        if (!blogPosts || !Array.isArray(blogPosts)) {
          for (const [key, value] of Object.entries(module)) {
            if (Array.isArray(value) && value.length > 0 && value[0]?.slug) {
              console.log(`Found blog posts array in export '${key}' with ${value.length} items`);
              blogPosts = value;
              break;
            }
          }
        }
        
        if (!blogPosts || !Array.isArray(blogPosts)) {
          // Log sample of each export to help debug
          for (const [key, value] of Object.entries(module)) {
            console.log(`Export '${key}':`, Array.isArray(value) ? `Array[${value.length}]` : typeof value);
            if (Array.isArray(value) && value.length > 0) {
              console.log(`  Sample item:`, Object.keys(value[0] || {}));
            }
          }
          throw new Error(`No valid blogPosts array found`);
        }
        
        console.log(`Found ${blogPosts.length} blog posts in built module`);
        
        return blogPosts.map(post => ({
          url: `/blog/${post.slug}`,
          changefreq: 'monthly',
          priority: 0.6,
          lastmod: post.publishDate ? new Date(post.publishDate).toISOString() : new Date('2025-01-01').toISOString()
        }));
      }
    }
  } catch (error) {
    console.warn('Could not load blog data from built module:', error.message);
  }
  
  try {
    // Fallback: Try to import the blog data from source
    const { blogPosts } = await import('./client/src/data/blogData.js');
    
    return blogPosts.map(post => ({
      url: `/blog/${post.slug}`,
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: post.publishDate ? new Date(post.publishDate).toISOString() : new Date('2025-01-01').toISOString()
    }));
  } catch (error) {
    console.warn('Could not load blog data from source, trying regex parsing...');
    
    // Final fallback: read the file as text and extract blog post data
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