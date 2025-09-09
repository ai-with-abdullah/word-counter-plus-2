import { useState, useEffect } from 'react';
import { useTextAnalysis } from '@/hooks/useTextAnalysis';
import StatsCard from './StatsCard';
import KeywordTable from './KeywordTable';
import ExportButtons from './ExportButtons';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { lazy, Suspense } from 'react';

// Lazy load heavy feature components
const AdvancedAnalytics = lazy(() => import('@/components/features/AdvancedAnalytics'));
const SEOAnalyzer = lazy(() => import('@/components/features/SEOAnalyzer'));
const SocialMediaOptimizer = lazy(() => import('@/components/features/SocialMediaOptimizer'));
const CompetitorAnalysis = lazy(() => import('@/components/features/CompetitorAnalysis'));
const ContentGoals = lazy(() => import('@/components/features/ContentGoals'));

// Feature loading fallback
const FeatureLoader = () => (
  <div className="flex items-center justify-center py-8">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
  </div>
);
import { BarChart3, Search, Share2, TrendingUp, Target, Sparkles } from 'lucide-react';
import { FaCheck, FaEraser, FaHighlighter, FaPaste, FaTrash, FaUpload, FaCopy, FaSync, FaSort } from "@/components/common/Icons";

export default function WordCounterTool() {
  const [text, setText] = useState('');
  const [wordLimit, setWordLimit] = useState(500);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const { stats, readability, keywords } = useTextAnalysis(text);
  const { toast } = useToast();

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
    toast({
      title: "Text Converted",
      description: "Text has been converted to uppercase.",
    });
  };

  const convertToLowercase = () => {
    setText(text.toLowerCase());
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
    toast({
      title: "Text Converted",
      description: "Text has been converted to sentence case.",
    });
  };

  // File upload functionality
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a text (.txt) file only.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setText(content);
      toast({
        title: "File Uploaded",
        description: `File "${file.name}" has been uploaded successfully.`,
      });
    };
    reader.readAsText(file);
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
    toast({
      title: "Spaces Cleaned",
      description: "Extra spaces have been removed.",
    });
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

  const sortLines = () => {
    const lines = text.split('\n').sort();
    setText(lines.join('\n'));
    toast({
      title: "Lines Sorted",
      description: "Text lines have been sorted alphabetically.",
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

  const renderTextWithHighlights = () => {
    if (!isHighlighted || keywords.single.length === 0) {
      return text;
    }

    let highlightedText = text;
    const topKeywords = keywords.single.slice(0, 5).map(k => k.keyword);
    
    topKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, `<mark class="highlight-keyword">${keyword}</mark>`);
    });

    return highlightedText;
  };

  return (
    <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      {/* AdSense Top Banner - COMMENTED OUT 
      <div className="bg-muted rounded-lg p-4 mb-8 text-center text-muted-foreground no-print">
        <p className="text-sm">Advertisement Space - Google AdSense Banner (728x90)</p>
      </div> 
      */}

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 lg:gap-6">
        {/* Main Tool Area */}
        <div className="xl:col-span-3 space-y-4 sm:space-y-6">
          {/* Tool Header */}
          <div className="text-center mb-4 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
              Word Counter Plus
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Analyze your text with advanced word counting and readability tools
            </p>
          </div>

          {/* Text Input Area */}
          <div className="bg-card rounded-lg p-3 sm:p-6 shadow-sm border border-border">
            <div className="mb-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                <label htmlFor="textInput" className="text-base sm:text-lg font-semibold text-foreground">Enter Your Text</label>
                <div className="flex gap-2 w-full sm:w-auto">
                  {/* File Upload */}
                  <label className="flex-1 sm:flex-none px-3 py-1.5 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/80 transition-colors cursor-pointer text-center"
                         data-testid="button-upload-file">
                    <FaUpload className="inline mr-1" aria-hidden="true" />
                    <span className="hidden sm:inline">Upload</span>
                    <span className="sm:hidden">Upload File</span>
                    <input 
                      type="file" 
                      accept=".txt,text/plain" 
                      onChange={handleFileUpload}
                      className="sr-only"
                      aria-label="Upload a text file to analyze"
                    />
                  </label>

                  {/* Clear Button */}
                  <button 
                    onClick={clearText}
                    className="flex-1 sm:flex-none px-3 py-1.5 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/80 transition-colors"
                    data-testid="button-clear-text"
                    aria-label="Clear all text"
                  >
                    <FaTrash className="inline mr-1" aria-hidden="true" />
                    Clear
                  </button>
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
                  onChange={(e) => setText(e.target.value)}
                  className="w-full h-48 sm:h-64 p-3 sm:p-4 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all text-sm sm:text-base" 
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
                dangerouslySetInnerHTML={{ __html: renderTextWithHighlights() }}
                aria-label="Highlighted text with top keywords marked"
                data-testid="text-highlighted-preview"
              />
            )}


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
                  onClick={copyToClipboard}
                  className="px-2 sm:px-3 py-1.5 bg-green-600 text-white rounded text-xs sm:text-sm hover:bg-green-700 transition-colors"
                  data-testid="button-copy-text"
                >
                  <FaCopy className="inline mr-1" />
                  Copy
                </button>
                <button 
                  onClick={convertToUppercase}
                  className="px-2 sm:px-3 py-1.5 bg-blue-600 text-white rounded text-xs sm:text-sm hover:bg-blue-700 transition-colors"
                  data-testid="button-uppercase"
                >
                  <span className="hidden sm:inline">UPPERCASE</span>
                  <span className="sm:hidden">UPPER</span>
                </button>
                <button 
                  onClick={convertToLowercase}
                  className="px-2 sm:px-3 py-1.5 bg-blue-600 text-white rounded text-xs sm:text-sm hover:bg-blue-700 transition-colors"
                  data-testid="button-lowercase"
                >
                  <span className="hidden sm:inline">lowercase</span>
                  <span className="sm:hidden">lower</span>
                </button>
                <button 
                  onClick={convertToTitleCase}
                  className="px-2 sm:px-3 py-1.5 bg-blue-600 text-white rounded text-xs sm:text-sm hover:bg-blue-700 transition-colors"
                  data-testid="button-titlecase"
                >
                  <span className="hidden sm:inline">Title Case</span>
                  <span className="sm:hidden">Title</span>
                </button>
                <button 
                  onClick={removeExtraSpaces}
                  className="px-2 sm:px-3 py-1.5 bg-purple-600 text-white rounded text-xs sm:text-sm hover:bg-purple-700 transition-colors"
                  data-testid="button-clean-spaces"
                >
                  <span className="hidden sm:inline">Clean Spaces</span>
                  <span className="sm:hidden">Clean</span>
                </button>
                <button 
                  onClick={sortLines}
                  className="px-2 sm:px-3 py-1.5 bg-purple-600 text-white rounded text-xs sm:text-sm hover:bg-purple-700 transition-colors"
                  data-testid="button-sort-lines"
                >
                  <FaSort className="inline mr-1" />
                  <span className="hidden sm:inline">Sort Lines</span>
                  <span className="sm:hidden">Sort</span>
                </button>
              </div>
            </div>
          )}

          {/* Real-time Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-8">
            <StatsCard value={stats.wordCount} label="Words" icon="fas fa-file-word" iconColor="text-blue-600" />
            <StatsCard value={stats.charCount} label="Characters" icon="fas fa-keyboard" iconColor="text-green-600" />
            <StatsCard value={stats.sentenceCount} label="Sentences" icon="fas fa-list-ol" iconColor="text-orange-600" />
            <StatsCard value={stats.paragraphCount} label="Paragraphs" icon="fas fa-paragraph" iconColor="text-purple-600" />
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
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Longest Word</span>
                  <span className="font-semibold" data-testid="text-longest-word">{stats.longestWord || '-'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Shortest Word</span>
                  <span className="font-semibold" data-testid="text-shortest-word">{stats.shortestWord || '-'}</span>
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

          {/* Export & Share Options */}
          <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Export & Share</h3>
            <ExportButtons text={text} stats={stats} readability={readability} keywords={keywords} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* AdSense Sidebar Ad - COMMENTED OUT 
          <div className="bg-muted rounded-lg p-4 text-center text-muted-foreground no-print">
            <p className="text-sm">Advertisement<br />Google AdSense<br />(300x250)</p>
          </div> 
          */}

          {/* Quick Tips */}
          <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">💡 Quick Tips</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start">
                <FaCheck className="text-primary mr-2 mt-0.5" aria-label="Check Icon" />
                Keep sentences under 20 words for better readability
              </li>
              <li className="flex items-start">
                <FaCheck className="text-primary mr-2 mt-0.5" aria-label="Check Icon" />
                Aim for 1-2% keyword density for SEO
              </li>
              <li className="flex items-start">
                <FaCheck className="text-primary mr-2 mt-0.5" aria-label="Check Icon" />
                Use active voice for clearer writing
              </li>
              <li className="flex items-start">
                <FaCheck className="text-primary mr-2 mt-0.5" aria-label="Check Icon" />
                Break up long paragraphs for better flow
              </li>
            </ul>
          </div>

          {/* Word Target Goals */}
          <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">📊 Word Count Goals</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span>Blog Post</span>
                <span className="font-semibold">1,500-2,500</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span>Social Media</span>
                <span className="font-semibold">100-280</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span>Email Subject</span>
                <span className="font-semibold">6-10</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span>Meta Description</span>
                <span className="font-semibold">120-160</span>
              </div>
            </div>
          </div>

          {/* AdSense Sidebar Ad 2 - COMMENTED OUT 
          <div className="bg-muted rounded-lg p-4 text-center text-muted-foreground no-print">
            <p className="text-sm">Advertisement<br />Google AdSense<br />(300x600)</p>
          </div> 
          */}
        </div>
      </div>
    </main>
  );
}