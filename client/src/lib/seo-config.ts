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
    title: "Free Word Counter & Text Analyzer - Real-Time Character Count Tool | Word Counter Plus",
    description: "Fast, free word counter and character counter with real-time text analysis. Readability scores, keyword density, SEO optimization, plagiarism detection & grammar checking. Perfect for writers, students, bloggers & marketers. Count words instantly - no signup required.",
    keywords: "word counter 2025, free word counter tool, character counter online, text analysis tool, count words characters instantly, readability score checker, keyword density analyzer, SEO content optimizer, writing productivity tool, real-time text counter, mobile word counter, AI text analysis, content optimization tool, social media character limit, twitter character counter, facebook post counter, instagram caption counter, linkedin post counter, blog word count, article word counter, essay character count, academic writing tool, student word counter, content creator tool, copywriter word count, digital marketing text tool, email subject line counter, meta description checker, title tag analyzer, paragraph counter, sentence analyzer, flesch reading score, gunning fog index, automated readability index, content grade level, typing speed calculator, reading time estimator, speaking time calculator, text statistics dashboard, word frequency analysis, phrase density checker, duplicate content detector, text similarity checker, document analyzer, manuscript word count, thesis character limit, research paper optimizer, novel word tracker, screenplay format checker, poetry line counter, speech timer, presentation word limit, report optimizer, resume word checker, cover letter optimizer, press release analyzer, website content audit, web copy optimizer, product description analyzer, ecommerce content tool, amazon listing optimizer, google ads text counter, facebook ads character limit, content marketing analyzer, email marketing optimizer, newsletter text checker, blog SEO analyzer, content strategy tool, competitive content analysis, semantic SEO tool, voice search optimizer, featured snippet optimizer, local SEO content tool, technical writing analyzer, accessibility content checker, mobile content optimizer, voice-to-text counter, transcription analyzer, podcast script counter, video script analyzer, youtube description optimizer, tiktok caption counter, text message counter, sms character limit, push notification optimizer, app content analyzer, help content checker, knowledge base optimizer, user manual optimizer, training material analyzer, course content counter, lesson plan optimizer, business plan analyzer, marketing plan counter, legal document counter, contract analyzer, grant application analyzer, scholarship essay analyzer, personal statement counter, portfolio description analyzer, biography optimizer, blog post analyzer, news article counter, editorial optimizer, interview analyzer, press release counter, social media content planner, hashtag analyzer, trending content optimizer, viral content checker, engagement optimizer",
    canonical: `${origin}/`,
    ogImage: `${origin}/og-image.png`,
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Word Counter Plus - Free Word Counter, Character Counter & Text Counter",
        "alternateName": ["Word Counter", "Character Counter", "Text Counter"],
        "url": `${origin}`,
        "description": "Free online word counter, character counter, and text counter tool. Count words, characters, paragraphs, sentences instantly.",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Web Browser",
        "inLanguage": "en-US",
        "isAccessibleForFree": true,
        "isFamilyFriendly": true,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "2847",
          "bestRating": "5",
          "worstRating": "1"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "author": {
          "@type": "Organization",
          "name": "Word Counter Plus",
          "url": `${origin}`
        },
        "featureList": [
          "Real-time word counting",
          "Character counting with and without spaces",
          "Paragraph and sentence analysis",
          "Readability scoring",
          "Keyword density analysis",
          "Export to PDF, CSV, TXT",
          "Reading time estimation",
          "File upload support",
          "Mobile responsive",
          "Dark mode support"
        ],
        "potentialAction": {
          "@type": "UseAction",
          "target": `${origin}`
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Word Counter Plus",
        "alternateName": "WordCounterPlus",
        "url": `${origin}`,
        "logo": {
          "@type": "ImageObject",
          "url": `${origin}/word-counter-plus-logo.png`,
          "width": "512",
          "height": "512"
        },
        "description": "Professional text analysis and writing tools for students, writers, content creators, and marketers worldwide.",
        "foundingDate": "2024",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "Customer Support",
          "url": `${origin}/contact`,
          "availableLanguage": "English"
        }
      }
    ],
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
    canonical: `${origin}/text-case-convert`,
    ogImage: `${origin}/og-image.png`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": ["WebApplication", "SoftwareApplication"],
      "name": "Text Case Converter - Convert to Upper, Lower, Title, Camel Case Online",
      "alternateName": ["Case Converter", "Text Case Tool", "Case Changer", "Text Transformer", "String Converter"],
      "url": `${origin}/text-case-convert`,
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
      { name: "Text Case Converter", url: `${origin}/text-case-convert` }
    ]
  };
};

