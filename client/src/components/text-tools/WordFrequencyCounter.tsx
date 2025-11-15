import { useState, useEffect, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  FaEraser, FaDownload, FaUpload, FaSort, FaSortUp, FaSortDown, 
  FaChartBar, FaHighlighter, FaSearch, FaChartPie, FaFilter,
  FaCog, FaFileAlt, FaCloud
} from 'react-icons/fa';
import useFileUpload from '@/hooks/useFileUpload';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RelatedToolsSidebar from '@/components/common/RelatedToolsSidebar';
import { UploadButton } from '@/components/ui/upload-button';
import { prepareDownload } from '@/lib/downloadHelper';

type SortDirection = 'asc' | 'desc';
type SortField = 'word' | 'frequency';
type ChartType = 'bar' | 'pie';
type ViewMode = 'single' | '2-gram' | '3-gram';

interface WordFrequency {
  word: string;
  frequency: number;
  density: number;
}

// Common stop words in English
const DEFAULT_STOP_WORDS = new Set([
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
  'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
  'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
  'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
  'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
  'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us',
  'is', 'was', 'are', 'been', 'has', 'had', 'were', 'said', 'having',
  'may', 'should', 'am', 'does', 'being'
]);

const CHART_COLORS = [
  'hsl(var(--primary))',
  'hsl(220, 70%, 50%)',
  'hsl(340, 75%, 55%)',
  'hsl(280, 65%, 60%)',
  'hsl(160, 60%, 45%)',
  'hsl(30, 80%, 55%)',
  'hsl(200, 75%, 50%)',
  'hsl(10, 70%, 50%)',
  'hsl(260, 60%, 55%)',
  'hsl(140, 65%, 45%)',
];

