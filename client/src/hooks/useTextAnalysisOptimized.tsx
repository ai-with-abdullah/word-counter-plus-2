import { useState, useEffect, useMemo, useRef } from 'react';
import { 
  getCachedAnalysis,
  TextStats,
  ReadabilityStats,
  KeywordAnalysis 
} from '@/lib/textAnalysisOptimized';

export function useTextAnalysisOptimized(text: string) {
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

  const debounceRef = useRef<NodeJS.Timeout>();
  const isAnalyzingRef = useRef(false);

  // Memoize empty state to prevent unnecessary re-renders
  const emptyStats = useMemo(() => ({
    wordCount: 0,
    charCount: 0,
    charNoSpaces: 0,
    sentenceCount: 0,
    paragraphCount: 0,
    avgWordLength: 0,
    longestWord: '',
    shortestWord: ''
  }), []);

  const emptyReadability = useMemo(() => ({
    score: 0,
    level: 'Unknown',
    readingTime: 0,
    speakingTime: 0
  }), []);

  const emptyKeywords = useMemo(() => ({
    single: [],
    twoWord: [],
    threeWord: []
  }), []);

  useEffect(() => {
    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Handle empty text immediately
    if (!text.trim()) {
      setStats(emptyStats);
      setReadability(emptyReadability);
      setKeywords(emptyKeywords);
      return;
    }

    // For very short texts, analyze immediately
    if (text.length < 100) {
      if (!isAnalyzingRef.current) {
        isAnalyzingRef.current = true;
        
        // Use requestAnimationFrame for smooth UI updates
        requestAnimationFrame(() => {
          const analysis = getCachedAnalysis(text);
          setStats(analysis.stats);
          setReadability(analysis.readability);
          setKeywords(analysis.keywords);
          isAnalyzingRef.current = false;
        });
      }
      return;
    }

    // For longer texts, use intelligent debouncing
    const debounceTime = Math.min(150, Math.max(50, text.length / 100));
    
    debounceRef.current = setTimeout(() => {
      if (!isAnalyzingRef.current) {
        isAnalyzingRef.current = true;
        
        // Use requestIdleCallback if available, fallback to requestAnimationFrame
        const analyze = () => {
          const analysis = getCachedAnalysis(text);
          setStats(analysis.stats);
          setReadability(analysis.readability);
          setKeywords(analysis.keywords);
          isAnalyzingRef.current = false;
        };

        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(analyze, { timeout: 100 });
        } else {
          requestAnimationFrame(analyze);
        }
      }
    }, debounceTime);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [text, emptyStats, emptyReadability, emptyKeywords]);

  return { stats, readability, keywords };
}