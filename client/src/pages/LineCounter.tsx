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
  FaAlignLeft,
  FaCheckCircle,
  FaInfoCircle,
  FaUpload
} from 'react-icons/fa';
import useFileUpload from '@/hooks/useFileUpload';
import RelatedToolsSidebar from '@/components/common/RelatedToolsSidebar';
import { UploadButton } from '@/components/ui/upload-button';
import { prepareDownload } from '@/lib/downloadHelper';

export default function LineCounter() {
  const [text, setText] = useState('');
  const { toast } = useToast();

  const { isLoading: isUploading, triggerFileUpload, FileInput } = useFileUpload({
    onSuccess: (content) => setText(content),
    maxSizeInMB: 10
  });

  const lineCounterSchema = {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "SoftwareApplication"],
    "name": "Line Counter - Count Lines & Analyze Text",
    "url": "https://wordcounterplusapp.com/line-counter",
    "description": "Free line counter tool to count total lines, non-empty lines, empty lines, and analyze line length. Perfect for developers, writers, and content creators.",
    "applicationCategory": ["Productivity", "Text Analysis", "Development"],
    "operatingSystem": "Web Browser",
    "isAccessibleForFree": true,
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  useSEO({
    title: 'Free Line Counter 2025 - Count Lines, Empty Lines & Line Length | Code & Text',
    description: 'Professional line counter free tool to count total lines, non-empty lines, blank lines, average line length. Perfect for developers, writers, editors. Analyze code and text structure.',
    keywords: 'line counter, count lines, line count tool, empty line counter, code line counter, text line analyzer, line length calculator, blank line counter',
    canonical: 'https://wordcounterplusapp.com/line-counter',
    structuredData: lineCounterSchema,
    breadcrumbs: [
      { name: 'Home', url: 'https://wordcounterplusapp.com/' },
      { name: 'Tools', url: 'https://wordcounterplusapp.com/tools' },
      { name: 'Line Counter', url: 'https://wordcounterplusapp.com/line-counter' }
    ]
  });

  useEffect(() => {
    const saved = localStorage.getItem('lineCounterText');
    if (saved) setText(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('lineCounterText', text);
  }, [text]);

  const stats = useMemo(() => {
    const lines = text.split('\n');
    const nonEmptyLines = lines.filter(line => line.trim().length > 0);
    const emptyLines = lines.filter(line => line.trim().length === 0);
    
    const lineLengths = nonEmptyLines.map(line => line.length);
    const avgLength = lineLengths.length > 0 
      ? (lineLengths.reduce((a, b) => a + b, 0) / lineLengths.length).toFixed(1)
      : 0;
    
    const shortest = lineLengths.length > 0 ? Math.min(...lineLengths) : 0;
    const longest = lineLengths.length > 0 ? Math.max(...lineLengths) : 0;
    
    const totalWords = text.trim() ? text.split(/\s+/).filter(w => w.length > 0).length : 0;
    const totalChars = text.length;
    const totalCharsNoSpaces = text.replace(/\s/g, '').length;

    return {
      totalLines: lines.length,
      nonEmptyLines: nonEmptyLines.length,
      emptyLines: emptyLines.length,
      avgLength,
      shortestLength: shortest,
      longestLength: longest,
      totalWords,
      totalChars,
      totalCharsNoSpaces,
      lineList: lines.map((line, i) => ({
        number: i + 1,
        text: line,
        length: line.length,
        wordCount: line.trim() ? line.trim().split(/\s+/).filter(w => w.length > 0).length : 0,
        isEmpty: line.trim().length === 0
      }))
    };
  }, [text]);

  const handleExport = () => {
    const data = `
================================================================================
LINE COUNTER ANALYSIS REPORT
================================================================================

STATISTICS:
-----------
Total Lines: ${stats.totalLines}
Non-Empty Lines: ${stats.nonEmptyLines}
Empty Lines: ${stats.emptyLines}
Average Line Length: ${stats.avgLength} characters
Shortest Line: ${stats.shortestLength} characters
Longest Line: ${stats.longestLength} characters

READING METRICS:
---------------
Total Words: ${stats.totalWords}
Total Characters: ${stats.totalChars}
Characters (no spaces): ${stats.totalCharsNoSpaces}

================================================================================
ORIGINAL TEXT:
================================================================================

${text}

================================================================================
LINE BREAKDOWN:
================================================================================

${stats.lineList.map(line => `Line ${line.number}: ${line.length} chars, ${line.wordCount} words ${line.isEmpty ? '(empty)' : ''}\n${line.text}`).join('\n---\n')}

================================================================================
Generated by Word Counter Plus
${new Date().toLocaleString()}
================================================================================
`;
    
    prepareDownload({
      content: data,
      filename: 'line-analysis.txt',
      fileType: 'txt',
      mimeType: 'text/plain',
      sourceToolId: 'line-counter'
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          <div className="text-center mb-4 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
              Line Counter
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Count lines, analyze line length, and track empty lines in real-time
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
                    data-testid="input-line-counter"
                    placeholder="Type or paste your text here to count lines..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full h-48 sm:h-64 p-3 sm:p-4 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all text-sm sm:text-base font-mono"
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
                    <div className="text-3xl font-bold text-primary" data-testid="text-total-lines">{stats.totalLines}</div>
                    <div className="text-sm text-muted-foreground mt-1">Total Lines</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary" data-testid="text-non-empty">{stats.nonEmptyLines}</div>
                    <div className="text-sm text-muted-foreground mt-1">Non-Empty Lines</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary" data-testid="text-empty-lines">{stats.emptyLines}</div>
                    <div className="text-sm text-muted-foreground mt-1">Empty Lines</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary" data-testid="text-avg-length">{stats.avgLength}</div>
                    <div className="text-sm text-muted-foreground mt-1">Avg Line Length</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Line Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-2 p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium text-muted-foreground">Shortest Line</span>
                    <div className="text-2xl font-bold text-primary">{stats.shortestLength} <span className="text-sm font-normal text-muted-foreground">chars</span></div>
                  </div>
                  <div className="flex flex-col gap-2 p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium text-muted-foreground">Longest Line</span>
                    <div className="text-2xl font-bold text-primary">{stats.longestLength} <span className="text-sm font-normal text-muted-foreground">chars</span></div>
                  </div>
                  <div className="flex flex-col gap-2 p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium text-muted-foreground">Total Words</span>
                    <div className="text-2xl font-bold text-primary">{stats.totalWords}</div>
                  </div>
                  <div className="flex flex-col gap-2 p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium text-muted-foreground">Total Characters</span>
                    <div className="text-2xl font-bold text-primary">{stats.totalChars}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>All Lines ({stats.totalLines})</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.lineList.length > 0 ? (
                  <div className="max-h-96 overflow-y-auto">
                    <div className="space-y-1 font-mono text-sm">
                      {stats.lineList.map((line) => (
                        <div key={line.number} className={`p-2 rounded ${line.isEmpty ? 'bg-muted/50' : 'bg-muted'}`}>
                          <div className="flex gap-3 overflow-x-auto">
                            <span className="text-primary min-w-[40px] text-right flex-shrink-0">{line.number}</span>
                            <span className={`whitespace-nowrap ${line.isEmpty ? 'text-muted-foreground italic' : ''}`}>
                              {line.isEmpty ? '(empty line)' : line.text}
                            </span>
                            <span className="ml-auto text-muted-foreground text-xs flex-shrink-0 whitespace-nowrap">
                              {line.length}c {line.wordCount}w
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Alert>
                    <FaInfoCircle className="h-4 w-4" />
                    <AlertDescription>Enter text to see line breakdown</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>

          <RelatedToolsSidebar currentTool="line-counter" />
        </div>
      </div>
    </div>

      <section className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-card rounded-lg p-4 sm:p-6 md:p-8 shadow-sm border border-border">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 sm:mb-6">How Does Line Counter Help Developers and Writers Improve Their Code and Content Quality?</h2>
            
            <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                Have you ever opened a code file only to find it's thousands of lines long with no clear organization? Or received feedback that your writing has paragraphs that are way too long and need better structure? Line counting isn't just about numbers—it's about code quality, readability, and professional writing standards. Whether you're a developer optimizing code efficiency, a writer improving content flow, or an editor analyzing document structure, knowing exactly how many lines you're working with is essential for creating high-quality work.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaAlignLeft className="mr-2 sm:mr-3 text-blue-500 flex-shrink-0" />
                Why Do Developers Need Accurate Line Counting for Code Quality?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                In professional software development, line count directly impacts code maintainability and project management. Industry standards suggest that functions should be 20-50 lines max, classes should stay under 300 lines, and individual files shouldn't exceed 500-1000 lines. When code grows beyond these limits, it becomes harder to understand, debug, and maintain. Our Line Counter helps you track these metrics in real-time.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                The tool's <strong>empty line detection</strong> is particularly valuable for developers. Well-structured code typically has 15-20% blank lines for visual separation between logical blocks. Too few empty lines makes code cramped and hard to scan; too many suggests poor organization. By tracking your empty vs. non-empty line ratio, you can maintain professional code formatting that passes code reviews and meets team standards.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaCheckCircle className="mr-2 sm:mr-3 text-green-500 flex-shrink-0" />
                How Can Writers Use Line Counter to Improve Content Structure?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Professional writers and editors use line counting to analyze content density and pacing. A standard manuscript page contains approximately 25 lines of text. Knowing your line count helps you estimate page count for submissions, calculate reading time, and identify areas where content might be too dense or too sparse. Line length consistency also affects readability—studies show that lines between 50-75 characters (roughly 8-12 words) are easiest to read.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Our <strong>average line length calculator</strong> helps you maintain optimal readability. Short lines (under 40 characters) create choppy, disjointed text. Long lines (over 90 characters) strain the eyes and make it easy to lose your place. By monitoring your average line length, you can ensure your content delivers the best reading experience whether it's on screen or in print.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaInfoCircle className="mr-2 sm:mr-3 text-purple-500 flex-shrink-0" />
                How Does Line Analysis Help with Code Reviews and Documentation?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                During code reviews, line count metrics provide objective data about code complexity. Files with 500+ lines often indicate that the code needs refactoring into smaller, more focused modules. The <strong>line-by-line breakdown</strong> feature lets reviewers quickly identify unusually long lines that might need to be split for better readability—most coding standards recommend a maximum line length of 80-120 characters.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                For technical writers creating documentation, line counts help estimate documentation effort. Writing comprehensive technical documentation typically requires 2-5 lines of documentation for every 1 line of code. Project managers use these ratios to plan documentation sprints and allocate resources effectively, ensuring documentation stays synchronized with code development.
              </p>

              <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 dark:from-primary/20 dark:to-blue-500/20 rounded-lg p-4 sm:p-6 mt-6 sm:mt-8 mb-6 border border-primary/20">
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4">Key Benefits of Using Line Counter</h3>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Code Quality Metrics:</strong> Track line counts to maintain industry-standard code file sizes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Empty Line Analysis:</strong> Ensure proper code spacing and visual organization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Line Length Tracking:</strong> Identify lines that exceed recommended character limits</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Writing Structure:</strong> Analyze content density and pacing for better readability</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Real-Time Analysis:</strong> See statistics update instantly as you type or paste text</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Export Reports:</strong> Download detailed line-by-line analysis for documentation</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4">Who Benefits from Line Counter?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaAlignLeft className="mr-2 text-blue-500" />
                    Software Developers
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Ensure functions stay under 50-line recommended limit</li>
                    <li>• Track code file sizes for maintainability</li>
                    <li>• Analyze blank line spacing for readability</li>
                    <li>• Prepare code metrics for reviews and documentation</li>
                    <li>• Identify overly complex files needing refactoring</li>
                  </ul>
                </div>
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaCheckCircle className="mr-2 text-green-500" />
                    Writers & Editors
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Estimate manuscript page counts (25 lines per page)</li>
                    <li>• Analyze content density and paragraph structure</li>
                    <li>• Ensure consistent line length for readability</li>
                    <li>• Track document formatting standards</li>
                    <li>• Optimize content flow and pacing</li>
                  </ul>
                </div>
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaInfoCircle className="mr-2 text-purple-500" />
                    Technical Writers
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Estimate documentation effort and timeline</li>
                    <li>• Maintain 2-5 documentation lines per code line</li>
                    <li>• Track changelog and release note lengths</li>
                    <li>• Ensure consistent formatting across docs</li>
                    <li>• Measure API documentation completeness</li>
                  </ul>
                </div>
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaAlignLeft className="mr-2 text-yellow-500" />
                    Students & Educators
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Analyze poetry and verse structure</li>
                    <li>• Study line length in literary works</li>
                    <li>• Compare different writing styles</li>
                    <li>• Track assignment formatting requirements</li>
                    <li>• Teach coding best practices with metrics</li>
                  </ul>
                </div>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground mt-6 sm:mt-8 leading-relaxed">
                Whether you're a developer maintaining clean, professional code, a writer optimizing content readability, or a technical writer managing documentation quality, Line Counter gives you the precise metrics you need to improve your work. It's not just about counting lines—it's about using those numbers to create better, more maintainable, and more professional content and code.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
