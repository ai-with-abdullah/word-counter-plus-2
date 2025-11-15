// Ultra-optimized text analysis for sub-second performance
export interface TextStats {
  wordCount: number;
  charCount: number;
  charNoSpaces: number;
  sentenceCount: number;
  paragraphCount: number;
  avgWordLength: number;
  longestWord: string;
  shortestWord: string;
}

export interface ReadabilityStats {
  score: number;
  level: string;
  readingTime: number;
  speakingTime: number;
}

export interface KeywordData {
  keyword: string;
  count: number;
  percentage: string;
}

export interface KeywordAnalysis {
  single: KeywordData[];
  twoWord: KeywordData[];
  threeWord: KeywordData[];
}

// Pre-compiled regex patterns for maximum performance
const WORD_REGEX = /\S+/g;
const SENTENCE_SPLIT_REGEX = /[.!?]+/;
const PARAGRAPH_REGEX = /\n\s*\n/g;
const SPACE_REGEX = /\s/g;
const PUNCTUATION_REGEX = /[^\w\s]/g;
const VOWEL_REGEX = /[aeiouy]{1,2}/g;

// Syllable counting cache for frequently used words
const syllableCache = new Map<string, number>();

// Pre-calculate common stop words for exclusion
const STOP_WORDS = new Set([
  'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 
  'has', 'was', 'one', 'our', 'out', 'day', 'get', 'use', 'man', 'new',
  'now', 'way', 'may', 'say', 'each', 'which', 'she', 'how', 'its', 'who'
]);

export function calculateBasicStatsOptimized(text: string): TextStats {
  if (!text.trim()) {
    return {
      wordCount: 0,
      charCount: 0,
      charNoSpaces: 0,
      sentenceCount: 0,
      paragraphCount: 0,
      avgWordLength: 0,
      longestWord: '',
      shortestWord: ''
    };
  }

  const charCount = text.length;
  const charNoSpaces = charCount - (text.match(SPACE_REGEX) || []).length;
  
  // Use optimized regex matching
  const words = text.match(WORD_REGEX) || [];
  
  // Count sentences - check if text has sentence terminators
  const hasSentenceTerminators = /[.!?]/.test(text);
  let sentenceCount: number;
  
  if (hasSentenceTerminators) {
    const sentenceParts = text.split(SENTENCE_SPLIT_REGEX).filter(s => s.trim().length > 0);
    sentenceCount = sentenceParts.length;
  } else {
    // No punctuation - estimate based on word count (avg 15 words per sentence)
    sentenceCount = Math.max(Math.ceil(words.length / 15), 1);
  }
  
  const paragraphs = text.split(PARAGRAPH_REGEX).filter(p => p.trim().length > 0);

  let longestWord = '';
  let shortestWord = '';
  let totalWordLength = 0;

  // Single pass through words for multiple calculations
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    totalWordLength += word.length;
    
    if (i === 0) {
      longestWord = word;
      shortestWord = word;
    } else {
      if (word.length > longestWord.length) longestWord = word;
      if (word.length < shortestWord.length) shortestWord = word;
    }
  }

  return {
    wordCount: words.length,
    charCount,
    charNoSpaces,
    sentenceCount,
    paragraphCount: Math.max(paragraphs.length, 1),
    avgWordLength: words.length ? Number((totalWordLength / words.length).toFixed(1)) : 0,
    longestWord,
    shortestWord
  };
}

export function calculateReadabilityStatsOptimized(text: string): ReadabilityStats {
  const words = text.match(WORD_REGEX) || [];
  
  if (words.length === 0) {
    return {
      score: 0,
      level: 'Unknown',
      readingTime: 0,
      speakingTime: 0
    };
  }
  
  // Count sentences - check if text has sentence terminators
  const hasSentenceTerminators = /[.!?]/.test(text);
  let sentenceCount: number;
  
  if (hasSentenceTerminators) {
    const sentenceParts = text.split(SENTENCE_SPLIT_REGEX).filter(s => s.trim().length > 0);
    sentenceCount = sentenceParts.length;
  } else {
    // No punctuation - estimate based on word count (avg 15 words per sentence)
    sentenceCount = Math.max(Math.ceil(words.length / 15), 1);
  }

  const avgWordsPerSentence = words.length / sentenceCount;
  
  // Optimized syllable counting with caching
  let totalSyllables = 0;
  for (const word of words) {
    const cleanWord = word.toLowerCase().replace(PUNCTUATION_REGEX, '');
    if (syllableCache.has(cleanWord)) {
      totalSyllables += syllableCache.get(cleanWord)!;
    } else {
      const syllables = countSyllablesOptimized(cleanWord);
      syllableCache.set(cleanWord, syllables);
      totalSyllables += syllables;
    }
  }
  
  const avgSyllablesPerWord = totalSyllables / words.length;
  const fleschScore = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);

  return {
    score: Number(Math.max(0, Math.min(100, fleschScore)).toFixed(1)),
    level: getReadingLevelOptimized(fleschScore),
    readingTime: Math.ceil(words.length / 200), // 200 WPM
    speakingTime: Math.ceil(words.length / 130) // 130 WPM
  };
}

