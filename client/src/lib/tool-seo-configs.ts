// Tool-Specific SEO Configurations with Comprehensive Keywords
import { getCurrentOrigin } from './site';
import { getKeywordsString, getToolHashtags } from './seo-keywords';

export interface ToolSEOConfig {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  hashtags: string[];
}

// Character Counter SEO Config
export const getCharacterCounterSEO = (): ToolSEOConfig => {
  const origin = getCurrentOrigin();
  return {
    title: "Character Counter - Count Characters & Words Online",
    description: "Free character counter for Twitter, Instagram, TikTok. Real-time count with/without spaces, emoji detection. Upload TXT files, export results. No signup.",
    keywords: getKeywordsString('characterCounter'),
    canonical: `${origin}/character-counter`,
    hashtags: getToolHashtags('characterCounter')
  };
};

// Text Case Converter SEO Config
export const getTextCaseConverterSEO = (): ToolSEOConfig => {
  const origin = getCurrentOrigin();
  return {
    title: "Text Case Converter - camelCase, snake_case Online",
    description: "Convert text to 12 formats: UPPERCASE, lowercase, camelCase, snake_case, kebab-case. Upload TXT files, download results. Perfect for developers globally.",
    keywords: getKeywordsString('textCaseConverter'),
    canonical: `${origin}/text-case-converter`,
    hashtags: getToolHashtags('textCaseConverter')
  };
};

// Word Frequency Counter SEO Config
export const getWordFrequencyCounterSEO = (): ToolSEOConfig => {
  const origin = getCurrentOrigin();
  return {
    title: "Word Frequency Counter - Keyword Density Tool Free",
    description: "Analyze word frequency and keyword density for SEO. 1-3 word phrases, stop word filter, visual charts. Export CSV/JSON. Perfect for content optimization.",
    keywords: getKeywordsString('wordFrequencyCounter'),
    canonical: `${origin}/word-frequency-counter`,
    hashtags: getToolHashtags('wordFrequencyCounter')
  };
};

// Random Word Generator SEO Config
export const getRandomWordGeneratorSEO = (): ToolSEOConfig => {
  const origin = getCurrentOrigin();
  return {
    title: "Random Word Generator - Free Word List Tool Online",
    description: "Generate random words (1-1000): nouns, verbs, adjectives. Customizable length, separators, case. Download TXT. Perfect for creative writing, brainstorming.",
    keywords: getKeywordsString('randomWordGenerator'),
    canonical: `${origin}/random-word-generator`,
    hashtags: getToolHashtags('randomWordGenerator')
  };
};

// Words Per Page Calculator SEO Config
export const getWordsPerPageSEO = (): ToolSEOConfig => {
  const origin = getCurrentOrigin();
  return {
    title: "Words Per Page Calculator - Convert Words to Pages",
    description: "Calculate words to pages for essays, papers, novels. Customizable font, size, spacing, margins. MLA, APA, Chicago presets. Instant page count.",
    keywords: getKeywordsString('wordsPerPage'),
    canonical: `${origin}/words-per-page`,
    hashtags: getToolHashtags('wordsPerPage')
  };
};

// Plagiarism Checker SEO Config
export const getPlagiarismCheckerSEO = (): ToolSEOConfig => {
  const origin = getCurrentOrigin();
  return {
    title: "Plagiarism Checker - Free Duplicate Content Detector",
    description: "Free plagiarism checker. Upload TXT, DOC, DOCX files. Detect exact matches, paraphrased content. Get originality score, source URLs. Perfect for students, writers.",
    keywords: getKeywordsString('plagiarismChecker'),
    canonical: `${origin}/plagiarism-checker`,
    hashtags: getToolHashtags('plagiarismChecker')
  };
};

// Resume/CV Checker SEO Config
export const getResumeCVCheckerSEO = (): ToolSEOConfig => {
  const origin = getCurrentOrigin();
  return {
    title: "Resume Checker - Free ATS Optimization & Score Tool",
    description: "Free ATS resume checker with optimization score, achievements detection, buzzword analyzer. Upload TXT/DOCX. Get salary estimates. Perfect for job seekers.",
    keywords: getKeywordsString('resumeCVChecker'),
    canonical: `${origin}/resume-cv-checker`,
    hashtags: getToolHashtags('resumeCVChecker')
  };
};

