export interface SEOData {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
}

const BASE_URL = 'https://wordcounterplusapp.com';

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function getCanonicalUrl(path: string): string {
  const normalizedPath = path.split('?')[0].replace(/\/$/, '') || '/';
  return `${BASE_URL}${normalizedPath}`;
}

let blogPostsCache: Array<{ slug: string; title: string; excerpt: string; image?: string; tags: string[] }> | null = null;

async function loadBlogPosts() {
  if (blogPostsCache) return blogPostsCache;
  try {
    const blogModule = await import('../client/src/data/blogData');
    blogPostsCache = blogModule.allBlogPosts;
    return blogPostsCache;
  } catch (error) {
    console.error('Failed to load blog posts for SEO:', error);
    return [];
  }
}

const staticPagesSEO: Record<string, { title: string; description: string; keywords?: string }> = {
  '/': {
    title: 'Word Counter Plus - Free Online Text Analyzer',
    description: 'Free word counter and character counter tool. Real-time text analysis with readability scores, keyword density, and SEO optimization for writers.',
    keywords: 'word counter, character counter, text analyzer, readability score, keyword density'
  },
  '/character-counter': {
    title: 'Free Character Counter Online - Count Characters & Spaces',
    description: 'Free character counter tool. Count characters with/without spaces, words, sentences. Check Twitter, Instagram, Facebook limits instantly.',
    keywords: 'character counter, count characters, letter counter, twitter character limit'
  },
  '/text-case-convert': {
    title: 'Free Text Case Converter - Uppercase, Lowercase, Title Case',
    description: 'Free text case converter online - convert to UPPERCASE, lowercase, Title Case, camelCase, snake_case. Used by developers and writers worldwide.',
    keywords: 'text case converter, uppercase, lowercase, title case, camel case'
  },
  '/word-frequency-counter': {
    title: 'Word Frequency Counter - Analyze Word Usage & Density',
    description: 'Free word frequency counter. Find most used words, analyze keyword density, export to CSV. Perfect for SEO, content analysis, writing improvement.',
    keywords: 'word frequency, keyword density, word count, text analysis'
  },
  '/random-word-generator': {
    title: 'Random Word Generator - Generate Words for Writing',
    description: 'Free random word generator with customizable options. Generate nouns, verbs, adjectives for creative writing, games, and brainstorming.',
    keywords: 'random word generator, word generator, creative writing'
  },
  '/words-per-page': {
    title: 'Words Per Page Calculator - Convert Words to Pages',
    description: 'Free words per page calculator. Convert word count to pages with custom font, size, spacing. Estimate reading time for essays and documents.',
    keywords: 'words per page, page calculator, word count to pages'
  },
  '/plagiarism-checker': {
    title: 'Free Plagiarism Checker - Detect Duplicate Content',
    description: 'Free plagiarism checker for students and writers. Detect copied content, check originality, get detailed reports. Ensure academic integrity.',
    keywords: 'plagiarism checker, duplicate content, originality checker'
  },
  '/resume-cv-checker': {
    title: 'Resume Word Counter - ATS Optimization & Analysis',
    description: 'Free resume word counter with ATS optimization score. Analyze word count, action verbs, skills extraction. Perfect for job seekers.',
    keywords: 'resume checker, ATS optimization, resume analyzer'
  },
  '/seo-content-analyzer': {
    title: 'SEO Content Analyzer - Optimize Content for Rankings',
    description: 'Free SEO content analyzer. Check keyword density, readability scores, meta tags, heading structure. Improve search rankings with insights.',
    keywords: 'SEO analyzer, content optimization, keyword density'
  },
  '/speech-to-text': {
    title: 'Speech to Text - Free Voice Typing & Transcription',
    description: 'Free speech to text converter. Real-time voice recognition, multi-language support, browser-based transcription. No API keys required.',
    keywords: 'speech to text, voice typing, transcription'
  },
  '/readability-calculator': {
    title: 'Readability Calculator - Check Reading Level Score',
    description: 'Free readability calculator with Flesch-Kincaid, Gunning Fog, SMOG, ARI scores. Analyze text complexity for your target audience.',
    keywords: 'readability calculator, flesch kincaid, reading level'
  },
  '/grammar-checker': {
    title: 'Free Grammar Checker - Fix Grammar & Spelling Errors',
    description: 'Free online grammar checker. Detect and fix grammar mistakes, spelling errors, punctuation issues instantly. AI-powered suggestions.',
    keywords: 'grammar checker, spelling checker, punctuation'
  },
  '/text-compare': {
    title: 'Text Compare Tool - Find Differences Between Texts',
    description: 'Free text comparison tool. Compare two texts side-by-side, highlight additions, deletions, changes. Perfect for document review.',
    keywords: 'text compare, diff tool, compare documents'
  },
  '/letter-counter': {
    title: 'Letter Counter - Count Letters, Vowels, Consonants',
    description: 'Free letter counter tool. Count total letters, vowels, consonants, analyze letter frequency. Track uppercase and lowercase characters.',
    keywords: 'letter counter, vowel counter, consonant counter'
  },
  '/sentence-counter': {
    title: 'Sentence Counter - Count & Analyze Sentence Length',
    description: 'Free sentence counter with length analysis. Count sentences, track short/medium/long distribution, improve writing structure.',
    keywords: 'sentence counter, sentence analyzer, writing structure'
  },
  '/paragraph-counter': {
    title: 'Paragraph Counter - Count & Analyze Paragraphs',
    description: 'Free paragraph counter with structure analysis. Count paragraphs, analyze length distribution, track words per paragraph.',
    keywords: 'paragraph counter, paragraph analyzer'
  },
  '/line-counter': {
    title: 'Line Counter - Count Lines in Text & Code',
    description: 'Free line counter tool. Count total lines, empty lines, non-empty lines. Perfect for code analysis, text documents, formatting.',
    keywords: 'line counter, code lines, text lines'
  },
  '/tools': {
    title: 'Free Writing Tools - Word Counter, Grammar Checker & More',
    description: '17+ free writing tools: word counter, character counter, grammar checker, plagiarism detector, SEO analyzer. All 100% free, no signup.',
    keywords: 'writing tools, text tools, free tools'
  },
  '/blog': {
    title: 'Writing Tips & Content Guides | Word Counter Plus Blog',
    description: 'Expert writing tips, text analysis guides, and content creation strategies to improve your writing and boost productivity.',
    keywords: 'writing tips, content guides, blogging'
  },
  '/about': {
    title: 'About Word Counter Plus - Free Text Analysis Tools',
    description: 'Learn about Word Counter Plus, our mission to provide free, accessible text analysis tools for writers, students, and professionals.',
    keywords: 'about word counter plus, text analysis'
  },
  '/contact': {
    title: 'Contact Us - Word Counter Plus Support',
    description: 'Get in touch with Word Counter Plus team. We are here to help with any questions about our free text analysis tools.',
    keywords: 'contact, support, help'
  },
  '/faq': {
    title: 'FAQ - Frequently Asked Questions | Word Counter Plus',
    description: 'Find answers to common questions about Word Counter Plus tools, features, and usage. Get help with word counting and text analysis.',
    keywords: 'faq, help, questions'
  },
  '/privacy': {
    title: 'Privacy Policy - Word Counter Plus',
    description: 'Read our privacy policy to understand how Word Counter Plus handles your data. We prioritize user privacy and data security.',
    keywords: 'privacy policy, data protection'
  },
  '/terms': {
    title: 'Terms of Service - Word Counter Plus',
    description: 'Read our terms of service for using Word Counter Plus text analysis tools and services.',
    keywords: 'terms of service, terms and conditions'
  },
  '/disclaimer': {
    title: 'Disclaimer - Word Counter Plus',
    description: 'Read our disclaimer about the use of Word Counter Plus tools and the accuracy of text analysis results.',
    keywords: 'disclaimer, legal'
  },
  '/cookies': {
    title: 'Cookie Policy - Word Counter Plus',
    description: 'Learn about how Word Counter Plus uses cookies to improve your experience on our website.',
    keywords: 'cookie policy, cookies'
  },
  '/extension': {
    title: 'Browser Extension - Word Counter Plus',
    description: 'Install the Word Counter Plus browser extension for Chrome, Firefox, and Edge. Count words and characters anywhere on the web.',
    keywords: 'browser extension, chrome extension'
  },
  '/comparisons': {
    title: 'Compare Word Counter Tools - Word Counter Plus vs Others',
    description: 'Compare Word Counter Plus with other popular word counting tools. See why thousands choose our free text analysis platform.',
    keywords: 'word counter comparison, tool comparison'
  },
  '/vs-wordcounter': {
    title: 'Word Counter Plus vs WordCounter.net - Comparison',
    description: 'Compare Word Counter Plus with WordCounter.net. See features, accuracy, and user experience differences between these tools.',
    keywords: 'wordcounter comparison, word counter vs'
  },
  '/vs-charactercount': {
    title: 'Word Counter Plus vs CharacterCount.org - Comparison',
    description: 'Compare Word Counter Plus with CharacterCount.org. Discover which character counting tool is right for your needs.',
    keywords: 'character count comparison'
  },
  '/vs-grammarly': {
    title: 'Word Counter Plus vs Grammarly - Comparison',
    description: 'Compare Word Counter Plus with Grammarly. See how our free tools stack up against premium grammar checking services.',
    keywords: 'grammarly comparison, grammar checker vs'
  },
  '/vs-wordcounttool': {
    title: 'Word Counter Plus vs WordCountTool.com - Comparison',
    description: 'Compare Word Counter Plus with WordCountTool.com. Find the best word counting solution for your writing needs.',
    keywords: 'word count tool comparison'
  }
};

