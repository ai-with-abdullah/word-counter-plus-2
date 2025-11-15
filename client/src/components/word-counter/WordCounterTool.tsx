import { useState, useEffect } from 'react';
import { useTextAnalysisOptimized as useTextAnalysis } from '@/hooks/useTextAnalysisOptimized';
import StatsCard from './StatsCard';
import KeywordTable from './KeywordTable';
import { useToast } from '@/hooks/use-toast';
import { prepareDownload } from '@/lib/downloadHelper';
import { FaDownload } from 'react-icons/fa';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { lazy, Suspense } from 'react';

// Lazy load heavy feature components
const AdvancedAnalytics = lazy(() => import('@/components/features/AdvancedAnalytics'));
const SEOAnalyzer = lazy(() => import('@/components/features/SEOAnalyzer'));
const SocialMediaOptimizer = lazy(() => import('@/components/features/SocialMediaOptimizer'));
const CompetitorAnalysis = lazy(() => import('@/components/features/CompetitorAnalysis'));
const ContentGoals = lazy(() => import('@/components/features/ContentGoals'));

// Feature loading skeleton with accurate dimensions to prevent CLS
const FeatureLoader = () => (
  <div className="space-y-4 min-h-[400px] sm:min-h-[500px]">
    {/* Skeleton matching actual feature component layout */}
    <div className="bg-card rounded-lg p-4 sm:p-6 border border-border animate-pulse">
      <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
        <div className="h-4 bg-muted rounded w-4/6"></div>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-card rounded-lg p-4 border border-border animate-pulse h-32"></div>
      <div className="bg-card rounded-lg p-4 border border-border animate-pulse h-32"></div>
    </div>
  </div>
);

import { BarChart3, Search, Share2, TrendingUp, Target, Sparkles } from 'lucide-react';
import { FaCheck, FaEraser, FaHighlighter, FaPaste, FaTrash, FaCopy, FaSync, FaSort, FaBook, FaClock, FaInfoCircle, FaCalendar } from "@/components/common/Icons";
import { Link } from 'wouter';
import useFileUpload from '@/hooks/useFileUpload';
import RelatedToolsSidebar from '@/components/common/RelatedToolsSidebar';
import { UploadButton } from '@/components/ui/upload-button';

// Using icons from the common Icons file that are already working
// import AdSenseUnit from '@/components/ads/AdSenseUnit'; // Commented out - ads disabled

