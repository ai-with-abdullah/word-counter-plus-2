import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SITE_URL = 'https://wordcounterplusapp.com';
const DIST_PUBLIC_PATH = join(__dirname, 'dist', 'public');

function getStaticPages() {
  const staticRoutes = [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    
    { url: '/seo-content-analyzer', priority: 0.95, changefreq: 'weekly' },
    { url: '/plagiarism-checker', priority: 0.95, changefreq: 'weekly' },
    { url: '/resume-cv-checker', priority: 0.95, changefreq: 'weekly' },
    { url: '/grammar-checker', priority: 0.95, changefreq: 'weekly' },
    
    { url: '/tools', priority: 0.9, changefreq: 'weekly' },
    { url: '/character-counter', priority: 0.9, changefreq: 'weekly' },
    { url: '/text-case-converter', priority: 0.9, changefreq: 'weekly' },
    { url: '/word-frequency-counter', priority: 0.85, changefreq: 'weekly' },
    { url: '/random-word-generator', priority: 0.85, changefreq: 'weekly' },
    { url: '/words-per-page', priority: 0.85, changefreq: 'weekly' },
    { url: '/speech-to-text', priority: 0.85, changefreq: 'weekly' },
    { url: '/readability-calculator', priority: 0.85, changefreq: 'weekly' },
    { url: '/text-compare', priority: 0.85, changefreq: 'weekly' },
    { url: '/letter-counter', priority: 0.85, changefreq: 'weekly' },
    { url: '/sentence-counter', priority: 0.85, changefreq: 'weekly' },
    { url: '/paragraph-counter', priority: 0.85, changefreq: 'weekly' },
    { url: '/line-counter', priority: 0.85, changefreq: 'weekly' },
    
    { url: '/extension', priority: 0.8, changefreq: 'monthly' },
    { url: '/about', priority: 0.8, changefreq: 'monthly' },
    { url: '/blog', priority: 0.8, changefreq: 'daily' },
    { url: '/contact', priority: 0.7, changefreq: 'monthly' },
    { url: '/faq', priority: 0.7, changefreq: 'monthly' },
    
    { url: '/privacy', priority: 0.5, changefreq: 'yearly' },
    { url: '/terms', priority: 0.5, changefreq: 'yearly' },
    { url: '/disclaimer', priority: 0.5, changefreq: 'yearly' },
    { url: '/cookies', priority: 0.5, changefreq: 'yearly' }
  ];

  return staticRoutes.map(route => ({
    url: route.url,
    changefreq: route.changefreq,
    priority: route.priority
  }));
}

async function getBlogPosts() {
  try {
    console.log('📚 Loading blog data from modules...');
    
    const allBlogs = [];
    const processedSlugs = new Set();
    
    const { blogPosts } = await import('./client/src/data/blogData.ts');
    
    console.log(`✅ Loaded ${blogPosts.length} blog posts from blogData`);
    
    blogPosts.forEach((post) => {
      if (!processedSlugs.has(post.slug)) {
        processedSlugs.add(post.slug);
        allBlogs.push({
          url: `/blog/${post.slug}`,
          changefreq: 'monthly',
          priority: 0.6,
          lastmod: post.publishDate ? new Date(post.publishDate).toISOString() : new Date().toISOString()
        });
      }
    });
    
    console.log(`✅ Total unique blog posts: ${allBlogs.length}`);
    return allBlogs;
    
  } catch (error) {
    console.error('❌ Error reading blog posts:', error);
    console.error('Error details:', error.message);
    return [];
  }
}

function generateRobotsTxt() {
  const robotsContent = `# Robots.txt for Word Counter Plus
# Optimized for search engines (Google, Bing, Yahoo, DuckDuckGo)

User-agent: *
Allow: /
Allow: /seo-content-analyzer
Allow: /plagiarism-checker
Allow: /resume-cv-checker
Allow: /grammar-checker
Allow: /character-counter
Allow: /text-case-converter
Allow: /word-frequency-counter
Allow: /random-word-generator
Allow: /words-per-page
Allow: /speech-to-text
Allow: /readability-calculator
Allow: /text-compare
Allow: /letter-counter
Allow: /sentence-counter
Allow: /paragraph-counter
Allow: /line-counter
Allow: /extension
Allow: /blog
Allow: /tools
Allow: /about
Allow: /contact
Allow: /faq

Disallow: /admin/
Disallow: /api/
Disallow: /drafts/
Disallow: /*.pdf$
Disallow: /private/
Disallow: /.local/
Disallow: /server/

User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 0

User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

  writeFileSync(join(DIST_PUBLIC_PATH, 'robots.txt'), robotsContent);
  console.log('✅ Generated robots.txt');
}

async function generateSitemap() {
  try {
    console.log('🚀 Generating sitemap and robots.txt...');

    const staticPages = getStaticPages();
    const blogPosts = await getBlogPosts();
    const allUrls = [...staticPages, ...blogPosts];

    console.log(`📄 Found ${staticPages.length} static pages`);
    console.log(`📝 Found ${blogPosts.length} blog posts`);
    console.log(`🔗 Total URLs: ${allUrls.length}`);

    const sitemapStream = new SitemapStream({ hostname: SITE_URL });
    const writeStream = createWriteStream(join(DIST_PUBLIC_PATH, 'sitemap.xml'));
    
    sitemapStream.pipe(writeStream);

    allUrls.forEach(urlData => {
      sitemapStream.write(urlData);
    });

    sitemapStream.end();

    await streamToPromise(sitemapStream);
    
    console.log('✅ Generated sitemap.xml');

    generateRobotsTxt();

    console.log('🎉 Sitemap generation completed successfully!');
    console.log(`📍 Files generated in: ${DIST_PUBLIC_PATH}`);
    console.log(`\n📋 Summary:`);
    console.log(`   - Static pages: ${staticPages.length}`);
    console.log(`   - Blog posts: ${blogPosts.length}`);
    console.log(`   - Total URLs in sitemap: ${allUrls.length}`);

  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  }
}

generateSitemap();
