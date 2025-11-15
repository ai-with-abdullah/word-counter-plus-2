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
  FaParagraph,
  FaCheckCircle,
  FaInfoCircle,
  FaUpload
} from 'react-icons/fa';
import useFileUpload from '@/hooks/useFileUpload';
import RelatedToolsSidebar from '@/components/common/RelatedToolsSidebar';
import { UploadButton } from '@/components/ui/upload-button';
import { prepareDownload } from '@/lib/downloadHelper';

export default function ParagraphCounter() {
  const [text, setText] = useState('');
  const { toast } = useToast();

  const { isLoading: isUploading, triggerFileUpload, FileInput } = useFileUpload({
    onSuccess: (content) => setText(content),
    maxSizeInMB: 10
  });

  const paragraphCounterSchema = {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "SoftwareApplication"],
    "name": "Paragraph Counter - Count Paragraphs & Analyze Structure",
    "url": "https://wordcounterplusapp.com/paragraph-counter",
    "description": "Free paragraph counter tool to count paragraphs, analyze paragraph length, word count per paragraph. Perfect for writers, students, and content creators.",
    "applicationCategory": ["Productivity", "Text Analysis", "Writing"],
    "operatingSystem": "Web Browser",
    "isAccessibleForFree": true,
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  useSEO({
    title: 'Free Paragraph Counter 2025 - Count Paragraphs & Analyze Text Structure',
    description: 'Professional paragraph counter free tool to count paragraphs, analyze paragraph length, words per paragraph. Track paragraph structure and distribution. Used by writers, students worldwide.',
    keywords: 'paragraph counter, count paragraphs, paragraph count tool, paragraph length analyzer, words per paragraph, paragraph structure checker, writing analysis tool',
    canonical: 'https://wordcounterplusapp.com/paragraph-counter',
    structuredData: paragraphCounterSchema,
    breadcrumbs: [
      { name: 'Home', url: 'https://wordcounterplusapp.com/' },
      { name: 'Tools', url: 'https://wordcounterplusapp.com/tools' },
      { name: 'Paragraph Counter', url: 'https://wordcounterplusapp.com/paragraph-counter' }
    ]
  });

  useEffect(() => {
    const saved = localStorage.getItem('paragraphCounterText');
    if (saved) setText(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('paragraphCounterText', text);
  }, [text]);

  const stats = useMemo(() => {
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim().length > 0) : [];
    const totalWords = text.trim() ? text.split(/\s+/).filter(w => w.length > 0).length : 0;
    const totalSentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0;
    
    const paragraphStats = paragraphs.map(p => {
      const words = p.trim().split(/\s+/).filter(w => w.length > 0);
      const sentences = p.split(/[.!?]+/).filter(s => s.trim().length > 0);
      return {
        text: p.trim(),
        wordCount: words.length,
        sentenceCount: sentences.length,
        charCount: p.trim().length
      };
    });
    
    const wordCounts = paragraphStats.map(p => p.wordCount);
    const avgWords = wordCounts.length > 0 
      ? (wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length).toFixed(1)
      : 0;
    
    const shortest = wordCounts.length > 0 ? Math.min(...wordCounts) : 0;
    const longest = wordCounts.length > 0 ? Math.max(...wordCounts) : 0;
    
    const shortParagraphs = paragraphStats.filter(p => p.wordCount <= 50).length;
    const mediumParagraphs = paragraphStats.filter(p => p.wordCount > 50 && p.wordCount <= 100).length;
    const longParagraphs = paragraphStats.filter(p => p.wordCount > 100).length;

    return {
      totalParagraphs: paragraphs.length,
      totalWords,
      totalSentences,
      avgWords,
      shortestWords: shortest,
      longestWords: longest,
      shortParagraphs,
      mediumParagraphs,
      longParagraphs,
      paragraphList: paragraphStats
    };
  }, [text]);

  const handleExport = () => {
    const data = `
================================================================================
PARAGRAPH COUNTER ANALYSIS REPORT
================================================================================

STATISTICS:
-----------
Total Paragraphs: ${stats.totalParagraphs}
Total Words: ${stats.totalWords}
Total Sentences: ${stats.totalSentences}
Average Words per Paragraph: ${stats.avgWords}
Shortest Paragraph: ${stats.shortestWords} words
Longest Paragraph: ${stats.longestWords} words

READING METRICS:
---------------
Short Paragraphs (≤50 words): ${stats.shortParagraphs}
Medium Paragraphs (51-100 words): ${stats.mediumParagraphs}
Long Paragraphs (>100 words): ${stats.longParagraphs}

================================================================================
ORIGINAL TEXT:
================================================================================

${text}

================================================================================
PARAGRAPH BREAKDOWN:
================================================================================

${stats.paragraphList.map((p, i) => `
Paragraph ${i + 1}:
Words: ${p.wordCount} | Sentences: ${p.sentenceCount} | Characters: ${p.charCount}
${p.text}
`).join('\n---\n')}

================================================================================
Generated by Word Counter Plus
${new Date().toLocaleString()}
================================================================================
`;
    
    prepareDownload({
      content: data,
      filename: 'paragraph-analysis.txt',
      fileType: 'txt',
      mimeType: 'text/plain',
      sourceToolId: 'paragraph-counter'
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          <div className="text-center mb-4 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
              Paragraph Counter
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Count paragraphs and analyze structure and length in real-time
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
                    data-testid="input-paragraph-counter"
                    placeholder="Type or paste your text here to count paragraphs... (Separate paragraphs with blank lines)"
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
                    <div className="text-3xl font-bold text-primary" data-testid="text-total-paragraphs">{stats.totalParagraphs}</div>
                    <div className="text-sm text-muted-foreground mt-1">Total Paragraphs</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary" data-testid="text-avg-words">{stats.avgWords}</div>
                    <div className="text-sm text-muted-foreground mt-1">Avg Words/Paragraph</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary" data-testid="text-shortest">{stats.shortestWords}</div>
                    <div className="text-sm text-muted-foreground mt-1">Shortest Paragraph</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary" data-testid="text-longest">{stats.longestWords}</div>
                    <div className="text-sm text-muted-foreground mt-1">Longest Paragraph</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Paragraph Length Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-col gap-2 p-3 bg-muted rounded-lg">
                  <span className="text-sm font-medium text-muted-foreground">Short (≤50 words)</span>
                  <div className="text-2xl font-bold text-primary">{stats.shortParagraphs}</div>
                </div>
                <div className="flex flex-col gap-2 p-3 bg-muted rounded-lg">
                  <span className="text-sm font-medium text-muted-foreground">Medium (51-100 words)</span>
                  <div className="text-2xl font-bold text-primary">{stats.mediumParagraphs}</div>
                </div>
                <div className="flex flex-col gap-2 p-3 bg-muted rounded-lg">
                  <span className="text-sm font-medium text-muted-foreground">Long (&gt;100 words)</span>
                  <div className="text-2xl font-bold text-primary">{stats.longParagraphs}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>All Paragraphs ({stats.totalParagraphs})</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.paragraphList.length > 0 ? (
                  <div className="max-h-96 overflow-y-auto">
                    <div className="space-y-4">
                      {stats.paragraphList.map((para, i) => (
                        <div key={i} className="p-4 bg-muted rounded-lg">
                          <div className="flex items-center justify-between mb-2 gap-2">
                            <span className="font-semibold text-primary whitespace-nowrap">Paragraph {i + 1}</span>
                            <div className="flex gap-2 flex-shrink-0">
                              <Badge variant="outline">{para.wordCount} words</Badge>
                              <Badge variant="outline">{para.sentenceCount} sentences</Badge>
                            </div>
                          </div>
                          <div className="overflow-x-auto">
                            <p className="text-sm text-muted-foreground whitespace-nowrap">{para.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Alert>
                    <FaInfoCircle className="h-4 w-4" />
                    <AlertDescription>Enter text to see paragraph breakdown</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>

          <RelatedToolsSidebar currentTool="paragraph-counter" />
        </div>
      </div>
    </div>

      <section className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-card rounded-lg p-4 sm:p-6 md:p-8 shadow-sm border border-border">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 sm:mb-6">How Can Paragraph Counter Transform Your Writing from Good to Exceptional?</h2>
            
            <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                Have you ever read an article online where every paragraph felt like a never-ending wall of text, making you want to close the tab immediately? Or received feedback that your writing lacks structure and flow? Paragraph length and organization aren't just formatting details—they're fundamental to reader engagement and comprehension. Whether you're a blogger optimizing for online readers, a student perfecting academic essays, or a professional writer ensuring content quality, mastering paragraph structure can be the difference between content that captivates and content that overwhelms.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaParagraph className="mr-2 sm:mr-3 text-blue-500 flex-shrink-0" />
                Why Is Paragraph Length Critical for Online Readers and SEO?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Online readers scan content rather than reading word-for-word, and paragraph length dramatically affects scannability. Research shows that online paragraphs should contain 40-70 words (roughly 2-4 sentences) for optimal engagement. Paragraphs longer than 100 words cause readers to skip content, while too-short paragraphs (under 30 words) make writing seem choppy and underdeveloped. Our Paragraph Counter helps you find this sweet spot instantly.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                For SEO professionals, paragraph structure directly impacts search rankings. Google's algorithms favor content with well-distributed paragraphs because they indicate better readability and user experience. The <strong>paragraph length distribution</strong> feature shows you how many short, medium, and long paragraphs you have, letting you balance variety for better engagement. Sites that optimize paragraph structure see average time-on-page increases of 40-50%, which signals content quality to search engines.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaCheckCircle className="mr-2 sm:mr-3 text-green-500 flex-shrink-0" />
                How Do Academic Writers Use Paragraph Analysis to Improve Essay Quality?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                In academic writing, paragraph structure follows stricter conventions. College-level essays typically require paragraphs of 100-200 words (5-7 sentences), each focused on a single main idea with supporting evidence. Professors often penalize essays with paragraphs that are too short (suggesting underdeveloped arguments) or too long (indicating poor organization and lack of focus).
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                The <strong>words per paragraph</strong> metric helps students ensure each paragraph meets academic standards. Analyzing your <strong>average sentence count</strong> per paragraph reveals whether you're providing enough supporting details (typically 3-5 sentences after the topic sentence) or rambling without clear structure. Students who track these metrics report improved grades and feedback praising their organizational skills.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaInfoCircle className="mr-2 sm:mr-3 text-purple-500 flex-shrink-0" />
                How Can Professional Writers Optimize Content Flow and Pacing?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Professional writers and editors use paragraph variety to control content pacing and maintain reader interest. A well-crafted article intersperses short paragraphs (for emphasis and transitions) with medium paragraphs (for main content) and occasional longer paragraphs (for detailed explanations). This rhythm keeps readers engaged and prevents monotony.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Our tool's <strong>paragraph-by-paragraph breakdown</strong> lets you visualize your content structure at a glance. You can quickly identify where you have three long paragraphs in a row (potential reader fatigue point) or too many short paragraphs (suggesting lack of depth). Professional publications like The New York Times and Medium optimize for this balance, and tracking your paragraph distribution helps you match these industry standards.
              </p>

              <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 rounded-lg p-4 sm:p-6 mt-6 sm:mt-8 mb-6 border border-primary/20">
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4">Key Benefits of Using Paragraph Counter</h3>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>SEO Optimization:</strong> Maintain 40-70 word paragraphs for better search rankings and user engagement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Academic Standards:</strong> Ensure paragraphs meet 100-200 word requirements for college essays</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Content Pacing:</strong> Balance short, medium, and long paragraphs for optimal reader flow</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Real-Time Feedback:</strong> Instantly see paragraph statistics as you write or edit</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Structural Analysis:</strong> Identify content sections that need better organization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Export Reports:</strong> Download detailed paragraph analysis for editing and review</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4">Who Needs Paragraph Counter?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaParagraph className="mr-2 text-blue-500" />
                    Bloggers & Content Creators
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Optimize paragraph length for online scanning (40-70 words)</li>
                    <li>• Improve content readability and user engagement</li>
                    <li>• Balance paragraph variety for better pacing</li>
                    <li>• Increase time-on-page metrics for better SEO</li>
                    <li>• Match publication standards for Medium, Substack, etc.</li>
                  </ul>
                </div>
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaCheckCircle className="mr-2 text-green-500" />
                    Students & Academics
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Meet 100-200 word paragraph requirements for essays</li>
                    <li>• Ensure each paragraph develops one main idea</li>
                    <li>• Track sentences per paragraph for proper support</li>
                    <li>• Improve essay structure and organization scores</li>
                    <li>• Follow APA, MLA, or Chicago style guidelines</li>
                  </ul>
                </div>
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaInfoCircle className="mr-2 text-purple-500" />
                    Professional Writers & Editors
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Control content pacing with paragraph variety</li>
                    <li>• Identify sections needing restructuring</li>
                    <li>• Ensure consistent paragraph quality across drafts</li>
                    <li>• Meet client word-per-paragraph specifications</li>
                    <li>• Improve manuscript readability for publishers</li>
                  </ul>
                </div>
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaParagraph className="mr-2 text-yellow-500" />
                    Marketing Professionals
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Create scannable marketing copy that converts</li>
                    <li>• Optimize email newsletters for engagement</li>
                    <li>• Write persuasive landing page content</li>
                    <li>• Ensure brand voice consistency across materials</li>
                    <li>• Track paragraph metrics across campaigns</li>
                  </ul>
                </div>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground mt-6 sm:mt-8 leading-relaxed">
                Whether you're a blogger fighting for reader attention online, a student perfecting academic essays, or a professional writer crafting compelling narratives, Paragraph Counter gives you the data-driven insights you need to structure your content perfectly. It's not just about counting paragraphs—it's about understanding how paragraph structure shapes reader experience and using that knowledge to write better, more engaging content every time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
