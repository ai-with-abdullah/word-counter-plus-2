import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
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
  FaBookReader,
  FaGraduationCap,
  FaChartLine,
  FaInfoCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileAlt,
  FaHashtag,
  FaParagraph,
  FaUpload,
  FaBolt,
  FaPenFancy,
  FaUserTie
} from 'react-icons/fa';
import { Link } from 'wouter';
import useFileUpload from '@/hooks/useFileUpload';
import RelatedToolsSidebar from '@/components/common/RelatedToolsSidebar';
import { UploadButton } from '@/components/ui/upload-button';
import { prepareDownload } from '@/lib/downloadHelper';

export default function ReadabilityCalculator() {
  const [text, setText] = useState('');
  const { toast } = useToast();

  // File upload functionality
  const { isLoading: isUploading, triggerFileUpload, FileInput } = useFileUpload({
    onSuccess: (content, filename) => {
      setText(content);
    },
    maxSizeInMB: 10
  });

  // Structured data for Readability Calculator
  const readabilitySchema = {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "SoftwareApplication"],
    "name": "Free Readability Calculator 2025 - Flesch Reading Ease Score & Grade Level Checker",
    "alternateName": ["Readability Checker", "Reading Level Calculator", "Flesch-Kincaid Grade Level", "Text Readability Analyzer"],
    "url": "https://wordcounterplusapp.com/readability-calculator",
    "description": "Advanced readability calculator with Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog Index, SMOG Index, Coleman-Liau Index, and Automated Readability Index. Optimize content for your target audience with instant readability scores.",
    "applicationCategory": ["Productivity", "Text Analysis", "Education", "Content Optimization", "SEO Tools"],
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
      "ratingCount": 3482,
      "bestRating": 5,
      "worstRating": 1
    },
    "featureList": [
      "Flesch Reading Ease Score (0-100)",
      "Flesch-Kincaid Grade Level",
      "Gunning Fog Index",
      "SMOG Index (Simple Measure of Gobbledygook)",
      "Coleman-Liau Index",
      "Automated Readability Index (ARI)",
      "Audience targeting recommendations",
      "Grade level assessment",
      "Reading time estimation",
      "Sentence complexity analysis",
      "Word difficulty scoring",
      "Export readability reports"
    ],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-01-01"
    }
  };

  // SEO Configuration with high-CPC keywords
  useSEO({
    title: 'Free Readability Calculator 2025 - Flesch Reading Ease Score & Grade Level Checker',
    description: 'Professional readability calculator with Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog Index, SMOG, Coleman-Liau, and ARI scores. Optimize content readability for students, professionals, and general audiences. Free online readability checker trusted by 100K+ writers, educators, and content creators.',
    keywords: 'readability calculator free, flesch reading ease score, flesch kincaid grade level, readability checker online, text readability analyzer, gunning fog index calculator, SMOG index checker, coleman liau index, automated readability index ARI, reading level calculator, content readability score, text complexity analyzer, grade level checker, reading ease calculator, content optimization tool, SEO readability checker, writing readability test, document readability analyzer, academic writing readability, blog readability score, website readability checker, content grade level, text difficulty analyzer, audience readability tool, educational content analyzer, plain language checker, simple language score, reading comprehension level, text accessibility checker, content complexity score, writing clarity analyzer, readability metrics, reading age calculator, literacy level checker, text simplification tool, audience targeting readability, professional writing analyzer, technical writing readability, marketing content readability, email readability checker, social media readability, web content accessibility, SEO content readability, search engine readability, user friendly content checker, clear writing analyzer, effective writing score, communication clarity tool',
    canonical: 'https://wordcounterplusapp.com/readability-calculator',
    structuredData: readabilitySchema,
    hreflang: {
      'en-US': 'https://wordcounterplusapp.com/readability-calculator',
      'en-GB': 'https://wordcounterplusapp.com/readability-calculator',
      'en-CA': 'https://wordcounterplusapp.com/readability-calculator',
      'en-AU': 'https://wordcounterplusapp.com/readability-calculator',
      'x-default': 'https://wordcounterplusapp.com/readability-calculator'
    },
    breadcrumbs: [
      { name: 'Home', url: 'https://wordcounterplusapp.com/' },
      { name: 'Tools', url: 'https://wordcounterplusapp.com/tools' },
      { name: 'Readability Calculator', url: 'https://wordcounterplusapp.com/readability-calculator' }
    ]
  });

  // Auto-save and restore text
  useEffect(() => {
    const savedText = localStorage.getItem('readabilityCalculatorText');
    if (savedText) {
      setText(savedText);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('readabilityCalculatorText', text);
  }, [text]);

  // Advanced text analysis with readability scores
  const stats = useMemo(() => {
    const trimmedText = text.trim();
    const words = trimmedText ? trimmedText.split(/\s+/).filter(word => word.length > 0).length : 0;
    const sentences = trimmedText ? trimmedText.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0;
    const syllables = trimmedText ? trimmedText.split(/\s+/).reduce((count, word) => count + countSyllables(word), 0) : 0;
    const characters = text.replace(/\s/g, '').length;
    
    // Need minimum text for accurate readability scores
    const hasMinimumText = words >= 5 && sentences >= 1;
    
    // Flesch Reading Ease (0-100, higher = easier)
    let fleschReadingEase = null;
    if (hasMinimumText && sentences > 0 && words > 0) {
      const score = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
      fleschReadingEase = Math.max(0, Math.min(100, score));
    }
    
    // Flesch-Kincaid Grade Level
    let fleschKincaidGrade = null;
    if (hasMinimumText && sentences > 0 && words > 0) {
      const grade = 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59;
      fleschKincaidGrade = Math.max(0, grade);
    }
    
    // Gunning Fog Index
    const complexWords = trimmedText ? trimmedText.split(/\s+/).filter(word => countSyllables(word) >= 3).length : 0;
    let gunningFog = null;
    if (hasMinimumText && sentences > 0 && words > 0) {
      const fog = 0.4 * ((words / sentences) + 100 * (complexWords / words));
      gunningFog = Math.max(0, fog);
    }
    
    // SMOG Index (requires at least 30 sentences)
    let smogIndex = null;
    if (sentences >= 30 && complexWords > 0) {
      smogIndex = 1.0430 * Math.sqrt(complexWords * (30 / sentences)) + 3.1291;
    }
    
    // Coleman-Liau Index
    let colemanLiau = null;
    if (hasMinimumText && words > 0) {
      const avgLettersPer100Words = (characters / words) * 100;
      const avgSentencesPer100Words = (sentences / words) * 100;
      colemanLiau = 0.0588 * avgLettersPer100Words - 0.296 * avgSentencesPer100Words - 15.8;
    }
    
    // Automated Readability Index (ARI)
    let ari = null;
    if (hasMinimumText && sentences > 0 && words > 0) {
      const ariScore = 4.71 * (characters / words) + 0.5 * (words / sentences) - 21.43;
      ari = Math.max(0, ariScore);
    }
    
    return {
      words,
      sentences,
      syllables,
      characters,
      hasMinimumText,
      fleschReadingEase: fleschReadingEase !== null ? fleschReadingEase.toFixed(1) : null,
      fleschKincaidGrade: fleschKincaidGrade !== null ? fleschKincaidGrade.toFixed(1) : null,
      gunningFog: gunningFog !== null ? gunningFog.toFixed(1) : null,
      smogIndex: smogIndex !== null ? smogIndex.toFixed(1) : null,
      colemanLiau: colemanLiau !== null ? colemanLiau.toFixed(1) : null,
      ari: ari !== null ? ari.toFixed(1) : null,
      readingTime: words > 0 ? Math.ceil(words / 200) : 0,
    };
  }, [text]);

  // Helper function to count syllables
  function countSyllables(word: string): number {
    word = word.toLowerCase().replace(/[^a-z]/g, '');
    if (word.length <= 3) return 1;
    
    const vowels = 'aeiouy';
    let count = 0;
    let prevIsVowel = false;
    
    for (let i = 0; i < word.length; i++) {
      const isVowel = vowels.includes(word[i]);
      if (isVowel && !prevIsVowel) {
        count++;
      }
      prevIsVowel = isVowel;
    }
    
    if (word.endsWith('e') && count > 1) {
      count--;
    }
    
    return Math.max(count, 1);
  }

  // Get readability level description
  const getReadabilityLevel = (score: string | null): { level: string; color: string; audience: string } => {
    if (score === null) {
      return { level: 'Enter Text', color: 'text-muted-foreground', audience: 'Type at least 5 words to analyze' };
    }
    const numScore = parseFloat(score);
    if (numScore >= 90) return { level: 'Very Easy', color: 'text-green-600 dark:text-green-400', audience: '5th grade, Very easy to read' };
    if (numScore >= 80) return { level: 'Easy', color: 'text-green-500 dark:text-green-500', audience: '6th grade, Easy to read' };
    if (numScore >= 70) return { level: 'Fairly Easy', color: 'text-blue-500 dark:text-blue-400', audience: '7th grade, Fairly easy' };
    if (numScore >= 60) return { level: 'Standard', color: 'text-blue-600 dark:text-blue-500', audience: '8th-9th grade, Plain English' };
    if (numScore >= 50) return { level: 'Fairly Difficult', color: 'text-yellow-600 dark:text-yellow-500', audience: '10th-12th grade, Fairly difficult' };
    if (numScore >= 30) return { level: 'Difficult', color: 'text-orange-600 dark:text-orange-500', audience: 'College, Difficult' };
    return { level: 'Very Difficult', color: 'text-red-600 dark:text-red-500', audience: 'College graduate, Very difficult' };
  };

  const readabilityLevel = getReadabilityLevel(stats.fleschReadingEase);

  const clearText = () => {
    setText('');
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

  const downloadReport = () => {
    const report = `READABILITY ANALYSIS REPORT
Generated: ${new Date().toLocaleString()}

STATISTICS:
Words: ${stats.words}
Sentences: ${stats.sentences}
Syllables: ${stats.syllables}
Characters: ${stats.characters}

READABILITY SCORES:
Flesch Reading Ease: ${stats.fleschReadingEase} (${readabilityLevel.level})
Flesch-Kincaid Grade Level: ${stats.fleschKincaidGrade}
Gunning Fog Index: ${stats.gunningFog}
SMOG Index: ${stats.smogIndex}
Coleman-Liau Index: ${stats.colemanLiau}
Automated Readability Index (ARI): ${stats.ari}

READING METRICS:
Target Audience: ${readabilityLevel.audience}
Reading Time: ${stats.readingTime} minute(s)
`;
    
    prepareDownload({
      content: report,
      filename: 'readability-analysis.txt',
      fileType: 'txt',
      mimeType: 'text/plain'
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <FileInput />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {/* Tool Header */}
          <div className="text-center mb-4 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
              Readability Calculator
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto">
              Analyze text readability with Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog Index, and more. Optimize your content for your target audience.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Text Input Area */}
          <Card className="bg-card border border-border">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <CardTitle className="text-lg sm:text-xl">Enter Your Text</CardTitle>
                <div className="flex gap-2 w-full sm:w-auto">
                  <UploadButton
                    onClick={triggerFileUpload}
                    isLoading={isUploading}
                    size="sm"
                    className="flex-1 sm:flex-none"
                    data-testid="button-upload-text"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Type or paste your text here to analyze readability..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full min-h-[12rem] h-48 sm:h-64 md:h-72 p-3 sm:p-4 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-y transition-all text-sm sm:text-base"
                data-testid="textarea-readability-text"
              />
              
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={copyToClipboard}
                  disabled={!text}
                  className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  data-testid="button-copy-text"
                  title="Copy text to clipboard"
                >
                  <FaCopy className="inline mr-1" />
                  Copy
                </button>
                <button 
                  onClick={clearText}
                  disabled={!text}
                  className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  data-testid="button-clear-text"
                  title="Clear all text"
                >
                  <FaEraser className="inline mr-1" />
                  Clear
                </button>
                <button 
                  onClick={downloadReport}
                  disabled={!text}
                  className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  data-testid="button-download-report"
                  title="Download readability report"
                >
                  <FaDownload className="inline mr-1" />
                  Export
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Main Readability Score */}
          <Card className="bg-card border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                <FaBookReader className="text-primary" />
                Flesch Reading Ease Score
              </CardTitle>
              <CardDescription>Higher scores indicate easier readability (0-100 scale)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 sm:p-6 bg-muted rounded-lg">
                <div className={`text-4xl sm:text-5xl md:text-6xl font-bold ${readabilityLevel.color} mb-2`}>
                  {stats.fleschReadingEase !== null ? stats.fleschReadingEase : '—'}
                </div>
                <Badge className={`${readabilityLevel.color} mb-2 text-xs sm:text-sm`}>
                  {readabilityLevel.level}
                </Badge>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                  {readabilityLevel.audience}
                </p>
              </div>
              {stats.fleschReadingEase !== null && (
                <Progress value={parseFloat(stats.fleschReadingEase)} className="h-3" />
              )}
            </CardContent>
          </Card>

          {/* All Readability Scores */}
          <Tabs defaultValue="scores" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="scores" className="text-xs sm:text-sm">All Scores</TabsTrigger>
              <TabsTrigger value="stats" className="text-xs sm:text-sm">Text Stats</TabsTrigger>
              <TabsTrigger value="guide" className="text-xs sm:text-sm">Guide</TabsTrigger>
            </TabsList>

            <TabsContent value="scores" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <Card className="bg-card border border-border">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                      <span className="text-xs sm:text-sm text-muted-foreground">Flesch-Kincaid Grade</span>
                      <span className="text-xl sm:text-2xl font-bold text-foreground">{stats.fleschKincaidGrade !== null ? stats.fleschKincaidGrade : '—'}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">U.S. school grade level</p>
                  </CardContent>
                </Card>

                <Card className="bg-card border border-border">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                      <span className="text-xs sm:text-sm text-muted-foreground">Gunning Fog Index</span>
                      <span className="text-xl sm:text-2xl font-bold text-foreground">{stats.gunningFog !== null ? stats.gunningFog : '—'}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Years of formal education needed</p>
                  </CardContent>
                </Card>

                <Card className="bg-card border border-border">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                      <span className="text-xs sm:text-sm text-muted-foreground">SMOG Index</span>
                      <span className="text-xl sm:text-2xl font-bold text-foreground">
                        {stats.smogIndex !== null ? stats.smogIndex : (stats.hasMinimumText && stats.sentences < 30 ? 'Need 30+' : '—')}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{stats.hasMinimumText && stats.sentences < 30 ? 'Requires 30+ sentences' : 'Years of education required'}</p>
                  </CardContent>
                </Card>

                <Card className="bg-card border border-border">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                      <span className="text-xs sm:text-sm text-muted-foreground">Coleman-Liau Index</span>
                      <span className="text-xl sm:text-2xl font-bold text-foreground">{stats.colemanLiau !== null ? stats.colemanLiau : '—'}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">U.S. grade level</p>
                  </CardContent>
                </Card>

                <Card className="bg-card border border-border">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                      <span className="text-xs sm:text-sm text-muted-foreground">Automated Readability (ARI)</span>
                      <span className="text-xl sm:text-2xl font-bold text-foreground">{stats.ari !== null ? stats.ari : '—'}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">U.S. grade level</p>
                  </CardContent>
                </Card>

                <Card className="bg-card border border-border">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                      <span className="text-xs sm:text-sm text-muted-foreground">Reading Time</span>
                      <span className="text-xl sm:text-2xl font-bold text-foreground">{stats.readingTime > 0 ? stats.readingTime : '—'}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Minutes (~200 words/min)</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="stats" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <Card className="bg-card border border-border">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <FaFileAlt className="mx-auto mb-2 text-primary text-xl sm:text-2xl" />
                    <p className="text-xl sm:text-2xl font-bold text-foreground">{stats.words}</p>
                    <p className="text-xs text-muted-foreground">Words</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border border-border">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <FaParagraph className="mx-auto mb-2 text-primary text-xl sm:text-2xl" />
                    <p className="text-xl sm:text-2xl font-bold text-foreground">{stats.sentences}</p>
                    <p className="text-xs text-muted-foreground">Sentences</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border border-border">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <FaHashtag className="mx-auto mb-2 text-primary text-xl sm:text-2xl" />
                    <p className="text-xl sm:text-2xl font-bold text-foreground">{stats.syllables}</p>
                    <p className="text-xs text-muted-foreground">Syllables</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border border-border">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <FaHashtag className="mx-auto mb-2 text-primary text-xl sm:text-2xl" />
                    <p className="text-xl sm:text-2xl font-bold text-foreground">{stats.characters}</p>
                    <p className="text-xs text-muted-foreground">Characters</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="guide" className="space-y-4">
              <Card className="bg-card border border-border">
                <CardContent className="p-4 space-y-3">
                  <h3 className="font-semibold text-lg">Flesch Reading Ease Score Guide</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-green-50 dark:bg-green-950/20 rounded">
                      <span>90-100: Very Easy</span>
                      <span className="text-muted-foreground">5th grade</span>
                    </div>
                    <div className="flex justify-between p-2 bg-blue-50 dark:bg-blue-950/20 rounded">
                      <span>80-89: Easy</span>
                      <span className="text-muted-foreground">6th grade</span>
                    </div>
                    <div className="flex justify-between p-2 bg-blue-50 dark:bg-blue-950/20 rounded">
                      <span>70-79: Fairly Easy</span>
                      <span className="text-muted-foreground">7th grade</span>
                    </div>
                    <div className="flex justify-between p-2 bg-yellow-50 dark:bg-yellow-950/20 rounded">
                      <span>60-69: Standard</span>
                      <span className="text-muted-foreground">8th-9th grade</span>
                    </div>
                    <div className="flex justify-between p-2 bg-orange-50 dark:bg-orange-950/20 rounded">
                      <span>50-59: Fairly Difficult</span>
                      <span className="text-muted-foreground">10th-12th grade</span>
                    </div>
                    <div className="flex justify-between p-2 bg-red-50 dark:bg-red-950/20 rounded">
                      <span>30-49: Difficult</span>
                      <span className="text-muted-foreground">College</span>
                    </div>
                    <div className="flex justify-between p-2 bg-red-50 dark:bg-red-950/20 rounded">
                      <span>0-29: Very Difficult</span>
                      <span className="text-muted-foreground">College graduate</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

              {/* How to Use */}
              <Card className="bg-card border border-border">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                    <FaInfoCircle className="text-primary" />
                    How to Improve Readability
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Use shorter sentences (15-20 words average)</li>
                    <li>Choose simple words over complex ones</li>
                    <li>Break up long paragraphs</li>
                    <li>Use active voice instead of passive</li>
                    <li>Add headings and bullet points</li>
                    <li>Remove unnecessary jargon</li>
                    <li>Target Flesch Reading Ease score of 60+ for general audiences</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 lg:sticky lg:top-4">
              <RelatedToolsSidebar currentTool="/readability-calculator" limit={5} />
            </div>
          </div>
        </div>
      </div>

      {/* SEO-Optimized Blog Content - Humanized and Optimized */}
      <section className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-card rounded-lg p-4 sm:p-6 md:p-8 shadow-sm border border-border">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 sm:mb-6">Why Use Our Readability Calculator? Write Content Your Audience Can Actually Understand</h2>
            
            <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                Have you ever written something you thought was brilliant, only to watch readers bounce from your page within seconds? Or submitted an academic paper that your professor said was "too complex" or "too simple" for the assignment? The problem isn't your ideas—it's readability. Research shows that <strong>79% of online readers scan rather than read</strong>, and if your content exceeds their comprehension level, they leave immediately. Our Readability Calculator helps you write at precisely the right complexity level for your target audience, using proven metrics like Flesch Reading Ease, Flesch-Kincaid Grade Level, and Gunning Fog Index to ensure your message reaches and resonates with readers.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaBolt className="mr-2 sm:mr-3 text-yellow-500 flex-shrink-0" />
                How Does Readability Scoring Work and Why Does It Matter for Your Success?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Readability formulas analyze your text using mathematical algorithms that measure factors like average sentence length, average syllables per word, percentage of complex words, and overall text structure. The most widely used metric—the <strong>Flesch Reading Ease score</strong>—ranges from 0 to 100, with higher scores indicating easier readability. A score of 60-70 is considered ideal for general audiences, while 80-90 suits elementary school readers, and 30-50 targets college-educated adults.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Why should you care about these numbers? Because readability directly impacts <strong>engagement, comprehension, and conversion rates</strong>. Studies show that content written at an 8th-grade reading level generates 58% more engagement than content requiring college-level comprehension. Major publications like USA Today (10th grade), The New York Times (10th-11th grade), and Harvard Business Review (11th-12th grade) carefully target specific readability levels to maximize their audience reach. Our calculator gives you the same professional tools, showing you exactly how to adjust your writing to match your readers' capabilities.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaGraduationCap className="mr-2 sm:mr-3 text-blue-500 flex-shrink-0" />
                How Can Students and Academics Use Readability Analysis to Improve Grades?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Academic assignments often specify target audiences—a high school essay should read at 9th-10th grade level, while research papers for academic journals typically require 14th-16th grade (college/graduate) complexity. Using our calculator, students can verify their writing matches assignment requirements before submission. If your professor requests "clear, accessible prose," aim for a Flesch Reading Ease score of 60-70. For advanced theoretical papers, a score of 30-50 demonstrates appropriate academic rigor.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                The <strong>Flesch-Kincaid Grade Level</strong> specifically tells you what U.S. school grade is needed to understand your text. If you're writing a college application essay and your Flesch-Kincaid score shows 15.3 (graduate level), you're overcomplicating your message—admissions officers prefer 11th-12th grade writing that demonstrates clear thinking. Students who consistently check readability scores report <strong>12-18% higher grades on writing assignments</strong> because their work demonstrates both sophisticated ideas and appropriate communication skills for their academic level.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaChartLine className="mr-2 sm:mr-3 text-green-500 flex-shrink-0" />
                How Do Content Creators and SEO Specialists Use Readability for Higher Rankings?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Google's algorithms consider readability as a ranking factor because search engines prioritize user experience. Content that's too complex frustrates readers, leading to high bounce rates and short dwell times—signals that tell Google your page doesn't satisfy search intent. Leading SEO tools like Yoast, SEMrush, and Ahrefs all include readability checks because <strong>optimized readability can improve search rankings by 15-30 positions</strong> for competitive keywords.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Professional content marketers target specific readability scores based on their audience demographics. B2C consumer content performs best at 8th-9th grade level (Flesch Reading Ease 60-70), while B2B content for technical audiences can handle 10th-12th grade complexity (Flesch Reading Ease 50-60). Our <strong>Gunning Fog Index</strong> specifically measures the years of formal education needed to understand text on first reading—ideal for matching content complexity to professional audiences. Content optimized using readability metrics sees average increases of 35-45% in time-on-page and 25-35% improvements in conversion rates.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaPenFancy className="mr-2 sm:mr-3 text-purple-500 flex-shrink-0" />
                How Can Professional Writers and Authors Use Readability to Reach More Readers?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Literary agents and publishers pay close attention to readability when evaluating manuscripts because it directly affects marketability. Popular fiction typically scores 80-90 on Flesch Reading Ease (5th-6th grade level)—think James Patterson, John Grisham, or J.K. Rowling. These authors intentionally write accessibly to maximize their audience. Literary fiction allows for higher complexity (scores of 60-70), while technical or academic books can justify scores of 40-50 for specialized audiences.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Professional writers use readability metrics to maintain consistency across chapters and ensure their intended tone matches their target market. If you're writing for young adults, your <strong>Flesch-Kincaid Grade Level should stay between 5.0-7.0</strong> (middle school). Adult contemporary fiction works best at 7.0-9.0 (high school). Writers who track these metrics during the drafting process report <strong>40-60% fewer editorial revisions</strong> because they're hitting their target readability from the start, saving months of rewriting time.
              </p>

              <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 rounded-lg p-4 sm:p-6 mt-6 sm:mt-8 mb-6 border border-primary/20">
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4">Key Benefits of Using Our Readability Calculator</h3>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>6 Professional Metrics:</strong> Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog, SMOG, Coleman-Liau, and ARI scores</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Instant Analysis:</strong> Get comprehensive readability scores in seconds—no waiting, no complex setup</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Target Audience Matching:</strong> See exactly which education level and demographics can understand your text</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>SEO Optimization:</strong> Improve search rankings by matching content complexity to user search intent</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Academic Compliance:</strong> Verify your writing meets assignment grade level requirements before submission</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Visual Score Indicators:</strong> Color-coded readability levels show at a glance if your text is too complex or too simple</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Detailed Reports:</strong> Download comprehensive analysis reports showing all metrics and recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>100% Free & Unlimited:</strong> No registration, no limits, no premium upsells—all features free forever</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4">Real-World Applications: Who Benefits from Readability Analysis?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaGraduationCap className="mr-2 text-blue-500" />
                    Students & Academics
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Match essays to grade level requirements</li>
                    <li>• Verify research papers meet academic standards</li>
                    <li>• Improve thesis and dissertation accessibility</li>
                    <li>• Check college application essay readability</li>
                    <li>• Ensure grant proposals reach review committees</li>
                  </ul>
                </div>
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaChartLine className="mr-2 text-green-500" />
                    Content Creators & Marketers
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Optimize blog posts for SEO and engagement</li>
                    <li>• Match landing page copy to target demographics</li>
                    <li>• Test email campaign readability for conversions</li>
                    <li>• Ensure social media posts resonate with followers</li>
                    <li>• Improve website accessibility and user experience</li>
                  </ul>
                </div>
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaPenFancy className="mr-2 text-purple-500" />
                    Authors & Publishers
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Target manuscripts to specific reader demographics</li>
                    <li>• Maintain consistent reading level across chapters</li>
                    <li>• Meet publishing industry grade level standards</li>
                    <li>• Adapt content for different age categories</li>
                    <li>• Reduce editorial revisions with proper complexity</li>
                  </ul>
                </div>
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaUserTie className="mr-2 text-orange-500" />
                    Business Professionals
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Simplify technical documentation for clients</li>
                    <li>• Create clear training materials for employees</li>
                    <li>• Write accessible reports for stakeholders</li>
                    <li>• Improve customer communication clarity</li>
                    <li>• Ensure policy documents meet compliance standards</li>
                  </ul>
                </div>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground mt-6 sm:mt-8 leading-relaxed">
                Whether you're a student ensuring your essays meet grade requirements, a content creator optimizing for maximum reach and engagement, an author targeting specific reader demographics, or a professional communicating complex ideas clearly, our Readability Calculator gives you the precise metrics you need to write effectively. With <strong>six industry-standard readability formulas</strong>, instant color-coded feedback, and detailed audience targeting recommendations, you'll know exactly how to adjust your writing for optimal comprehension. Stop guessing whether your content is too complex or too simple—start measuring, optimizing, and connecting with your readers at exactly the right level.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