// SEO Content Analyzer SEO Config
export const getSEOContentAnalyzerSEO = (): ToolSEOConfig => {
  const origin = getCurrentOrigin();
  return {
    title: "SEO Content Analyzer - Keyword Density & Meta Tags",
    description: "Analyze keyword density (1-3%), LSI keywords, SERP preview, meta tags, heading hierarchy. FAQ schema generator. Perfect for SEO specialists globally.",
    keywords: getKeywordsString('seoContentAnalyzer'),
    canonical: `${origin}/seo-content-analyzer`,
    hashtags: getToolHashtags('seoContentAnalyzer')
  };
};

// Speech to Text SEO Config
export const getSpeechToTextSEO = (): ToolSEOConfig => {
  const origin = getCurrentOrigin();
  return {
    title: "Speech to Text - Free Voice to Text Converter Tool",
    description: "Free speech to text with real-time voice recognition. 50+ languages, continuous recording, browser-based. No API keys. Perfect for writers globally.",
    keywords: getKeywordsString('speechToText'),
    canonical: `${origin}/speech-to-text`,
    hashtags: getToolHashtags('speechToText')
  };
};

// Readability Calculator SEO Config
export const getReadabilityCalculatorSEO = (): ToolSEOConfig => {
  const origin = getCurrentOrigin();
  return {
    title: "Readability Calculator - Flesch-Kincaid Score Free",
    description: "Free readability calculator with Flesch-Kincaid, Gunning Fog, SMOG, Coleman-Liau, ARI scores. Analyze content complexity and grade level. Perfect globally.",
    keywords: getKeywordsString('readabilityCalculator'),
    canonical: `${origin}/readability-calculator`,
    hashtags: getToolHashtags('readabilityCalculator')
  };
};

// Grammar Checker SEO Config
export const getGrammarCheckerSEO = (): ToolSEOConfig => {
  const origin = getCurrentOrigin();
  return {
    title: "Grammar Checker - Free Spell & Punctuation Checker",
    description: "Free grammar checker with instant error detection. Check grammar, spelling, punctuation with AI suggestions. No sign-up, unlimited. Perfect for students.",
    keywords: getKeywordsString('grammarChecker'),
    canonical: `${origin}/grammar-checker`,
    hashtags: getToolHashtags('grammarChecker')
  };
};

// Text Compare SEO Config
export const getTextCompareSEO = (): ToolSEOConfig => {
  const origin = getCurrentOrigin();
  return {
    title: "Text Compare - Free Diff Checker & Document Compare",
    description: "Free text comparison tool to find differences between texts. Compare documents side-by-side with highlighted additions, deletions, changes. Perfect for writers.",
    keywords: getKeywordsString('textCompare'),
    canonical: `${origin}/text-compare`,
    hashtags: getToolHashtags('textCompare')
  };
};

// Get all tool SEO configs
export const TOOL_SEO_CONFIGS = {
  'character-counter': getCharacterCounterSEO,
  'text-case-converter': getTextCaseConverterSEO,
  'word-frequency-counter': getWordFrequencyCounterSEO,
  'random-word-generator': getRandomWordGeneratorSEO,
  'words-per-page': getWordsPerPageSEO,
  'plagiarism-checker': getPlagiarismCheckerSEO,
  'resume-cv-checker': getResumeCVCheckerSEO,
  'seo-content-analyzer': getSEOContentAnalyzerSEO,
  'speech-to-text': getSpeechToTextSEO,
  'readability-calculator': getReadabilityCalculatorSEO,
  'grammar-checker': getGrammarCheckerSEO,
  'text-compare': getTextCompareSEO
};

// Get SEO config for a specific tool
export function getToolSEO(toolId: string): ToolSEOConfig | null {
  const configFn = TOOL_SEO_CONFIGS[toolId as keyof typeof TOOL_SEO_CONFIGS];
  return configFn ? configFn() : null;
}
