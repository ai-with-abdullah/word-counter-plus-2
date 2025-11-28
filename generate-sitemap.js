import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SITE_URL = 'https://wordcounterplusapp.com';
const DIST_PUBLIC_PATH = join(__dirname, 'dist', 'public');

// Tool SEO metadata for sitemap (titles under 60 chars, descriptions under 160 chars)
const toolSEOData = {
  '/': {
    title: 'Free Word Counter & Text Analyzer - Real-Time Tool',
    description: 'Fast, free word counter with real-time text analysis. Readability scores, keyword density, SEO optimization. Perfect for writers, students, bloggers.'
  },
  '/character-counter': {
    title: 'Free Character Counter Online - Count Characters & Spaces',
    description: 'Free character counter tool. Count characters with/without spaces, words, sentences. Check Twitter, Instagram, Facebook limits instantly.'
  },
  '/text-case-convert': {
    title: 'Free Text Case Converter 2025 - Uppercase, Lowercase, Camel',
    description: 'Free text case converter online - convert to UPPERCASE, lowercase, Title Case, camelCase, snake_case. Used by 150K+ developers worldwide.'
  },
  '/word-frequency-counter': {
    title: 'Word Frequency Counter - Analyze Word Usage & Density',
    description: 'Free word frequency counter. Find most used words, analyze keyword density, export to CSV. Perfect for SEO, content analysis, writing improvement.'
  },
  '/random-word-generator': {
    title: 'Random Word Generator - Generate Words for Writing',
    description: 'Free random word generator with customizable options. Generate nouns, verbs, adjectives for creative writing, games, and brainstorming.'
  },
  '/words-per-page': {
    title: 'Words Per Page Calculator - Convert Words to Pages',
    description: 'Free words per page calculator. Convert word count to pages with custom font, size, spacing. Estimate reading time for essays and documents.'
  },
  '/plagiarism-checker': {
    title: 'Free Plagiarism Checker - Detect Duplicate Content',
    description: 'Free plagiarism checker for students and writers. Detect copied content, check originality, get detailed reports. Ensure academic integrity.'
  },
  '/resume-cv-checker': {
    title: 'Resume Word Counter - ATS Optimization & Analysis',
    description: 'Free resume word counter with ATS optimization score. Analyze word count, action verbs, skills extraction. Perfect for job seekers.'
  },
  '/seo-content-analyzer': {
    title: 'SEO Content Analyzer - Optimize Content for Rankings',
    description: 'Free SEO content analyzer. Check keyword density, readability scores, meta tags, heading structure. Improve search rankings with insights.'
  },
  '/speech-to-text': {
    title: 'Speech to Text - Free Voice Typing & Transcription',
    description: 'Free speech to text converter. Real-time voice recognition, multi-language support, browser-based transcription. No API keys required.'
  },
  '/readability-calculator': {
    title: 'Readability Calculator - Check Reading Level Score',
    description: 'Free readability calculator with Flesch-Kincaid, Gunning Fog, SMOG, ARI scores. Analyze text complexity for your target audience.'
  },
  '/grammar-checker': {
    title: 'Free Grammar Checker - Fix Grammar & Spelling Errors',
    description: 'Free online grammar checker. Detect and fix grammar mistakes, spelling errors, punctuation issues instantly. AI-powered suggestions.'
  },
  '/text-compare': {
    title: 'Text Compare Tool - Find Differences Between Texts',
    description: 'Free text comparison tool. Compare two texts side-by-side, highlight additions, deletions, changes. Perfect for document review.'
  },
  '/letter-counter': {
    title: 'Letter Counter - Count Letters, Vowels, Consonants',
    description: 'Free letter counter tool. Count total letters, vowels, consonants, analyze letter frequency. Track uppercase and lowercase characters.'
  },
  '/sentence-counter': {
    title: 'Sentence Counter - Count & Analyze Sentence Length',
    description: 'Free sentence counter with length analysis. Count sentences, track short/medium/long distribution, improve writing structure.'
  },
  '/paragraph-counter': {
    title: 'Paragraph Counter - Count & Analyze Paragraphs',
    description: 'Free paragraph counter with structure analysis. Count paragraphs, analyze length distribution, track words per paragraph.'
  },
  '/line-counter': {
    title: 'Line Counter - Count Lines in Text & Code',
    description: 'Free line counter tool. Count total lines, empty lines, non-empty lines. Perfect for code analysis, text documents, formatting.'
  },
  '/tools': {
    title: 'Free Writing Tools - Word Counter, Grammar Checker & More',
    description: '17+ free writing tools: word counter, character counter, grammar checker, plagiarism detector, SEO analyzer. All 100% free, no signup.'
  }
};

function getStaticPages() {
  const staticRoutes = [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    
    { url: '/seo-content-analyzer', priority: 0.95, changefreq: 'weekly' },
    { url: '/plagiarism-checker', priority: 0.95, changefreq: 'weekly' },
    { url: '/resume-cv-checker', priority: 0.95, changefreq: 'weekly' },
    { url: '/grammar-checker', priority: 0.95, changefreq: 'weekly' },
    
    { url: '/tools', priority: 0.9, changefreq: 'weekly' },
    { url: '/character-counter', priority: 0.9, changefreq: 'weekly' },
    { url: '/text-case-convert', priority: 0.9, changefreq: 'weekly' },
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
    
    { url: '/comparisons', priority: 0.85, changefreq: 'weekly' },
    { url: '/vs-wordcounter', priority: 0.8, changefreq: 'weekly' },
    { url: '/vs-charactercount', priority: 0.8, changefreq: 'weekly' },
    { url: '/vs-grammarly', priority: 0.8, changefreq: 'weekly' },
    { url: '/vs-wordcounttool', priority: 0.8, changefreq: 'weekly' },
    
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

// Export tool SEO data for use in other modules
export { toolSEOData };

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
Allow: /text-case-convert
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
Allow: /comparisons
Allow: /vs-wordcounter
Allow: /vs-charactercount
Allow: /vs-grammarly
Allow: /vs-wordcounttool

Disallow: /admin/
Disallow: /api/
Disallow: /drafts/
Disallow: /*.pdf$
Disallow: /private/
Disallow: /.local/
Disallow: /server/
Disallow: /help-us
Disallow: /loading-demo
Disallow: /download

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