// Character Counter SEO Configuration
export const getCharacterCounterSEO = (): SEOConfig => {
  const origin = getCurrentOrigin();
  return {
    title: "Free Character Counter Online - Count Characters & Spaces",
    description: "Free character counter tool. Count characters with/without spaces, words, sentences. Check Twitter, Instagram, Facebook limits instantly. No signup needed.",
    keywords: "character counter, count characters, character count online, letter counter, twitter character limit, instagram character limit, facebook character limit, text length counter",
    canonical: `${origin}/character-counter`,
    ogImage: `${origin}/og-image.png`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Character Counter",
      "url": `${origin}/character-counter`,
      "description": "Free online character counter tool with social media limit checking.",
      "applicationCategory": "Productivity",
      "isAccessibleForFree": true
    },
    breadcrumbs: [
      { name: "Home", url: `${origin}/` },
      { name: "Tools", url: `${origin}/tools` },
      { name: "Character Counter", url: `${origin}/character-counter` }
    ]
  };
};

// Word Frequency Counter SEO Configuration
export const getWordFrequencyCounterSEO = (): SEOConfig => {
  const origin = getCurrentOrigin();
  return {
    title: "Word Frequency Counter - Analyze Word Usage & Density",
    description: "Free word frequency counter. Find most used words, analyze keyword density, export to CSV. Perfect for SEO, content analysis, and writing improvement.",
    keywords: "word frequency counter, word count frequency, keyword density, word usage analyzer, text analysis, word occurrence counter, SEO keyword tool",
    canonical: `${origin}/word-frequency-counter`,
    ogImage: `${origin}/og-image.png`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Word Frequency Counter",
      "url": `${origin}/word-frequency-counter`,
      "description": "Analyze word frequency and keyword density in your text.",
      "applicationCategory": "Productivity",
      "isAccessibleForFree": true
    },
    breadcrumbs: [
      { name: "Home", url: `${origin}/` },
      { name: "Tools", url: `${origin}/tools` },
      { name: "Word Frequency Counter", url: `${origin}/word-frequency-counter` }
    ]
  };
};

// Random Word Generator SEO Configuration
export const getRandomWordGeneratorSEO = (): SEOConfig => {
  const origin = getCurrentOrigin();
  return {
    title: "Random Word Generator - Generate Words for Writing",
    description: "Free random word generator with customizable options. Generate nouns, verbs, adjectives for creative writing, games, and brainstorming sessions.",
    keywords: "random word generator, word generator, random words, creative writing tool, brainstorming words, random noun generator, random verb generator",
    canonical: `${origin}/random-word-generator`,
    ogImage: `${origin}/og-image.png`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Random Word Generator",
      "url": `${origin}/random-word-generator`,
      "description": "Generate random words for writing, games, and brainstorming.",
      "applicationCategory": "Productivity",
      "isAccessibleForFree": true
    },
    breadcrumbs: [
      { name: "Home", url: `${origin}/` },
      { name: "Tools", url: `${origin}/tools` },
      { name: "Random Word Generator", url: `${origin}/random-word-generator` }
    ]
  };
};

// Words Per Page Calculator SEO Configuration
export const getWordsPerPageSEO = (): SEOConfig => {
  const origin = getCurrentOrigin();
  return {
    title: "Words Per Page Calculator - Convert Words to Pages",
    description: "Free words per page calculator. Convert word count to pages with custom font, size, spacing. Estimate reading and speaking time for essays and documents.",
    keywords: "words per page, page calculator, word to page converter, essay length calculator, reading time calculator, speaking time estimator, document formatter",
    canonical: `${origin}/words-per-page`,
    ogImage: `${origin}/og-image.png`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Words Per Page Calculator",
      "url": `${origin}/words-per-page`,
      "description": "Convert word count to pages with customizable formatting options.",
      "applicationCategory": "Productivity",
      "isAccessibleForFree": true
    },
    breadcrumbs: [
      { name: "Home", url: `${origin}/` },
      { name: "Tools", url: `${origin}/tools` },
      { name: "Words Per Page", url: `${origin}/words-per-page` }
    ]
  };
};