export async function getBlogPostSEO(slug: string): Promise<SEOData> {
  const blogPosts = await loadBlogPosts();
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found | Word Counter Plus',
      description: 'The requested blog post could not be found.',
      canonical: getCanonicalUrl(`/blog/${slug}`),
      ogType: 'article'
    };
  }

  const truncateDescription = (text: string, maxLength: number = 155) => {
    if (text.length <= maxLength) return text;
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
  };

  return {
    title: `${post.title} | Word Counter Plus Blog`,
    description: truncateDescription(post.excerpt),
    canonical: getCanonicalUrl(`/blog/${post.slug}`),
    ogImage: post.image || '/og-image.png',
    ogType: 'article',
    keywords: post.tags.join(', ')
  };
}

export async function getSEODataForUrl(url: string): Promise<SEOData> {
  const normalizedUrl = url.split('?')[0].replace(/\/$/, '') || '/';
  
  if (normalizedUrl.startsWith('/blog/')) {
    const slug = normalizedUrl.replace('/blog/', '');
    return await getBlogPostSEO(slug);
  }

  const pageData = staticPagesSEO[normalizedUrl];
  
  if (pageData) {
    return {
      title: pageData.title,
      description: pageData.description,
      canonical: getCanonicalUrl(normalizedUrl),
      keywords: pageData.keywords,
      ogImage: '/og-image.png',
      ogType: 'website'
    };
  }

  return {
    title: 'Word Counter Plus - Free Online Text Analyzer',
    description: 'Free word counter and character counter tool. Real-time text analysis with readability scores, keyword density, and SEO optimization for writers.',
    canonical: getCanonicalUrl(normalizedUrl),
    ogImage: '/og-image.png',
    ogType: 'website'
  };
}