export default function WordCounterTool() {
  const [text, setText] = useState('');
  const [wordLimit, setWordLimit] = useState(500);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const { stats, readability, keywords } = useTextAnalysis(text);
  const { toast } = useToast();

  // File upload functionality
  const { isLoading: isUploading, triggerFileUpload, FileInput } = useFileUpload({
    onSuccess: (content, filename) => {
      setText(content);
      setIsHighlighted(false);
    },
    maxSizeInMB: 10
  });

  // Auto-save and restore text
  useEffect(() => {
    const savedText = localStorage.getItem('savedText');
    if (savedText) {
      setText(savedText);
    }

    const savedWordLimit = localStorage.getItem('wordLimit');
    if (savedWordLimit) {
      setWordLimit(parseInt(savedWordLimit));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('savedText', text);
  }, [text]);

  useEffect(() => {
    localStorage.setItem('wordLimit', wordLimit.toString());
  }, [wordLimit]);

  const clearText = () => {
    setText('');
    setIsHighlighted(false);
    setActiveAction(null);
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

  const highlightKeywords = () => {
    if (keywords.single.length === 0) {
      toast({
        title: "No Keywords",
        description: "Enter some text to analyze keywords.",
        variant: "destructive",
      });
      return;
    }
    setIsHighlighted(true);
  };

  const clearHighlights = () => {
    setIsHighlighted(false);
  };

  // Text case conversion functions
  const convertToUppercase = () => {
    setText(text.toUpperCase());
    setActiveAction('uppercase');
    toast({
      title: "Text Converted",
      description: "Text has been converted to uppercase.",
    });
  };

  const convertToLowercase = () => {
    setText(text.toLowerCase());
    setActiveAction('lowercase');
    toast({
      title: "Text Converted",
      description: "Text has been converted to lowercase.",
    });
  };

  const convertToTitleCase = () => {
    const titleCase = text.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
    setText(titleCase);
    setActiveAction('titlecase');
    toast({
      title: "Text Converted",
      description: "Text has been converted to title case.",
    });
  };

  const convertToSentenceCase = () => {
    const sentenceCase = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => 
      c.toUpperCase()
    );
    setText(sentenceCase);
    setActiveAction('sentencecase');
    toast({
      title: "Text Converted",
      description: "Text has been converted to sentence case.",
    });
  };



  // Additional text manipulation functions
  const reverseText = () => {
    setText(text.split('').reverse().join(''));
    toast({
      title: "Text Reversed",
      description: "Text has been reversed.",
    });
  };

  const removeExtraSpaces = () => {
    const cleaned = text.replace(/\s+/g, ' ').trim();
    setText(cleaned);
    setActiveAction('cleanspaces');
    toast({
      title: "Spaces Cleaned",
      description: "Extra spaces have been removed.",
    });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setActiveAction('copy');
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

  const sortLines = () => {
    const lines = text.split('\n').sort();
    setText(lines.join('\n'));
    setActiveAction('sortlines');
    toast({
      title: "Lines Sorted",
      description: "Text lines have been sorted alphabetically.",
    });
  };

  const downloadText = () => {
    const lines = text.split('\n').length;
    const pages = Math.ceil(stats.wordCount / 250);
    const avgSentenceLength = stats.sentenceCount > 0 ? Math.round(stats.wordCount / stats.sentenceCount) : 0;
    
    const formattedContent = `
================================================================================
WORD COUNTER ANALYSIS REPORT
================================================================================

STATISTICS:
-----------
Words: ${stats.wordCount}
Characters (with spaces): ${stats.charCount}
Characters (without spaces): ${stats.charNoSpaces}
Sentences: ${stats.sentenceCount}
Paragraphs: ${stats.paragraphCount}
Lines: ${lines}
Pages: ${pages}

READING METRICS:
---------------
Reading Time: ${readability.readingTime} min
Speaking Time: ${readability.speakingTime} min
Average Word Length: ${stats.avgWordLength} characters
Average Sentence Length: ${avgSentenceLength} words
Longest Word: ${stats.longestWord}
Shortest Word: ${stats.shortestWord}

READABILITY SCORES:
------------------
Flesch Reading Ease: ${readability.score} (${readability.level})

TOP KEYWORDS:
-------------
${keywords.single.slice(0, 10).map((kw, i) => `${i + 1}. ${kw.keyword} (${kw.count} times)`).join('\n')}

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
      filename: 'word-counter-analysis.txt',
      fileType: 'txt',
      mimeType: 'text/plain',
      sourceToolId: 'word-counter'
    });
  };

  const getReadingLevelColor = (score: number) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 100) return 'var(--destructive)';
    if (percentage >= 80) return 'var(--chart-3)';
    return 'var(--primary)';
  };

  const progressPercentage = Math.min((stats.wordCount / wordLimit) * 100, 100);

  // SECURITY FIX: Safe React text rendering instead of dangerouslySetInnerHTML
  const renderTextWithHighlights = () => {
    if (!isHighlighted || keywords.single.length === 0) {
      return text.split('\n').map((line, lineIndex) => (
        <div key={lineIndex}>{line}</div>
      ));
    }

    const topKeywords = keywords.single.slice(0, 5).map(k => k.keyword);
    
    // Create a safe highlighting function that returns React elements
    const highlightText = (inputText: string) => {
      let parts: (string | { type: 'highlight'; text: string })[] = [inputText];
      
      // Process each keyword to create highlighted segments
      topKeywords.forEach(keyword => {
        const newParts: (string | { type: 'highlight'; text: string })[] = [];
        
        parts.forEach(part => {
          if (typeof part === 'string') {
            // Split by keyword while preserving case and word boundaries
            const regex = new RegExp(`\\b(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'gi');
            const segments = part.split(regex);
            
            for (let i = 0; i < segments.length; i++) {
              if (i % 2 === 0) {
                // Non-highlighted text
                if (segments[i]) newParts.push(segments[i]);
              } else {
                // Highlighted text (matched keyword)
                newParts.push({ type: 'highlight', text: segments[i] });
              }
            }
          } else {
            // Already highlighted part, keep as is
            newParts.push(part);
          }
        });
        
        parts = newParts;
      });
      
      return parts;
    };

    // Process text line by line to maintain structure
    return text.split('\n').map((line, lineIndex) => {
      const highlightedParts = highlightText(line);
      
      return (
        <div key={lineIndex}>
          {highlightedParts.map((part, partIndex) => {
            if (typeof part === 'string') {
              return part;
            } else {
              return (
                <mark key={partIndex} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
                  {part.text}
                </mark>
              );
            }
          })}
        </div>
      );
    });
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Centered Container with Max Width */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 min-h-[500px]">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {/* Tool Header */}
          <div className="text-center mb-4 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
              Word Counter Plus
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Analyze your text with advanced word counting and readability tools
            </p>
          </div>

          {/* Main Grid Layout with Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            {/* Main Content Area */}
            <div className="space-y-4 sm:space-y-6 min-w-0">


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
            </div>
            
            {!isHighlighted ? (
              <div>
                {/* Hidden label for screen readers */}

                <textarea 
                  id="textInput"
                  aria-describedby="textHelp"
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                    setActiveAction(null);
                  }}
                  className="w-full min-h-[12rem] sm:min-h-[16rem] p-3 sm:p-4 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all text-sm sm:text-base" 
                  placeholder="Start typing or paste your text here to analyze it in real-time..."
                  
                  data-testid="textarea-text-input"
                />


                {/* Helper text (screen readers کے لیے) */}
                <p id="textHelp" className="sr-only">
                  Paste or type your text here. The tool will count words, characters, and show readability analysis in real-time.
                </p>
              </div>
            ) : (
              <div 
                className="w-full h-64 p-4 bg-background border border-border rounded-lg overflow-auto whitespace-pre-wrap"
                aria-label="Highlighted text with top keywords marked"
                data-testid="text-highlighted-preview"
              >
                {renderTextWithHighlights()}
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-3 flex flex-wrap gap-2">
              <button 
                onClick={copyToClipboard}
                disabled={!text}
                className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                data-testid="button-copy"
              >
                <FaCopy className="inline mr-1" aria-hidden="true" />
                Copy
              </button>
              <button 
                onClick={clearText}
                disabled={!text}
                className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                data-testid="button-clear"
              >
                <FaEraser className="inline mr-1" aria-hidden="true" />
                Clear
              </button>
              <button 
                onClick={downloadText}
                disabled={!text}
                className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                data-testid="button-export"
              >
                <FaDownload className="inline mr-1" aria-hidden="true" />
                Export
              </button>
            </div>

            {/* Word Limit Tracker */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Word Limit Progress</span>
                <div className="flex items-center gap-2">
                  <label htmlFor="wordLimit" className="sr-only">
                    Set word limit for analysis
                  </label>
                  <input 
                    id="wordLimit" 
                    type="number" 
                    value={wordLimit}
                    onChange={(e) => setWordLimit(parseInt(e.target.value) || 500)}
                    min="1" 
                    className="w-20 px-2 py-1 text-sm bg-background border border-border rounded"
                    data-testid="input-word-limit"
                  />
                  <span className="text-sm text-muted-foreground">words</span>
                </div>
              </div>

              {/* Accessible Progress Bar */}
              <div 
                className="progress-bar h-2 bg-muted rounded-full" 
                role="progressbar"
                aria-valuenow={stats.wordCount}
                aria-valuemin={0}
                aria-valuemax={wordLimit}
                aria-label="Word limit progress"
                style={{
                  '--progress': `${progressPercentage}%`,
                  background: `linear-gradient(90deg, ${getProgressBarColor(progressPercentage)} ${progressPercentage}%, var(--muted) ${progressPercentage}%)`
                } as React.CSSProperties}>
              </div>

              <p className="text-xs text-muted-foreground mt-1">
                <span data-testid="text-current-words">{stats.wordCount}</span> / 
                <span data-testid="text-word-limit">{wordLimit}</span> words
              </p>
            </div>

          </div>

          {/* Quick Actions */}
          {text.trim() && (
            <div className="bg-card rounded-lg p-3 sm:p-4 shadow-sm border border-border">
              <h3 className="text-sm sm:text-base font-medium text-foreground mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                <button 
                  onClick={convertToUppercase}
                  className={`px-2 sm:px-3 py-1.5 rounded text-xs sm:text-sm transition-colors ${
                    activeAction === 'uppercase' 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  data-testid="button-uppercase"
                >
                  <span className="hidden sm:inline">UPPERCASE</span>
                  <span className="sm:hidden">UPPER</span>
                </button>
                <button 
                  onClick={convertToLowercase}
                  className={`px-2 sm:px-3 py-1.5 rounded text-xs sm:text-sm transition-colors ${
                    activeAction === 'lowercase' 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  data-testid="button-lowercase"
                >
                  <span className="hidden sm:inline">lowercase</span>
                  <span className="sm:hidden">lower</span>
                </button>
                <button 
                  onClick={convertToTitleCase}
                  className={`px-2 sm:px-3 py-1.5 rounded text-xs sm:text-sm transition-colors ${
                    activeAction === 'titlecase' 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  data-testid="button-titlecase"
                >
                  <span className="hidden sm:inline">Title Case</span>
                  <span className="sm:hidden">Title</span>
                </button>
                <button 
                  onClick={removeExtraSpaces}
                  className={`px-2 sm:px-3 py-1.5 rounded text-xs sm:text-sm transition-colors ${
                    activeAction === 'cleanspaces' 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  data-testid="button-clean-spaces"
                >
                  <span className="hidden sm:inline">Clean Spaces</span>
                  <span className="sm:hidden">Clean</span>
                </button>
                <button 
                  onClick={sortLines}
                  className={`px-2 sm:px-3 py-1.5 rounded text-xs sm:text-sm transition-colors ${
                    activeAction === 'sortlines' 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  data-testid="button-sort-lines"
                >
                  <FaSort className="inline mr-1" />
                  <span className="hidden sm:inline">Sort Lines</span>
                  <span className="sm:hidden">Sort</span>
                </button>
                <Link 
                  href="/text-case-convert"
                  className="px-2 sm:px-3 py-1.5 rounded text-xs sm:text-sm transition-colors bg-primary text-primary-foreground hover:bg-primary/90 text-center"
                  data-testid="link-text-case-converter"
                >
                  <span className="hidden sm:inline">More Text Case Options →</span>
                  <span className="sm:hidden">More Cases →</span>
                </Link>
              </div>
            </div>
          )}

          {/* Real-time Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-8">
            <StatsCard value={stats.wordCount} label="Words" Icon={FaBook} iconColor="text-blue-600" />
            <StatsCard value={stats.charCount} label="Characters" Icon={FaCopy} iconColor="text-green-600" />
            <StatsCard value={stats.sentenceCount} label="Sentences" Icon={FaInfoCircle} iconColor="text-orange-600" />
            <StatsCard value={stats.paragraphCount} label="Paragraphs" Icon={FaCalendar} iconColor="text-purple-600" />
          </div>

          {/* Advanced Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
            {/* Readability Analysis */}
            <div className="bg-card rounded-lg p-3 sm:p-6 shadow-sm border border-border">
              <h2 className="text-base sm:text-lg font-semibold text-foreground mb-4">Readability Analysis</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Flesch-Kincaid Score</span>
                  <span className="font-semibold" data-testid="text-readability-score">{readability.score}</span>
                </div>
                <div className="flex justify-between items-center">
                  {/* <span className="text-muted-foreground">Reading Level</span>
                  <span className={`px-3 py-1 text-white rounded-full text-sm ${getReadingLevelColor(readability.score)}`} data-testid="text-reading-level">
                    {readability.level}
                  </span> */}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Reading Time</span>
                  <span className="font-semibold" data-testid="text-reading-time">~{readability.readingTime} min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Speaking Time</span>
                  <span className="font-semibold" data-testid="text-speaking-time">~{readability.speakingTime} min</span>
                </div>
              </div>
            </div>

            {/* Text Statistics */}
            <div className="bg-card rounded-lg p-3 sm:p-6 shadow-sm border border-border">
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">Text Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Average Word Length</span>
                  <span className="font-semibold" data-testid="text-avg-word-length">{stats.avgWordLength}</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-muted-foreground flex-shrink-0">Longest Word</span>
                  <span className="font-semibold text-right break-all" data-testid="text-longest-word">{stats.longestWord || '-'}</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-muted-foreground flex-shrink-0">Shortest Word</span>
                  <span className="font-semibold text-right break-all" data-testid="text-shortest-word">{stats.shortestWord || '-'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Characters (no spaces)</span>
                  <span className="font-semibold" data-testid="text-char-no-spaces">{stats.charNoSpaces}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Features */}
          {text.trim() && (
            <div className="bg-card rounded-lg shadow-sm border border-border">
              <Tabs defaultValue="keywords" className="w-full">
                <div className="border-b border-border px-6 pt-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="keywords" aria-label='Keywords Tab' className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      <span className="hidden sm:inline">Keywords</span>
                    </TabsTrigger>
                    <TabsTrigger value="analytics" aria-label='Analytics Tab' className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      <span className="hidden sm:inline">Analytics</span>
                    </TabsTrigger>
                    <TabsTrigger value="seo" aria-label='SEO Tab' className="flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      <span className="hidden sm:inline">SEO</span>
                    </TabsTrigger>
                  </TabsList>
                </div>

              <div className="p-6">
                <TabsContent value="analytics" className="mt-0">
                  <Suspense fallback={<FeatureLoader />}>
                    <AdvancedAnalytics 
                      text={text}
                      wordCount={stats.wordCount}
                      sentenceCount={stats.sentenceCount}
                      paragraphCount={stats.paragraphCount}
                      readabilityScore={readability.score}
                    />
                  </Suspense>
                </TabsContent>

                <TabsContent value="seo" className="mt-0">
                  <Suspense fallback={<FeatureLoader />}>
                    <SEOAnalyzer 
                      text={text}
                      title="Word Counter Plus Analysis"
                      metaDescription="Advanced text analysis with professional insights"
                    />
                  </Suspense>
                </TabsContent>

                <TabsContent value="social" className="mt-0">
                  <Suspense fallback={<FeatureLoader />}>
                    <SocialMediaOptimizer 
                      text={text}
                      title="Check out my text analysis results!"
                    />
                  </Suspense>
                </TabsContent>

                <TabsContent value="competitor" className="mt-0">
                  <Suspense fallback={<FeatureLoader />}>
                    <CompetitorAnalysis 
                      text={text}
                      wordCount={stats.wordCount}
                      readabilityScore={readability.score}
                    />
                  </Suspense>
                </TabsContent>

                <TabsContent value="goals" className="mt-0">
                  <Suspense fallback={<FeatureLoader />}>
                    <ContentGoals 
                      wordCount={stats.wordCount}
                      readingTime={readability.readingTime}
                      readabilityScore={readability.score}
                    />
                  </Suspense>
                </TabsContent>

                <TabsContent value="keywords" className="mt-0">
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <h3 className="text-lg font-semibold text-foreground">Keyword Density Analysis</h3>
                      <div className="flex gap-2">
                        <button 
                          onClick={highlightKeywords}
                          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition-colors"
                          data-testid="button-highlight-keywords"
                        >
                          <FaHighlighter className="inline mr-2" aria-hidden="true" />
                          Highlight Keywords
                        </button>
                        <button 
                          onClick={clearHighlights}
                          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                          data-testid="button-clear-highlights"
                        >
                          <FaEraser className="inline mr-2" aria-hidden="true" />
                          Clear
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <KeywordTable title="Top Single Keywords" keywords={keywords.single} />
                      <KeywordTable title="Top Two-word Phrases" keywords={keywords.twoWord} />
                      <KeywordTable title="Top Three-word Phrases" keywords={keywords.threeWord} />
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
          )}


          {/* Related Tools - Mobile Only (appears after results) */}
          <div className="lg:hidden min-h-[400px]">
            <RelatedToolsSidebar currentTool="/" limit={5} />
          </div>
          </div>
          {/* End Main Content Area */}

          {/* Related Tools Sidebar - Desktop Only (sticky on right) */}
          <div className="hidden lg:block min-h-[600px]">
            <div className="sticky top-4">
              <RelatedToolsSidebar currentTool="/" limit={5} />
            </div>
          </div>
        </div>
        {/* End Grid Layout */}
        </div>
      </div>
      {/* Hidden file input */}
      <FileInput />
    </main>
  );
}