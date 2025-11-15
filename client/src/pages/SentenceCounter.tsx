import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import useSEO from '@/hooks/useSEO';
import { 
  FaCopy, 
  FaEraser, 
  FaDownload,
  FaListOl,
  FaCheckCircle,
  FaInfoCircle,
  FaUpload,
  FaAlignLeft
} from 'react-icons/fa';
import useFileUpload from '@/hooks/useFileUpload';
import RelatedToolsSidebar from '@/components/common/RelatedToolsSidebar';
import { UploadButton } from '@/components/ui/upload-button';
import { prepareDownload } from '@/lib/downloadHelper';

export default function SentenceCounter() {
  const [text, setText] = useState('');
  const { toast } = useToast();

  const { isLoading: isUploading, triggerFileUpload, FileInput } = useFileUpload({
    onSuccess: (content) => setText(content),
    maxSizeInMB: 10
  });

  const sentenceCounterSchema = {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "SoftwareApplication"],
    "name": "Sentence Counter - Count Sentences & Analyze Structure",
    "url": "https://wordcounterplusapp.com/sentence-counter",
    "description": "Free sentence counter tool to count total sentences, analyze sentence length, structure, and complexity. Perfect for writers, students, and editors.",
    "applicationCategory": ["Productivity", "Text Analysis", "Writing"],
    "operatingSystem": "Web Browser",
    "isAccessibleForFree": true,
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  useSEO({
    title: 'Free Sentence Counter 2025 - Count Sentences & Analyze Text Structure',
    description: 'Professional sentence counter free tool to count sentences, analyze sentence length, structure patterns. Track short, medium, long sentences. Used by writers, students, editors worldwide.',
    keywords: 'sentence counter, count sentences, sentence count tool, sentence length analyzer, sentence structure checker, average sentence length calculator, writing analysis tool',
    canonical: 'https://wordcounterplusapp.com/sentence-counter',
    structuredData: sentenceCounterSchema,
    breadcrumbs: [
      { name: 'Home', url: 'https://wordcounterplusapp.com/' },
      { name: 'Tools', url: 'https://wordcounterplusapp.com/tools' },
      { name: 'Sentence Counter', url: 'https://wordcounterplusapp.com/sentence-counter' }
    ]
  });

  useEffect(() => {
    const saved = localStorage.getItem('sentenceCounterText');
    if (saved) setText(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('sentenceCounterText', text);
  }, [text]);

  const stats = useMemo(() => {
    if (!text.trim()) {
      return {
        totalSentences: 0,
        totalWords: 0,
        avgLength: 0,
        shortestLength: 0,
        longestLength: 0,
        shortSentences: 0,
        mediumSentences: 0,
        longSentences: 0,
        sentenceList: []
      };
    }

    // Use same pattern as existing codebase for consistency
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/).filter(w => w.length > 0);
    
    const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).filter(w => w.length > 0).length);
    const avgLength = sentenceLengths.length > 0 
      ? (sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length).toFixed(1)
      : 0;
    
    const shortest = sentenceLengths.length > 0 ? Math.min(...sentenceLengths) : 0;
    const longest = sentenceLengths.length > 0 ? Math.max(...sentenceLengths) : 0;
    
    const shortSentences = sentenceLengths.filter(len => len <= 10).length;
    const mediumSentences = sentenceLengths.filter(len => len > 10 && len <= 20).length;
    const longSentences = sentenceLengths.filter(len => len > 20).length;

    return {
      totalSentences: sentences.length,
      totalWords: words.length,
      avgLength,
      shortestLength: shortest,
      longestLength: longest,
      shortSentences,
      mediumSentences,
      longSentences,
      sentenceList: sentences
    };
  }, [text]);

  const handleExport = () => {
    const data = `
================================================================================
SENTENCE COUNTER ANALYSIS REPORT
================================================================================

STATISTICS:
-----------
Total Sentences: ${stats.totalSentences}
Total Words: ${stats.totalWords}
Average Sentence Length: ${stats.avgLength} words
Shortest Sentence: ${stats.shortestLength} words
Longest Sentence: ${stats.longestLength} words

READING METRICS:
---------------
Short Sentences (≤10 words): ${stats.shortSentences}
Medium Sentences (11-20 words): ${stats.mediumSentences}
Long Sentences (>20 words): ${stats.longSentences}

================================================================================
ORIGINAL TEXT:
================================================================================

${text}

================================================================================
SENTENCE BREAKDOWN:
================================================================================

${stats.sentenceList.map((s, i) => `${i + 1}. ${s.trim()}`).join('\n\n')}

================================================================================
Generated by Word Counter Plus
${new Date().toLocaleString()}
================================================================================
`;
    
    prepareDownload({
      content: data,
      filename: 'sentence-analysis.txt',
      fileType: 'txt',
      mimeType: 'text/plain',
      sourceToolId: 'sentence-counter'
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          <div className="text-center mb-4 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
              Sentence Counter
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Count sentences and analyze structure and length in real-time
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            <div className="space-y-4 sm:space-y-6 min-w-0">
              <div className="bg-card rounded-lg p-3 sm:p-6 shadow-sm border border-border">
                <div className="mb-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                    <label htmlFor="textInput" className="text-base sm:text-lg font-semibold text-foreground">Enter Your Text</label>
                    <div className="flex gap-2 w-full sm:w-auto">
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
                    data-testid="input-sentence-counter"
                    placeholder="Type or paste your text here to count sentences..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full h-48 sm:h-64 p-3 sm:p-4 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all text-sm sm:text-base"
                  />

                  <div className="flex flex-wrap gap-2 mt-4">
                    <button 
                      onClick={() => navigator.clipboard.writeText(text)}
                      disabled={!text}
                      className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      data-testid="button-copy"
                    >
                      <FaCopy className="inline mr-1" aria-hidden="true" />
                      Copy
                    </button>
                    <button 
                      onClick={() => { setText(''); toast({ title: "Text cleared" }); }}
                      disabled={!text}
                      className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      data-testid="button-clear"
                    >
                      <FaEraser className="inline mr-1" aria-hidden="true" />
                      Clear
                    </button>
                    <button 
                      onClick={handleExport}
                      disabled={!text}
                      className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      data-testid="button-export"
                    >
                      <FaDownload className="inline mr-1" aria-hidden="true" />
                      Export
                    </button>
                  </div>
                  <FileInput />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary" data-testid="text-total-sentences">{stats.totalSentences}</div>
                    <div className="text-sm text-muted-foreground mt-1">Total Sentences</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary" data-testid="text-avg-length">{stats.avgLength}</div>
                    <div className="text-sm text-muted-foreground mt-1">Avg Words/Sentence</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary" data-testid="text-shortest">{stats.shortestLength}</div>
                    <div className="text-sm text-muted-foreground mt-1">Shortest Sentence</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary" data-testid="text-longest">{stats.longestLength}</div>
                    <div className="text-sm text-muted-foreground mt-1">Longest Sentence</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Sentence Length Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-col gap-2 p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium text-muted-foreground">Short (≤10 words)</span>
                    <div className="text-2xl font-bold text-primary">{stats.shortSentences}</div>
                  </div>
                  <div className="flex flex-col gap-2 p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium text-muted-foreground">Medium (11-20 words)</span>
                    <div className="text-2xl font-bold text-primary">{stats.mediumSentences}</div>
                  </div>
                  <div className="flex flex-col gap-2 p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium text-muted-foreground">Long (&gt;20 words)</span>
                    <div className="text-2xl font-bold text-primary">{stats.longSentences}</div>
                  </div>
                </CardContent>
              </Card>

            <Card>
              <CardHeader>
                <CardTitle>All Sentences ({stats.totalSentences})</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.sentenceList.length > 0 ? (
                  <div className="max-h-96 overflow-y-auto">
                    <div className="space-y-2">
                      {stats.sentenceList.map((sentence, i) => (
                        <div key={i} className="p-3 bg-muted rounded-lg">
                          <div className="flex gap-3 overflow-x-auto">
                            <span className="font-semibold text-primary min-w-[30px] flex-shrink-0">{i + 1}.</span>
                            <span className="text-sm whitespace-nowrap">{sentence.trim()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Alert>
                    <FaInfoCircle className="h-4 w-4" />
                    <AlertDescription>Enter text to see sentence breakdown</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>

          <RelatedToolsSidebar currentTool="sentence-counter" />
        </div>
      </div>
    </div>

      <section className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-card rounded-lg p-4 sm:p-6 md:p-8 shadow-sm border border-border">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 sm:mb-6">How Can Sentence Counter Improve Your Writing Clarity and Reader Engagement?</h2>
            
            <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                Have you ever struggled to stay focused while reading an article filled with endless, run-on sentences? Or felt overwhelmed by choppy, disconnected fragments that make a text hard to follow? Sentence length and variety aren't just stylistic choices—they're fundamental to writing clarity, reader comprehension, and overall content quality. Whether you're a writer perfecting your manuscript, a student meeting academic requirements, or a content creator optimizing for readability, understanding and controlling your sentence structure can transform good writing into exceptional communication.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaAlignLeft className="mr-2 sm:mr-3 text-blue-500 flex-shrink-0" />
                Why Is Average Sentence Length Critical for Readability and Comprehension?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Research in cognitive science shows that sentence length dramatically affects comprehension. The ideal average sentence length is 15-20 words for general audiences—long enough to convey complete thoughts but short enough to maintain attention. Sentences over 25 words force readers to hold too much information in working memory, causing confusion and re-reading. Sentences under 10 words feel choppy and simplistic, suggesting underdeveloped ideas.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Our <strong>average sentence length calculator</strong> gives you instant feedback on whether your writing hits this sweet spot. Professional publications like The New York Times average 18 words per sentence, while academic journals run 20-22 words. By tracking your average, you can match industry standards and ensure your writing delivers maximum clarity with minimum cognitive load for readers.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaCheckCircle className="mr-2 sm:mr-3 text-green-500 flex-shrink-0" />
                How Does Sentence Variety Keep Readers Engaged and Prevent Monotony?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                The secret to engaging writing isn't maintaining one perfect sentence length—it's varying your sentences strategically. Good writers mix short sentences (for emphasis and impact) with medium sentences (for main ideas) and occasional long sentences (for detailed explanations). This rhythm keeps readers alert and prevents the monotonous drone that comes from repetitive sentence structure.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                The <strong>sentence length distribution</strong> feature shows how many short (under 10 words), medium (10-20 words), and long (over 20 words) sentences you have. Professional writers aim for roughly 20% short, 60% medium, and 20% long sentences. This distribution creates natural reading flow—short sentences punctuate key points, medium sentences carry main content, and long sentences provide depth when needed.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaInfoCircle className="mr-2 sm:mr-3 text-purple-500 flex-shrink-0" />
                How Can Students Use Sentence Analysis to Improve Academic Writing?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Academic writing has specific sentence requirements that vary by level and style. High school essays typically target 15-18 words per sentence, college papers aim for 18-22 words, and graduate-level writing can handle 20-25 words with more complex syntax. Professors often mark down papers with inconsistent sentence length—too many long sentences suggest poor organization, while too many short sentences indicate superficial analysis.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Our <strong>sentence-by-sentence breakdown</strong> lets students review each sentence individually, making it easy to identify problematic patterns. Three long sentences in a row? Time to add a short transition. Five short sentences without variety? Combine related ideas into compound or complex sentences. This granular analysis helps students develop the sophisticated sentence variety that earns high grades and impresses professors.
              </p>

              <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 rounded-lg p-4 sm:p-6 mt-6 sm:mt-8 mb-6 border border-primary/20">
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4">Key Benefits of Using Sentence Counter</h3>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Optimal Length:</strong> Maintain 15-20 word average for maximum readability and comprehension</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Sentence Variety:</strong> Balance short, medium, and long sentences for engaging rhythm (20/60/20 distribution)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Academic Standards:</strong> Meet college-level sentence requirements (18-22 words average)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Individual Analysis:</strong> Review each sentence separately to identify patterns and problems</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Real-Time Feedback:</strong> See sentence statistics update instantly as you write or edit</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Export Analysis:</strong> Download detailed sentence breakdown for editing and review</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4">Who Benefits from Sentence Counter?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaAlignLeft className="mr-2 text-blue-500" />
                    Writers & Authors
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Maintain 15-20 word average for professional readability</li>
                    <li>• Create sentence variety for engaging narrative flow</li>
                    <li>• Identify repetitive sentence patterns to revise</li>
                    <li>• Match sentence style to genre and audience</li>
                    <li>• Improve pacing in fiction and non-fiction writing</li>
                  </ul>
                </div>
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaCheckCircle className="mr-2 text-green-500" />
                    Students & Academics
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Meet academic sentence length requirements (18-22 words)</li>
                    <li>• Balance simple and complex sentence structures</li>
                    <li>• Avoid excessive run-on sentences in essays</li>
                    <li>• Develop sophisticated writing patterns for high grades</li>
                    <li>• Analyze sentence structure in literature studies</li>
                  </ul>
                </div>
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaInfoCircle className="mr-2 text-purple-500" />
                    Content Creators & Bloggers
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Optimize sentence length for online scanning (shorter is better)</li>
                    <li>• Improve readability scores for better SEO</li>
                    <li>• Create punchy, engaging blog content</li>
                    <li>• Match publication style guides and standards</li>
                    <li>• Track sentence metrics across multiple articles</li>
                  </ul>
                </div>
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaAlignLeft className="mr-2 text-yellow-500" />
                    Editors & Writing Coaches
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Provide objective data for sentence improvement feedback</li>
                    <li>• Identify problematic sentence patterns quickly</li>
                    <li>• Track client progress in sentence variety mastery</li>
                    <li>• Ensure consistent sentence quality across manuscripts</li>
                    <li>• Teach sentence rhythm and pacing principles</li>
                  </ul>
                </div>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground mt-6 sm:mt-8 leading-relaxed">
                Whether you're a writer crafting compelling narratives, a student perfecting academic essays, a blogger creating engaging content, or an editor providing professional feedback, Sentence Counter gives you the precise metrics you need to master sentence structure. It's not just about counting sentences—it's about understanding how sentence length and variety shape reader experience and using that knowledge to write with clarity, impact, and professional polish every single time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

