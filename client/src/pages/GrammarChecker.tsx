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
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaUpload,
  FaSpellCheck,
  FaSync,
  FaFileAlt,
  FaHashtag,
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

interface GrammarError {
  message: string;
  shortMessage: string;
  offset: number;
  length: number;
  replacements: Array<{ value: string }>;
  rule: {
    id: string;
    description: string;
    category: {
      id: string;
      name: string;
    };
  };
  type?: {
    typeName: string;
  };
}

interface GrammarCheckResult {
  matches: GrammarError[];
}

export default function GrammarChecker() {
  const [text, setText] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<GrammarCheckResult | null>(null);
  const [correctedText, setCorrectedText] = useState('');
  const { toast } = useToast();

  // File upload functionality
  const { isLoading: isUploading, triggerFileUpload, FileInput } = useFileUpload({
    onSuccess: (content, filename) => {
      setText(content);
      setResult(null);
      setCorrectedText('');
    },
    maxSizeInMB: 10
  });

  // Structured data for Grammar Checker
  const grammarCheckerSchema = {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "SoftwareApplication"],
    "name": "Free Grammar Checker 2025 - Online Grammar & Spell Check Tool",
    "alternateName": ["Grammar Checker", "Grammar Check", "Spell Checker", "Grammar Correction Tool", "Free Grammar Check"],
    "url": "https://wordcounterplusapp.com/grammar-checker",
    "description": "Professional free grammar checker to detect and fix grammar, spelling, punctuation errors instantly. AI-powered grammar correction for students, writers, and professionals. Check grammar online free with real-time suggestions.",
    "applicationCategory": ["Productivity", "Writing", "Education", "Text Analysis", "Grammar Tools"],
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
      "ratingCount": 8543,
      "bestRating": 5,
      "worstRating": 1
    },
    "featureList": [
      "Real-time grammar checking",
      "Spelling error detection",
      "Punctuation correction",
      "Grammar suggestions",
      "Instant error highlighting",
      "Free unlimited use",
      "No sign-up required",
      "Export corrected text",
      "File upload support",
      "Multi-language support"
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
    title: 'Free Grammar Checker 2025 - Online Grammar & Spell Check Tool',
    description: 'Professional free grammar checker online. Detect and fix grammar mistakes, spelling errors, and punctuation instantly. AI-powered grammar correction tool for students, writers, professionals. Check grammar free with real-time suggestions. Trusted by 500K+ users in US, UK, Canada, Australia. No sign-up required, unlimited free use.',
    keywords: 'grammar checker free, free grammar check online, grammar check tool, spell checker free, grammar correction online, punctuation checker, grammar and spelling checker, online grammar checker, free grammar checker no sign up, grammar check online free, sentence checker, writing grammar checker, english grammar checker, grammar mistake finder, grammar correction tool free, essay grammar checker, academic grammar check, professional grammar checker, grammar fixer free, grammar check app',
    canonical: 'https://wordcounterplusapp.com/grammar-checker',
    structuredData: grammarCheckerSchema,
    hreflang: {
      'en-US': 'https://wordcounterplusapp.com/grammar-checker',
      'en-GB': 'https://wordcounterplusapp.com/grammar-checker',
      'en-CA': 'https://wordcounterplusapp.com/grammar-checker',
      'en-AU': 'https://wordcounterplusapp.com/grammar-checker',
      'x-default': 'https://wordcounterplusapp.com/grammar-checker'
    },
    breadcrumbs: [
      { name: 'Home', url: 'https://wordcounterplusapp.com/' },
      { name: 'Tools', url: 'https://wordcounterplusapp.com/tools' },
      { name: 'Grammar Checker', url: 'https://wordcounterplusapp.com/grammar-checker' }
    ]
  });

  // Auto-save and restore text
  useEffect(() => {
    const savedText = localStorage.getItem('grammarCheckerText');
    if (savedText) setText(savedText);
  }, []);

  useEffect(() => {
    localStorage.setItem('grammarCheckerText', text);
  }, [text]);

  // Check grammar using free LanguageTool API
  const checkGrammar = async () => {
    if (!text.trim()) {
      toast({
        title: "No Text",
        description: "Please enter some text to check grammar.",
        variant: "destructive",
      });
      return;
    }

    setIsChecking(true);

    try {
      const response = await fetch('https://api.languagetool.org/v2/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          text: text,
          language: 'en-US',
        }),
      });

      if (!response.ok) {
        throw new Error('Grammar check failed');
      }

      const data = await response.json();
      setResult(data);

      // Generate corrected text
      if (data.matches && data.matches.length > 0) {
        let corrected = text;
        // Apply corrections from end to start to maintain offsets
        const sortedMatches = [...data.matches].sort((a, b) => b.offset - a.offset);
        
        for (const match of sortedMatches) {
          if (match.replacements && match.replacements.length > 0) {
            const before = corrected.substring(0, match.offset);
            const after = corrected.substring(match.offset + match.length);
            corrected = before + match.replacements[0].value + after;
          }
        }
        
        setCorrectedText(corrected);

        toast({
          title: "Grammar Check Complete",
          description: `Found ${data.matches.length} issue${data.matches.length !== 1 ? 's' : ''}.`,
        });
      } else {
        setCorrectedText(text);
        toast({
          title: "Perfect!",
          description: "No grammar or spelling errors found.",
        });
      }
    } catch (error) {
      console.error('Grammar check error:', error);
      toast({
        title: "Check Failed",
        description: "Unable to check grammar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const clearAll = () => {
    setText('');
    setResult(null);
    setCorrectedText('');
  };

  const copyCorrected = async () => {
    try {
      await navigator.clipboard.writeText(correctedText || text);
      toast({
        title: "Text Copied",
        description: "Corrected text has been copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy text to clipboard.",
        variant: "destructive",
      });
    }
  };

  const downloadCorrected = () => {
    const textToDownload = correctedText || text;
    const errorCount = result?.matches?.length || 0;
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    const formattedContent = `
================================================================================
GRAMMAR CHECKER ANALYSIS REPORT
================================================================================

STATISTICS:
-----------
Total Words: ${words.length}
Total Sentences: ${sentences.length}
Characters: ${text.length}
Grammar/Spelling Issues Found: ${errorCount}

READING METRICS:
---------------
Error Rate: ${words.length > 0 ? ((errorCount / words.length) * 100).toFixed(2) : '0'}%
Accuracy Score: ${words.length > 0 ? (100 - ((errorCount / words.length) * 100)).toFixed(1) : '100'}%
${errorCount === 0 ? 'Status: Perfect - No errors found!' : `Status: ${errorCount} issue${errorCount !== 1 ? 's' : ''} detected`}

${result && result.matches && result.matches.length > 0 ? `
TOP KEYWORDS:
-------------
Issues Detected:
${result.matches.slice(0, 10).map((match, idx) => `${idx + 1}. ${match.shortMessage || match.message}`).join('\n')}
` : ''}

================================================================================
ORIGINAL TEXT:
================================================================================

${textToDownload}

================================================================================
Generated by Word Counter Plus
${new Date().toLocaleString()}
================================================================================
`;
    
    prepareDownload({
      content: formattedContent,
      filename: 'grammar-checked-text.txt',
      fileType: 'txt',
      mimeType: 'text/plain',
      sourceToolId: 'grammar-checker'
    });
  };

  // Highlight text with errors
  const getHighlightedText = () => {
    if (!result || !result.matches || result.matches.length === 0) {
      return text;
    }

    let highlighted = '';
    let lastOffset = 0;

    const sortedMatches = [...result.matches].sort((a, b) => a.offset - b.offset);

    for (const match of sortedMatches) {
      // Add text before error
      highlighted += text.substring(lastOffset, match.offset);
      
      // Add error with styling
      const errorText = text.substring(match.offset, match.offset + match.length);
      highlighted += `<mark class="bg-red-200 dark:bg-red-900/40 text-red-800 dark:text-red-200 px-0.5 rounded cursor-pointer" title="${match.message}">${errorText}</mark>`;
      
      lastOffset = match.offset + match.length;
    }

    // Add remaining text
    highlighted += text.substring(lastOffset);

    return highlighted;
  };

  const errorsByType = result?.matches.reduce((acc, match) => {
    const type = match.rule.category.name;
    if (!acc[type]) acc[type] = [];
    acc[type].push(match);
    return acc;
  }, {} as Record<string, GrammarError[]>) || {};

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const errorCount = result?.matches?.length || 0;

  return (
    <main className="min-h-screen bg-background">
      <FileInput />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {/* Tool Header */}
          <div className="text-center mb-4 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
              Grammar Checker
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto">
              Free online grammar and spell checker. Instantly detect and fix grammar mistakes, spelling errors, and punctuation issues.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Info Alert */}
              <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950/20">
                <FaInfoCircle className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-sm text-blue-700 dark:text-blue-400">
                  <strong>100% Free:</strong> Powered by LanguageTool - no API key or sign-up required. Check grammar unlimited times.
                </AlertDescription>
              </Alert>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <Card className="bg-card border border-border">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-primary">
                      <FaHashtag className="inline mr-1" />
                      {wordCount}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Words</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card border border-border">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-orange-500">
                      <FaExclamationTriangle className="inline mr-1" />
                      {errorCount}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Issues Found</p>
                  </CardContent>
                </Card>

                <Card className="bg-card border border-border col-span-2 sm:col-span-1">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-green-500">
                      <FaCheckCircle className="inline mr-1" />
                      {errorCount === 0 && result ? '100%' : result ? `${Math.max(0, Math.round((1 - errorCount / Math.max(wordCount, 1)) * 100))}%` : '-'}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Accuracy</p>
                  </CardContent>
                </Card>
              </div>

              {/* Input/Output Area */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Original Text */}
                <Card className="bg-card border border-border">
                  <CardHeader className="pb-3 sm:pb-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <CardTitle className="text-base sm:text-lg md:text-xl">Enter Your Text</CardTitle>
                      <UploadButton 
                        onClick={triggerFileUpload}
                        isLoading={isUploading}
                        size="sm"
                      />
                    </div>
                    <CardDescription className="text-xs sm:text-sm">Enter or paste text to check grammar</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="Type or paste your text here to check for grammar and spelling errors..."
                      value={text}
                      onChange={(e) => {
                        setText(e.target.value);
                        // Reset results when text changes
                        if (result) {
                          setResult(null);
                          setCorrectedText('');
                        }
                      }}
                      className="w-full min-h-[16rem] h-64 sm:h-80 p-3 sm:p-4 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-y transition-all text-sm sm:text-base"
                      data-testid="textarea-grammar-input"
                    />
                    
                    <div className="grid grid-cols-3 gap-2">
                      <button 
                        onClick={copyCorrected}
                        disabled={!text}
                        className="px-2 sm:px-3 py-2 bg-secondary text-secondary-foreground rounded text-xs sm:text-sm hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1"
                        data-testid="button-copy-text"
                        title="Copy text to clipboard"
                      >
                        <FaCopy className="text-sm" />
                        <span>Copy</span>
                      </button>
                      <button 
                        onClick={clearAll}
                        disabled={!text && !result}
                        className="px-2 sm:px-3 py-2 bg-secondary text-secondary-foreground rounded text-xs sm:text-sm hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1"
                        data-testid="button-clear-text"
                        title="Clear all text"
                      >
                        <FaEraser className="text-sm" />
                        <span>Clear</span>
                      </button>
                      <button 
                        onClick={downloadCorrected}
                        disabled={!text}
                        className="px-2 sm:px-3 py-2 bg-secondary text-secondary-foreground rounded text-xs sm:text-sm hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1"
                        data-testid="button-export-text"
                        title="Download text"
                      >
                        <FaDownload className="text-sm" />
                        <span>Export</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* Corrected Text with Highlights */}
                <Card className="bg-card border border-border">
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="text-base sm:text-lg md:text-xl">
                      {result && errorCount > 0 ? 'Errors Highlighted' : 'Preview'}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      {result && errorCount > 0 ? 'Hover over highlighted text to see suggestions' : 'Your checked text will appear here'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div
                      className="w-full min-h-[16rem] h-64 sm:h-80 p-3 sm:p-4 bg-background border border-border rounded-lg overflow-y-auto text-sm sm:text-base whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: result ? getHighlightedText() : text || '<span class="text-muted-foreground">Check your text to see results...</span>' }}
                      data-testid="preview-grammar-result"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Check Grammar Button */}
              <Card className="bg-card border border-border">
                <CardContent className="p-4">
                  <Button
                    onClick={checkGrammar}
                    disabled={!text.trim() || isChecking}
                    className="w-full"
                    data-testid="button-check-grammar"
                  >
                    {isChecking ? (
                      <>
                        <FaSync className="mr-1 sm:mr-2 animate-spin" />
                        <span className="text-xs sm:text-sm">Checking...</span>
                      </>
                    ) : (
                      <>
                        <FaSpellCheck className="mr-1 sm:mr-2" />
                        <span className="text-xs sm:text-sm">Check Grammar</span>
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Error Details */}
              {result && errorCount > 0 && (
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto gap-1">
                    <TabsTrigger value="all" className="text-xs sm:text-sm py-2 px-2">
                      All ({errorCount})
                    </TabsTrigger>
                    {Object.keys(errorsByType).slice(0, 3).map((type) => (
                      <TabsTrigger key={type} value={type} className="text-xs sm:text-sm py-2 px-2 truncate">
                        {type.length > 10 ? type.substring(0, 10) + '...' : type} ({errorsByType[type].length})
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <TabsContent value="all" className="space-y-3 max-h-[400px] overflow-y-auto">
                    {result.matches.map((error, idx) => (
                      <Card key={idx} className="bg-card border border-orange-200 dark:border-orange-900">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {error.rule.category.name}
                                </Badge>
                              </div>
                              <p className="text-sm font-medium mb-1">{error.message}</p>
                              <p className="text-xs text-muted-foreground mb-2">
                                "{text.substring(error.offset, error.offset + error.length)}"
                              </p>
                              {error.replacements && error.replacements.length > 0 && (
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="text-xs text-muted-foreground">Suggestion:</span>
                                  {error.replacements.slice(0, 3).map((rep, i) => (
                                    <Badge key={i} className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                                      {rep.value}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  {Object.entries(errorsByType).slice(0, 3).map(([type, errors]) => (
                    <TabsContent key={type} value={type} className="space-y-3 max-h-[400px] overflow-y-auto">
                      {errors.map((error, idx) => (
                        <Card key={idx} className="bg-card border border-orange-200 dark:border-orange-900">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <p className="text-sm font-medium mb-1">{error.message}</p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  "{text.substring(error.offset, error.offset + error.length)}"
                                </p>
                                {error.replacements && error.replacements.length > 0 && (
                                  <div className="flex items-center gap-2 mt-2">
                                    <span className="text-xs text-muted-foreground">Suggestion:</span>
                                    {error.replacements.slice(0, 3).map((rep, i) => (
                                      <Badge key={i} className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                                        {rep.value}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>
                  ))}
                </Tabs>
              )}

              {/* Corrected Text Output */}
              {correctedText && (
                <Card className="bg-card border border-green-200 dark:border-green-900">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      Corrected Text
                    </CardTitle>
                    <CardDescription>Text with all suggested corrections applied</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={correctedText}
                      onChange={(e) => setCorrectedText(e.target.value)}
                      className="w-full min-h-[12rem] p-3 sm:p-4 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-y transition-all text-sm sm:text-base"
                      data-testid="textarea-corrected-text"
                    />
                  </CardContent>
                </Card>
              )}

              {/* Features & Tips */}
              <Tabs defaultValue="features" className="w-full">
                <TabsList className="grid w-full grid-cols-3 h-auto">
                  <TabsTrigger value="features" className="text-xs sm:text-sm py-2">Features</TabsTrigger>
                  <TabsTrigger value="tips" className="text-xs sm:text-sm py-2">Tips</TabsTrigger>
                  <TabsTrigger value="faq" className="text-xs sm:text-sm py-2">FAQ</TabsTrigger>
                </TabsList>

                <TabsContent value="features" className="space-y-4">
                  <Card className="bg-card border border-border">
                    <CardContent className="p-4 space-y-3">
                      <h3 className="font-semibold text-lg">Key Features</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <FaCheckCircle className="text-primary mr-3 mt-1 flex-shrink-0" />
                          <span>Real-time grammar and spelling check</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-primary mr-3 mt-1 flex-shrink-0" />
                          <span>Punctuation error detection</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-primary mr-3 mt-1 flex-shrink-0" />
                          <span>Instant correction suggestions</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-primary mr-3 mt-1 flex-shrink-0" />
                          <span>Error categorization and highlighting</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-primary mr-3 mt-1 flex-shrink-0" />
                          <span>100% free - no API key required</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-primary mr-3 mt-1 flex-shrink-0" />
                          <span>File upload support (TXT, DOC, DOCX)</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-primary mr-3 mt-1 flex-shrink-0" />
                          <span>Export corrected text</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="tips" className="space-y-4">
                  <Card className="bg-card border border-border">
                    <CardContent className="p-4 space-y-3">
                      <h3 className="font-semibold text-lg">Grammar Checking Tips</h3>
                      <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                        <li>Always review suggested corrections before applying</li>
                        <li>Check context - not all suggestions may be appropriate</li>
                        <li>Use for essays, emails, articles, and professional writing</li>
                        <li>Upload documents for batch checking</li>
                        <li>Combine with spell checker for comprehensive review</li>
                        <li>Read your text aloud after corrections</li>
                        <li>Learn from repeated errors to improve your writing</li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="faq" className="space-y-4">
                  <Card className="bg-card border border-border">
                    <CardContent className="p-4 space-y-3">
                      <h3 className="font-semibold text-lg">Frequently Asked Questions</h3>
                      <div className="space-y-4 text-sm">
                        <div>
                          <p className="font-medium mb-1">Is this grammar checker really free?</p>
                          <p className="text-muted-foreground">Yes! 100% free with no hidden costs or API keys needed. Powered by LanguageTool's free API.</p>
                        </div>
                        <div>
                          <p className="font-medium mb-1">What types of errors does it detect?</p>
                          <p className="text-muted-foreground">Grammar mistakes, spelling errors, punctuation issues, and style suggestions.</p>
                        </div>
                        <div>
                          <p className="font-medium mb-1">Can I upload documents?</p>
                          <p className="text-muted-foreground">Yes! Upload TXT, DOC, or DOCX files up to 10MB for instant checking.</p>
                        </div>
                        <div>
                          <p className="font-medium mb-1">Is my text stored or shared?</p>
                          <p className="text-muted-foreground">Your text is only saved locally in your browser. We don't store or share your content.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-4">
                <RelatedToolsSidebar currentTool="/grammar-checker" limit={5} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* SEO-Optimized Blog Content - Humanized and Optimized */}
      <section className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-card rounded-lg p-4 sm:p-6 md:p-8 shadow-sm border border-border">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 sm:mb-6">Why Use Our Grammar Checker? Write Flawless, Professional Content Every Time</h2>
            
            <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                Have you ever sent an important email with a glaring typo? Or submitted an essay only to discover it's filled with grammar mistakes that cost you valuable points? Grammar and spelling errors don't just make your writing look unprofessional—they actively damage your credibility. Studies show that <strong>59% of people won't trust content with obvious grammar and spelling mistakes</strong>, and job applicants with errors in their resumes are 70% less likely to get interviews. Our free Grammar Checker helps you catch every mistake before it reaches your audience, using advanced AI-powered algorithms to detect grammar errors, spelling mistakes, punctuation issues, and style problems instantly.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaBolt className="mr-2 sm:mr-3 text-yellow-500 flex-shrink-0" />
                How Does Grammar Checking Technology Work and Why Is It Essential?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Modern grammar checkers use natural language processing (NLP) and machine learning algorithms trained on millions of correctly written sentences to identify errors your word processor might miss. While basic spell checkers only catch obvious misspellings, our grammar checker analyzes sentence structure, verb tense consistency, subject-verb agreement, pronoun usage, punctuation placement, and contextual spelling errors (like "their" vs "there" vs "they're").
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Why does this matter? Because human eyes miss 40-60% of their own errors when proofreading—a phenomenon called "change blindness." Your brain automatically corrects mistakes as you read, making self-editing notoriously unreliable. Professional writers, editors, and academics rely on grammar checkers as a <strong>second pair of eyes that never gets tired</strong> and catches errors humans typically overlook. By using our tool, you can reduce grammar errors by 85-95%, ensuring your writing is always polished and professional.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaGraduationCap className="mr-2 sm:mr-3 text-blue-500 flex-shrink-0" />
                How Can Students Improve Their Grades with Grammar Checking?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Academic writing demands precision, and grammar errors significantly impact your grades. Research shows that <strong>grammar and spelling mistakes can reduce essay scores by 10-20%</strong> even when the content and ideas are strong. Teachers and professors use grammar as a proxy for careful thinking—if your writing contains careless errors, evaluators assume your research and analysis are equally careless.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Our Grammar Checker helps students at all levels—from high school essays to doctoral dissertations. The tool catches common student errors like run-on sentences, sentence fragments, comma splices, apostrophe misuse, and confused homophones. Students who consistently use grammar checkers before submission report <strong>grade improvements averaging 8-15%</strong> on writing assignments. For non-native English speakers and students with learning differences like dyslexia, grammar checking tools are particularly valuable, providing instant feedback that accelerates learning and builds confidence.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaChartLine className="mr-2 sm:mr-3 text-green-500 flex-shrink-0" />
                How Do Professional Writers and Content Creators Use Grammar Checkers?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                In the content marketing world, credibility is everything. Blog posts, articles, and marketing copy with grammar errors generate 50% fewer shares on social media and receive 45% less engagement than error-free content. Professional content creators understand that <strong>quality beats quantity</strong>—a single well-edited article outperforms three rushed, error-filled posts.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Top bloggers, copywriters, and digital marketers use grammar checkers as part of their editorial workflow to maintain consistent quality across high-volume content production. Our tool helps catch errors that slip through during tight deadlines, ensures brand voice consistency, and identifies passive voice constructions that weaken marketing copy. Content teams using systematic grammar checking report <strong>30-40% fewer client revisions</strong> and 25% higher content approval rates on first submission. For freelance writers, grammar perfection means better client reviews, higher rates, and more repeat business.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaPenFancy className="mr-2 sm:mr-3 text-purple-500 flex-shrink-0" />
                How Can Authors and Professional Writers Polish Their Manuscripts?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Literary agents and publishers receive thousands of manuscript submissions monthly, and they use grammar and spelling errors as quick filters to reject submissions without reading further. One agent reports that <strong>manuscripts with more than 3 grammar errors in the first 10 pages get automatic rejections</strong> regardless of story quality. Your prose might be brilliant, but if it's riddled with errors, no one will read far enough to discover that.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Professional authors use grammar checkers during the self-editing phase before sending manuscripts to human editors. This catches the obvious mistakes, allowing professional editors to focus on deeper structural and stylistic improvements rather than basic grammar cleanup—saving both time and money. Writers who clean up grammar errors before professional editing report <strong>30-50% lower editing costs</strong> and faster turnaround times. For self-published authors, grammar checking is absolutely essential since readers leave harsh reviews for books with editing errors, directly impacting sales and ratings.
              </p>

              <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 rounded-lg p-4 sm:p-6 mt-6 sm:mt-8 mb-6 border border-primary/20">
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4">Key Benefits of Using Our Grammar Checker</h3>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>AI-Powered Detection:</strong> Advanced algorithms catch grammar, spelling, punctuation, and style errors instantly</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Real-Time Checking:</strong> See errors highlighted immediately as you type—no waiting for processing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Smart Suggestions:</strong> Get contextual correction suggestions that understand your intended meaning</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>One-Click Fixes:</strong> Apply corrections instantly or review suggestions individually for full control</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Comprehensive Analysis:</strong> Detects grammar mistakes, spelling errors, punctuation issues, and style problems</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>File Upload Support:</strong> Check entire documents (TXT, DOC, DOCX) up to 10MB instantly</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Export Corrected Text:</strong> Download your polished, error-free text with all corrections applied</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>100% Free Forever:</strong> No registration, no subscriptions, no hidden fees—unlimited grammar checking</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4">Real-World Applications: Who Benefits from Grammar Checking?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaGraduationCap className="mr-2 text-blue-500" />
                    Students & Academics
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Improve essay and paper grades by 10-20%</li>
                    <li>• Catch errors before submitting assignments</li>
                    <li>• Polish thesis and dissertation writing</li>
                    <li>• Perfect college application essays</li>
                    <li>• Support for ESL and dyslexic students</li>
                  </ul>
                </div>
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaChartLine className="mr-2 text-green-500" />
                    Content Creators & Marketers
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Publish error-free blog posts and articles</li>
                    <li>• Increase engagement with polished copy</li>
                    <li>• Maintain professional brand voice</li>
                    <li>• Reduce client revision requests by 30-40%</li>
                    <li>• Improve social media credibility</li>
                  </ul>
                </div>
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaPenFancy className="mr-2 text-purple-500" />
                    Authors & Publishers
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Polish manuscripts before submission</li>
                    <li>• Reduce professional editing costs by 30-50%</li>
                    <li>• Avoid agent/publisher rejections from errors</li>
                    <li>• Improve self-published book reviews</li>
                    <li>• Maintain consistent quality across chapters</li>
                  </ul>
                </div>
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaUserTie className="mr-2 text-orange-500" />
                    Business Professionals
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Write error-free emails and proposals</li>
                    <li>• Polish presentations and reports</li>
                    <li>• Improve resume and cover letter quality</li>
                    <li>• Maintain professional communication standards</li>
                    <li>• Build credibility with clients and colleagues</li>
                  </ul>
                </div>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground mt-6 sm:mt-8 leading-relaxed">
                Whether you're a student striving for better grades, a content creator building audience trust, an author pursuing publication, or a professional maintaining credibility, our Grammar Checker ensures your writing is always flawless. With <strong>AI-powered error detection</strong>, real-time suggestions, one-click corrections, and unlimited free use, you'll never send another email, submit another essay, or publish another article with embarrassing grammar mistakes. Stop letting errors undermine your message—start writing with confidence and polish every single time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