// Plagiarism Checker SEO Configuration
export const getPlagiarismCheckerSEO = (): SEOConfig => {
  const origin = getCurrentOrigin();
  return {
    title: "Free Plagiarism Checker - Detect Duplicate Content",
    description: "Free plagiarism checker for students and writers. Detect copied content, check originality, get detailed reports. Ensure academic integrity instantly.",
    keywords: "plagiarism checker, plagiarism detector, duplicate content checker, originality checker, academic integrity, content authenticity, copy checker",
    canonical: `${origin}/plagiarism-checker`,
    ogImage: `${origin}/og-image.png`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Plagiarism Checker",
      "url": `${origin}/plagiarism-checker`,
      "description": "Detect plagiarism and check content originality.",
      "applicationCategory": "Education",
      "isAccessibleForFree": true
    },
    breadcrumbs: [
      { name: "Home", url: `${origin}/` },
      { name: "Tools", url: `${origin}/tools` },
      { name: "Plagiarism Checker", url: `${origin}/plagiarism-checker` }
    ]
  };
};

// Resume/CV Checker SEO Configuration
export const getResumeCVCheckerSEO = (): SEOConfig => {
  const origin = getCurrentOrigin();
  return {
    title: "Resume Word Counter - ATS Optimization & Analysis",
    description: "Free resume word counter with ATS optimization score. Analyze word count, action verbs, skills extraction. Perfect for job seekers in US, UK, Canada.",
    keywords: "resume word counter, CV analyzer, ATS optimization, resume checker, job application tool, resume analyzer, CV word count, career tool",
    canonical: `${origin}/resume-cv-checker`,
    ogImage: `${origin}/og-image.png`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Resume CV Checker",
      "url": `${origin}/resume-cv-checker`,
      "description": "Analyze and optimize your resume for ATS systems.",
      "applicationCategory": "Productivity",
      "isAccessibleForFree": true
    },
    breadcrumbs: [
      { name: "Home", url: `${origin}/` },
      { name: "Tools", url: `${origin}/tools` },
      { name: "Resume CV Checker", url: `${origin}/resume-cv-checker` }
    ]
  };
};

// SEO Content Analyzer SEO Configuration
export const getSEOContentAnalyzerSEO = (): SEOConfig => {
  const origin = getCurrentOrigin();
  return {
    title: "SEO Content Analyzer - Optimize Content for Rankings",
    description: "Free SEO content analyzer. Check keyword density, readability scores, meta tags, heading structure. Improve search rankings with actionable insights.",
    keywords: "SEO content analyzer, keyword density checker, SEO tool, content optimization, meta tag analyzer, heading checker, SEO audit, search ranking tool",
    canonical: `${origin}/seo-content-analyzer`,
    ogImage: `${origin}/og-image.png`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "SEO Content Analyzer",
      "url": `${origin}/seo-content-analyzer`,
      "description": "Analyze and optimize your content for better search rankings.",
      "applicationCategory": "Productivity",
      "isAccessibleForFree": true
    },
    breadcrumbs: [
      { name: "Home", url: `${origin}/` },
      { name: "Tools", url: `${origin}/tools` },
      { name: "SEO Content Analyzer", url: `${origin}/seo-content-analyzer` }
    ]
  };
};

// Speech to Text SEO Configuration
export const getSpeechToTextSEO = (): SEOConfig => {
  const origin = getCurrentOrigin();
  return {
    title: "Speech to Text - Free Voice Typing & Transcription",
    description: "Free speech to text converter. Real-time voice recognition, multi-language support, browser-based transcription. No API keys or signup required.",
    keywords: "speech to text, voice to text, voice typing, transcription, dictation, voice recognition, audio to text, speech recognition",
    canonical: `${origin}/speech-to-text`,
    ogImage: `${origin}/og-image.png`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Speech to Text",
      "url": `${origin}/speech-to-text`,
      "description": "Convert speech to text with real-time voice recognition.",
      "applicationCategory": "Productivity",
      "isAccessibleForFree": true
    },
    breadcrumbs: [
      { name: "Home", url: `${origin}/` },
      { name: "Tools", url: `${origin}/tools` },
      { name: "Speech to Text", url: `${origin}/speech-to-text` }
    ]
  };
};

