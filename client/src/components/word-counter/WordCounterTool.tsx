import { useState, useEffect } from 'react';
import { useTextAnalysis } from '@/hooks/useTextAnalysis';
import StatsCard from './StatsCard';
import KeywordTable from './KeywordTable';
import ExportButtons from './ExportButtons';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdvancedAnalytics from '@/components/features/AdvancedAnalytics';
import SEOAnalyzer from '@/components/features/SEOAnalyzer';
import SocialMediaOptimizer from '@/components/features/SocialMediaOptimizer';
import CompetitorAnalysis from '@/components/features/CompetitorAnalysis';
import ContentGoals from '@/components/features/ContentGoals';
import { BarChart3, Search, Share2, TrendingUp, Target, Sparkles } from 'lucide-react';
import { FaCheck, FaEraser, FaHighlighter, FaPaste, FaTrash } from "@/components/common/Icons";

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
    <main className="container mx-auto px-4 py-8">
      {/* AdSense Top Banner - COMMENTED OUT 
      <div className="bg-muted rounded-lg p-4 mb-8 text-center text-muted-foreground no-print">
        <p className="text-sm">Advertisement Space - Google AdSense Banner (728x90)</p>
      </div> 
      */}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Tool Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Tool Header */}
          <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/5 rounded-xl p-8 shadow-lg border border-border/50 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
                Advanced Word Counter Tool
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Professional text analysis with real-time statistics, readability scores, and keyword density analysis
              </p>
            </div>
          </div>

          {/* Text Input Area */}
          <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
              <label htmlFor="textInput" className="text-lg font-semibold text-foreground">Enter Your Text</label>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={clearText}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                  data-testid="button-clear-text"
                >
                  <FaTrash className="inline mr-2" aria-hidden="true" />
                  Clear
                </button>
                <button 
                  onClick={pasteText}
                  className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors"
                  data-testid="button-paste-text"
                >
                  <FaPaste className="inline mr-2" aria-hidden="true" />
                  Paste
                </button>
              </div>
            </div>
            
            {!isHighlighted ? (
              <textarea 
                id="textInput"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-64 p-4 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all" 
                placeholder="Start typing or paste your text here to analyze it in real-time..."
                data-testid="textarea-text-input"
              />
            ) : (
              <div 
                className="w-full h-64 p-4 bg-background border border-border rounded-lg overflow-auto whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: renderTextWithHighlights() }}
                data-testid="text-highlighted-preview"
              />
            )}

            {/* Word Limit Tracker */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Word Limit Progress</span>
                <div className="flex items-center gap-2">
                  <input 
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
              <div 
                className="progress-bar h-2 bg-muted rounded-full" 
                style={{
                  '--progress': `${progressPercentage}%`,
                  background: `linear-gradient(90deg, ${getProgressBarColor(progressPercentage)} ${progressPercentage}%, var(--muted) ${progressPercentage}%)`
                } as React.CSSProperties}
              ></div>
              <p className="text-xs text-muted-foreground mt-1">
                <span data-testid="text-current-words">{stats.wordCount}</span> / <span data-testid="text-word-limit">{wordLimit}</span> words
              </p>
            </div>
          </div>

          {/* Real-time Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard value={stats.wordCount} label="Words" icon="fas fa-file-word" iconColor="text-blue-600" />
            <StatsCard value={stats.charCount} label="Characters" icon="fas fa-keyboard" iconColor="text-green-600" />
            <StatsCard value={stats.sentenceCount} label="Sentences" icon="fas fa-list-ol" iconColor="text-orange-600" />
            <StatsCard value={stats.paragraphCount} label="Paragraphs" icon="fas fa-paragraph" iconColor="text-purple-600" />
          </div>

          {/* Advanced Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Readability Analysis */}
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Readability Analysis</h3>
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
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Text Statistics</h3>
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

          {/* Professional Features Tabs */}
          <div className="bg-card rounded-lg shadow-sm border border-border">
            <Tabs defaultValue="analytics" className="w-full">
              <div className="border-b border-border px-6 pt-6">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="analytics" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    <span className="hidden sm:inline">Analytics</span>
                  </TabsTrigger>
                  <TabsTrigger value="seo" className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    <span className="hidden sm:inline">SEO</span>
                  </TabsTrigger>
                  <TabsTrigger value="social" className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Social</span>
                  </TabsTrigger>
                  <TabsTrigger value="competitor" className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    <span className="hidden sm:inline">Compete</span>
                  </TabsTrigger>
                  <TabsTrigger value="goals" className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    <span className="hidden sm:inline">Goals</span>
                  </TabsTrigger>
                  <TabsTrigger value="keywords" className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span className="hidden sm:inline">Keywords</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="analytics" className="mt-0">
                  <AdvancedAnalytics 
                    text={text}
                    wordCount={stats.wordCount}
                    sentenceCount={stats.sentenceCount}
                    paragraphCount={stats.paragraphCount}
                    readabilityScore={readability.score}
                  />
                </TabsContent>

                <TabsContent value="seo" className="mt-0">
                  <SEOAnalyzer 
                    text={text}
                    title="Word Counter Plus Analysis"
                    metaDescription="Advanced text analysis with professional insights"
                  />
                </TabsContent>

                <TabsContent value="social" className="mt-0">
                  <SocialMediaOptimizer 
                    text={text}
                    title="Check out my text analysis results!"
                  />
                </TabsContent>

                <TabsContent value="competitor" className="mt-0">
                  <CompetitorAnalysis 
                    text={text}
                    wordCount={stats.wordCount}
                    readabilityScore={readability.score}
                  />
                </TabsContent>

                <TabsContent value="goals" className="mt-0">
                  <ContentGoals 
                    wordCount={stats.wordCount}
                    readingTime={readability.readingTime}
                    readabilityScore={readability.score}
                  />
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