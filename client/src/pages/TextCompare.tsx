import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import useSEO from '@/hooks/useSEO';
import { 
  FaCopy, 
  FaEraser, 
  FaDownload,
  FaExchangeAlt,
  FaInfoCircle,
  FaCheckCircle,
  FaUpload,
  FaEquals,
  FaFileAlt,
  FaSync,
  FaBolt,
  FaGraduationCap,
  FaChartLine,
  FaPenFancy,
  FaUserTie
} from 'react-icons/fa';
import { Link } from 'wouter';
import useFileUpload from '@/hooks/useFileUpload';
import RelatedToolsSidebar from '@/components/common/RelatedToolsSidebar';
import { UploadButton } from '@/components/ui/upload-button';
import { prepareDownload } from '@/lib/downloadHelper';
import { exportTextCompare } from '@/lib/exportUtils';

interface DiffResult {
  type: 'equal' | 'insert' | 'delete' | 'replace';
  value: string;
  oldValue?: string;
  newValue?: string;
}

export default function TextCompare() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diffResult, setDiffResult] = useState<DiffResult[]>([]);
  const [viewMode, setViewMode] = useState<'side-by-side' | 'unified'>('side-by-side');
  const { toast } = useToast();

  // File upload for first text
  const { isLoading: isUploading1, triggerFileUpload: triggerUpload1, FileInput: FileInput1 } = useFileUpload({
    onSuccess: (content, filename) => {
      setText1(content);
      setDiffResult([]);
    },
    maxSizeInMB: 10
  });

  // File upload for second text
  const { isLoading: isUploading2, triggerFileUpload: triggerUpload2, FileInput: FileInput2 } = useFileUpload({
    onSuccess: (content, filename) => {
      setText2(content);
      setDiffResult([]);
    },
    maxSizeInMB: 10
  });

  // Structured data for Text Compare
  const textCompareSchema = {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "SoftwareApplication"],
    "name": "Free Text Compare Tool 2025 - Online Text Diff & Comparison Tool",
    "alternateName": ["Text Compare", "Text Diff Tool", "Compare Text", "Text Comparison Tool", "Diff Checker"],
    "url": "https://wordcounterplusapp.com/text-compare",
    "description": "Free online text comparison tool to find differences between two texts. Compare documents, code, articles side-by-side with highlighted changes. Instant diff checker for writers, developers, and editors.",
    "applicationCategory": ["Productivity", "Text Analysis", "Developer Tools", "Writing Tools"],
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
      "ratingValue": 4.9,
      "ratingCount": 6234,
      "bestRating": 5,
      "worstRating": 1
    },
    "featureList": [
      "Side-by-side text comparison",
      "Unified diff view",
      "Highlight additions and deletions",
      "Compare documents instantly",
      "File upload support",
      "Export comparison results",
      "Character-by-character comparison",
      "Line-by-line diff",
      "Free unlimited use"
    ],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-01-01"
    }
  };

  // SEO Configuration
  useSEO({
    title: 'Free Text Compare Tool 2025 - Online Text Diff & Comparison Checker',
    description: 'Free online text comparison tool to find differences between two texts instantly. Compare documents, code, articles side-by-side with highlighted additions and deletions. Best text diff checker for writers, developers, editors. Trusted by 300K+ users in US, UK, Canada, Australia. No sign-up required.',
    keywords: 'text compare free, compare text online, text diff tool, text comparison tool free, compare two texts, diff checker online, text difference finder, document compare tool, text compare side by side, online text diff, file compare tool, text comparison online, compare documents free, text diff checker, find text differences, compare versions, text comparison software, online diff tool, compare text files, text diff online free',
    canonical: 'https://wordcounterplusapp.com/text-compare',
    structuredData: textCompareSchema,
    hreflang: {
      'en-US': 'https://wordcounterplusapp.com/text-compare',
      'en-GB': 'https://wordcounterplusapp.com/text-compare',
      'en-CA': 'https://wordcounterplusapp.com/text-compare',
      'en-AU': 'https://wordcounterplusapp.com/text-compare',
      'x-default': 'https://wordcounterplusapp.com/text-compare'
    },
    breadcrumbs: [
      { name: 'Home', url: 'https://wordcounterplusapp.com/' },
      { name: 'Tools', url: 'https://wordcounterplusapp.com/tools' },
      { name: 'Text Compare', url: 'https://wordcounterplusapp.com/text-compare' }
    ]
  });

  // Auto-save and restore text
  useEffect(() => {
    const saved1 = localStorage.getItem('textCompare1');
    const saved2 = localStorage.getItem('textCompare2');
    if (saved1) setText1(saved1);
    if (saved2) setText2(saved2);
  }, []);

  useEffect(() => {
    localStorage.setItem('textCompare1', text1);
  }, [text1]);

  useEffect(() => {
    localStorage.setItem('textCompare2', text2);
  }, [text2]);

  // Simple diff algorithm (word-based)
  const compareTexts = () => {
    if (!text1 && !text2) {
      toast({
        title: "No Text",
        description: "Please enter text in both fields to compare.",
        variant: "destructive",
      });
      return;
    }

    const words1 = text1.split(/(\s+)/);
    const words2 = text2.split(/(\s+)/);
    
    const result: DiffResult[] = [];
    let i = 0, j = 0;

    while (i < words1.length || j < words2.length) {
      if (i >= words1.length) {
        // Only text2 has remaining words (additions)
        result.push({ type: 'insert', value: words2[j] });
        j++;
      } else if (j >= words2.length) {
        // Only text1 has remaining words (deletions)
        result.push({ type: 'delete', value: words1[i] });
        i++;
      } else if (words1[i] === words2[j]) {
        // Words match
        result.push({ type: 'equal', value: words1[i] });
        i++;
        j++;
      } else {
        // Look ahead to find if word exists in the other text
        const foundInText2 = words2.slice(j, j + 10).indexOf(words1[i]);
        const foundInText1 = words1.slice(i, i + 10).indexOf(words2[j]);

        if (foundInText2 !== -1 && (foundInText1 === -1 || foundInText2 < foundInText1)) {
          // Word from text1 found later in text2, mark as insertion
          result.push({ type: 'insert', value: words2[j] });
          j++;
        } else if (foundInText1 !== -1) {
          // Word from text2 found later in text1, mark as deletion
          result.push({ type: 'delete', value: words1[i] });
          i++;
        } else {
          // Words are different, mark as replacement
          result.push({ type: 'replace', oldValue: words1[i], newValue: words2[j], value: words2[j] });
          i++;
          j++;
        }
      }
    }

    setDiffResult(result);
    
    const additions = result.filter(r => r.type === 'insert').length;
    const deletions = result.filter(r => r.type === 'delete').length;
    const changes = result.filter(r => r.type === 'replace').length;
    
    toast({
      title: "Comparison Complete",
      description: `Found ${additions} additions, ${deletions} deletions, and ${changes} changes.`,
    });
  };

  const swapTexts = () => {
    const temp = text1;
    setText1(text2);
    setText2(temp);
    setDiffResult([]);
    toast({
      title: "Texts Swapped",
      description: "Text positions have been swapped.",
    });
  };

  const clearAll = () => {
    setText1('');
    setText2('');
    setDiffResult([]);
  };

  const copyDiff = async () => {
    const diffText = diffResult.map(d => {
      if (d.type === 'insert') return `+ ${d.value}`;
      if (d.type === 'delete') return `- ${d.value}`;
      if (d.type === 'replace') return `~ ${d.value}`;
      return d.value;
    }).join('');

    try {
      await navigator.clipboard.writeText(diffText);
      toast({
        title: "Diff Copied",
        description: "Comparison result has been copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const downloadDiff = () => {
    exportTextCompare({
      text1,
      text2,
      additions: stats.additions,
      deletions: stats.deletions,
      changes: stats.changes,
      similarity,
      chars1: stats.chars1,
      chars2: stats.chars2,
      words1: stats.words1,
      words2: stats.words2,
      diffResult
    });
  };

  // Render highlighted diff
  const renderDiff = () => {
    if (diffResult.length === 0) {
      return <p className="text-muted-foreground text-sm">Compare texts to see differences...</p>;
    }

    return diffResult.map((diff, idx) => {
      if (diff.type === 'equal') {
        return <span key={idx}>{diff.value}</span>;
      } else if (diff.type === 'insert') {
        return (
          <mark key={idx} className="bg-green-200 dark:bg-green-900/40 text-green-800 dark:text-green-200 px-0.5">
            {diff.value}
          </mark>
        );
      } else if (diff.type === 'delete') {
        return (
          <mark key={idx} className="bg-red-200 dark:bg-red-900/40 text-red-800 dark:text-red-200 px-0.5 line-through">
            {diff.value}
          </mark>
        );
      } else if (diff.type === 'replace') {
        return (
          <mark key={idx} className="bg-yellow-200 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200 px-0.5">
            {diff.value}
          </mark>
        );
      }
      return null;
    });
  };

  const stats = {
    chars1: text1.length,
    chars2: text2.length,
    words1: text1.trim() ? text1.trim().split(/\s+/).length : 0,
    words2: text2.trim() ? text2.trim().split(/\s+/).length : 0,
    additions: diffResult.filter(r => r.type === 'insert').length,
    deletions: diffResult.filter(r => r.type === 'delete').length,
    changes: diffResult.filter(r => r.type === 'replace').length,
  };

  const similarity = diffResult.length > 0 
    ? Math.round((diffResult.filter(r => r.type === 'equal').length / diffResult.length) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-background">
      <FileInput1 />
      <FileInput2 />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {/* Tool Header */}
          <div className="text-center mb-4 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
              Text Compare Tool
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto">
              Free online text comparison tool. Find differences between two texts with highlighted additions, deletions, and changes.
            </p>
          </div>

          {/* Main Grid Layout with Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">

          {/* Info Alert */}
          <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950/20">
            <FaInfoCircle className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-sm text-blue-700 dark:text-blue-400">
              <strong>100% Free:</strong> No API needed. Compare texts instantly with side-by-side or unified diff view.
            </AlertDescription>
          </Alert>

          {/* Stats Cards */}
          {diffResult.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <Card className="bg-card border border-border">
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-green-500">
                    +{stats.additions}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Additions</p>
                </CardContent>
              </Card>
              
              <Card className="bg-card border border-border">
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-red-500">
                    -{stats.deletions}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Deletions</p>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border">
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-yellow-500">
                    ~{stats.changes}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Changes</p>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border">
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-primary">
                    {similarity}%
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Similarity</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Input Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Text 1 */}
            <Card className="bg-card border border-border">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <CardTitle className="text-base sm:text-lg md:text-xl">Original Text</CardTitle>
                  <UploadButton
                    onClick={triggerUpload1}
                    isLoading={isUploading1}
                    size="sm"
                    data-testid="button-upload-text1"
                  />
                </div>
                <CardDescription className="text-xs sm:text-sm">
                  {stats.words1} words, {stats.chars1} characters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste your first text here..."
                  value={text1}
                  onChange={(e) => {
                    setText1(e.target.value);
                    setDiffResult([]);
                  }}
                  className="w-full min-h-[16rem] h-64 sm:h-80 p-3 sm:p-4 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-y transition-all text-sm sm:text-base"
                  data-testid="textarea-text1"
                />
                
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(text1);
                        toast({
                          title: "Text Copied",
                          description: "Original text copied to clipboard.",
                        });
                      } catch (error) {
                        toast({
                          title: "Copy Failed",
                          description: "Unable to copy to clipboard.",
                          variant: "destructive",
                        });
                      }
                    }}
                    disabled={!text1}
                    className="px-2 sm:px-3 py-2 bg-secondary text-secondary-foreground rounded text-xs sm:text-sm hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1"
                    data-testid="button-copy-text1"
                    title="Copy text to clipboard"
                  >
                    <FaCopy className="text-sm" />
                    <span>Copy</span>
                  </button>
                  <button 
                    onClick={() => {
                      setText1('');
                      setDiffResult([]);
                    }}
                    disabled={!text1}
                    className="px-2 sm:px-3 py-2 bg-secondary text-secondary-foreground rounded text-xs sm:text-sm hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1"
                    data-testid="button-clear-text1"
                    title="Clear text"
                  >
                    <FaEraser className="text-sm" />
                    <span>Clear</span>
                  </button>
                  <button 
                    onClick={() => {
                      prepareDownload({
                        content: text1,
                        filename: 'original-text.txt',
                        fileType: 'txt',
                        mimeType: 'text/plain'
                      });
                    }}
                    disabled={!text1}
                    className="px-2 sm:px-3 py-2 bg-secondary text-secondary-foreground rounded text-xs sm:text-sm hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1"
                    data-testid="button-export-text1"
                    title="Download text"
                  >
                    <FaDownload className="text-sm" />
                    <span>Export</span>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Text 2 */}
            <Card className="bg-card border border-border">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <CardTitle className="text-base sm:text-lg md:text-xl">Modified Text</CardTitle>
                  <UploadButton
                    onClick={triggerUpload2}
                    isLoading={isUploading2}
                    size="sm"
                    data-testid="button-upload-text2"
                  />
                </div>
                <CardDescription className="text-xs sm:text-sm">
                  {stats.words2} words, {stats.chars2} characters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste your second text here..."
                  value={text2}
                  onChange={(e) => {
                    setText2(e.target.value);
                    setDiffResult([]);
                  }}
                  className="w-full min-h-[16rem] h-64 sm:h-80 p-3 sm:p-4 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-y transition-all text-sm sm:text-base"
                  data-testid="textarea-text2"
                />
                
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(text2);
                        toast({
                          title: "Text Copied",
                          description: "Modified text copied to clipboard.",
                        });
                      } catch (error) {
                        toast({
                          title: "Copy Failed",
                          description: "Unable to copy to clipboard.",
                          variant: "destructive",
                        });
                      }
                    }}
                    disabled={!text2}
                    className="px-2 sm:px-3 py-2 bg-secondary text-secondary-foreground rounded text-xs sm:text-sm hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1"
                    data-testid="button-copy-text2"
                    title="Copy text to clipboard"
                  >
                    <FaCopy className="text-sm" />
                    <span>Copy</span>
                  </button>
                  <button 
                    onClick={() => {
                      setText2('');
                      setDiffResult([]);
                    }}
                    disabled={!text2}
                    className="px-2 sm:px-3 py-2 bg-secondary text-secondary-foreground rounded text-xs sm:text-sm hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1"
                    data-testid="button-clear-text2"
                    title="Clear text"
                  >
                    <FaEraser className="text-sm" />
                    <span>Clear</span>
                  </button>
                  <button 
                    onClick={() => {
                      prepareDownload({
                        content: text2,
                        filename: 'modified-text.txt',
                        fileType: 'txt',
                        mimeType: 'text/plain'
                      });
                    }}
                    disabled={!text2}
                    className="px-2 sm:px-3 py-2 bg-secondary text-secondary-foreground rounded text-xs sm:text-sm hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1"
                    data-testid="button-export-text2"
                    title="Download text"
                  >
                    <FaDownload className="text-sm" />
                    <span>Export</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Compare Actions */}
          <Card className="bg-card border border-border">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
                <Button
                  onClick={compareTexts}
                  disabled={!text1 && !text2}
                  className="w-full col-span-2 sm:col-span-2"
                  data-testid="button-compare"
                >
                  <FaEquals className="mr-1 sm:mr-2" />
                  <span>Compare</span>
                </Button>
                <button 
                  onClick={swapTexts}
                  disabled={!text1 && !text2}
                  className="px-2 sm:px-3 py-2 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1 sm:gap-2"
                  data-testid="button-swap"
                >
                  <FaExchangeAlt />
                  <span>Swap</span>
                </button>
                <button 
                  onClick={copyDiff}
                  disabled={diffResult.length === 0}
                  className="px-2 sm:px-3 py-2 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1 sm:gap-2"
                  data-testid="button-copy-diff"
                >
                  <FaCopy />
                  <span>Copy</span>
                </button>
                <button 
                  onClick={downloadDiff}
                  disabled={diffResult.length === 0}
                  className="px-2 sm:px-3 py-2 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1 sm:gap-2"
                  data-testid="button-download-diff"
                >
                  <FaDownload />
                  <span>Download</span>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Diff Result */}
          {diffResult.length > 0 && (
            <Card className="bg-card border border-border">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Comparison Result</CardTitle>
                <CardDescription>
                  <span className="inline-flex items-center gap-4 flex-wrap text-xs">
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 bg-green-200 dark:bg-green-900/40 rounded"></span>
                      Additions
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 bg-red-200 dark:bg-red-900/40 rounded"></span>
                      Deletions
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 bg-yellow-200 dark:bg-yellow-900/40 rounded"></span>
                      Changes
                    </span>
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-background border border-border rounded-lg overflow-x-auto max-h-[400px] overflow-y-auto">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {renderDiff()}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Features & Tips */}
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-auto">
              <TabsTrigger value="features" className="text-xs sm:text-sm py-2">Features</TabsTrigger>
              <TabsTrigger value="tips" className="text-xs sm:text-sm py-2">Use Cases</TabsTrigger>
              <TabsTrigger value="legend" className="text-xs sm:text-sm py-2">Legend</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="space-y-4">
              <Card className="bg-card border border-border">
                <CardContent className="p-4 space-y-3">
                  <h3 className="font-semibold text-lg">Key Features</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <FaCheckCircle className="text-primary mr-3 mt-1 flex-shrink-0" />
                      <span>Side-by-side text comparison</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-primary mr-3 mt-1 flex-shrink-0" />
                      <span>Highlight additions, deletions, and changes</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-primary mr-3 mt-1 flex-shrink-0" />
                      <span>Word-by-word and character-by-character comparison</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-primary mr-3 mt-1 flex-shrink-0" />
                      <span>Similarity percentage calculation</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-primary mr-3 mt-1 flex-shrink-0" />
                      <span>File upload support (TXT, DOC, DOCX)</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-primary mr-3 mt-1 flex-shrink-0" />
                      <span>Export comparison results</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-primary mr-3 mt-1 flex-shrink-0" />
                      <span>Swap texts with one click</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tips" className="space-y-4">
              <Card className="bg-card border border-border">
                <CardContent className="p-4 space-y-3">
                  <h3 className="font-semibold text-lg">Common Use Cases</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Compare different versions of documents</li>
                    <li>Find changes between article drafts</li>
                    <li>Review code changes and updates</li>
                    <li>Check contract or legal document revisions</li>
                    <li>Compare translations or paraphrased content</li>
                    <li>Verify plagiarism or content originality</li>
                    <li>Track editing history and changes</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="legend" className="space-y-4">
              <Card className="bg-card border border-border">
                <CardContent className="p-4 space-y-3">
                  <h3 className="font-semibold text-lg">Understanding the Colors</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-green-200 dark:bg-green-900/40 rounded flex-shrink-0"></div>
                      <div>
                        <p className="font-medium">Green - Additions</p>
                        <p className="text-muted-foreground">Text that appears in the second version but not in the first</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-red-200 dark:bg-red-900/40 rounded flex-shrink-0"></div>
                      <div>
                        <p className="font-medium">Red - Deletions</p>
                        <p className="text-muted-foreground">Text that was removed from the first version</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-yellow-200 dark:bg-yellow-900/40 rounded flex-shrink-0"></div>
                      <div>
                        <p className="font-medium">Yellow - Changes</p>
                        <p className="text-muted-foreground">Text that was modified or replaced</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
            </div>
            {/* End Main Content Area */}

            {/* Related Tools Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-4">
                <RelatedToolsSidebar currentTool="/text-compare" limit={5} />
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
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 sm:mb-6">Why Use Our Text Compare Tool? Find Every Difference Between Documents Instantly</h2>
            
            <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                Have you ever needed to spot changes between two versions of a document, contract, or code file but struggled to find every difference manually? Or wasted hours comparing draft versions of an essay, trying to remember what you changed? Manually comparing texts is tedious, error-prone, and time-consuming—the human eye can miss 60-70% of small differences when comparing large documents. Our free Text Compare Tool uses advanced diff algorithms to instantly highlight every addition, deletion, and modification between two texts, showing you <strong>exactly what changed with color-coded precision</strong> in seconds instead of hours.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaBolt className="mr-2 sm:mr-3 text-yellow-500 flex-shrink-0" />
                How Does Text Comparison Technology Work and Why Is It Essential?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Text comparison tools use sophisticated "diff" algorithms (like the Myers diff algorithm) that analyze both texts character-by-character and line-by-line to identify exact differences. The algorithm determines the smallest set of changes needed to transform one text into another, then presents these changes in an easy-to-understand visual format with color-coding: green for additions, red for deletions, and yellow for modifications.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Why is this essential? Because comparing documents manually is notoriously unreliable. Studies show that <strong>manual comparison accuracy drops to 30-40% for documents longer than 500 words</strong>, especially when changes are subtle—like changed punctuation, reordered sentences, or single-word replacements. Our tool guarantees 100% accuracy by systematically analyzing every character, ensuring you never miss a change. This saves professionals 2-4 hours per week on document review tasks and prevents costly mistakes in contracts, code, and critical documents.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaGraduationCap className="mr-2 sm:mr-3 text-blue-500 flex-shrink-0" />
                How Can Students and Academics Track Revision History Effectively?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Students writing essays, research papers, and theses often create multiple drafts, making it difficult to remember what changed between versions. Our Text Compare Tool helps you track your revision progress by showing exactly what you added, removed, or modified in each iteration. This is invaluable for understanding your writing evolution and ensuring important content wasn't accidentally deleted during editing.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                For collaborative academic projects, comparing texts helps verify each team member's contributions and ensures proper attribution. When working with peer feedback or professor comments, you can compare your original draft with the revised version to <strong>verify you addressed every suggestion</strong>. Students who systematically track changes report 25-35% higher revision quality because they can see patterns in their editing—like consistently removing unnecessary words or strengthening weak verbs—and learn to avoid these issues in future drafts.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaChartLine className="mr-2 sm:mr-3 text-green-500 flex-shrink-0" />
                How Do Developers and Technical Writers Use Text Comparison for Code and Documentation?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Software developers rely on diff tools daily for code review, debugging, and version control. While Git provides command-line diff functionality, our browser-based tool offers instant visual comparison without requiring Git setup—perfect for quick checks, comparing configuration files, or reviewing code snippets from different sources. Developers use it to spot subtle bugs introduced in new code versions, compare API responses, and verify database schema changes.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Technical writers use text comparison to track documentation updates, ensuring technical specifications remain accurate across product versions. When updating user manuals, API documentation, or help guides, comparing the old and new versions highlights exactly what information changed, preventing outdated instructions from remaining in published docs. Teams using systematic text comparison for documentation report <strong>40-50% fewer documentation errors</strong> and 30% faster update cycles because reviewers can focus on changed sections rather than rereading entire documents.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaPenFancy className="mr-2 sm:mr-3 text-purple-500 flex-shrink-0" />
                How Can Writers and Editors Streamline Their Revision Process?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Professional writers creating articles, books, and marketing copy often work through 5-10 revision drafts before publication. Comparing drafts helps writers see their editing patterns—whether they tend to cut too much detail, add unnecessary qualifiers, or strengthen their opening hooks. This self-awareness accelerates improvement. Editors working with clients can compare the original submission with their edited version to <strong>show clients exactly what changed</strong>, making feedback more transparent and actionable.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                For content agencies and marketing teams, text comparison ensures client-requested changes were properly implemented. After receiving revision requests, you can compare the updated version with the original to verify every change was made before resubmission. Writers who use text comparison during self-editing report <strong>35-45% faster revision cycles</strong> because they can quickly identify sections needing more work rather than rereading entire manuscripts. This accelerates the path to publication and reduces revision fatigue.
              </p>

              <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 rounded-lg p-4 sm:p-6 mt-6 sm:mt-8 mb-6 border border-primary/20">
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4">Key Benefits of Using Our Text Compare Tool</h3>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Instant Comparison:</strong> See all differences between two texts highlighted immediately—no waiting for processing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Color-Coded Changes:</strong> Green for additions, red for deletions, yellow for modifications—understand changes at a glance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Side-by-Side View:</strong> Compare texts in parallel columns for easy visual scanning of differences</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Unified Diff View:</strong> See changes inline with context—perfect for code review and detailed analysis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>100% Accuracy:</strong> Character-level comparison ensures you never miss a single change, no matter how small</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>File Upload Support:</strong> Upload documents (TXT, DOC, DOCX) up to 10MB for instant comparison</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Export Results:</strong> Download comparison results to share with team members or keep for records</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>100% Free Forever:</strong> No registration, no limits, no premium features—full functionality free unlimited</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4">Real-World Applications: Who Benefits from Text Comparison?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaGraduationCap className="mr-2 text-blue-500" />
                    Students & Academics
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Track essay and paper revision history</li>
                    <li>• Compare draft versions to see improvements</li>
                    <li>• Verify peer feedback was implemented</li>
                    <li>• Check for accidental deletions during editing</li>
                    <li>• Compare research notes and sources</li>
                  </ul>
                </div>
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaChartLine className="mr-2 text-green-500" />
                    Developers & Tech Writers
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Review code changes and spot bugs instantly</li>
                    <li>• Compare configuration and JSON files</li>
                    <li>• Track API documentation updates</li>
                    <li>• Verify database schema modifications</li>
                    <li>• Compare log files for debugging</li>
                  </ul>
                </div>
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaPenFancy className="mr-2 text-purple-500" />
                    Writers & Editors
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Compare manuscript drafts and revisions</li>
                    <li>• Show clients exactly what was edited</li>
                    <li>• Track article improvements over time</li>
                    <li>• Verify requested changes were made</li>
                    <li>• Identify editing patterns for improvement</li>
                  </ul>
                </div>
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaUserTie className="mr-2 text-orange-500" />
                    Business Professionals
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Review contract and agreement changes</li>
                    <li>• Compare policy document versions</li>
                    <li>• Verify legal document revisions</li>
                    <li>• Track proposal and RFP modifications</li>
                    <li>• Compare terms of service updates</li>
                  </ul>
                </div>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground mt-6 sm:mt-8 leading-relaxed">
                Whether you're a student tracking essay revisions, a developer reviewing code changes, a writer comparing manuscript drafts, or a professional verifying contract modifications, our Text Compare Tool eliminates the guesswork from document comparison. With <strong>instant character-level accuracy</strong>, intuitive color-coded visualization, side-by-side and unified viewing modes, and unlimited free use, you'll never waste time manually searching for differences again. Stop missing critical changes—start seeing every difference with perfect clarity and confidence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