// Readability Calculator SEO Configuration
export const getReadabilityCalculatorSEO = (): SEOConfig => {
  const origin = getCurrentOrigin();
  return {
    title: "Readability Calculator - Check Reading Level Score",
    description: "Free readability calculator with Flesch-Kincaid, Gunning Fog, SMOG, ARI scores. Analyze text complexity and optimize content for your target audience.",
    keywords: "readability calculator, Flesch-Kincaid score, reading level, Gunning Fog index, SMOG score, text complexity, readability score, content readability",
    canonical: `${origin}/readability-calculator`,
    ogImage: `${origin}/og-image.png`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Readability Calculator",
      "url": `${origin}/readability-calculator`,
      "description": "Calculate readability scores and reading level for your text.",
      "applicationCategory": "Education",
      "isAccessibleForFree": true
    },
    breadcrumbs: [
      { name: "Home", url: `${origin}/` },
      { name: "Tools", url: `${origin}/tools` },
      { name: "Readability Calculator", url: `${origin}/readability-calculator` }
    ]
  };
};

// Grammar Checker SEO Configuration
export const getGrammarCheckerSEO = (): SEOConfig => {
  const origin = getCurrentOrigin();
  return {
    title: "Free Grammar Checker - Fix Grammar & Spelling Errors",
    description: "Free online grammar checker. Detect and fix grammar mistakes, spelling errors, punctuation issues instantly. AI-powered suggestions for better writing.",
    keywords: "grammar checker, spell checker, grammar correction, spelling errors, punctuation checker, writing tool, grammar fix, proofreader",
    canonical: `${origin}/grammar-checker`,
    ogImage: `${origin}/og-image.png`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Grammar Checker",
      "url": `${origin}/grammar-checker`,
      "description": "Check and fix grammar, spelling, and punctuation errors.",
      "applicationCategory": "Productivity",
      "isAccessibleForFree": true
    },
    breadcrumbs: [
      { name: "Home", url: `${origin}/` },
      { name: "Tools", url: `${origin}/tools` },
      { name: "Grammar Checker", url: `${origin}/grammar-checker` }
    ]
  };
};

// Text Compare SEO Configuration
export const getTextCompareSEO = (): SEOConfig => {
  const origin = getCurrentOrigin();
  return {
    title: "Text Compare Tool - Find Differences Between Texts",
    description: "Free text comparison tool. Compare two texts side-by-side, highlight additions, deletions, changes. Perfect for document review and version control.",
    keywords: "text compare, diff checker, text difference, compare documents, text comparison, find differences, document compare, version compare",
    canonical: `${origin}/text-compare`,
    ogImage: `${origin}/og-image.png`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Text Compare",
      "url": `${origin}/text-compare`,
      "description": "Compare two texts and find differences between them.",
      "applicationCategory": "Productivity",
      "isAccessibleForFree": true
    },
    breadcrumbs: [
      { name: "Home", url: `${origin}/` },
      { name: "Tools", url: `${origin}/tools` },
      { name: "Text Compare", url: `${origin}/text-compare` }
    ]
  };
};

// Letter Counter SEO Configuration
export const getLetterCounterSEO = (): SEOConfig => {
  const origin = getCurrentOrigin();
  return {
    title: "Letter Counter - Count Letters, Vowels, Consonants",
    description: "Free letter counter tool. Count total letters, vowels, consonants, analyze letter frequency distribution. Track uppercase and lowercase characters.",
    keywords: "letter counter, count letters, vowel counter, consonant counter, alphabet counter, letter frequency, character analysis",
    canonical: `${origin}/letter-counter`,
    ogImage: `${origin}/og-image.png`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Letter Counter",
      "url": `${origin}/letter-counter`,
      "description": "Count letters, vowels, and consonants in your text.",
      "applicationCategory": "Productivity",
      "isAccessibleForFree": true
    },
    breadcrumbs: [
      { name: "Home", url: `${origin}/` },
      { name: "Tools", url: `${origin}/tools` },
      { name: "Letter Counter", url: `${origin}/letter-counter` }
    ]
  };
};

// Sentence Counter SEO Configuration
export const getSentenceCounterSEO = (): SEOConfig => {
  const origin = getCurrentOrigin();
  return {
    title: "Sentence Counter - Count & Analyze Sentence Length",
    description: "Free sentence counter with length analysis. Count sentences, track short/medium/long distribution, improve writing structure and readability.",
    keywords: "sentence counter, count sentences, sentence length, sentence analysis, writing structure, sentence statistics, text analysis",
    canonical: `${origin}/sentence-counter`,
    ogImage: `${origin}/og-image.png`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Sentence Counter",
      "url": `${origin}/sentence-counter`,
      "description": "Count and analyze sentences in your text.",
      "applicationCategory": "Productivity",
      "isAccessibleForFree": true
    },
    breadcrumbs: [
      { name: "Home", url: `${origin}/` },
      { name: "Tools", url: `${origin}/tools` },
      { name: "Sentence Counter", url: `${origin}/sentence-counter` }
    ]
  };
};

