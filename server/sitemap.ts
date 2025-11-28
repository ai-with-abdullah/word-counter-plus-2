import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

// Static routes for the sitemap
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/blog', priority: '0.9', changefreq: 'daily' },
  { path: '/tools', priority: '0.9', changefreq: 'weekly' },
  { path: '/character-counter', priority: '0.8', changefreq: 'weekly' },
  { path: '/text-case-convert', priority: '0.8', changefreq: 'weekly' },
  { path: '/word-frequency-counter', priority: '0.8', changefreq: 'weekly' },
  { path: '/random-word-generator', priority: '0.8', changefreq: 'weekly' },
  { path: '/words-per-page', priority: '0.8', changefreq: 'weekly' },
  { path: '/plagiarism-checker', priority: '0.8', changefreq: 'weekly' },
  { path: '/resume-cv-checker', priority: '0.8', changefreq: 'weekly' },
  { path: '/seo-content-analyzer', priority: '0.8', changefreq: 'weekly' },
  { path: '/speech-to-text', priority: '0.8', changefreq: 'weekly' },
  { path: '/readability-calculator', priority: '0.8', changefreq: 'weekly' },
  { path: '/grammar-checker', priority: '0.8', changefreq: 'weekly' },
  { path: '/text-compare', priority: '0.8', changefreq: 'weekly' },
  { path: '/letter-counter', priority: '0.7', changefreq: 'weekly' },
  { path: '/sentence-counter', priority: '0.7', changefreq: 'weekly' },
  { path: '/paragraph-counter', priority: '0.7', changefreq: 'weekly' },
  { path: '/line-counter', priority: '0.7', changefreq: 'weekly' },
  { path: '/comparisons', priority: '0.8', changefreq: 'weekly' },
  { path: '/vs-wordcounter', priority: '0.7', changefreq: 'weekly' },
  { path: '/vs-charactercount', priority: '0.7', changefreq: 'weekly' },
  { path: '/vs-grammarly', priority: '0.7', changefreq: 'weekly' },
  { path: '/vs-wordcounttool', priority: '0.7', changefreq: 'weekly' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.6', changefreq: 'monthly' },
  { path: '/faq', priority: '0.6', changefreq: 'monthly' },
  { path: '/extension', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.4', changefreq: 'yearly' },
  { path: '/terms', priority: '0.4', changefreq: 'yearly' },
  { path: '/disclaimer', priority: '0.3', changefreq: 'yearly' },
  { path: '/cookies', priority: '0.3', changefreq: 'yearly' },
];

// Function to get blog post slugs from generated index
function getBlogPostSlugs(): string[] {
  try {
    // Try to read from generated blog index first
    const blogIndexPath = path.join(__dirname, '../shared/blog-index.json');
    if (fs.existsSync(blogIndexPath)) {
      const blogIndex = JSON.parse(fs.readFileSync(blogIndexPath, 'utf-8'));
      return blogIndex.slugs || [];
    }
    
    // Fallback: read directly from blog files if index doesn't exist
    const blogsDir = path.join(__dirname, '../client/src/data/blogs');
    const blogDataPath = path.join(__dirname, '../client/src/data/blogData.ts');
    const allSlugs: string[] = [];
    
    // Read main blogData.ts
    if (fs.existsSync(blogDataPath)) {
      const content = fs.readFileSync(blogDataPath, 'utf-8');
      const slugMatches = content.match(/slug:\s*["']([^"']+)["'],?/g);
      if (slugMatches) {
        slugMatches.forEach(match => {
          const slug = match.match(/["']([^"']+)["']/)?.[1];
          if (slug) allSlugs.push(slug);
        });
      }
    }
    
    // Read individual blog files
    if (fs.existsSync(blogsDir)) {
      const files = fs.readdirSync(blogsDir).filter(f => f.endsWith('.ts'));
      for (const file of files) {
        const filePath = path.join(blogsDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const slugMatches = content.match(/slug:\s*["']([^"']+)["'],?/g);
        if (slugMatches) {
          slugMatches.forEach(match => {
            const slug = match.match(/["']([^"']+)["']/)?.[1];
            if (slug) allSlugs.push(slug);
          });
        }
      }
    }
    
    return [...new Set(allSlugs)];
  } catch (error) {
    console.error('Error reading blog data:', error);
  }
  return [];
}

router.get('/sitemap.xml', (req, res) => {
  const protocol = req.protocol;
  const host = req.get('host') || 'wordcounterplusapp.com';
  const baseUrl = `${protocol}://${host}`;

  const blogSlugs = getBlogPostSlugs();
  const blogRoutes = blogSlugs.map(slug => ({
    path: `/blog/${slug}`,
    priority: '0.7',
    changefreq: 'weekly'
  }));

  const allRoutes = [...staticRoutes, ...blogRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(sitemap);
});

export default router;
