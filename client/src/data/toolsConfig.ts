import { 
  FaPenFancy, 
  FaTextHeight, 
  FaHashtag,
  FaChartBar,
  FaPlus,
  FaRandom,
  FaFileAlt,
  FaShieldAlt,
  FaBriefcase,
  FaChartLine,
  FaMicrophone,
  FaBookReader,
  FaSpellCheck,
  FaExchangeAlt,
  FaFont,
  FaListOl,
  FaParagraph,
  FaAlignLeft
} from 'react-icons/fa';
import { IconType } from 'react-icons';

export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  href: string;
  isExternal: boolean;
  category: string;
  tags: string[];
  isComingSoon?: boolean;
  featured?: boolean;
}

export const getToolsData = (): Tool[] => {
  
  return [
    {
      id: 'word-counter',
      title: 'Word Counter',
      description: 'Advanced word counting tool with real-time text analysis, readability scores, and keyword density analysis. Perfect for writers, students, and content creators.',
      icon: FaPenFancy,
      href: '/',
      isExternal: false,
      category: 'Analysis',
      tags: ['word count', 'readability', 'analysis', 'writing'],
      featured: true
    },
    {
      id: 'character-counter',
      title: 'Character Counter',
      description: 'Count characters with and without spaces, words, sentences, paragraphs, and check social media character limits for all major platforms.',
      icon: FaHashtag,
      href: '/character-counter',
      isExternal: false,
      category: 'Analysis',
      tags: ['character count', 'social media', 'limits', 'twitter'],
      featured: true
    },
    {
      id: 'text-case-converter',
      title: 'Text Case Converter',
      description: 'Convert text between different cases: uppercase, lowercase, title case, camel case, and more. Ideal for formatting text for different platforms.',
      icon: FaTextHeight,
      href: '/text-case-converter',
      isExternal: false,
      category: 'Formatting',
      tags: ['case conversion', 'formatting', 'uppercase', 'lowercase'],
      featured: true
    },
    {
      id: 'word-frequency-counter',
      title: 'Word Frequency Counter',
      description: 'Count how many times each unique word appears in your text. Sort results by word or frequency and download as CSV for analysis.',
      icon: FaChartBar,
      href: '/word-frequency-counter',
      isExternal: false,
      category: 'Analysis',
      tags: ['word frequency', 'word count', 'occurrence', 'analysis', 'statistics'],
      featured: true
    },
    {
      id: 'random-word-generator',
      title: 'Random Word Generator',
      description: 'Generate random words with customizable options including word count, length, type, and complexity for creative writing and brainstorming.',
      icon: FaRandom,
      href: '/random-word-generator',
      isExternal: false,
      category: 'Generation',
      tags: ['random words', 'word generator', 'creative writing', 'brainstorming', 'random'],
      featured: true
    },
    {
      id: 'words-per-page',
      title: 'Words Per Page',
      description: 'Convert words to pages or pages to words with customizable font, size, spacing, and margins. Includes reading time estimates and comparison tools.',
      icon: FaFileAlt,
      href: '/words-per-page',
      isExternal: false,
      category: 'Calculator',
      tags: ['words per page', 'page calculator', 'word count', 'essay length', 'formatting', 'page count'],
      featured: true
    },
    {
      id: 'plagiarism-checker',
      title: 'Plagiarism Checker',
      description: 'Advanced plagiarism detection with deep content analysis, source matching, paraphrase detection, and detailed originality reports for students and writers.',
      icon: FaShieldAlt,
      href: '/plagiarism-checker',
      isExternal: false,
      category: 'Analysis',
      tags: ['plagiarism', 'originality', 'duplicate content', 'academic integrity', 'content checker', 'paraphrase detection'],
      featured: true
    },
    {
      id: 'resume-cv-checker',
      title: 'Resume/CV Word Counter',
      description: 'Professional resume analyzer with ATS optimization score, section-specific word counts, industry benchmarks, action verb analysis, and skills extraction. Perfect for job seekers in US, UK, and Canada.',
      icon: FaBriefcase,
      href: '/resume-cv-checker',
      isExternal: false,
      category: 'Professional',
      tags: ['resume', 'cv', 'ats', 'job application', 'career', 'optimization', 'word count', 'professional'],
      featured: true
    },
    {
      id: 'seo-content-analyzer',
      title: 'SEO Content Analyzer',
      description: 'Advanced SEO content optimization tool with keyword density analysis, LSI keyword suggestions, readability scoring, meta tag generator, heading hierarchy checker, and competitor comparison for better rankings.',
      icon: FaChartLine,
      href: '/seo-content-analyzer',
      isExternal: false,
      category: 'SEO',
      tags: ['seo', 'content optimization', 'keywords', 'search engine', 'ranking', 'meta tags', 'readability', 'lsi keywords'],
      featured: true
    },
    {
      id: 'speech-to-text',
      title: 'Speech to Text',
      description: 'Convert voice to text instantly with real-time speech recognition. Multi-language support, continuous recording, and browser-based transcription without API keys.',
      icon: FaMicrophone,
      href: '/speech-to-text',
      isExternal: false,
      category: 'Generation',
      tags: ['speech to text', 'voice recognition', 'transcription', 'dictation', 'voice typing', 'speech recognition', 'audio to text'],
      featured: true
    },
    {
      id: 'readability-calculator',
      title: 'Readability Calculator',
      description: 'Advanced readability calculator with Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog Index, SMOG, Coleman-Liau, and ARI scores. Optimize content for your target audience.',
      icon: FaBookReader,
      href: '/readability-calculator',
      isExternal: false,
      category: 'Analysis',
      tags: ['readability score', 'flesch reading ease', 'flesch kincaid', 'grade level', 'text readability', 'gunning fog', 'SMOG index', 'reading level', 'content optimization'],
      featured: true
    },
    {
      id: 'grammar-checker',
      title: 'Grammar Checker',
      description: 'Free online grammar and spell checker. Instantly detect and fix grammar mistakes, spelling errors, and punctuation issues with AI-powered suggestions.',
      icon: FaSpellCheck,
      href: '/grammar-checker',
      isExternal: false,
      category: 'Writing',
      tags: ['grammar checker', 'spell checker', 'grammar check', 'spelling errors', 'punctuation checker', 'grammar correction', 'writing tool', 'grammar fix', 'free grammar checker'],
      featured: true
    },
    {
      id: 'text-compare',
      title: 'Text Compare',
      description: 'Free text comparison tool to find differences between two texts. Compare documents side-by-side with highlighted additions, deletions, and changes.',
      icon: FaExchangeAlt,
      href: '/text-compare',
      isExternal: false,
      category: 'Analysis',
      tags: ['text compare', 'text diff', 'compare text', 'diff checker', 'text comparison', 'compare documents', 'find differences', 'text difference', 'compare versions', 'diff tool'],
      featured: true
    },
    {
      id: 'letter-counter',
      title: 'Letter Counter',
      description: 'Count letters, vowels, consonants, and analyze letter frequency. Track uppercase, lowercase, and alphabetic character distribution in your text.',
      icon: FaFont,
      href: '/letter-counter',
      isExternal: false,
      category: 'Analysis',
      tags: ['letter counter', 'alphabet counter', 'vowel counter', 'consonant counter', 'letter frequency', 'alphabetic characters'],
      featured: true
    },
    {
      id: 'sentence-counter',
      title: 'Sentence Counter',
      description: 'Count sentences and analyze sentence structure and length distribution. Track short, medium, and long sentences with detailed word count statistics.',
      icon: FaListOl,
      href: '/sentence-counter',
      isExternal: false,
      category: 'Analysis',
      tags: ['sentence counter', 'count sentences', 'sentence length', 'sentence structure', 'sentence analysis', 'writing analysis'],
      featured: true
    },
    {
      id: 'paragraph-counter',
      title: 'Paragraph Counter',
      description: 'Count paragraphs and analyze paragraph structure, length, and word distribution. Track short, medium, and long paragraphs with comprehensive statistics.',
      icon: FaParagraph,
      href: '/paragraph-counter',
      isExternal: false,
      category: 'Analysis',
      tags: ['paragraph counter', 'count paragraphs', 'paragraph length', 'paragraph analysis', 'words per paragraph'],
      featured: true
    },
    {
      id: 'line-counter',
      title: 'Line Counter',
      description: 'Count total lines, non-empty lines, and blank lines. Analyze line length and structure for code, text, and documents with detailed line-by-line breakdown.',
      icon: FaAlignLeft,
      href: '/line-counter',
      isExternal: false,
      category: 'Analysis',
      tags: ['line counter', 'count lines', 'line length', 'empty lines', 'code line counter', 'blank lines'],
      featured: true
    },
    // Future tools (coming soon) - only one placeholder
    {
      id: 'more-tools-coming-soon',
      title: 'More Tools Coming Soon',
      description: 'We\'re constantly adding new text processing and analysis tools to help improve your workflow.',
      icon: FaPlus,
      href: '#',
      isExternal: false,
      category: 'Coming Soon',
      tags: ['coming', 'soon', 'new', 'tools'],
      isComingSoon: true
    }
  ];
};

export const getAvailableTools = (): Tool[] => {
  return getToolsData().filter(tool => !tool.isComingSoon);
};

export const getComingSoonTools = (): Tool[] => {
  return getToolsData().filter(tool => tool.isComingSoon);
};

export const getFeaturedTools = (): Tool[] => {
  return getToolsData().filter(tool => tool.featured && !tool.isComingSoon);
};

export const getToolsByCategory = (category: string): Tool[] => {
  return getToolsData().filter(tool => tool.category === category);
};

export const getAllCategories = (): string[] => {
  const categories = getToolsData().map(tool => tool.category);
  return [...new Set(categories)];
};