// Comprehensive SEO configuration for both Word Counter and Text Case Converter
import { getCurrentOrigin, isMainHost, isCaseHost } from './site';
import { getKeywordsString } from './seo-keywords';

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogImage: string;
  structuredData: any;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

// Word Counter Tool SEO Configuration (Main Domain)
export const getWordCounterSEO = (): SEOConfig => {
  const origin = getCurrentOrigin();
  
  return {
    title: "Free Word Counter Tool 2025 - Instant Character Count & Text Analysis | Word Counter Plus",
    description: "Professional word counter tool with real-time text analysis, SEO optimization, readability scores, keyword density, and AI-powered insights. Count words, characters, paragraphs instantly. Trusted by 2M+ writers, students, and content creators worldwide. Mobile-optimized, privacy-first, and completely free.",
    keywords: "word counter 2025, free word counter tool, character counter online, text analysis tool, count words characters instantly, readability score checker, keyword density analyzer, SEO content optimizer, writing productivity tool, real-time text counter, mobile word counter, AI text analysis, content optimization tool, social media character limit, twitter character counter, facebook post counter, instagram caption counter, linkedin post counter, blog word count, article word counter, essay character count, academic writing tool, student word counter, content creator tool, copywriter word count, digital marketing text tool, email subject line counter, meta description checker, title tag analyzer, paragraph counter, sentence analyzer, flesch reading score, gunning fog index, automated readability index, content grade level, typing speed calculator, reading time estimator, speaking time calculator, text statistics dashboard, word frequency analysis, phrase density checker, duplicate content detector, text similarity checker, document analyzer, manuscript word count, thesis character limit, research paper optimizer, novel word tracker, screenplay format checker, poetry line counter, speech timer, presentation word limit, report optimizer, resume word checker, cover letter optimizer, press release analyzer, website content audit, web copy optimizer, product description analyzer, ecommerce content tool, amazon listing optimizer, google ads text counter, facebook ads character limit, content marketing analyzer, email marketing optimizer, newsletter text checker, blog SEO analyzer, content strategy tool, competitive content analysis, semantic SEO tool, voice search optimizer, featured snippet optimizer, local SEO content tool, technical writing analyzer, accessibility content checker, mobile content optimizer, voice-to-text counter, transcription analyzer, podcast script counter, video script analyzer, youtube description optimizer, tiktok caption counter, text message counter, sms character limit, push notification optimizer, app content analyzer, help content checker, knowledge base optimizer, user manual optimizer, training material analyzer, course content counter, lesson plan optimizer, business plan analyzer, marketing plan counter, legal document counter, contract analyzer, grant application analyzer, scholarship essay analyzer, personal statement counter, portfolio description analyzer, biography optimizer, blog post analyzer, news article counter, editorial optimizer, interview analyzer, press release counter, social media content planner, hashtag analyzer, trending content optimizer, viral content checker, engagement optimizer",
    canonical: `${origin}/`,
    ogImage: `${origin}/og-image.png`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": ["WebApplication", "SoftwareApplication"],
      "name": "Word Counter Plus - Free Word Counter, Character Counter & Text Counter",
      "alternateName": ["Word Counter", "Character Counter", "Text Counter", "Word Count Tool", "Character Count Tool"],
      "url": `${origin}`,
      "logo": `${origin}/word-counter-plus-logo.png`,
      "description": "Free online word counter, character counter, and text counter tool. Count words, characters, paragraphs, sentences instantly. Best text analysis tool with readability scores, keyword density, and export options for writers, students, and content creators.",
      "keywords": "word counter, character counter, text counter, count words, count characters, free word counter, online word counter, text analysis, word count tool, character count tool, text count tool, paragraph counter, sentence counter, readability score, keyword density",
      "applicationCategory": ["Productivity", "Education", "Writing", "Text Analysis"],
      "operatingSystem": ["Web Browser", "Windows", "macOS", "Linux", "iOS", "Android"],
      "browserRequirements": "Requires JavaScript. Works with Chrome, Firefox, Safari, Edge.",
      "softwareVersion": "2.0",
      "datePublished": "2024-01-01",
      "dateModified": "2025-09-18",
      "inLanguage": "en-US",
      "isAccessibleForFree": true,
      "isFamilyFriendly": true,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.9,
        "ratingCount": 2847,
        "bestRating": 5,
        "worstRating": 1,
        "reviewCount": 2847
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "validFrom": "2024-01-01"
      },
      "creator": {
        "@type": "Organization",
        "name": "Word Counter Plus",
        "url": `${origin}`,
        "logo": `${origin}/word-counter-plus-logo.png`
      },
      "publisher": {
        "@type": "Organization",
        "name": "Word Counter Plus",
        "url": `${origin}`
      },
      "audience": {
        "@type": "Audience",
        "audienceType": ["Writers", "Students", "Content Creators", "Bloggers", "Authors", "Journalists", "Marketers", "Educators", "Researchers", "Social Media Managers"]
      },
      "featureList": [
        "Real-time word counting with instant results",
        "Character counting with and without spaces",
        "Advanced paragraph and sentence analysis",
        "Professional readability scoring (Flesch-Kincaid, Gunning Fog, ARI)",
        "Comprehensive keyword density analysis",
        "SEO content optimization insights",
        "Multiple export formats (PDF, CSV, TXT, JSON)",
        "Reading time estimation with accuracy",
        "Speaking time calculator for presentations",
        "Writing productivity goal tracking",
        "Multi-format file upload support (DOC, DOCX, PDF, TXT)",
        "Advanced copy and paste functionality",
        "Mobile-first responsive design",
        "Dark mode with system preference sync",
        "Zero registration requirement",
        "Privacy-first approach - no data storage",
        "Full offline functionality after initial load",
        "100% free with no hidden costs",
        "Cross-platform compatibility (Windows, Mac, Linux, iOS, Android)",
        "Language detection and analysis",
        "Text complexity scoring",
        "Duplicate content detection",
        "Word frequency analysis",
        "Text similarity checker",
        "Content grade level assessment",
        "Social media character limit checker",
        "Email subject line optimizer",
        "Meta description length checker",
        "Title tag optimization",
        "Content accessibility compliance"
      ],
      "potentialAction": {
        "@type": "UseAction",
        "target": `${origin}`,
        "object": {
          "@type": "WebPage",
          "name": "Word Counter Plus Tool"
        }
      },
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I count words in a text?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Simply paste or type your text into the text area and Word Counter Plus will automatically count words, characters, paragraphs, and sentences in real-time."
          }
        },
        {
          "@type": "Question", 
          "name": "Is Word Counter Plus free to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Word Counter Plus is completely free to use with no registration required. All features including export options are available at no cost."
          }
        },
        {
          "@type": "Question",
          "name": "Can I export my text analysis results?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, you can export your text analysis results to PDF, CSV, or TXT formats with detailed statistics and readability scores."
          }
        }
      ]
    },
    breadcrumbs: [
      { name: "Word Counter", url: `${origin}/` }
    ]
  };
};

