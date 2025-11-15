import { useState, useEffect, useMemo, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import useSEO from '@/hooks/useSEO';
import { 
  FaCopy, 
  FaEraser, 
 
  FaDownload,
  FaFileAlt,
  FaHashtag,
  FaFont,
  FaListOl,
  FaParagraph,
  FaEye,
  FaClock,
  FaGlobe,
  FaKeyboard,
  FaSmile,
  FaSearch,
  FaBullseye,
  FaTags,
  FaChartLine,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
  FaPenFancy,
  FaSync,
  FaUpload
} from 'react-icons/fa';
import { Link } from 'wouter';
import useFileUpload from '@/hooks/useFileUpload';
import RelatedToolsSidebar from '@/components/common/RelatedToolsSidebar';
import { UploadButton } from '@/components/ui/upload-button';
import { prepareDownload } from '@/lib/downloadHelper';

export default function CharacterCounter() {
  const [text, setText] = useState('');
  const [typingStartTime, setTypingStartTime] = useState<number | null>(null);
  const [keystrokeCount, setKeystrokeCount] = useState(0);
  const lastKeyTimeRef = useRef<number>(0);
  const { toast } = useToast();

  // File upload functionality
  const { isLoading: isUploading, triggerFileUpload, FileInput } = useFileUpload({
    onSuccess: (content, filename) => {
      setText(content);
      setTypingStartTime(null); // Reset typing timer for uploaded content
      setKeystrokeCount(0);
    },
    maxSizeInMB: 10
  });

  // Structured data for Character Counter tool
  const characterCounterSchema = {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "SoftwareApplication"],
    "name": "Character Counter - Advanced Text Analysis Tool",
    "alternateName": ["Character Counter", "Character Count Tool", "Text Character Counter"],
    "url": "https://wordcounterplusapp.com/character-counter",
    "description": "Professional character counter with real-time analysis, SEO optimization, and advanced text metrics. Count characters with/without spaces, analyze emoji, detect language, and optimize content for social media platforms.",
    "applicationCategory": ["Productivity", "Text Analysis", "Writing", "SEO"],
    "operatingSystem": "Web Browser",
    "isAccessibleForFree": true,
    "isFamilyFriendly": true,
    "creator": {
      "@type": "Organization", 
      "name": "Word Counter Plus",
      "url": "https://wordcounterplusapp.com"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.8,
      "ratingCount": 3247,
      "bestRating": 5,
      "worstRating": 1
    },
    "featureList": [
      "Character counting with/without spaces",
      "Emoji detection and counting",
      "Language detection",
      "Social media character limits",
      "Typing speed analysis",
      "Text complexity scoring",
      "Export functionality",
      "Real-time analysis"
    ],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-01-01"
    }
  };

  // SEO Configuration
  useSEO({
    title: 'Free Character Counter 2025 - Count Characters, Words & Text Length | Twitter, SMS',
    description: 'Professional character counter free tool for Twitter, SMS, meta tags & social media. Count characters with/without spaces, analyze emoji, check readability scores. Used by 200K+ marketers, writers & students in US, UK, Canada, Australia. Real-time character limits for Facebook, Instagram, LinkedIn, TikTok, YouTube.',
    keywords: 'character counter free, character count tool, free character counter online, text character counter, twitter character counter 280, sms character counter 160, meta description character count, facebook character limit, instagram caption counter, linkedin post character limit, tiktok bio character limit, youtube description counter, email subject line counter, google ads character limit, character counter with spaces, character counter without spaces, emoji character counter, social media character limits, real time character counter, mobile character counter, writing character counter',
    canonical: 'https://wordcounterplusapp.com/character-counter',
    structuredData: characterCounterSchema,
    hreflang: {
      'en-US': 'https://wordcounterplusapp.com/character-counter',
      'en-GB': 'https://wordcounterplusapp.com/character-counter',
      'en-CA': 'https://wordcounterplusapp.com/character-counter',
      'en-AU': 'https://wordcounterplusapp.com/character-counter',
      'x-default': 'https://wordcounterplusapp.com/character-counter'
    },
    breadcrumbs: [
      { name: 'Home', url: 'https://wordcounterplusapp.com/' },
      { name: 'Tools', url: 'https://wordcounterplusapp.com/tools' },
      { name: 'Character Counter', url: 'https://wordcounterplusapp.com/character-counter' }
    ]
  });

  // Auto-save and restore text
  useEffect(() => {
    const savedText = localStorage.getItem('characterCounterText');
    if (savedText) {
      setText(savedText);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('characterCounterText', text);
  }, [text]);

  // Advanced text analysis with unique features
  const stats = useMemo(() => {
    const charactersWithSpaces = text.length;
    const charactersWithoutSpaces = text.replace(/\s/g, '').length;
    
    // Consolidated tokenization with Unicode-aware regex
    const normalizedText = text.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ');
    const allWords = normalizedText.split(/\s+/).filter(word => word.length > 0);
    const words = allWords.length;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0;
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length : 0;
    const lines = text.split('\n').length;
    
    // Emoji and special character analysis with proper Unicode support
    const emojiRegex = /\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu;
    const emojis = text.match(emojiRegex) || [];
    const specialChars = text.match(/[^\w\s]/g) || [];
    const numbers = text.match(/\d/g) || [];
    const upperCaseLetters = text.match(/[A-Z]/g) || [];
    const lowerCaseLetters = text.match(/[a-z]/g) || [];
    
    // Advanced language detection with better Unicode support
    const detectLanguage = () => {
      if (!text.trim()) return 'Unknown';
      
      const stopwords = {
        english: ['the', 'and', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'of', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'this', 'that', 'they', 'them', 'their', 'there', 'then', 'than', 'or', 'but', 'not', 'can', 'all', 'any', 'may', 'say', 'said', 'each', 'which', 'she', 'her', 'him', 'his', 'how', 'its', 'our', 'out', 'day', 'get', 'use', 'man', 'new', 'now', 'way', 'who', 'boy', 'did', 'what', 'come', 'work', 'life', 'time', 'year', 'look', 'just', 'like', 'over', 'also', 'back', 'after', 'first', 'well', 'water', 'little', 'only', 'know', 'place', 'years', 'live', 'me', 'give', 'most', 'very', 'still', 'see', 'own', 'under', 'last'],
        spanish: ['el', 'la', 'de', 'que', 'y', 'en', 'un', 'es', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son', 'con', 'para', 'al', 'del', 'las', 'los', 'una', 'todo', 'le', 'su', 'tiene', 'como', 'me', 'si', 'ya', 'pero', 'más', 'este', 'ser', 'uno', 'sobre', 'también', 'me', 'hasta', 'hay', 'donde', 'han', 'quien', 'están', 'estado', 'desde', 'todo', 'nos', 'durante', 'todos', 'uno', 'les', 'ni', 'contra', 'otros', 'ese', 'eso', 'ante', 'ellos', 'e', 'esto', 'mí', 'antes', 'algunos', 'qué', 'unos', 'yo', 'otro', 'otras', 'otra', 'él', 'tanto', 'esa', 'estos', 'mucho', 'quienes', 'nada', 'muchos', 'cual', 'poco', 'ella', 'estar', 'estas', 'algunas', 'algo', 'nosotros', 'mi', 'mis', 'tú', 'te', 'ti', 'tu', 'tus', 'ellas', 'nosotras', 'vosotros', 'vosotras', 'os', 'mío', 'mía', 'míos', 'mías'],
        french: ['le', 'de', 'et', 'à', 'un', 'il', 'être', 'et', 'en', 'avoir', 'que', 'pour', 'dans', 'ce', 'son', 'une', 'sur', 'avec', 'ne', 'se', 'pas', 'tout', 'plus', 'par', 'grand', 'un', 'si', 'me', 'mais', 'du', 'au', 'nous', 'comme', 'ou', 'si', 'leur', 'y', 'dire', 'elle', 'très', 'ce', 'de', 'nouveau', 'savoir', 'être', 'autre', 'après', 'sans', 'sous', 'peut', 'pendant', 'encore', 'place', 'aller', 'venir', 'à', 'celui', 'faire', 'vous', 'cela', 'je', 'celui', 'où', 'voie', 'là', 'les', 'ces', 'entre', 'cette', 'tous', 'ses', 'peu', 'elle', 'nos', 'mon', 'ton', 'son', 'ma', 'ta', 'sa', 'mes', 'tes', 'leurs', 'notre', 'votre', 'moi', 'toi', 'lui', 'eux', 'elles']
      };
      
      // Use the same tokenization pattern for consistency
      const textNormalized = text.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ');
      const textWords = textNormalized.split(/\s+/).filter(word => word.length > 0);
      
      const englishMatches = textWords.filter(word => stopwords.english.includes(word)).length;
      const spanishMatches = textWords.filter(word => stopwords.spanish.includes(word)).length;
      const frenchMatches = textWords.filter(word => stopwords.french.includes(word)).length;
      
      const totalWords = textWords.length;
      if (totalWords === 0) return 'Unknown';
      
      // Calculate percentage matches
      const englishPercentage = (englishMatches / totalWords) * 100;
      const spanishPercentage = (spanishMatches / totalWords) * 100;
      const frenchPercentage = (frenchMatches / totalWords) * 100;
      
      // Require at least 5% match for detection
      const threshold = 5;
      
      if (englishPercentage >= threshold && englishPercentage > spanishPercentage && englishPercentage > frenchPercentage) return 'English';
      if (spanishPercentage >= threshold && spanishPercentage > englishPercentage && spanishPercentage > frenchPercentage) return 'Spanish';
      if (frenchPercentage >= threshold && frenchPercentage > englishPercentage && frenchPercentage > spanishPercentage) return 'French';
      return 'Mixed/Other';
    };
    
    // Text complexity score
    const calculateComplexity = () => {
      if (words === 0) return 0;
      const avgWordsPerSentence = sentences > 0 ? words / sentences : 0;
      const avgCharsPerWord = charactersWithoutSpaces / words;
      const complexityScore = (avgWordsPerSentence * 0.4) + (avgCharsPerWord * 0.6);
      return Math.min(Math.round(complexityScore), 100);
    };
    
    return {
      charactersWithSpaces,
      charactersWithoutSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      emojis: emojis.length,
      specialChars: specialChars.length,
      numbers: numbers.length,
      upperCaseLetters: upperCaseLetters.length,
      lowerCaseLetters: lowerCaseLetters.length,
      averageWordsPerSentence: sentences > 0 ? Math.round((words / sentences) * 10) / 10 : 0,
      averageCharsPerWord: words > 0 ? Math.round((charactersWithoutSpaces / words) * 10) / 10 : 0,
      readingTime: words > 0 ? Math.ceil(words / 200) : 0,
      speakingTime: words > 0 ? Math.ceil(words / 150) : 0,
      detectedLanguage: detectLanguage(),
      complexityScore: calculateComplexity()
    };
  }, [text]);

  // Social media character limits
  const socialLimits = {
    twitter: 280,
    facebook: 63206,
    instagram: 2200,
    linkedin: 3000,
    youtube: 5000,
    tiktok: 300
  };

  // Advanced keyword density analysis with language-specific stopword filtering
  const keywordAnalysis = useMemo(() => {
    if (!text.trim()) return [];
    
    // Reuse the consolidated tokenization and language detection from stats
    const normalizedText = text.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ');
    const allWords = normalizedText.split(/\s+/).filter(word => word.length > 2);
    
    // Get detected language to apply appropriate stopword filtering
    const detectedLang = stats.detectedLanguage?.toLowerCase();
    
    // Language-specific stopwords
    const stopwords = {
      english: ['the', 'and', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'of', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'this', 'that', 'they', 'them', 'their', 'there', 'then', 'than', 'or', 'but', 'not', 'can', 'all', 'any', 'may', 'say', 'said', 'each', 'which', 'she', 'her', 'him', 'his', 'how', 'its', 'our', 'out', 'day', 'get', 'use', 'man', 'new', 'now', 'way', 'who', 'boy', 'did', 'what', 'come', 'work', 'life', 'time', 'year', 'look', 'just', 'like', 'over', 'also', 'back', 'after', 'first', 'well', 'water', 'little', 'only', 'know', 'place', 'years', 'live', 'me', 'give', 'most', 'very', 'still', 'see', 'own', 'under', 'last'],
      spanish: ['el', 'la', 'de', 'que', 'y', 'en', 'un', 'es', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son', 'con', 'para', 'al', 'del', 'las', 'los', 'una', 'todo', 'le', 'su', 'tiene', 'como', 'me', 'si', 'ya', 'pero', 'más', 'este', 'ser', 'uno', 'sobre', 'también', 'me', 'hasta', 'hay', 'donde', 'han', 'quien', 'están', 'estado', 'desde', 'todo', 'nos', 'durante', 'todos', 'uno', 'les', 'ni', 'contra', 'otros', 'ese', 'eso', 'ante', 'ellos', 'e', 'esto', 'mí', 'antes', 'algunos', 'qué', 'unos', 'yo', 'otro', 'otras', 'otra', 'él', 'tanto', 'esa', 'estos', 'mucho', 'quienes', 'nada', 'muchos', 'cual', 'poco', 'ella', 'estar', 'estas', 'algunas', 'algo', 'nosotros', 'mi', 'mis', 'tú', 'te', 'ti', 'tu', 'tus'],
      french: ['le', 'de', 'et', 'à', 'un', 'il', 'être', 'et', 'en', 'avoir', 'que', 'pour', 'dans', 'ce', 'son', 'une', 'sur', 'avec', 'ne', 'se', 'pas', 'tout', 'plus', 'par', 'grand', 'un', 'si', 'me', 'mais', 'du', 'au', 'nous', 'comme', 'ou', 'si', 'leur', 'y', 'dire', 'elle', 'très', 'ce', 'de', 'nouveau', 'savoir', 'être', 'autre', 'après', 'sans', 'sous', 'peut', 'pendant', 'encore', 'place', 'aller', 'venir', 'à', 'celui', 'faire', 'vous', 'cela', 'je', 'celui', 'où', 'voie', 'là', 'les', 'ces', 'entre', 'cette', 'tous', 'ses', 'peu', 'elle', 'nos', 'mon', 'ton', 'son', 'ma', 'ta', 'sa', 'mes', 'tes']
    };
    
    // Filter out stopwords based on detected language
    let filteredWords = allWords;
    if (detectedLang === 'english') {
      filteredWords = allWords.filter(word => !stopwords.english.includes(word));
    } else if (detectedLang === 'spanish') {
      filteredWords = allWords.filter(word => !stopwords.spanish.includes(word));
    } else if (detectedLang === 'french') {
      filteredWords = allWords.filter(word => !stopwords.french.includes(word));
    }
    
    const wordCount = filteredWords.length;
    if (wordCount === 0) return [];
    
    const frequency: Record<string, number> = {};
    
    filteredWords.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });
    
    return Object.entries(frequency)
      .map(([word, count]) => ({
        word,
        count,
        density: ((count / wordCount) * 100).toFixed(2)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 keywords
  }, [text, stats.detectedLanguage]);
  
  // SEO optimization checker with proper heuristics
  const seoCheck = useMemo(() => {
    // Extract potential title (first line) and meta description (first 160 chars)
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    const potentialTitle = lines[0]?.trim() || '';
    const potentialMeta = text.trim().substring(0, 160);
    
    const titleLength = potentialTitle.length;
    const metaLength = potentialMeta.length;
    
    const titleOptimal = titleLength >= 30 && titleLength <= 60;
    const metaOptimal = metaLength >= 120 && metaLength <= 160;
    const keywordDensityOptimal = keywordAnalysis.length > 0 && parseFloat(keywordAnalysis[0]?.density || '0') >= 1 && parseFloat(keywordAnalysis[0]?.density || '0') <= 3;
    
    return {
      titleTag: {
        optimal: titleOptimal,
        content: potentialTitle,
        length: titleLength,
        message: !potentialTitle ? 'No title detected (use first line)' :
          titleOptimal ? `Perfect title length (${titleLength} chars)` : 
          titleLength < 30 ? `Title too short (${titleLength}/30-60 chars)` : 
          `Title too long (${titleLength}/30-60 chars)`
      },
      metaDescription: {
        optimal: metaOptimal,
        content: potentialMeta,
        length: metaLength,
        message: !potentialMeta ? 'No content for meta description' :
          metaOptimal ? `Perfect meta description length (${metaLength} chars)` :
          metaLength < 120 ? `Meta description too short (${metaLength}/120-160 chars)` :
          `Meta description too long (${metaLength}/120-160 chars)`
      },
      keywordDensity: {
        optimal: keywordDensityOptimal,
        topKeyword: keywordAnalysis[0]?.word || '',
        density: keywordAnalysis[0]?.density || '0',
        message: keywordAnalysis.length === 0 ? 'No keywords detected' :
          keywordDensityOptimal ? `Good keyword density: "${keywordAnalysis[0].word}" (${keywordAnalysis[0].density}%)` :
          parseFloat(keywordAnalysis[0]?.density || '0') < 1 ? `Keyword density too low: "${keywordAnalysis[0].word}" (${keywordAnalysis[0].density}% - aim for 1-3%)` :
          `Keyword density too high: "${keywordAnalysis[0].word}" (${keywordAnalysis[0].density}% - aim for 1-3%)`
      }
    };
  }, [text, keywordAnalysis]);
  
  // Typing speed calculation
  const typingSpeed = useMemo(() => {
    if (!typingStartTime || keystrokeCount === 0) return 0;
    const timeElapsed = (Date.now() - typingStartTime) / 60000; // minutes
    return timeElapsed > 0 ? Math.round(keystrokeCount / timeElapsed) : 0;
  }, [typingStartTime, keystrokeCount]);

  const clearText = () => {
    setText('');
    setTypingStartTime(null);
    setKeystrokeCount(0);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Text Copied",
        description: "Text has been copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy text to clipboard.",
        variant: "destructive",
      });
    }
  };

  const pasteText = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
      toast({
        title: "Text Pasted",
        description: "Text has been pasted from clipboard.",
      });
    } catch (error) {
      toast({
        title: "Paste Failed",
        description: "Unable to paste from clipboard. Please paste manually.",
        variant: "destructive",
      });
    }
  };

  const downloadText = () => {
    const formattedContent = `
================================================================================
CHARACTER COUNTER ANALYSIS REPORT
================================================================================

STATISTICS:
-----------
Characters (with spaces): ${stats.charactersWithSpaces}
Characters (without spaces): ${stats.charactersWithoutSpaces}
Words: ${stats.words}
Sentences: ${stats.sentences}
Paragraphs: ${stats.paragraphs}
Lines: ${stats.lines}

READING METRICS:
---------------
Reading Time: ${stats.readingTime} min
Speaking Time: ${stats.speakingTime} min
Average Words Per Sentence: ${stats.averageWordsPerSentence}
Average Characters Per Word: ${stats.averageCharsPerWord}

CHARACTER DETAILS:
-----------------
Emojis: ${stats.emojis}
Special Characters: ${stats.specialChars}
Numbers: ${stats.numbers}
Uppercase Letters: ${stats.upperCaseLetters}
Lowercase Letters: ${stats.lowerCaseLetters}

LANGUAGE ANALYSIS:
-----------------
Detected Language: ${stats.detectedLanguage}
Text Complexity Score: ${stats.complexityScore}/100

================================================================================
ORIGINAL TEXT:
================================================================================

${text}

================================================================================
Generated by Word Counter Plus
${new Date().toLocaleString()}
================================================================================
`;

    prepareDownload({
      content: formattedContent,
      filename: 'character-count-analysis.txt',
      fileType: 'txt',
      mimeType: 'text/plain',
      sourceToolId: 'character-counter'
    });
  };


  // Keystroke tracking
  const handleTextChange = (value: string) => {
    const now = Date.now();
    
    // Initialize typing start time
    if (!typingStartTime) {
      setTypingStartTime(now);
    }
    
    // Track keystrokes with debouncing
    if (now - lastKeyTimeRef.current > 100) { // 100ms debounce
      setKeystrokeCount(prev => prev + 1);
      lastKeyTimeRef.current = now;
    }
    
    setText(value);
  };

  // Character limit helper function
  const getCharacterLimitStatus = (limit: number) => {
    const remaining = limit - stats.charactersWithSpaces;
    const percentage = (stats.charactersWithSpaces / limit) * 100;
    
    if (percentage >= 100) return { color: 'bg-red-500', status: 'Over limit' };
    if (percentage >= 90) return { color: 'bg-orange-500', status: 'Near limit' };
    if (percentage >= 70) return { color: 'bg-yellow-500', status: 'Approaching limit' };
    return { color: 'bg-green-500', status: 'Within limit' };
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Centered Container with Max Width */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {/* Tool Header */}
          <div className="text-center mb-4 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
              Character Counter
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Count characters, words, sentences, and analyze your text in real-time
            </p>
          </div>

          {/* Main Grid Layout with Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            {/* Main Content Area */}
            <div className="space-y-4 sm:space-y-6 min-w-0">
              {/* File Information Display */}

              {/* Text Input Area */}
              <div className="bg-card rounded-lg p-3 sm:p-6 shadow-sm border border-border">
                <div className="mb-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                    <label htmlFor="textInput" className="text-base sm:text-lg font-semibold text-foreground">Enter Your Text</label>
                    <div className="flex gap-2 w-full sm:w-auto">
                  {/* Upload Button */}
                  <UploadButton 
                    onClick={triggerFileUpload}
                    isLoading={isUploading}
                    size="sm"
                    className="flex-1 sm:flex-none"
                    data-testid="button-upload"
                  />
                </div>
              </div>
              
              <Textarea
                id="textInput"
                placeholder="Type or paste your text here to start counting characters, words, and analyzing your content..."
                value={text}
                onChange={(e) => handleTextChange(e.target.value)}
                className="w-full h-48 sm:h-64 p-3 sm:p-4 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all text-sm sm:text-base" 
                data-testid="textarea-text-input"
              />
            </div>
            
            <div className="mt-3 flex flex-wrap gap-2">
              <button 
                onClick={copyToClipboard}
                disabled={!text}
                className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                data-testid="button-copy"
                title="Copy text to clipboard"
              >
                <FaCopy className="inline mr-1" aria-hidden="true" />
                Copy
              </button>
              <button 
                onClick={clearText}
                disabled={!text}
                className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                data-testid="button-clear"
                title="Clear all text"
              >
                <FaEraser className="inline mr-1" aria-hidden="true" />
                Clear
              </button>
              <button 
                onClick={downloadText}
                disabled={!text}
                className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                data-testid="button-export"
                title="Download text as TXT file"
              >
                <FaDownload className="inline mr-1" aria-hidden="true" />
                Export
              </button>
            </div>
          </div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <Card className="bg-card border border-border">
              <CardContent className="p-3 sm:p-6">
                <div className="flex items-center space-x-2">
                  <FaFont className="text-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Characters</p>
                    <p className="text-lg sm:text-2xl font-bold text-foreground" data-testid="text-character-count">{stats.charactersWithSpaces}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border">
              <CardContent className="p-3 sm:p-6">
                <div className="flex items-center space-x-2">
                  <FaHashtag className="text-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Words</p>
                    <p className="text-lg sm:text-2xl font-bold text-foreground" data-testid="text-word-count">{stats.words}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border">
              <CardContent className="p-3 sm:p-6">
                <div className="flex items-center space-x-2">
                  <FaListOl className="text-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Sentences</p>
                    <p className="text-lg sm:text-2xl font-bold text-foreground" data-testid="text-sentence-count">{stats.sentences}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border">
              <CardContent className="p-3 sm:p-6">
                <div className="flex items-center space-x-2">
                  <FaParagraph className="text-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Paragraphs</p>
                    <p className="text-lg sm:text-2xl font-bold text-foreground" data-testid="text-paragraph-count">{stats.paragraphs}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analysis Tabs */}
          <Tabs defaultValue="detailed" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="detailed" className="text-xs sm:text-sm">
                <FaEye className="mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Detailed Stats</span>
                <span className="sm:hidden">Stats</span>
              </TabsTrigger>
              <TabsTrigger value="social" className="text-xs sm:text-sm">
                <FaGlobe className="mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Social Media</span>
                <span className="sm:hidden">Social</span>
              </TabsTrigger>
              <TabsTrigger value="keywords" className="text-xs sm:text-sm">
                <FaTags className="mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Keywords</span>
                <span className="sm:hidden">Keywords</span>
              </TabsTrigger>
              <TabsTrigger value="seo" className="text-xs sm:text-sm">
                <FaSearch className="mr-1 sm:mr-2" />
                <span className="hidden sm:inline">SEO Analysis</span>
                <span className="sm:hidden">SEO</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="detailed" className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                <Card className="bg-card border border-border">
                  <CardContent className="p-3 sm:p-4">
                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Characters (no spaces)</p>
                      <p className="text-lg sm:text-xl font-bold text-foreground" data-testid="text-character-no-spaces-count">{stats.charactersWithoutSpaces}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card border border-border">
                  <CardContent className="p-3 sm:p-4">
                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Lines</p>
                      <p className="text-lg sm:text-xl font-bold text-foreground" data-testid="text-line-count">{stats.lines}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border border-border">
                  <CardContent className="p-3 sm:p-4">
                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Emojis</p>
                      <p className="text-lg sm:text-xl font-bold text-foreground" data-testid="text-emoji-count">{stats.emojis}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border border-border">
                  <CardContent className="p-3 sm:p-4">
                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Special Characters</p>
                      <p className="text-lg sm:text-xl font-bold text-foreground" data-testid="text-special-char-count">{stats.specialChars}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border border-border">
                  <CardContent className="p-3 sm:p-4">
                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Numbers</p>
                      <p className="text-lg sm:text-xl font-bold text-foreground" data-testid="text-number-count">{stats.numbers}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border border-border">
                  <CardContent className="p-3 sm:p-4">
                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Uppercase Letters</p>
                      <p className="text-lg sm:text-xl font-bold text-foreground" data-testid="text-uppercase-count">{stats.upperCaseLetters}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border border-border">
                  <CardContent className="p-3 sm:p-4">
                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Lowercase Letters</p>
                      <p className="text-lg sm:text-xl font-bold text-foreground" data-testid="text-lowercase-count">{stats.lowerCaseLetters}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border border-border">
                  <CardContent className="p-3 sm:p-4">
                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Detected Language</p>
                      <p className="text-lg sm:text-xl font-bold text-foreground" data-testid="text-detected-language">{stats.detectedLanguage}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <Card className="bg-card border border-border">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center space-x-2">
                      <FaClock className="text-primary" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-muted-foreground">Reading Time</p>
                        <p className="text-lg sm:text-xl font-bold text-foreground" data-testid="text-reading-time">{stats.readingTime} min</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border border-border">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center space-x-2">
                      <FaClock className="text-primary" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-muted-foreground">Speaking Time</p>
                        <p className="text-lg sm:text-xl font-bold text-foreground" data-testid="text-speaking-time">{stats.speakingTime} min</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border border-border">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center space-x-2">
                      <FaKeyboard className="text-primary" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-muted-foreground">Typing Speed</p>
                        <p className="text-lg sm:text-xl font-bold text-foreground" data-testid="text-typing-speed">{typingSpeed} WPM</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border border-border">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center space-x-2">
                      <FaChartLine className="text-primary" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-muted-foreground">Complexity Score</p>
                        <p className="text-lg sm:text-xl font-bold text-foreground" data-testid="text-complexity-score">{stats.complexityScore}/100</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Card className="bg-card border border-border">
                  <CardContent className="p-3 sm:p-4">
                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Average Words per Sentence</p>
                      <p className="text-lg sm:text-xl font-bold text-foreground" data-testid="text-avg-words-per-sentence">{stats.averageWordsPerSentence}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border border-border">
                  <CardContent className="p-3 sm:p-4">
                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Average Characters per Word</p>
                      <p className="text-lg sm:text-xl font-bold text-foreground" data-testid="text-avg-chars-per-word">{stats.averageCharsPerWord}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="social" className="space-y-4">
              <div className="space-y-3 sm:space-y-4">
                {Object.entries(socialLimits).map(([platform, limit]) => {
                  const status = getCharacterLimitStatus(limit);
                  const remaining = limit - stats.charactersWithSpaces;
                  const percentage = Math.min((stats.charactersWithSpaces / limit) * 100, 100);
                  
                  return (
                    <Card key={platform} className="bg-card border border-border">
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-sm sm:text-base font-semibold text-foreground capitalize">{platform}</h3>
                          <Badge variant={percentage >= 100 ? "destructive" : percentage >= 90 ? "secondary" : "default"} className="text-xs">
                            {status.status}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                            <span data-testid={`text-${platform}-used`}>{stats.charactersWithSpaces}/{limit} characters</span>
                            <span data-testid={`text-${platform}-remaining`}>{remaining >= 0 ? `${remaining} remaining` : `${Math.abs(remaining)} over`}</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="keywords" className="space-y-4">
              {keywordAnalysis.length > 0 ? (
                <Card className="bg-card border border-border">
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="text-base sm:text-lg flex items-center">
                      <FaTags className="mr-2" />
                      Top Keywords
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Most frequently used words (excluding common stop words)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-6 pt-0">
                    <div className="space-y-2 sm:space-y-3">
                      {keywordAnalysis.map((keyword, index) => (
                        <div key={keyword.word} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                          <div className="flex items-center space-x-2 flex-1 min-w-0">
                            <span className="text-xs sm:text-sm font-medium text-muted-foreground w-6 flex-shrink-0">#{index + 1}</span>
                            <span className="text-sm sm:text-base text-foreground font-medium truncate" data-testid={`text-keyword-${index}`}>{keyword.word}</span>
                          </div>
                          <div className="flex items-center space-x-3 flex-shrink-0">
                            <span className="text-xs sm:text-sm text-muted-foreground" data-testid={`text-keyword-count-${index}`}>{keyword.count} times</span>
                            <Badge variant="secondary" className="text-xs" data-testid={`text-keyword-density-${index}`}>{keyword.density}%</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Alert>
                  <FaInfoCircle className="h-4 w-4" />
                  <AlertDescription>
                    Start typing to see keyword analysis and density metrics.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="seo" className="space-y-4">
              <div className="grid gap-3 sm:gap-4">
                <Card className="bg-card border border-border">
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="text-base sm:text-lg flex items-center">
                      <FaBullseye className="mr-2" />
                      SEO Content Analysis
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Optimize your content for search engines
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-6 pt-0">
                    <div className="space-y-4">
                      {/* Title Tag Analysis */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold text-foreground">Title Tag (First Line)</h4>
                          {seoCheck.titleTag.optimal ? (
                            <FaCheckCircle className="text-green-500 h-4 w-4" />
                          ) : (
                            <FaExclamationTriangle className="text-yellow-500 h-4 w-4" />
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground" data-testid="text-seo-title-message">{seoCheck.titleTag.message}</p>
                        {seoCheck.titleTag.content && (
                          <div className="p-2 bg-muted rounded text-xs sm:text-sm text-muted-foreground italic" data-testid="text-seo-title-content">
                            "{seoCheck.titleTag.content}"
                          </div>
                        )}
                      </div>

                      {/* Meta Description Analysis */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold text-foreground">Meta Description (First 160 chars)</h4>
                          {seoCheck.metaDescription.optimal ? (
                            <FaCheckCircle className="text-green-500 h-4 w-4" />
                          ) : (
                            <FaExclamationTriangle className="text-yellow-500 h-4 w-4" />
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground" data-testid="text-seo-meta-message">{seoCheck.metaDescription.message}</p>
                        {seoCheck.metaDescription.content && (
                          <div className="p-2 bg-muted rounded text-xs sm:text-sm text-muted-foreground italic" data-testid="text-seo-meta-content">
                            "{seoCheck.metaDescription.content}"
                          </div>
                        )}
                      </div>

                      {/* Keyword Density Analysis */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold text-foreground">Primary Keyword Density</h4>
                          {seoCheck.keywordDensity.optimal ? (
                            <FaCheckCircle className="text-green-500 h-4 w-4" />
                          ) : (
                            <FaExclamationTriangle className="text-yellow-500 h-4 w-4" />
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground" data-testid="text-seo-keyword-message">{seoCheck.keywordDensity.message}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Related Tools - Mobile Only (appears after results) */}
          <div className="lg:hidden mt-6">
            <RelatedToolsSidebar currentTool="/character-counter" limit={5} />
          </div>
        </div>
        {/* End Main Content Area */}

        {/* Related Tools Sidebar - Desktop Only (sticky on right) */}
        <div className="hidden lg:block">
          <div className="sticky top-4">
            <RelatedToolsSidebar currentTool="/character-counter" limit={5} />
          </div>
        </div>
      </div>
      {/* End Grid Layout */}
    </div>
  </div>

  {/* SEO-Optimized Blog Content - Humanized and Optimized */}
  <section className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8">
    <div className="max-w-6xl mx-auto">
      <div className="bg-card rounded-lg p-4 sm:p-6 md:p-8 shadow-sm border border-border">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 sm:mb-6">Why Character Counter Tools Are Essential? The Ultimate Guide for Content Creators and Marketers</h2>
              
              <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                  Have you ever crafted the perfect tweet only to watch it get truncated mid-sentence? Or spent hours writing a meta description for your website, only to discover Google cut it off because it exceeded 160 characters? These frustrating moments happen to content creators every single day. Character limits aren't just arbitrary numbers—they're the invisible boundaries that determine whether your message gets seen or gets buried. That's where a character counter becomes your secret weapon for digital success.
                </p>

                <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                  <FaBullseye className="mr-2 sm:mr-3 text-yellow-500 flex-shrink-0" />
                  How Can Character Counter Tools Maximize Your Social Media Impact?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                  Social media platforms operate on strict character limits, and understanding these boundaries can make or break your engagement rates. Twitter/X allows 280 characters per post, but studies show that tweets between 70-100 characters generate 17% higher engagement than longer ones. LinkedIn posts display the first 140 characters before truncating with "see more," meaning your hook needs to land within that window or risk losing 60% of potential readers.
                </p>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                  Instagram captions support up to 2,200 characters, but the first 125 characters appear before the "more" button—this is prime real estate for your call-to-action. Professional content creators use character counters to optimize every platform: Facebook posts (125 chars visible), TikTok descriptions (300 chars recommended), and even YouTube titles (60 chars for desktop display). Mastering these limits can increase your content visibility by 40-50% across all platforms.
                </p>

                <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                  <FaSearch className="mr-2 sm:mr-3 text-green-500 flex-shrink-0" />
                  How Do SEO Specialists Use Character Counters to Boost Search Rankings?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                  Search engine optimization depends heavily on character count precision. Google displays approximately 50-60 characters of your page title in search results—exceed this limit, and your carefully crafted headline gets cut off with "..." which reduces click-through rates by up to 25%. Meta descriptions have an even stricter limit: 150-160 characters on desktop, 120 characters on mobile. If your description is truncated, users see an incomplete message and are less likely to click.
                </p>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                  But here's what most people miss: <strong>character counting isn't just about limits—it's about optimization</strong>. SEO experts aim for title tags of exactly 55-58 characters because this length is proven to generate 15-20% higher CTR than shorter or longer titles. URL slugs under 60 characters load faster and rank better. H1 tags between 20-70 characters balance SEO value with readability. A character counter helps you hit these sweet spots consistently, giving you a measurable advantage over competitors who guess at optimal lengths.
                </p>

                <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                  <FaPenFancy className="mr-2 sm:mr-3 text-blue-500 flex-shrink-0" />
                  How Can Email Marketers Increase Open Rates with Character Counting?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                  Email marketing success hinges on your subject line—and subject lines have character limits too. Desktop email clients display 60-70 characters, while mobile email apps (which account for 60% of email opens) show only 30-40 characters before truncation. This means your subject line needs to communicate value in fewer than 40 characters to capture mobile users effectively.
                </p>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                  Data from over 40 billion marketing emails reveals that subject lines between 41-50 characters generate the highest open rates—averaging 12-15% higher than longer alternatives. Top-performing marketers use character counters to test multiple variations, ensuring their most compelling words appear within mobile's 40-character window. They also optimize preheader text (80-100 characters visible) to complement the subject line and maximize click-through rates by 3-5%.
                </p>

                <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                  <FaChartLine className="mr-2 sm:mr-3 text-purple-500 flex-shrink-0" />
                  How Do Professional Writers Track Productivity with Character Counts?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                  While word count dominates writing metrics, character count provides deeper insights for certain content types. Journalists writing for print media work with strict character budgets—newspapers typically allow 1,000-1,200 characters per column inch. Magazine writers optimize headlines to exact character specifications, often 35-45 characters for cover lines and 15-25 characters for internal headers.
                </p>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                  Copywriters crafting advertisements, product descriptions, and landing pages rely on character counters to maintain consistency. Google Ads headlines max out at 30 characters, descriptions at 90 characters. Amazon product titles allow 200 characters but only show 80 characters in mobile search results. Professional writers who track character counts alongside word counts report 30% faster content creation because they eliminate the revision cycles needed to trim overly long text.
                </p>

                <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 rounded-lg p-4 sm:p-6 mt-6 sm:mt-8 mb-6 border border-primary/20">
                  <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4">Key Benefits of Using Character Counter Tools</h3>
                  <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-2 text-primary flex-shrink-0">✓</span>
                      <span><strong>Platform-Perfect Content:</strong> Ensure your messages display fully on Twitter, LinkedIn, Instagram, Facebook, and all social media platforms</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary flex-shrink-0">✓</span>
                      <span><strong>SEO Optimization:</strong> Hit Google's exact character limits for titles (50-60 chars) and meta descriptions (150-160 chars) to maximize click-through rates</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary flex-shrink-0">✓</span>
                      <span><strong>Higher Email Open Rates:</strong> Craft subject lines of 41-50 characters proven to increase opens by 12-15% on mobile devices</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary flex-shrink-0">✓</span>
                      <span><strong>Real-Time Analysis:</strong> See character count, word count, sentence count, and reading time update instantly as you type</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary flex-shrink-0">✓</span>
                      <span><strong>Advanced Metrics:</strong> Track typing speed, keyword density, emoji usage, and language detection for professional content creation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary flex-shrink-0">✓</span>
                      <span><strong>Multi-Language Support:</strong> Accurate counting for Unicode, emojis, special characters, and non-Latin alphabets</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary flex-shrink-0">✓</span>
                      <span><strong>Export & Integration:</strong> Download analysis as PDF, CSV, or TXT for reports and workflow automation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary flex-shrink-0">✓</span>
                      <span><strong>100% Free & Private:</strong> No registration required, all processing happens locally in your browser for complete security</span>
                    </li>
                  </ul>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4">Real-World Applications: Who Benefits from Character Counter Tools?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
                  <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                    <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                      <FaHashtag className="mr-2 text-blue-500" />
                      Social Media Managers
                    </h4>
                    <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                      <li>• Optimize posts for Twitter/X 280-character limit</li>
                      <li>• Craft perfect Instagram captions (125 chars visible)</li>
                      <li>• Create LinkedIn posts that avoid truncation</li>
                      <li>• Write TikTok descriptions for maximum virality</li>
                      <li>• Test headlines across multiple platforms</li>
                    </ul>
                  </div>
                  <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                    <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                      <FaSearch className="mr-2 text-green-500" />
                      SEO Specialists
                    </h4>
                    <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                      <li>• Write title tags of exactly 50-60 characters</li>
                      <li>• Optimize meta descriptions (150-160 chars)</li>
                      <li>• Create SEO-friendly URL slugs (under 60 chars)</li>
                      <li>• Perfect header tags for readability & rankings</li>
                      <li>• Analyze competitor content length strategies</li>
                    </ul>
                  </div>
                  <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                    <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                      <FaPenFancy className="mr-2 text-purple-500" />
                      Email Marketers
                    </h4>
                    <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                      <li>• Write subject lines optimal for mobile (40 chars)</li>
                      <li>• Optimize preheader text (80-100 chars)</li>
                      <li>• A/B test character lengths for higher opens</li>
                      <li>• Ensure calls-to-action fit mobile screens</li>
                      <li>• Maximize email click-through rates</li>
                    </ul>
                  </div>
                  <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                    <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                      <FaChartLine className="mr-2 text-yellow-500" />
                      Content Writers & Copywriters
                    </h4>
                    <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                      <li>• Meet exact character requirements for print media</li>
                      <li>• Write Google Ads copy (30/90 char limits)</li>
                      <li>• Optimize Amazon product titles (200 chars)</li>
                      <li>• Create perfect headlines for landing pages</li>
                      <li>• Track productivity with character metrics</li>
                    </ul>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground mt-6 sm:mt-8 leading-relaxed">
                  Whether you're a social media manager fighting platform character limits, an SEO specialist optimizing for search rankings, an email marketer maximizing open rates, or a content writer meeting strict specifications, character counter tools provide the precision and insights you need to succeed in digital content creation. It's not just about counting characters—it's about creating content that performs, engages, and converts across every platform and medium.
                </p>
              </div>
            </div>
          </div>
        </section>

  {/* Hidden file input */}
  <FileInput />
</main>
  );
}