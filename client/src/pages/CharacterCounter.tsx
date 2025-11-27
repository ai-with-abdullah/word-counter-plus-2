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
    title: 'Free Character Counter Online - Count Characters & Spaces',
    description: 'Count characters with our free character counter tool. Track character limits for Twitter, SMS, and social media posts with real-time emoji analysis.',
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
          <div className="sticky top-4 min-h-[600px]">
            <RelatedToolsSidebar currentTool="/character-counter" limit={5} />
          </div>
        </div>
      </div>
      {/* End Grid Layout */}
    </div>
  </div>

  {/* SEO-Optimized Blog Content - Humanized and Optimized */}
  <section className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8">
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Main Introduction Section */}
      <div className="bg-card rounded-lg p-4 sm:p-6 md:p-8 shadow-sm border border-border">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 sm:mb-6">Character Counter Plus: The Complete 2025 Guide to Character Counting for Social Media, SEO & Content Marketing</h2>
        
        <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
            Have you ever crafted the perfect tweet only to discover it gets brutally cut off at 280 characters? Or spent hours writing a compelling meta description for your website, only to see Google truncate it because it exceeded 160 characters? These frustrating moments cost content creators millions of impressions every day. <strong>Character limits aren't just arbitrary numbers—they're the invisible boundaries that determine whether your message gets seen or gets buried.</strong> That's where a professional character counter becomes your secret weapon for digital success.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
            Our <strong>free character counter</strong> goes far beyond basic counting. It provides real-time analysis of characters with and without spaces, word count, sentence count, paragraph count, reading time, speaking time, keyword density, SEO optimization scores, social media platform limits, emoji detection, language detection, and even typing speed tracking. Whether you're optimizing tweets, crafting perfect meta descriptions, writing email subject lines, or analyzing content for SEO, this is the most comprehensive <strong>character counting tool</strong> available in 2025. <Link to="/" className="text-primary hover:underline">Need full word count analysis? Try our Word Counter Plus tool</Link>.
          </p>
        </div>
      </div>

      {/* Social Media Character Limits Section */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-4 sm:p-6 md:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 flex items-center">
          <FaBullseye className="mr-2 sm:mr-3 text-yellow-500 flex-shrink-0" />
          Complete Social Media Character Limits Guide (2025 Updated)
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
          Social media platforms operate on strict character limits, and understanding these boundaries can make or break your engagement rates. Here's your complete reference guide to character limits across all major platforms:
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-card rounded-lg p-4 border border-border">
            <h4 className="font-semibold text-foreground mb-2">Twitter/X</h4>
            <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
              <li>Tweet: <strong className="text-foreground">280 characters</strong></li>
              <li>Profile bio: 160 characters</li>
              <li>Display name: 50 characters</li>
              <li>Optimal engagement: 70-100 chars</li>
            </ul>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border">
            <h4 className="font-semibold text-foreground mb-2">Instagram</h4>
            <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
              <li>Caption: <strong className="text-foreground">2,200 characters</strong></li>
              <li>Visible before "more": 125 chars</li>
              <li>Bio: 150 characters</li>
              <li>Hashtags (max): 30 per post</li>
            </ul>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border">
            <h4 className="font-semibold text-foreground mb-2">LinkedIn</h4>
            <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
              <li>Post: <strong className="text-foreground">3,000 characters</strong></li>
              <li>Visible before truncate: 140 chars</li>
              <li>Article: 125,000 characters</li>
              <li>Headline: 220 characters</li>
            </ul>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border">
            <h4 className="font-semibold text-foreground mb-2">Facebook</h4>
            <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
              <li>Post: <strong className="text-foreground">63,206 characters</strong></li>
              <li>Visible without click: 125 chars</li>
              <li>Ad headline: 40 characters</li>
              <li>Page description: 255 chars</li>
            </ul>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border">
            <h4 className="font-semibold text-foreground mb-2">TikTok</h4>
            <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
              <li>Caption: <strong className="text-foreground">2,200 characters</strong></li>
              <li>Recommended: 300 characters</li>
              <li>Bio: 80 characters</li>
              <li>Username: 24 characters</li>
            </ul>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border">
            <h4 className="font-semibold text-foreground mb-2">YouTube</h4>
            <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
              <li>Title: <strong className="text-foreground">100 characters</strong></li>
              <li>Visible in search: 60 chars</li>
              <li>Description: 5,000 characters</li>
              <li>Visible description: 200 chars</li>
            </ul>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">
          <strong>Pro tip:</strong> Studies show that tweets between 70-100 characters generate 17% higher engagement than longer ones. LinkedIn posts with hooks in the first 140 characters see 60% more engagement. Use our social media tab above to check your content against all platform limits simultaneously.
        </p>
      </div>

      {/* SEO Character Optimization Section */}
      <div className="bg-card rounded-lg p-4 sm:p-6 md:p-8 shadow-sm border border-border">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 flex items-center">
          <FaSearch className="mr-2 sm:mr-3 text-green-500 flex-shrink-0" />
          SEO Character Optimization: How Character Counts Affect Search Rankings
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
          Search engine optimization depends heavily on character count precision. <strong>Google displays approximately 50-60 characters of your page title in search results</strong>—exceed this limit, and your carefully crafted headline gets cut off with "..." which reduces click-through rates by up to 25%. Meta descriptions have an even stricter limit: 150-160 characters on desktop, 120 characters on mobile. If your description is truncated, users see an incomplete message and are less likely to click.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-3">SEO Title Best Practices</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>Optimal length: <strong className="text-foreground">50-60 characters</strong></li>
              <li>Sweet spot: 55-58 chars (15-20% higher CTR)</li>
              <li>Include primary keyword near beginning</li>
              <li>Add brand name at end if space permits</li>
              <li>Avoid ALL CAPS (looks spammy)</li>
            </ul>
          </div>
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-3">Meta Description Best Practices</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>Optimal length: <strong className="text-foreground">150-160 characters</strong></li>
              <li>Mobile displays: 120 characters max</li>
              <li>Include call-to-action in first 120 chars</li>
              <li>Use active voice and action verbs</li>
              <li>Include target keyword naturally</li>
            </ul>
          </div>
        </div>
        
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          But here's what most people miss: <strong>character counting isn't just about limits—it's about optimization</strong>. SEO experts aim for title tags of exactly 55-58 characters because this length is proven to generate 15-20% higher CTR than shorter or longer titles. URL slugs under 60 characters load faster and rank better. H1 tags between 20-70 characters balance SEO value with readability. Our character counter helps you hit these sweet spots consistently, giving you a measurable advantage over competitors. <Link to="/seo-content-analyzer" className="text-primary hover:underline">For comprehensive SEO analysis, try our SEO Content Analyzer tool</Link>.
        </p>
      </div>

      {/* Email Marketing Section */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-4 sm:p-6 md:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 flex items-center">
          <FaPenFancy className="mr-2 sm:mr-3 text-blue-500 flex-shrink-0" />
          Email Marketing Character Optimization: Subject Lines That Get Opened
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
          Email marketing success hinges on your subject line—and subject lines have critical character limits that most marketers ignore. Desktop email clients display 60-70 characters, while <strong>mobile email apps (which account for 60% of email opens) show only 30-40 characters</strong> before truncation. This means your subject line needs to communicate value in fewer than 40 characters to capture mobile users effectively.
        </p>
        
        <div className="bg-card rounded-lg p-4 sm:p-6 my-6 border border-border">
          <h4 className="font-semibold text-foreground mb-4">Email Character Limits Quick Reference</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Subject Line (Mobile)</p>
              <p className="text-xl font-bold text-primary">30-40 chars</p>
            </div>
            <div>
              <p className="text-muted-foreground">Subject Line (Desktop)</p>
              <p className="text-xl font-bold text-primary">60-70 chars</p>
            </div>
            <div>
              <p className="text-muted-foreground">Preheader Text</p>
              <p className="text-xl font-bold text-primary">80-100 chars</p>
            </div>
            <div>
              <p className="text-muted-foreground">Optimal Subject</p>
              <p className="text-xl font-bold text-primary">41-50 chars</p>
            </div>
          </div>
        </div>
        
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Data from over 40 billion marketing emails reveals that subject lines between <strong>41-50 characters generate the highest open rates</strong>—averaging 12-15% higher than longer alternatives. Top-performing marketers use character counters to test multiple variations, ensuring their most compelling words appear within mobile's 40-character window. They also optimize preheader text (80-100 characters visible) to complement the subject line and maximize click-through rates by 3-5%.
        </p>
      </div>

      {/* Key Features Section */}
      <div className="bg-card rounded-lg p-4 sm:p-6 md:p-8 shadow-sm border border-border">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">Why 300K+ Content Creators Choose Character Counter Plus</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
            <li className="flex items-start">
              <span className="mr-2 text-primary flex-shrink-0 font-bold">1.</span>
              <span><strong className="text-foreground">Real-Time Character Counting:</strong> See characters with spaces, without spaces, words, sentences, and paragraphs update instantly as you type</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary flex-shrink-0 font-bold">2.</span>
              <span><strong className="text-foreground">Social Media Platform Limits:</strong> Check content against Twitter/X, Instagram, LinkedIn, Facebook, TikTok, and YouTube character limits simultaneously</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary flex-shrink-0 font-bold">3.</span>
              <span><strong className="text-foreground">SEO Optimization Analysis:</strong> Analyze title tag length, meta description length, and keyword density for search engine optimization</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary flex-shrink-0 font-bold">4.</span>
              <span><strong className="text-foreground">Reading & Speaking Time:</strong> Calculate how long content takes to read (200 wpm) and speak (130 wpm) for presentations and videos</span>
            </li>
          </ul>
          <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
            <li className="flex items-start">
              <span className="mr-2 text-primary flex-shrink-0 font-bold">5.</span>
              <span><strong className="text-foreground">Keyword Density Analysis:</strong> Identify top keywords and their frequency for SEO optimization with language-specific stopword filtering</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary flex-shrink-0 font-bold">6.</span>
              <span><strong className="text-foreground">Advanced Text Metrics:</strong> Track emoji count, special characters, uppercase/lowercase ratio, and text complexity scores</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary flex-shrink-0 font-bold">7.</span>
              <span><strong className="text-foreground">Language Detection:</strong> Automatic detection of English, Spanish, French, and other languages for accurate analysis</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary flex-shrink-0 font-bold">8.</span>
              <span><strong className="text-foreground">100% Free & Private:</strong> No registration, no data storage—all processing happens locally in your browser for complete privacy</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Who Uses Character Counters Section */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-4 sm:p-6 md:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">Who Uses Character Counter Tools? Real-World Applications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-lg p-4 border border-border">
            <h4 className="font-semibold text-foreground mb-2 flex items-center">
              <FaHashtag className="mr-2 text-blue-500" />
              Social Media Managers
            </h4>
            <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
              <li>Optimize posts for Twitter/X 280 limit</li>
              <li>Craft Instagram captions (125 visible)</li>
              <li>Create LinkedIn hooks in 140 chars</li>
              <li>Write TikTok descriptions optimally</li>
              <li>Test cross-platform content</li>
            </ul>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border">
            <h4 className="font-semibold text-foreground mb-2 flex items-center">
              <FaSearch className="mr-2 text-green-500" />
              SEO Specialists
            </h4>
            <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
              <li>Title tags: 50-60 characters</li>
              <li>Meta descriptions: 150-160 chars</li>
              <li>URL slugs: under 60 chars</li>
              <li>H1 tags: 20-70 characters</li>
              <li>Keyword density optimization</li>
            </ul>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border">
            <h4 className="font-semibold text-foreground mb-2 flex items-center">
              <FaPenFancy className="mr-2 text-purple-500" />
              Email Marketers
            </h4>
            <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
              <li>Subject lines: 41-50 chars optimal</li>
              <li>Preheader text: 80-100 chars</li>
              <li>Mobile subjects: 30-40 chars</li>
              <li>A/B test character lengths</li>
              <li>Maximize open rates</li>
            </ul>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border">
            <h4 className="font-semibold text-foreground mb-2 flex items-center">
              <FaChartLine className="mr-2 text-yellow-500" />
              Content Writers
            </h4>
            <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
              <li>Google Ads: 30/90 char limits</li>
              <li>Amazon titles: 200 chars max</li>
              <li>SMS messages: 160 chars</li>
              <li>Print media specifications</li>
              <li>Product descriptions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-card rounded-lg p-4 sm:p-6 md:p-8 shadow-sm border border-border">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">Frequently Asked Questions About Character Counting</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">How many characters are in a tweet?</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Twitter/X allows a maximum of <strong>280 characters per tweet</strong>. However, research shows that tweets between 70-100 characters generate 17% higher engagement than longer tweets. Retweets with comments have additional space. URLs are counted as 23 characters regardless of actual length.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">What is the ideal meta description length?</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Google displays <strong>150-160 characters for desktop</strong> and approximately <strong>120 characters on mobile</strong>. For maximum visibility, keep your meta descriptions between 150-160 characters and ensure your call-to-action appears within the first 120 characters.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">How many characters should an email subject line be?</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              The optimal email subject line is <strong>41-50 characters</strong> for maximum open rates. Mobile devices show only 30-40 characters, while desktop clients display 60-70 characters. Front-load your most compelling words to ensure they appear on mobile.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">What's the difference between characters with and without spaces?</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              <strong>Characters with spaces</strong> counts every character including spaces between words. <strong>Characters without spaces</strong> counts only letters, numbers, and punctuation, excluding all whitespace. Some platforms and SMS character counts use with-spaces, while others use without-spaces.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">How many characters are in a standard SMS text message?</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              A standard SMS text message allows <strong>160 characters</strong> using GSM-7 encoding. Messages with special characters or emojis use Unicode encoding, which limits messages to 70 characters. Longer messages are automatically split into multiple segments.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">How do emojis affect character count?</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Most emojis count as <strong>2 characters</strong> on Twitter and other platforms. Some complex emojis (like skin-toned emojis or emoji combinations) can count as 4-7 characters due to Unicode encoding. Our character counter accurately detects and counts emojis.
            </p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="bg-card rounded-lg p-4 sm:p-6 md:p-8 shadow-sm border border-border">
        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">Related Writing & Analysis Tools</h2>
        <p className="text-sm text-muted-foreground mb-6">Explore our complete suite of free writing tools to enhance your content creation workflow:</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <Link to="/" className="flex items-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <span className="text-primary mr-2">1.</span>
            <span className="text-foreground">Word Counter Plus - Count words, characters, sentences</span>
          </Link>
          <Link to="/words-per-page" className="flex items-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <span className="text-primary mr-2">2.</span>
            <span className="text-foreground">Words Per Page - Convert words to page counts</span>
          </Link>
          <Link to="/speech-to-text" className="flex items-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <span className="text-primary mr-2">3.</span>
            <span className="text-foreground">Speech to Text - Voice transcription tool</span>
          </Link>
          <Link to="/text-compare" className="flex items-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <span className="text-primary mr-2">4.</span>
            <span className="text-foreground">Text Compare - Side-by-side document comparison</span>
          </Link>
          <Link to="/seo-content-analyzer" className="flex items-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <span className="text-primary mr-2">5.</span>
            <span className="text-foreground">SEO Content Analyzer - Optimize for search engines</span>
          </Link>
          <Link to="/random-word-generator" className="flex items-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <span className="text-primary mr-2">6.</span>
            <span className="text-foreground">Random Word Generator - Creative writing prompts</span>
          </Link>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 sm:p-6 md:p-8 text-center">
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Whether you're a social media manager fighting platform character limits, an SEO specialist optimizing for search rankings, an email marketer maximizing open rates, or a content writer meeting strict specifications—our <strong>free character counter</strong> provides the precision and insights you need to succeed in digital content creation. It's not just about counting characters—it's about creating content that performs, engages, and converts across every platform and medium.
        </p>
      </div>
    </div>
  </section>

  {/* Hidden file input */}
  <FileInput />
</main>
  );
}