function countSyllablesOptimized(word: string): number {
  if (word.length <= 3) return 1;

  // Remove common endings that don't add syllables
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  
  const matches = word.match(VOWEL_REGEX);
  return Math.max(matches ? matches.length : 1, 1);
}

function getReadingLevelOptimized(score: number): string {
  if (score >= 90) return 'Very Easy';
  if (score >= 80) return 'Easy';
  if (score >= 70) return 'Fairly Easy';
  if (score >= 60) return 'Standard';
  if (score >= 50) return 'Fairly Difficult';
  if (score >= 30) return 'Difficult';
  return 'Very Difficult';
}

export function calculateKeywordDensityOptimized(text: string): KeywordAnalysis {
  const words = text.toLowerCase()
    .replace(PUNCTUATION_REGEX, ' ')
    .match(WORD_REGEX)
    ?.filter(word => word.length > 2 && !STOP_WORDS.has(word)) || [];

  if (words.length === 0) {
    return { single: [], twoWord: [], threeWord: [] };
  }

  // Use Maps for better performance
  const singleKeywords = new Map<string, number>();
  const twoWordPhrases = new Map<string, number>();
  const threeWordPhrases = new Map<string, number>();

  // Single pass for all keyword analysis
  for (let i = 0; i < words.length; i++) {
    // Single keywords
    const word = words[i];
    singleKeywords.set(word, (singleKeywords.get(word) || 0) + 1);

    // Two-word phrases
    if (i < words.length - 1) {
      const phrase = `${word} ${words[i + 1]}`;
      twoWordPhrases.set(phrase, (twoWordPhrases.get(phrase) || 0) + 1);
    }

    // Three-word phrases
    if (i < words.length - 2) {
      const phrase = `${word} ${words[i + 1]} ${words[i + 2]}`;
      threeWordPhrases.set(phrase, (threeWordPhrases.get(phrase) || 0) + 1);
    }
  }

  // Convert to arrays and sort - optimized
  const single = Array.from(singleKeywords.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({
      keyword: word,
      count,
      percentage: ((count / words.length) * 100).toFixed(1)
    }));

  const twoWord = Array.from(twoWordPhrases.entries())
    .filter(([, count]) => count > 1)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([phrase, count]) => ({
      keyword: phrase,
      count,
      percentage: ((count / (words.length - 1)) * 100).toFixed(1)
    }));

  const threeWord = Array.from(threeWordPhrases.entries())
    .filter(([, count]) => count > 1)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([phrase, count]) => ({
      keyword: phrase,
      count,
      percentage: ((count / (words.length - 2)) * 100).toFixed(1)
    }));

  return { single, twoWord, threeWord };
}

// Debounced analysis cache
const analysisCache = new Map<string, {
  stats: TextStats;
  readability: ReadabilityStats;
  keywords: KeywordAnalysis;
  timestamp: number;
}>();

const CACHE_TIMEOUT = 5000; // 5 seconds

export function getCachedAnalysis(text: string) {
  const cached = analysisCache.get(text);
  if (cached && Date.now() - cached.timestamp < CACHE_TIMEOUT) {
    return cached;
  }
  
  const stats = calculateBasicStatsOptimized(text);
  const readability = calculateReadabilityStatsOptimized(text);
  const keywords = calculateKeywordDensityOptimized(text);
  
  const result = { stats, readability, keywords, timestamp: Date.now() };
  
  // Clean old cache entries (keep cache size manageable)
  if (analysisCache.size > 10) {
    const oldestKey = Array.from(analysisCache.keys())[0];
    analysisCache.delete(oldestKey);
  }
  
  analysisCache.set(text, result);
  return result;
}