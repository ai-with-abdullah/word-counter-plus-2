import { useState, useEffect, useCallback } from 'react';
import { 
  calculateBasicStats, 
  calculateReadabilityStats, 
  calculateKeywordDensity,
  TextStats,
  ReadabilityStats,
  KeywordAnalysis 
} from '@/lib/textAnalysis';

export function useTextAnalysis(text: string) {
  const [stats, setStats] = useState<TextStats>({
    wordCount: 0,
    charCount: 0,
    charNoSpaces: 0,
    sentenceCount: 0,
    paragraphCount: 0,
    avgWordLength: 0,
    longestWord: '',
    shortestWord: ''
  });

  const [readability, setReadability] = useState<ReadabilityStats>({
    score: 0,
    level: 'Unknown',
    readingTime: 0,
    speakingTime: 0
  });

  const [keywords, setKeywords] = useState<KeywordAnalysis>({
    single: [],
    twoWord: [],
    threeWord: []
  });

  const analyzeText = useCallback(() => {
    if (!text.trim()) {
      setStats({
        wordCount: 0,
        charCount: 0,
        charNoSpaces: 0,
        sentenceCount: 0,
        paragraphCount: 0,
        avgWordLength: 0,
        longestWord: '',
        shortestWord: ''
      });
      setReadability({
        score: 0,
        level: 'Unknown',
        readingTime: 0,
        speakingTime: 0
      });
      setKeywords({
        single: [],
        twoWord: [],
        threeWord: []
      });
      return;
    }

    const basicStats = calculateBasicStats(text);
    const readabilityStats = calculateReadabilityStats(text);
    const keywordAnalysis = calculateKeywordDensity(text);

    setStats(basicStats);
    setReadability(readabilityStats);
    setKeywords(keywordAnalysis);
  }, [text]);

  useEffect(() => {
    const timeoutId = setTimeout(analyzeText, 300); // Debounce
    return () => clearTimeout(timeoutId);
  }, [analyzeText]);

  return { stats, readability, keywords };
}