// Paragraph Counter SEO Configuration
export const getParagraphCounterSEO = (): SEOConfig => {
  const origin = getCurrentOrigin();
  return {
    title: "Paragraph Counter - Count & Analyze Paragraphs",
    description: "Free paragraph counter with structure analysis. Count paragraphs, analyze length distribution, track words per paragraph for better content organization.",
    keywords: "paragraph counter, count paragraphs, paragraph analysis, paragraph length, content structure, writing organization, text analysis",
    canonical: `${origin}/paragraph-counter`,
    ogImage: `${origin}/og-image.png`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Paragraph Counter",
      "url": `${origin}/paragraph-counter`,
      "description": "Count and analyze paragraphs in your text.",
      "applicationCategory": "Productivity",
      "isAccessibleForFree": true
    },
    breadcrumbs: [
      { name: "Home", url: `${origin}/` },
      { name: "Tools", url: `${origin}/tools` },
      { name: "Paragraph Counter", url: `${origin}/paragraph-counter` }
    ]
  };
};

// Line Counter SEO Configuration
export const getLineCounterSEO = (): SEOConfig => {
  const origin = getCurrentOrigin();
  return {
    title: "Line Counter - Count Lines in Text & Code",
    description: "Free line counter tool. Count total lines, empty lines, non-empty lines. Perfect for code analysis, text documents, and content formatting.",
    keywords: "line counter, count lines, code line counter, empty lines, text lines, document lines, line analysis",
    canonical: `${origin}/line-counter`,
    ogImage: `${origin}/og-image.png`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Line Counter",
      "url": `${origin}/line-counter`,
      "description": "Count lines in text and code files.",
      "applicationCategory": "Productivity",
      "isAccessibleForFree": true
    },
    breadcrumbs: [
      { name: "Home", url: `${origin}/` },
      { name: "Tools", url: `${origin}/tools` },
      { name: "Line Counter", url: `${origin}/line-counter` }
    ]
  };
};

// Tools Page SEO Configuration
export const getToolsPageSEO = (): SEOConfig => {
  const origin = getCurrentOrigin();
  return {
    title: "Free Writing Tools - Word Counter, Grammar Checker & More",
    description: "17+ free writing tools: word counter, character counter, grammar checker, plagiarism detector, SEO analyzer. All tools 100% free, no signup required.",
    keywords: "writing tools, word counter, character counter, grammar checker, plagiarism checker, SEO tools, text analysis, free online tools",
    canonical: `${origin}/tools`,
    ogImage: `${origin}/og-image.png`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Free Writing Tools",
      "url": `${origin}/tools`,
      "description": "Collection of 17+ free writing and text analysis tools.",
      "isAccessibleForFree": true
    },
    breadcrumbs: [
      { name: "Home", url: `${origin}/` },
      { name: "Tools", url: `${origin}/tools` }
    ]
  };
};

// Tool SEO configuration map for easy lookup
export const getToolSEO = (toolPath: string): SEOConfig => {
  const origin = getCurrentOrigin();
  const seoMap: Record<string, () => SEOConfig> = {
    '/': getWordCounterSEO,
    '/character-counter': getCharacterCounterSEO,
    '/text-case-convert': getTextCaseSEO,
    '/word-frequency-counter': getWordFrequencyCounterSEO,
    '/random-word-generator': getRandomWordGeneratorSEO,
    '/words-per-page': getWordsPerPageSEO,
    '/plagiarism-checker': getPlagiarismCheckerSEO,
    '/resume-cv-checker': getResumeCVCheckerSEO,
    '/seo-content-analyzer': getSEOContentAnalyzerSEO,
    '/speech-to-text': getSpeechToTextSEO,
    '/readability-calculator': getReadabilityCalculatorSEO,
    '/grammar-checker': getGrammarCheckerSEO,
    '/text-compare': getTextCompareSEO,
    '/letter-counter': getLetterCounterSEO,
    '/sentence-counter': getSentenceCounterSEO,
    '/paragraph-counter': getParagraphCounterSEO,
    '/line-counter': getLineCounterSEO,
    '/tools': getToolsPageSEO
  };
  
  return seoMap[toolPath]?.() || getWordCounterSEO();
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