// Text Case Converter Tool SEO Configuration (Case Subdomain)
export const getTextCaseSEO = (): SEOConfig => {
  const origin = getCurrentOrigin();
  
  return {
    title: "Free Text Case Converter 2025 - Uppercase, Lowercase, Camel Case | US, UK, CA",
    description: "Free text case converter online - instantly convert to UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case. Used by 150K+ developers, programmers, writers in US, UK, Canada, Australia. 10+ case formats, real-time conversion, copy to clipboard. Perfect for coding, variable names, content formatting.",
    keywords: "text case converter free, case converter online, uppercase converter, lowercase converter, camel case converter, snake case converter, title case converter, pascal case converter, kebab case converter, text transformer, string converter, variable name converter, coding case converter, programming case tool, text format converter, case changer online free",
    canonical: `${origin}/text-case-converter`,
    ogImage: `${origin}/og-image.png`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": ["WebApplication", "SoftwareApplication"],
      "name": "Text Case Converter - Convert to Upper, Lower, Title, Camel Case Online",
      "alternateName": ["Case Converter", "Text Case Tool", "Case Changer", "Text Transformer", "String Converter"],
      "url": `${origin}/text-case-converter`,
      "logo": `${origin}/word-counter-plus-logo.png`,
      "description": "Free online text case converter tool. Convert text to uppercase, lowercase, title case, camel case, snake case, kebab case, and more. Perfect for developers, writers, and content creators.",
      "keywords": "text case converter, uppercase, lowercase, camel case, snake case",
      "applicationCategory": ["Productivity", "Developer Tools", "Text Processing", "Utilities"],
      "operatingSystem": ["Web Browser", "Windows", "macOS", "Linux", "iOS", "Android"],
      "browserRequirements": "Requires JavaScript. Works with Chrome, Firefox, Safari, Edge.",
      "softwareVersion": "2.0",
      "datePublished": "2024-01-01",
      "dateModified": "2025-10-05",
      "inLanguage": "en-US",
      "isAccessibleForFree": true,
      "isFamilyFriendly": true,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.9,
        "ratingCount": 4567,
        "bestRating": 5,
        "worstRating": 1
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "validFrom": "2024-01-01"
      },
      "creator": {
        "@type": "Organization",
        "name": "Word Counter Plus",
        "url": "https://wordcounterplusapp.com",
        "logo": "https://wordcounterplusapp.com/word-counter-plus-logo.png"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Word Counter Plus",
        "url": "https://wordcounterplusapp.com"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": ["Developers", "Programmers", "Writers", "Content Creators", "Students", "Web Developers", "Software Engineers", "Designers", "Marketers"]
      },
      "featureList": [
        "Convert to uppercase (UPPER CASE)",
        "Convert to lowercase (lower case)",
        "Convert to title case (Title Case)",
        "Convert to camel case (camelCase)",
        "Convert to pascal case (PascalCase)",
        "Convert to snake case (snake_case)",
        "Convert to kebab case (kebab-case)",
        "Convert to sentence case (Sentence case)",
        "Convert to alternating case (aLtErNaTiNg CaSe)",
        "Convert to inverse case (iNVERSE cASE)",
        "Instant real-time conversion",
        "Copy to clipboard functionality",
        "Batch text processing",
        "Mobile responsive design",
        "Dark mode support",
        "No registration required",
        "Privacy focused - no data storage",
        "Works offline",
        "Free to use",
        "Cross-platform compatibility"
      ],
      "potentialAction": {
        "@type": "UseAction",
        "target": `${origin}`,
        "object": {
          "@type": "WebPage",
          "name": "Text Case Converter Tool"
        }
      },
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I convert text case online?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Simply paste or type your text into the input field and select the desired case conversion option. The text will be instantly converted to uppercase, lowercase, title case, camel case, or any other supported format."
          }
        },
        {
          "@type": "Question",
          "name": "What case conversion options are available?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our tool supports uppercase, lowercase, title case, sentence case, camel case, pascal case, snake case, kebab case, alternating case, and inverse case conversions."
          }
        },
        {
          "@type": "Question",
          "name": "Is the text case converter free to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our text case converter is completely free to use with no registration required. All conversion features are available at no cost."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use this tool for programming variable names?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely! Our case converter is perfect for converting text to programming-friendly formats like camelCase, PascalCase, snake_case, and kebab-case for variable names, function names, and file names."
          }
        }
      ]
    },
    breadcrumbs: [
      { name: "Home", url: `${origin}/` },
      { name: "Tools", url: `${origin}/tools` },
      { name: "Text Case Converter", url: `${origin}/text-case-converter` }
    ]
  };
};

