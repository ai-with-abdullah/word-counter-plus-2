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
    maxSizeInMB: 10,
    acceptedTypes: ['.txt', 'text/plain']
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
      "name": "Word Counter Plus"
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
      "priceCurrency": "USD"
    }
  };

  // SEO Configuration
  useSEO({
    title: 'Character Counter 2025 - Advanced Text Analysis & SEO Content Optimizer | Word Counter Plus',
    description: 'Professional character counter with real-time analysis, SEO optimization, keyword density tracking, readability scoring, and social media limit checking. Includes emoji detection, language analysis, typing speed metrics, and export features. Trusted by content creators, marketers, and writers worldwide. Mobile-optimized and completely free.',
    keywords: 'character counter 2025, character count tool, free character counter, online character counter, text analysis tool, SEO content optimizer, keyword density analyzer, social media character limit, twitter character counter, facebook character limit, instagram caption counter, linkedin post counter, tiktok character limit, youtube description counter, meta description checker, title tag analyzer, email subject line counter, content optimization tool, readability score checker, emoji counter detector, language detection tool, typing speed calculator, text complexity analyzer, content grade level checker, writing productivity tool, content creator tool, digital marketing analyzer, copywriting optimizer, blog content analyzer, academic writing tool, student essay counter, business writing tool, professional communication analyzer',
    canonical: 'https://wordcounterplusapp.com/character-counter',
    structuredData: characterCounterSchema
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
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'character-count-text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "File Downloaded",
      description: "Your text has been downloaded as a TXT file.",
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
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          {/* Tool Header */}
          <div className="text-center mb-4 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
              Character Counter
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Count characters, words, sentences, and analyze your text in real-time
            </p>
          </div>

          {/* File Information Display */}

          {/* Text Input Area */}
          <div className="bg-card rounded-lg p-3 sm:p-6 shadow-sm border border-border">
            <div className="mb-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                <label htmlFor="textInput" className="text-base sm:text-lg font-semibold text-foreground">Enter Your Text</label>
                <div className="flex gap-2 w-full sm:w-auto">
                  {/* Upload Button */}
                  <button 
                    onClick={triggerFileUpload}
                    disabled={isUploading}
                    className="flex-1 sm:flex-none px-3 py-1.5 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    data-testid="button-upload-text"
                    title="Upload text file"
                  >
                    <FaUpload className="inline mr-1" aria-hidden="true" />
                    <span className="hidden sm:inline">{isUploading ? 'Uploading...' : 'Upload'}</span>
                    <span className="sm:hidden">{isUploading ? 'Up...' : 'Upload'}</span>
                  </button>
                  {/* Paste Button */}
                  <button 
                    onClick={pasteText}
                    className="flex-1 sm:flex-none px-3 py-1.5 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/80 transition-colors"
                    data-testid="button-paste-text"
                    title="Paste text from clipboard"
                  >
                    <FaCopy className="inline mr-1" aria-hidden="true" />
                    <span className="hidden sm:inline">Paste</span>
                    <span className="sm:hidden">Paste</span>
                  </button>
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
            
            <div className="flex justify-between mt-4">
              <div className="flex gap-2">
                <button 
                  onClick={copyToClipboard}
                  disabled={!text}
                  className="px-3 py-1.5 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  data-testid="button-copy-text"
                  title="Copy text to clipboard"
                >
                  <FaCopy className="inline mr-1" aria-hidden="true" />
                  <span className="hidden sm:inline">Copy</span>
                  <span className="sm:hidden">Copy</span>
                </button>
                
                <button 
                  onClick={downloadText}
                  disabled={!text}
                  className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  data-testid="button-download-text"
                  title="Download text as TXT file"
                >
                  <FaDownload className="inline mr-1" aria-hidden="true" />
                  <span className="hidden sm:inline">Download</span>
                  <span className="sm:hidden">Download</span>
                </button>
              </div>
              
              <button 
                onClick={clearText}
                disabled={!text}
                className="px-3 py-1.5 bg-destructive text-destructive-foreground rounded text-sm hover:bg-destructive/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                data-testid="button-clear-text"
                title="Clear all text"
              >
                <FaEraser className="inline mr-1" aria-hidden="true" />
                <span className="hidden sm:inline">Clear</span>
                <span className="sm:hidden">Clear</span>
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

          {/* SEO-Optimized Blog Content */}
          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <article className="prose prose-gray dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-foreground mb-6">Character Counter Mastery: Advanced Text Analysis for Content Creators</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Why Character Count Matters in Digital Marketing</h3>
                    <p className="text-muted-foreground mb-4">
                      Character counting is crucial for modern digital marketing and content creation. Every social media platform, search engine, and content management system has specific character limits that directly impact your content's visibility and engagement rates.
                    </p>
                    
                    <h4 className="text-lg font-semibold text-foreground mb-3">Social Media Optimization</h4>
                    <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                      <li><strong>Twitter/X:</strong> 280 characters for maximum reach and engagement</li>
                      <li><strong>Facebook Posts:</strong> 125 characters show without truncation</li>
                      <li><strong>Instagram Captions:</strong> 2,200 character limit for storytelling</li>
                      <li><strong>LinkedIn Posts:</strong> 1,300 characters before "see more" appears</li>
                      <li><strong>TikTok Descriptions:</strong> 2,200 characters for viral content</li>
                    </ul>

                    <h4 className="text-lg font-semibold text-foreground mb-3">SEO Content Optimization</h4>
                    <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                      <li><strong>Meta Titles:</strong> 50-60 characters for optimal SERP display</li>
                      <li><strong>Meta Descriptions:</strong> 150-160 characters for click-through rates</li>
                      <li><strong>URL Slugs:</strong> Under 60 characters for SEO benefits</li>
                      <li><strong>Header Tags:</strong> Balanced length for readability and SEO</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Advanced Text Analysis Features</h3>
                    <p className="text-muted-foreground mb-4">
                      Our character counter provides comprehensive text analysis beyond basic counting, including readability scores, keyword density, emoji detection, and language identification to help you create optimized content.
                    </p>

                    <h4 className="text-lg font-semibold text-foreground mb-3">Professional Applications</h4>
                    <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                      <li><strong>Email Marketing:</strong> Subject lines under 50 characters have higher open rates</li>
                      <li><strong>Academic Writing:</strong> Meet specific word count requirements for essays and papers</li>
                      <li><strong>Technical Writing:</strong> Optimize documentation for clarity and conciseness</li>
                      <li><strong>Content Marketing:</strong> Create platform-specific content that performs</li>
                      <li><strong>Copywriting:</strong> Craft compelling headlines within character constraints</li>
                    </ul>

                    <h4 className="text-lg font-semibold text-foreground mb-3">Real-Time Analytics</h4>
                    <p className="text-muted-foreground mb-4">
                      Track typing speed, text complexity, reading time, and keyword frequency as you write. These metrics help content creators optimize their workflow and improve content quality in real-time.
                    </p>

                    <h4 className="text-lg font-semibold text-foreground mb-3">Multi-Language Support</h4>
                    <p className="text-muted-foreground">
                      Our tool accurately counts characters across different languages and scripts, including Unicode emojis, special characters, and non-Latin alphabets, making it perfect for global content creation.
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-muted/30 rounded-lg">
                  <h4 className="text-lg font-semibold text-foreground mb-3">Content Strategy Best Practices</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-foreground mb-2">Platform Optimization</h5>
                      <p className="text-muted-foreground">Tailor your content length to each platform's algorithm preferences for maximum visibility and engagement.</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground mb-2">Readability Focus</h5>
                      <p className="text-muted-foreground">Use character count insights to improve text readability and ensure your message resonates with your target audience.</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground mb-2">Conversion Optimization</h5>
                      <p className="text-muted-foreground">Optimize call-to-action text length based on proven character count benchmarks that drive higher conversion rates.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="text-lg font-semibold text-foreground mb-3">Advanced Features for Professionals</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Real-time social media character limit checking</li>
                        <li>Keyword density analysis for SEO optimization</li>
                        <li>Readability scoring with Flesch-Kincaid metrics</li>
                        <li>Emoji and special character detection</li>
                      </ul>
                    </div>
                    <div>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Language detection for multilingual content</li>
                        <li>Typing speed tracking for productivity insights</li>
                        <li>Text complexity analysis for audience targeting</li>
                        <li>Export functionality for workflow integration</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>

        </div>
      </div>
      {/* Hidden file input */}
      <FileInput />
    </main>
  );
}