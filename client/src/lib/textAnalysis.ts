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

export function calculateBasicStats(text: string): TextStats {
  const words = text.trim() ? text.trim().split(/\s+/).filter(word => word.length > 0) : [];
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim().length > 0) : [];
  const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim().length > 0) : [];

  return {
    wordCount: words.length,
    charCount: text.length,
    charNoSpaces: text.replace(/\s/g, '').length,
    sentenceCount: sentences.length,
    paragraphCount: Math.max(paragraphs.length, text.trim() ? 1 : 0),
    avgWordLength: words.length ? Number((words.join('').length / words.length).toFixed(1)) : 0,
    longestWord: words.length ? words.reduce((a, b) => a.length > b.length ? a : b) : '',
    shortestWord: words.length ? words.reduce((a, b) => a.length < b.length ? a : b) : ''
  };
}

export function calculateReadabilityStats(text: string): ReadabilityStats {
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

  if (words.length === 0 || sentences.length === 0) {
    return {
      score: 0,
      level: 'Unknown',
      readingTime: 0,
      speakingTime: 0
    };
  }

  // Simplified Flesch Reading Ease calculation
  const avgWordsPerSentence = words.length / sentences.length;
  const avgSyllablesPerWord = words.reduce((total, word) => total + countSyllables(word), 0) / words.length;

  const fleschScore = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);

  return {
    score: Number(Math.max(0, Math.min(100, fleschScore)).toFixed(1)),
    level: getReadingLevel(fleschScore),
    readingTime: Math.ceil(words.length / 200), // 200 WPM
    speakingTime: Math.ceil(words.length / 130) // 130 WPM
  };
}

function countSyllables(word: string): number {
  // Simplified syllable counting
  word = word.toLowerCase();
  if (word.length <= 3) return 1;

  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

function getReadingLevel(score: number): string {
  if (score >= 90) return 'Very Easy';
  if (score >= 80) return 'Easy';
  if (score >= 70) return 'Fairly Easy';
  if (score >= 60) return 'Standard';
  if (score >= 50) return 'Fairly Difficult';
  if (score >= 30) return 'Difficult';
  return 'Very Difficult';
}

export function calculateKeywordDensity(text: string): KeywordAnalysis {
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2); // Filter out small words

  if (words.length === 0) {
    return { single: [], twoWord: [], threeWord: [] };
  }

  // Single keywords
  const singleKeywords: Record<string, number> = {};
  words.forEach(word => {
    singleKeywords[word] = (singleKeywords[word] || 0) + 1;
  });

  // Two-word phrases
  const twoWordPhrases: Record<string, number> = {};
  for (let i = 0; i < words.length - 1; i++) {
    const phrase = words[i] + ' ' + words[i + 1];
    twoWordPhrases[phrase] = (twoWordPhrases[phrase] || 0) + 1;
  }

  // Three-word phrases
  const threeWordPhrases: Record<string, number> = {};
  for (let i = 0; i < words.length - 2; i++) {
    const phrase = words[i] + ' ' + words[i + 1] + ' ' + words[i + 2];
    threeWordPhrases[phrase] = (threeWordPhrases[phrase] || 0) + 1;
  }

  return {
    single: Object.entries(singleKeywords)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([word, count]) => ({
        keyword: word,
        count,
        percentage: ((count / words.length) * 100).toFixed(1)
      })),
    twoWord: Object.entries(twoWordPhrases)
      .filter(([,count]) => count > 1)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([phrase, count]) => ({
        keyword: phrase,
        count,
        percentage: ((count / (words.length - 1)) * 100).toFixed(1)
      })),
    threeWord: Object.entries(threeWordPhrases)
      .filter(([,count]) => count > 1)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([phrase, count]) => ({
        keyword: phrase,
        count,
        percentage: ((count / (words.length - 2)) * 100).toFixed(1)
      }))
  };
}