// Dynamic SEO getter based on current domain
export const getCurrentSEOConfig = (): SEOConfig => {
  if (isCaseHost()) {
    return getTextCaseSEO();
  }
  return getWordCounterSEO();
};

// Additional SEO utility functions
export const generateSitemap = () => {
  const mainOrigin = "https://wordcounterplusapp.com";
  const caseOrigin = "https://textcase.wordcounterplusapp.com";
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${mainOrigin}/</loc>
    <lastmod>2025-09-12</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${mainOrigin}/" />
  </url>
  <url>
    <loc>${caseOrigin}/</loc>
    <lastmod>2025-09-12</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${caseOrigin}/" />
  </url>
  <url>
    <loc>${mainOrigin}/about</loc>
    <lastmod>2025-09-12</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${mainOrigin}/contact</loc>
    <lastmod>2025-09-12</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${mainOrigin}/privacy</loc>
    <lastmod>2025-09-12</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${mainOrigin}/terms</loc>
    <lastmod>2025-09-12</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;
};

export const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /

# Main sitemap
Sitemap: https://wordcounterplusapp.com/sitemap.xml

# Case converter sitemap
Sitemap: https://textcase.wordcounterplusapp.com/sitemap.xml

# Crawl-delay for politeness
Crawl-delay: 1

# Block access to admin or sensitive areas (if any)
Disallow: /admin/
Disallow: /.well-known/
Disallow: /tmp/
Disallow: /logs/

# Allow specific bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot  
Allow: /

User-agent: Slurp
Allow: /
`;
};