export function generateMetaTags(seoData: SEOData): string {
  const baseUrl = BASE_URL;
  const ogImage = seoData.ogImage?.startsWith('http') ? seoData.ogImage : `${baseUrl}${seoData.ogImage || '/og-image.png'}`;

  return `
    <title>${escapeHtml(seoData.title)}</title>
    <meta name="description" content="${escapeHtml(seoData.description)}">
    <link rel="canonical" href="${seoData.canonical}">
    
    <!-- Hreflang Tags -->
    <link rel="alternate" hreflang="en" href="${seoData.canonical}">
    <link rel="alternate" hreflang="x-default" href="${seoData.canonical}">
    
    <!-- Open Graph -->
    <meta property="og:type" content="${seoData.ogType || 'website'}">
    <meta property="og:title" content="${escapeHtml(seoData.title)}">
    <meta property="og:description" content="${escapeHtml(seoData.description)}">
    <meta property="og:url" content="${seoData.canonical}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:site_name" content="Word Counter Plus">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(seoData.title)}">
    <meta name="twitter:description" content="${escapeHtml(seoData.description)}">
    <meta name="twitter:image" content="${ogImage}">
    <meta name="twitter:site" content="@wordcounterplusapp">
    
    ${seoData.keywords ? `<meta name="keywords" content="${escapeHtml(seoData.keywords)}">` : ''}
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  `;
}
