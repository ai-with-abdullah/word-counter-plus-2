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
  // Use allowlist of actual routes based on the App.tsx routing configuration
  const staticRoutes = [
    { page: 'Home', url: '/', priority: 1.0, changefreq: 'weekly' },
    { page: 'Tools', url: '/tools', priority: 0.9, changefreq: 'weekly' },
    { page: 'Character Counter', url: '/character-counter', priority: 0.9, changefreq: 'weekly' },
    { page: 'Text Case Converter', url: '/text-case-convert', priority: 0.9, changefreq: 'weekly' },
    { page: 'About', url: '/about', priority: 0.8, changefreq: 'monthly' },
    { page: 'Blog', url: '/blog', priority: 0.8, changefreq: 'weekly' },
    { page: 'Contact', url: '/contact', priority: 0.7, changefreq: 'monthly' },
    { page: 'FAQ', url: '/faq', priority: 0.7, changefreq: 'monthly' },
    { page: 'Privacy', url: '/privacy', priority: 0.5, changefreq: 'yearly' },
    { page: 'Terms', url: '/terms', priority: 0.5, changefreq: 'yearly' },
    { page: 'Disclaimer', url: '/disclaimer', priority: 0.5, changefreq: 'yearly' },
    { page: 'Cookies', url: '/cookies', priority: 0.5, changefreq: 'yearly' }
  ];

  return staticRoutes.map(route => ({
    url: route.url,
    changefreq: route.changefreq,
    priority: route.priority
  }));
}

// Function to get blog posts from built module
async function getBlogPosts() {
  // Try using tsx to run the TypeScript file directly
  try {
    const { execSync } = await import('child_process');
    const path = await import('path');
    
    console.log('Attempting to load blog data using tsx...');
    
    // Create a temporary script to load and output the blog data
    const tempScript = `
      const { blogPosts } = await import('./client/src/data/blogData.ts');
      console.log(JSON.stringify(blogPosts.map(post => ({
        slug: post.slug,
        publishDate: post.publishDate
      }))));
    `;
    
    const fs = await import('fs');
    fs.writeFileSync('temp-blog-loader.mjs', tempScript);
    
    try {
      const result = execSync('npx tsx temp-blog-loader.mjs', { 
        encoding: 'utf8',
        timeout: 30000
      });
      
      const blogData = JSON.parse(result.trim());
      console.log(`Found ${blogData.length} blog posts using tsx`);
      
      // Clean up temp file
      fs.unlinkSync('temp-blog-loader.mjs');
      
      return blogData.map(post => ({
        url: `/blog/${post.slug}`,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: post.publishDate ? new Date(post.publishDate).toISOString() : new Date('2025-01-01').toISOString()
      }));
    } catch (tsxError) {
      console.log('tsx loading failed:', tsxError.message);
      // Clean up temp file if it exists
      try { fs.unlinkSync('temp-blog-loader.mjs'); } catch {}
    }
  } catch (error) {
    console.warn('Could not use tsx to load blog data:', error.message);
  }
  
  try {
    // Fallback: Try to import from built module
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
        
        if (blogPosts && Array.isArray(blogPosts)) {
          console.log(`Found ${blogPosts.length} blog posts in built module`);
          
          return blogPosts.map(post => ({
            url: `/blog/${post.slug}`,
            changefreq: 'monthly',
            priority: 0.6,
            lastmod: post.publishDate ? new Date(post.publishDate).toISOString() : new Date('2025-01-01').toISOString()
          }));
        }
      }
    }
  } catch (error) {
    console.warn('Could not load blog data from built module:', error.message);
  }
  
  // Final fallback: read all blog files and extract blog post data
  try {
    console.warn('Falling back to regex parsing...');
    
    const fs = await import('fs');
    const path = await import('path');
    
    const allBlogs = [];
    
    // Read main blog data file
    const mainBlogPath = path.join(__dirname, 'client', 'src', 'data', 'blogData.ts');
    const mainContent = fs.readFileSync(mainBlogPath, 'utf8');
    
    // Read character counter blogs
    const charBlogPath = path.join(__dirname, 'client', 'src', 'data', 'blogs', 'character-counter-blogs.ts');
    const charContent = fs.existsSync(charBlogPath) ? fs.readFileSync(charBlogPath, 'utf8') : '';
    
    // Read text case converter blogs  
    const caseBlogPath = path.join(__dirname, 'client', 'src', 'data', 'blogs', 'text-case-converter-blogs.ts');
    const caseContent = fs.existsSync(caseBlogPath) ? fs.readFileSync(caseBlogPath, 'utf8') : '';
    
    // Combine all content
    const combinedContent = mainContent + charContent + caseContent;
    
    // Extract slug information using regex
    const slugMatches = combinedContent.match(/slug:\s*["']([^"']+)["']/g);
    const publishDateMatches = combinedContent.match(/publishDate:\s*["']([^"']+)["']/g);
    
    if (slugMatches) {
      const slugs = slugMatches.map(match => match.match(/["']([^"']+)["']/)[1]);
      const dates = publishDateMatches ? publishDateMatches.map(match => match.match(/["']([^"']+)["']/)[1]) : [];
      
      console.log(`Extracted ${slugs.length} blog slugs from all blog files`);
      
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

// Function to generate robots.txt
function generateRobotsTxt() {
  const robotsContent = `User-agent: *
Allow: /

# Disallow admin, API, and internal areas
Disallow: /admin/
Disallow: /api/
Disallow: /drafts/
Disallow: /*.pdf$

# Set crawl delay for general bots
Crawl-delay: 1

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