export default function WordFrequencyCounter() {
  const [text, setText] = useState('');
  const [sortField, setSortField] = useState<SortField>('frequency');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [ignoreStopWords, setIgnoreStopWords] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [minWordLength, setMinWordLength] = useState(1);
  const [highlightedWord, setHighlightedWord] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [viewMode, setViewMode] = useState<ViewMode>('single');
  const [customStopWords, setCustomStopWords] = useState('');
  const [maxResults, setMaxResults] = useState(20);
  const { toast } = useToast();

  // File upload functionality
  const { isLoading: isUploading, triggerFileUpload, FileInput } = useFileUpload({
    onSuccess: (content, filename) => {
      setText(content);
    },
    maxSizeInMB: 10
  });

  // Auto-save and restore text
  useEffect(() => {
    const savedText = localStorage.getItem('wordFrequencyText');
    if (savedText) {
      setText(savedText);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wordFrequencyText', text);
  }, [text]);

  // Combine default and custom stop words
  const stopWords = useMemo(() => {
    const combined = new Set(DEFAULT_STOP_WORDS);
    if (customStopWords) {
      customStopWords.split(',').forEach(word => {
        const trimmed = word.trim().toLowerCase();
        if (trimmed) combined.add(trimmed);
      });
    }
    return combined;
  }, [customStopWords]);

  // Calculate N-grams
  const calculateNGrams = (words: string[], n: number): WordFrequency[] => {
    if (words.length < n) return [];
    
    const ngramMap: Record<string, number> = {};
    for (let i = 0; i <= words.length - n; i++) {
      const ngram = words.slice(i, i + n).join(' ');
      ngramMap[ngram] = (ngramMap[ngram] || 0) + 1;
    }

    const totalNgrams = Object.values(ngramMap).reduce((sum, count) => sum + count, 0);
    return Object.entries(ngramMap).map(([word, frequency]) => ({
      word,
      frequency,
      density: (frequency / totalNgrams) * 100
    }));
  };

  // Calculate word frequency with all filters
  const wordFrequencies = useMemo(() => {
    if (!text.trim()) return [];

    // Normalize text
    const normalizedText = caseSensitive 
      ? text.replace(/[^\p{L}\p{N}\s]/gu, ' ')
      : text.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ');
    
    // Split into words
    let words = normalizedText.split(/\s+/).filter(word => word.length > 0);
    
    // For N-gram analysis
    if (viewMode === '2-gram') {
      return calculateNGrams(words, 2);
    } else if (viewMode === '3-gram') {
      return calculateNGrams(words, 3);
    }
    
    // Apply filters for single word analysis
    if (minWordLength > 1) {
      words = words.filter(word => word.length >= minWordLength);
    }
    
    if (ignoreStopWords) {
      words = words.filter(word => !stopWords.has(word.toLowerCase()));
    }
    
    const totalWords = words.length;
    if (totalWords === 0) return [];

    // Count frequency
    const frequencyMap: Record<string, number> = {};
    words.forEach(word => {
      frequencyMap[word] = (frequencyMap[word] || 0) + 1;
    });

    // Convert to array
    const frequencies: WordFrequency[] = Object.entries(frequencyMap).map(([word, frequency]) => ({
      word,
      frequency,
      density: (frequency / totalWords) * 100
    }));

    // Sort
    return frequencies.sort((a, b) => {
      if (sortField === 'frequency') {
        return sortDirection === 'desc' ? b.frequency - a.frequency : a.frequency - b.frequency;
      } else {
        return sortDirection === 'desc' ? b.word.localeCompare(a.word) : a.word.localeCompare(b.word);
      }
    });
  }, [text, sortField, sortDirection, ignoreStopWords, caseSensitive, minWordLength, stopWords, viewMode]);

  // Filter results based on search query
  const filteredFrequencies = useMemo(() => {
    if (!searchQuery.trim()) return wordFrequencies;
    const query = searchQuery.toLowerCase();
    return wordFrequencies.filter(item => item.word.toLowerCase().includes(query));
  }, [wordFrequencies, searchQuery]);

  const totalWords = useMemo(() => {
    return wordFrequencies.reduce((sum, item) => sum + item.frequency, 0);
  }, [wordFrequencies]);

  const uniqueWords = wordFrequencies.length;

  // Get top N words for charts
  const topWords = useMemo(() => {
    const sortedByFrequency = [...wordFrequencies].sort((a, b) => b.frequency - a.frequency);
    return sortedByFrequency.slice(0, maxResults);
  }, [wordFrequencies, maxResults]);

  // Word length distribution
  const wordLengthDistribution = useMemo(() => {
    if (!text.trim() || viewMode !== 'single') return [];
    
    const lengthMap: Record<number, number> = {};
    wordFrequencies.forEach(({ word, frequency }) => {
      const len = word.length;
      lengthMap[len] = (lengthMap[len] || 0) + frequency;
    });

    return Object.entries(lengthMap)
      .map(([length, count]) => ({ length: `${length} letters`, count }))
      .sort((a, b) => parseInt(a.length) - parseInt(b.length));
  }, [wordFrequencies, text, viewMode]);

  // Advanced statistics
  const advancedStats = useMemo(() => {
    if (wordFrequencies.length === 0) return null;
    
    const frequencies = wordFrequencies.map(w => w.frequency);
    const mean = frequencies.reduce((sum, f) => sum + f, 0) / frequencies.length;
    const sortedFreqs = [...frequencies].sort((a, b) => a - b);
    const median = sortedFreqs[Math.floor(sortedFreqs.length / 2)];
    const mode = wordFrequencies[0].frequency;
    const variance = frequencies.reduce((sum, f) => sum + Math.pow(f - mean, 2), 0) / frequencies.length;
    const stdDev = Math.sqrt(variance);

    return { mean, median, mode, stdDev };
  }, [wordFrequencies]);

  const renderHighlightedText = () => {
    if (!highlightedWord || !text) return text;
    
    try {
      const escapedWord = highlightedWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escapedWord}\\b`, caseSensitive ? 'gu' : 'giu');
      
      const parts: React.ReactNode[] = [];
      let lastIndex = 0;
      let match;
      let keyIndex = 0;
      
      while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          parts.push(text.substring(lastIndex, match.index));
        }
        parts.push(
          <mark key={`highlight-${keyIndex++}`} className="bg-yellow-300 dark:bg-yellow-600 px-1 rounded">
            {match[0]}
          </mark>
        );
        lastIndex = regex.lastIndex;
      }
      
      if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
      }
      
      return parts.length > 0 ? parts : text;
    } catch (error) {
      return text;
    }
  };

  const clearText = () => {
    setText('');
    setHighlightedWord(null);
    setSearchQuery('');
    toast({
      title: "Text Cleared",
      description: "All text has been cleared.",
    });
  };

  const downloadResults = (format: 'csv' | 'json' = 'csv') => {
    if (filteredFrequencies.length === 0) {
      toast({
        title: "No Data",
        description: "Please enter some text to download results.",
        variant: "destructive",
      });
      return;
    }

    if (format === 'csv') {
      const formattedContent = `
================================================================================
WORD FREQUENCY ANALYSIS REPORT
================================================================================

STATISTICS:
-----------
Total Words: ${totalWords}
Unique Words: ${uniqueWords}
Diversity Ratio: ${totalWords > 0 ? ((uniqueWords / totalWords) * 100).toFixed(2) : '0'}%
Analysis Type: ${viewMode}

READING METRICS:
---------------
Total Frequency Count: ${filteredFrequencies.reduce((sum, item) => sum + item.frequency, 0)}
Most Common Word: ${filteredFrequencies[0]?.word || 'N/A'} (${filteredFrequencies[0]?.frequency || 0} times)
Least Common Word: ${filteredFrequencies[filteredFrequencies.length - 1]?.word || 'N/A'} (${filteredFrequencies[filteredFrequencies.length - 1]?.frequency || 0} times)

TOP KEYWORDS:
-------------
${filteredFrequencies.slice(0, 20).map(item => `${item.word}: ${item.frequency} times (${item.density.toFixed(2)}%)`).join('\n')}

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
        filename: `word-frequency-${viewMode}.txt`,
        fileType: 'txt',
        mimeType: 'text/plain',
        sourceToolId: 'word-frequency-counter'
      });

      toast({
        title: "Analysis Downloaded",
        description: "Word frequency results have been downloaded.",
      });
    } else {
      const jsonData = {
        analysis: viewMode,
        timestamp: new Date().toISOString(),
        statistics: {
          totalWords,
          uniqueWords,
          diversityRatio: totalWords > 0 ? ((uniqueWords / totalWords) * 100).toFixed(2) : '0',
          ...advancedStats
        },
        frequencies: filteredFrequencies
      };

      prepareDownload({
        content: JSON.stringify(jsonData, null, 2),
        filename: `word-frequency-${viewMode}.json`,
        fileType: 'txt',
        mimeType: 'application/json'
      });

      toast({
        title: "JSON Downloaded",
        description: "Detailed analysis has been downloaded.",
      });
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <FaSort className="inline ml-1 text-xs sm:text-sm text-muted-foreground" />;
    return sortDirection === 'desc' ? 
      <FaSortDown className="inline ml-1 text-xs sm:text-sm" /> : 
      <FaSortUp className="inline ml-1 text-xs sm:text-sm" />;
  };

  const handleWordClick = (word: string) => {
    if (highlightedWord === word) {
      setHighlightedWord(null);
    } else {
      setHighlightedWord(word);
      toast({
        title: "Word Highlighted",
        description: `Highlighting "${word}" in the text.`,
      });
    }
  };

  const chartConfig = {
    frequency: {
      label: "Frequency",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-6 md:py-8">
        <div className="max-w-7xl mx-auto space-y-3 sm:space-y-4 md:space-y-6">
          {/* Tool Header */}
          <div className="text-center mb-3 sm:mb-6 md:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-1 sm:mb-2 px-2">
              Word Frequency Counter
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground px-2">
              Advanced text analysis with N-grams, word clouds, and detailed statistics
            </p>
          </div>

          {/* Main Grid Layout with Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4 md:space-y-6">

          {/* Text Input Area */}
          <Card>
            <CardHeader className="p-3 sm:p-4 md:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <CardTitle className="text-base sm:text-lg md:text-xl">Enter Your Text</CardTitle>
                <div className="flex gap-2 w-full sm:w-auto">
                  <UploadButton
                    onClick={triggerFileUpload}
                    isLoading={isUploading}
                    size="sm"
                    className="flex-1 sm:flex-none h-8 sm:h-9 text-xs sm:text-sm"
                    data-testid="button-upload-text"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6 pt-0">
              {highlightedWord && (
                <div className="mb-3">
                  <div className="flex items-center justify-between p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded border border-yellow-300 dark:border-yellow-700">
                    <span className="text-xs sm:text-sm text-yellow-900 dark:text-yellow-200">
                      <FaHighlighter className="inline mr-1 sm:mr-2" />
                      Highlighting: <strong>{highlightedWord}</strong>
                    </span>
                    <Button
                      onClick={() => setHighlightedWord(null)}
                      size="sm"
                      variant="ghost"
                      className="h-6 text-xs px-2"
                      data-testid="button-clear-highlight"
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              )}
              
              <Textarea
                placeholder="Type or paste your text here to analyze word frequency and patterns..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-40 sm:h-48 md:h-64 p-2.5 sm:p-3 md:p-4 resize-none text-xs sm:text-sm md:text-base"
                data-testid="textarea-text-input"
              />

              {/* Action Buttons */}
              <div className="mt-3 flex flex-wrap gap-2">
                <Button 
                  onClick={() => {
                    navigator.clipboard.writeText(text);
                    toast({
                      title: "Text Copied",
                      description: "Text has been copied to clipboard.",
                    });
                  }}
                  disabled={!text}
                  variant="secondary"
                  size="sm"
                  className="text-xs sm:text-sm"
                  data-testid="button-copy"
                >
                  <FaUpload className="mr-1 text-xs sm:text-sm" />
                  Copy
                </Button>
                <Button 
                  onClick={clearText}
                  disabled={!text}
                  variant="secondary"
                  size="sm"
                  className="text-xs sm:text-sm"
                  data-testid="button-clear"
                >
                  <FaEraser className="mr-1 text-xs sm:text-sm" />
                  Clear
                </Button>
                <Button 
                  onClick={() => downloadResults('csv')}
                  disabled={!text}
                  variant="secondary"
                  size="sm"
                  className="text-xs sm:text-sm"
                  data-testid="button-export"
                >
                  <FaDownload className="mr-1 text-xs sm:text-sm" />
                  Export
                </Button>
              </div>
              
              {highlightedWord && (
                <div 
                  className="mt-3 p-2 sm:p-3 bg-muted rounded border border-border max-h-32 overflow-y-auto text-xs sm:text-sm"
                  data-testid="div-highlighted-text"
                >
                  {renderHighlightedText()}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Filter Options */}
          {text.trim() && (
            <Card>
              <CardHeader className="p-3 sm:p-4 md:p-6">
                <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg md:text-xl">
                  <FaCog className="text-sm sm:text-base" />
                  Analysis Options
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">Configure filters and analysis parameters</CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6 pt-0 space-y-3 sm:space-y-4">
                {/* Analysis Mode */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-xs sm:text-sm">Analysis Mode</Label>
                    <Select value={viewMode} onValueChange={(value) => setViewMode(value as ViewMode)}>
                      <SelectTrigger className="h-9 sm:h-10 text-xs sm:text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single Words</SelectItem>
                        <SelectItem value="2-gram">2-Word Phrases</SelectItem>
                        <SelectItem value="3-gram">3-Word Phrases</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-xs sm:text-sm">Chart Type</Label>
                    <Select value={chartType} onValueChange={(value) => setChartType(value as ChartType)}>
                      <SelectTrigger className="h-9 sm:h-10 text-xs sm:text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bar">Bar Chart</SelectItem>
                        <SelectItem value="pie">Pie Chart</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-xs sm:text-sm">Top Results: {maxResults}</Label>
                    <Slider
                      min={10}
                      max={50}
                      step={5}
                      value={[maxResults]}
                      onValueChange={(value) => setMaxResults(value[0])}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {/* Stop Words Toggle */}
                  <div className="flex items-center justify-between space-x-2 p-2.5 sm:p-3 bg-muted/50 rounded">
                    <Label htmlFor="stop-words" className="text-xs sm:text-sm font-medium cursor-pointer">
                      Ignore Stop Words
                    </Label>
                    <Switch
                      id="stop-words"
                      checked={ignoreStopWords}
                      onCheckedChange={setIgnoreStopWords}
                      data-testid="switch-stop-words"
                      disabled={viewMode !== 'single'}
                    />
                  </div>

                  {/* Case Sensitivity Toggle */}
                  <div className="flex items-center justify-between space-x-2 p-2.5 sm:p-3 bg-muted/50 rounded">
                    <Label htmlFor="case-sensitive" className="text-xs sm:text-sm font-medium cursor-pointer">
                      Case Sensitive
                    </Label>
                    <Switch
                      id="case-sensitive"
                      checked={caseSensitive}
                      onCheckedChange={setCaseSensitive}
                      data-testid="switch-case-sensitive"
                    />
                  </div>

                  {/* Minimum Word Length */}
                  <div className="p-2.5 sm:p-3 bg-muted/50 rounded">
                    <Label className="text-xs sm:text-sm font-medium mb-2 block">
                      Min Length: {minWordLength}
                    </Label>
                    <Slider
                      min={1}
                      max={10}
                      step={1}
                      value={[minWordLength]}
                      onValueChange={(value) => setMinWordLength(value[0])}
                      className="w-full"
                      data-testid="slider-min-length"
                      disabled={viewMode !== 'single'}
                    />
                  </div>
                </div>

                {/* Custom Stop Words */}
                {viewMode === 'single' && (
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-xs sm:text-sm">Custom Stop Words (comma-separated)</Label>
                    <Input
                      placeholder="e.g., example, sample, test"
                      value={customStopWords}
                      onChange={(e) => setCustomStopWords(e.target.value)}
                      className="h-9 sm:h-10 text-xs sm:text-sm"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Statistics Summary */}
          {text.trim() && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
                <Card>
                  <CardContent className="p-2.5 sm:p-3 md:p-4">
                    <div className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1">Total Words</div>
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">{totalWords}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-2.5 sm:p-3 md:p-4">
                    <div className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1">Unique {viewMode === 'single' ? 'Words' : 'Phrases'}</div>
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">{uniqueWords}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-2.5 sm:p-3 md:p-4">
                    <div className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1">Diversity</div>
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                      {totalWords > 0 ? ((uniqueWords / totalWords) * 100).toFixed(1) : 0}%
                    </div>
                  </CardContent>
                </Card>
                {advancedStats && (
                  <>
                    <Card>
                      <CardContent className="p-2.5 sm:p-3 md:p-4">
                        <div className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1">Mean Freq</div>
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">{advancedStats.mean.toFixed(1)}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-2.5 sm:p-3 md:p-4">
                        <div className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1">Median</div>
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">{advancedStats.median}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-2.5 sm:p-3 md:p-4">
                        <div className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1">Std Dev</div>
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">{advancedStats.stdDev.toFixed(1)}</div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </>
          )}

          {/* Tabs for different views */}
          {wordFrequencies.length > 0 && (
            <Tabs defaultValue="table" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
                <TabsTrigger value="table" className="text-xs sm:text-sm py-1.5 sm:py-2" data-testid="tab-table">
                  <FaFileAlt className="mr-1 sm:mr-2 text-xs sm:text-sm" />
                  Table
                </TabsTrigger>
                <TabsTrigger value="chart" className="text-xs sm:text-sm py-1.5 sm:py-2" data-testid="tab-chart">
                  <FaChartBar className="mr-1 sm:mr-2 text-xs sm:text-sm" />
                  Charts
                </TabsTrigger>
                {viewMode === 'single' && (
                  <TabsTrigger value="wordcloud" className="text-xs sm:text-sm py-1.5 sm:py-2" data-testid="tab-wordcloud">
                    <FaCloud className="mr-1 sm:mr-2 text-xs sm:text-sm" />
                    Word Cloud
                  </TabsTrigger>
                )}
                <TabsTrigger value="stats" className="text-xs sm:text-sm py-1.5 sm:py-2" data-testid="tab-stats">
                  <FaChartPie className="mr-1 sm:mr-2 text-xs sm:text-sm" />
                  Stats
                </TabsTrigger>
              </TabsList>

              {/* Table View */}
              <TabsContent value="table" className="mt-3 sm:mt-4">
                <Card>
                  <CardHeader className="p-3 sm:p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3">
                      <CardTitle className="text-base sm:text-lg md:text-xl">
                        {viewMode === 'single' ? 'Word' : viewMode === '2-gram' ? '2-Word Phrase' : '3-Word Phrase'} Frequency Results
                      </CardTitle>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button 
                          onClick={() => downloadResults('csv')}
                          size="sm"
                          className="flex-1 sm:flex-none h-8 sm:h-9 text-xs sm:text-sm"
                          data-testid="button-download-csv"
                        >
                          <FaDownload className="mr-1 text-xs sm:text-sm" />
                          CSV
                        </Button>
                        <Button 
                          onClick={() => downloadResults('json')}
                          size="sm"
                          variant="secondary"
                          className="flex-1 sm:flex-none h-8 sm:h-9 text-xs sm:text-sm"
                          data-testid="button-download-json"
                        >
                          <FaDownload className="mr-1 text-xs sm:text-sm" />
                          JSON
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 md:p-6 pt-0 space-y-3">
                    {/* Search/Filter */}
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs sm:text-sm" />
                      <Input
                        placeholder={`Search ${viewMode === 'single' ? 'words' : 'phrases'}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 h-9 sm:h-10 text-xs sm:text-sm"
                        data-testid="input-search"
                      />
                    </div>

                    <div className="overflow-x-auto rounded-lg border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead 
                              className="cursor-pointer select-none hover:bg-muted/50 transition-colors text-xs sm:text-sm"
                              onClick={() => handleSort('word')}
                            >
                              {viewMode === 'single' ? 'Word' : 'Phrase'} {getSortIcon('word')}
                            </TableHead>
                            <TableHead 
                              className="cursor-pointer select-none hover:bg-muted/50 transition-colors text-right text-xs sm:text-sm"
                              onClick={() => handleSort('frequency')}
                            >
                              Frequency {getSortIcon('frequency')}
                            </TableHead>
                            <TableHead className="text-right text-xs sm:text-sm">
                              Density (%)
                            </TableHead>
                            {viewMode === 'single' && (
                              <TableHead className="text-center text-xs sm:text-sm">
                                Actions
                              </TableHead>
                            )}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredFrequencies.map((item, index) => (
                            <TableRow 
                              key={`${item.word}-${index}`}
                              className={highlightedWord === item.word ? 'bg-yellow-100 dark:bg-yellow-900/30' : ''}
                              data-testid={`row-word-${index}`}
                            >
                              <TableCell className="font-medium text-xs sm:text-sm" data-testid={`cell-word-${index}`}>{item.word}</TableCell>
                              <TableCell className="text-right text-xs sm:text-sm" data-testid={`cell-frequency-${index}`}>{item.frequency}</TableCell>
                              <TableCell className="text-right text-xs sm:text-sm" data-testid={`cell-density-${index}`}>{item.density.toFixed(2)}%</TableCell>
                              {viewMode === 'single' && (
                                <TableCell className="text-center">
                                  <Button
                                    onClick={() => handleWordClick(item.word)}
                                    size="sm"
                                    variant="ghost"
                                    className="h-7 px-2 text-xs"
                                    data-testid={`button-highlight-${index}`}
                                  >
                                    <FaHighlighter />
                                  </Button>
                                </TableCell>
                              )}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {filteredFrequencies.length > 0 && (
                      <div className="text-xs sm:text-sm text-muted-foreground text-center">
                        Showing {filteredFrequencies.length} {searchQuery ? 'filtered' : 'total'} results
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Chart View */}
              <TabsContent value="chart" className="mt-3 sm:mt-4">
                <Card>
                  <CardHeader className="p-3 sm:p-4 md:p-6">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
                      {chartType === 'bar' ? <FaChartBar /> : <FaChartPie />}
                      Top {maxResults} {viewMode === 'single' ? 'Words' : 'Phrases'} - Visual Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 md:p-6 pt-0">
                    {chartType === 'bar' ? (
                      <ChartContainer config={chartConfig} className="h-[300px] sm:h-[400px] md:h-[500px] w-full">
                        <BarChart data={topWords} margin={{ top: 10, right: 10, bottom: 60, left: 10 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="word" 
                            angle={-45}
                            textAnchor="end"
                            height={100}
                            interval={0}
                            tick={{ fontSize: 10 }}
                          />
                          <YAxis tick={{ fontSize: 10 }} />
                          <ChartTooltip 
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="bg-background border border-border rounded p-2 shadow-lg">
                                    <p className="font-semibold text-xs sm:text-sm">{data.word}</p>
                                    <p className="text-xs">Frequency: {data.frequency}</p>
                                    <p className="text-xs text-muted-foreground">
                                      Density: {data.density.toFixed(2)}%
                                    </p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Bar 
                            dataKey="frequency" 
                            fill="var(--color-frequency)" 
                            radius={[4, 4, 0, 0]}
                            onClick={({payload}) => viewMode === 'single' && payload && handleWordClick(payload.word)}
                            cursor={viewMode === 'single' ? 'pointer' : 'default'}
                          />
                        </BarChart>
                      </ChartContainer>
                    ) : (
                      <ChartContainer config={chartConfig} className="h-[300px] sm:h-[400px] md:h-[500px] w-full">
                        <PieChart>
                          <Pie
                            data={topWords}
                            dataKey="frequency"
                            nameKey="word"
                            cx="50%"
                            cy="50%"
                            outerRadius="80%"
                            label={({ word, density }) => `${word} (${density.toFixed(1)}%)`}
                            labelLine={false}
                          >
                            {topWords.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                            ))}
                          </Pie>
                          <ChartTooltip 
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="bg-background border border-border rounded p-2 shadow-lg">
                                    <p className="font-semibold text-xs sm:text-sm">{data.word}</p>
                                    <p className="text-xs">Frequency: {data.frequency}</p>
                                    <p className="text-xs text-muted-foreground">
                                      Density: {data.density.toFixed(2)}%
                                    </p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                        </PieChart>
                      </ChartContainer>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Word Cloud View */}
              {viewMode === 'single' && (
                <TabsContent value="wordcloud" className="mt-3 sm:mt-4">
                  <Card>
                    <CardHeader className="p-3 sm:p-4 md:p-6">
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
                        <FaCloud />
                        Word Cloud Visualization
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm">Size represents word frequency</CardDescription>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 md:p-6 pt-0">
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center items-center min-h-[250px] sm:min-h-[350px] md:min-h-[400px] p-3 sm:p-4 bg-muted/30 rounded-lg border overflow-hidden">
                        {topWords.map((item, index) => {
                          const sizePercent = (item.frequency / topWords[0].frequency) * 100;
                          // Responsive font sizes based on screen size
                          const baseFontSize = sizePercent / 100;
                          const mobileFontSize = Math.max(10, Math.min(20, baseFontSize * 20));
                          const tabletFontSize = Math.max(12, Math.min(28, baseFontSize * 28));
                          const desktopFontSize = Math.max(14, Math.min(40, baseFontSize * 40));
                          
                          return (
                            <button
                              key={item.word}
                              onClick={() => handleWordClick(item.word)}
                              className="transition-all hover:scale-105 sm:hover:scale-110 hover:opacity-80 cursor-pointer px-1.5 sm:px-2 py-0.5 sm:py-1 rounded break-words max-w-full"
                              style={{
                                fontSize: `clamp(${mobileFontSize}px, ${tabletFontSize}px, ${desktopFontSize}px)`,
                                fontWeight: sizePercent > 50 ? 'bold' : sizePercent > 25 ? '600' : 'normal',
                                color: CHART_COLORS[index % CHART_COLORS.length],
                                lineHeight: '1.2',
                              }}
                              title={`${item.word}: ${item.frequency} (${item.density.toFixed(2)}%)`}
                            >
                              {item.word}
                            </button>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {/* Advanced Statistics */}
              <TabsContent value="stats" className="mt-3 sm:mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {/* Word Length Distribution */}
                  {viewMode === 'single' && wordLengthDistribution.length > 0 && (
                    <Card>
                      <CardHeader className="p-3 sm:p-4 md:p-6">
                        <CardTitle className="text-base sm:text-lg">Word Length Distribution</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 sm:p-4 md:p-6 pt-0">
                        <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
                          <BarChart data={wordLengthDistribution}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="length" tick={{ fontSize: 10 }} />
                            <YAxis tick={{ fontSize: 10 }} />
                            <ChartTooltip />
                            <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ChartContainer>
                      </CardContent>
                    </Card>
                  )}

                  {/* Statistical Summary */}
                  {advancedStats && (
                    <Card>
                      <CardHeader className="p-3 sm:p-4 md:p-6">
                        <CardTitle className="text-base sm:text-lg">Statistical Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 sm:p-4 md:p-6 pt-0">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                            <span className="text-xs sm:text-sm text-muted-foreground">Mean Frequency</span>
                            <span className="text-sm sm:text-base font-semibold">{advancedStats.mean.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                            <span className="text-xs sm:text-sm text-muted-foreground">Median Frequency</span>
                            <span className="text-sm sm:text-base font-semibold">{advancedStats.median}</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                            <span className="text-xs sm:text-sm text-muted-foreground">Mode (Most Common)</span>
                            <span className="text-sm sm:text-base font-semibold">{advancedStats.mode}</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                            <span className="text-xs sm:text-sm text-muted-foreground">Standard Deviation</span>
                            <span className="text-sm sm:text-base font-semibold">{advancedStats.stdDev.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                            <span className="text-xs sm:text-sm text-muted-foreground">Vocabulary Diversity</span>
                            <span className="text-sm sm:text-base font-semibold">
                              {totalWords > 0 ? ((uniqueWords / totalWords) * 100).toFixed(2) : 0}%
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}
            </div>
            {/* End Main Content Area */}

            {/* Related Tools Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-4">
                <RelatedToolsSidebar currentTool="/word-frequency-counter" limit={5} />
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
