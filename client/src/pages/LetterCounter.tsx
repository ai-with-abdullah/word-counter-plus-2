import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import useSEO from '@/hooks/useSEO';
import { 
  FaCopy, 
  FaEraser, 
  FaDownload,
  FaFont,
  FaCheckCircle,
  FaInfoCircle,
  FaUpload
} from 'react-icons/fa';
import useFileUpload from '@/hooks/useFileUpload';
import RelatedToolsSidebar from '@/components/common/RelatedToolsSidebar';
import { UploadButton } from '@/components/ui/upload-button';
import { prepareDownload } from '@/lib/downloadHelper';

export default function LetterCounter() {
  const [text, setText] = useState('');
  const { toast } = useToast();

  // File upload functionality
  const { isLoading: isUploading, triggerFileUpload, FileInput } = useFileUpload({
    onSuccess: (content, filename) => {
      setText(content);
    },
    maxSizeInMB: 10
  });

  // SEO Configuration
  const letterCounterSchema = {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "SoftwareApplication"],
    "name": "Letter Counter - Count Letters, Vowels & Consonants",
    "alternateName": ["Letter Counter", "Alphabet Counter", "Letter Analysis Tool"],
    "url": "https://wordcounterplusapp.com/letter-counter",
    "description": "Free letter counter tool to count total letters, uppercase, lowercase, vowels, consonants, and alphabetic characters. Analyze letter frequency and distribution in your text.",
    "applicationCategory": ["Productivity", "Text Analysis", "Writing"],
    "operatingSystem": "Web Browser",
    "isAccessibleForFree": true,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  useSEO({
    title: 'Free Letter Counter 2025 - Count Letters, Vowels & Consonants | Alphabet Counter',
    description: 'Professional letter counter free tool to count total letters, uppercase, lowercase, vowels, consonants. Analyze alphabetic characters, letter frequency distribution. Used by students, writers, teachers worldwide.',
    keywords: 'letter counter, alphabet counter, vowel counter, consonant counter, letter count tool, count letters online, uppercase lowercase counter, alphabetic character counter, letter frequency analyzer',
    canonical: 'https://wordcounterplusapp.com/letter-counter',
    structuredData: letterCounterSchema,
    breadcrumbs: [
      { name: 'Home', url: 'https://wordcounterplusapp.com/' },
      { name: 'Tools', url: 'https://wordcounterplusapp.com/tools' },
      { name: 'Letter Counter', url: 'https://wordcounterplusapp.com/letter-counter' }
    ]
  });

  // Auto-save
  useEffect(() => {
    const savedText = localStorage.getItem('letterCounterText');
    if (savedText) setText(savedText);
  }, []);

  useEffect(() => {
    localStorage.setItem('letterCounterText', text);
  }, [text]);

  // Letter analysis
  const stats = useMemo(() => {
    const totalLetters = text.replace(/[^a-zA-Z]/g, '').length;
    const upperCaseLetters = text.match(/[A-Z]/g) || [];
    const lowerCaseLetters = text.match(/[a-z]/g) || [];
    const vowels = text.match(/[aeiouAEIOU]/g) || [];
    const consonants = text.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g) || [];
    const spaces = text.match(/\s/g) || [];
    const digits = text.match(/\d/g) || [];
    const specialChars = text.replace(/[a-zA-Z0-9\s]/g, '').length;
    
    // Letter frequency
    const letterFreq: { [key: string]: number } = {};
    text.toLowerCase().replace(/[^a-z]/g, '').split('').forEach(letter => {
      letterFreq[letter] = (letterFreq[letter] || 0) + 1;
    });
    
    const sortedFreq = Object.entries(letterFreq)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);

    return {
      totalLetters,
      upperCaseCount: upperCaseLetters.length,
      lowerCaseCount: lowerCaseLetters.length,
      vowelCount: vowels.length,
      consonantCount: consonants.length,
      spaceCount: spaces.length,
      digitCount: digits.length,
      specialCharCount: specialChars,
      vowelPercentage: totalLetters > 0 ? ((vowels.length / totalLetters) * 100).toFixed(1) : '0',
      consonantPercentage: totalLetters > 0 ? ((consonants.length / totalLetters) * 100).toFixed(1) : '0',
      topLetters: sortedFreq,
      uniqueLetters: Object.keys(letterFreq).length
    };
  }, [text]);

  const handleClear = () => {
    setText('');
    toast({ title: "Text cleared successfully" });
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    toast({ title: "Text copied to clipboard" });
  };

  const handleExport = () => {
    const exportData = `
================================================================================
LETTER COUNTER ANALYSIS REPORT
================================================================================

STATISTICS:
-----------
Total Letters: ${stats.totalLetters}
Uppercase Letters: ${stats.upperCaseCount}
Lowercase Letters: ${stats.lowerCaseCount}
Unique Letters: ${stats.uniqueLetters}
Spaces: ${stats.spaceCount}
Digits: ${stats.digitCount}
Special Characters: ${stats.specialCharCount}

READING METRICS:
---------------
Vowels: ${stats.vowelCount} (${stats.vowelPercentage}%)
Consonants: ${stats.consonantCount} (${stats.consonantPercentage}%)

TOP KEYWORDS:
-------------
${stats.topLetters.map(([letter, count]) => `${letter.toUpperCase()}: ${count}`).join('\n')}

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
      content: exportData,
      filename: 'letter-analysis.txt',
      fileType: 'txt',
      mimeType: 'text/plain',
      sourceToolId: 'letter-counter'
    });
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Centered Container with Max Width */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {/* Tool Header */}
          <div className="text-center mb-4 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
              Letter Counter
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Count letters, vowels, consonants and analyze letter frequency in real-time
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
                    data-testid="input-letter-counter"
                    placeholder="Type or paste your text here to analyze letters..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full h-48 sm:h-64 p-3 sm:p-4 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all text-sm sm:text-base"
                  />

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <button 
                      onClick={handleCopy}
                      disabled={!text}
                      className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      data-testid="button-copy"
                    >
                      <FaCopy className="inline mr-1" aria-hidden="true" />
                      Copy
                    </button>
                    <button 
                      onClick={handleClear}
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

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary" data-testid="text-total-letters">
                      {stats.totalLetters}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">Total Letters</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary" data-testid="text-vowels">
                      {stats.vowelCount}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">Vowels ({stats.vowelPercentage}%)</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary" data-testid="text-consonants">
                      {stats.consonantCount}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">Consonants ({stats.consonantPercentage}%)</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary" data-testid="text-unique-letters">
                      {stats.uniqueLetters}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">Unique Letters</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Analysis */}
            <Tabs defaultValue="breakdown" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="breakdown">Letter Breakdown</TabsTrigger>
                <TabsTrigger value="frequency">Letter Frequency</TabsTrigger>
              </TabsList>

              <TabsContent value="breakdown" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Letter Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2 p-3 bg-muted rounded-lg">
                          <span className="text-sm font-medium text-muted-foreground">Uppercase Letters</span>
                          <div className="text-2xl font-bold text-primary">{stats.upperCaseCount}</div>
                        </div>
                        <div className="flex flex-col gap-2 p-3 bg-muted rounded-lg">
                          <span className="text-sm font-medium text-muted-foreground">Lowercase Letters</span>
                          <div className="text-2xl font-bold text-primary">{stats.lowerCaseCount}</div>
                        </div>
                        <div className="flex flex-col gap-2 p-3 bg-muted rounded-lg">
                          <span className="text-sm font-medium text-muted-foreground">Spaces</span>
                          <div className="text-2xl font-bold text-primary">{stats.spaceCount}</div>
                        </div>
                        <div className="flex flex-col gap-2 p-3 bg-muted rounded-lg">
                          <span className="text-sm font-medium text-muted-foreground">Digits</span>
                          <div className="text-2xl font-bold text-primary">{stats.digitCount}</div>
                        </div>
                        <div className="flex flex-col gap-2 p-3 bg-muted rounded-lg">
                          <span className="text-sm font-medium text-muted-foreground">Special Characters</span>
                          <div className="text-2xl font-bold text-primary">{stats.specialCharCount}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="frequency" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Top 10 Most Frequent Letters</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {stats.topLetters.length > 0 ? (
                      <div className="max-h-96 overflow-y-auto">
                        <div className="space-y-3">
                          {stats.topLetters.map(([letter, count], index) => (
                            <div key={letter} className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                                {letter.toUpperCase()}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1 gap-2">
                                  <span className="text-sm font-medium whitespace-nowrap">Letter {letter.toUpperCase()}</span>
                                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                                    {count} times ({((count / stats.totalLetters) * 100).toFixed(1)}%)
                                  </span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-primary"
                                    style={{ width: `${(count / stats.totalLetters) * 100}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Alert>
                        <FaInfoCircle className="h-4 w-4" />
                        <AlertDescription>
                          Enter text to see letter frequency analysis
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <RelatedToolsSidebar currentTool="letter-counter" />
        </div>
      </div>
    </div>

      {/* SEO Content Section */}
      <section className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-card rounded-lg p-4 sm:p-6 md:p-8 shadow-sm border border-border">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 sm:mb-6">Why Letter Counter Matters for Students, Writers, and Language Enthusiasts</h2>
            
            <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                Have you ever wondered why some words are easier to pronounce than others, or why certain passwords are stronger? The answer lies in letter composition—the balance between vowels and consonants, uppercase and lowercase, and overall letter frequency. Whether you're a student analyzing linguistic patterns, a writer perfecting your prose rhythm, or someone creating secure passwords, understanding letter distribution in your text provides valuable insights that go far beyond simple counting.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaFont className="mr-2 sm:mr-3 text-blue-500 flex-shrink-0" />
                How Does Letter Analysis Help Students Excel in Language Studies?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                In linguistic studies and language learning, letter frequency analysis is fundamental. English text typically contains 40% vowels and 60% consonants—deviations from this pattern often indicate borrowed words, technical jargon, or unusual writing styles. Students studying phonetics, linguistics, or creative writing use our Letter Counter to analyze texts and understand these patterns.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                The <strong>vowel-to-consonant ratio</strong> affects readability and pronunciation difficulty. Words with too many consonants (like "strengths") are harder to pronounce, while vowel-heavy words flow more smoothly. By tracking these percentages, language learners can identify pronunciation challenges and writers can ensure their prose has natural rhythm and flow that's pleasant to read aloud.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaCheckCircle className="mr-2 sm:mr-3 text-green-500 flex-shrink-0" />
                Why Is Letter Frequency Important for Writers and Content Creators?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Professional writers use letter frequency analysis to create balanced, engaging prose. In English, the most common letters are E, T, A, O, I, N, and S—these account for about 70% of all letters in typical text. If your writing significantly deviates from this pattern, it might sound unnatural or overly technical. Our <strong>letter frequency analyzer</strong> shows your top 10 most-used letters, helping you identify unusual patterns.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Case analysis matters too. Professional writing typically uses 5-10% uppercase letters (for sentence starts, proper nouns, and acronyms). Excessive capitals make text seem shouty and unprofessional—a common mistake in marketing copy and social media posts. By tracking your uppercase-to-lowercase ratio, you ensure your writing maintains appropriate professionalism and readability.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaInfoCircle className="mr-2 sm:mr-3 text-purple-500 flex-shrink-0" />
                How Can Letter Counter Improve Password Security and Typography?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Security experts recommend passwords with balanced letter types—mixing uppercase, lowercase, numbers, and special characters. Our tool's <strong>character breakdown</strong> shows exactly how many of each type you have, helping you create strong, secure passwords. A good password typically includes at least 2-3 uppercase letters, 5-6 lowercase letters, 2-3 numbers, and 1-2 special characters across 12+ total characters.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Typography designers and font creators use letter frequency data to optimize character sets. The most common letters (E, T, A, O) need the most design attention since users see them constantly. The <strong>unique letter count</strong> feature shows which letters you're actually using, helping designers prioritize their work and writers identify if they're overusing or underusing certain letters in creative ways.
              </p>

              <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 dark:from-primary/20 dark:to-blue-500/20 rounded-lg p-4 sm:p-6 mt-6 sm:mt-8 mb-6 border border-primary/20">
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4">Key Benefits of Using Letter Counter</h3>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Linguistic Analysis:</strong> Track vowel-to-consonant ratio for language studies (ideal: 40% vowels, 60% consonants)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Letter Frequency:</strong> Identify most common letters to match natural English patterns</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Case Balance:</strong> Maintain 5-10% uppercase for professional writing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Password Strength:</strong> Verify balanced character types for secure passwords</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Writing Rhythm:</strong> Analyze letter patterns for better prose flow and readability</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Real-Time Feedback:</strong> See comprehensive letter statistics instantly as you type</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4">Who Benefits from Letter Counter?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaFont className="mr-2 text-blue-500" />
                    Students & Language Learners
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Analyze linguistic patterns in English and foreign languages</li>
                    <li>• Study vowel-consonant balance for pronunciation practice</li>
                    <li>• Compare letter frequencies across different text types</li>
                    <li>• Complete phonetics and linguistics assignments</li>
                    <li>• Identify patterns in poetry and literature</li>
                  </ul>
                </div>
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaCheckCircle className="mr-2 text-green-500" />
                    Writers & Authors
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Ensure natural letter frequency for readable prose</li>
                    <li>• Balance uppercase and lowercase for professionalism</li>
                    <li>• Analyze rhythm and flow through letter patterns</li>
                    <li>• Create memorable character or place names</li>
                    <li>• Optimize dialogue for natural speech patterns</li>
                  </ul>
                </div>
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaInfoCircle className="mr-2 text-purple-500" />
                    Security & IT Professionals
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Create strong passwords with balanced character types</li>
                    <li>• Analyze password complexity and strength</li>
                    <li>• Verify encryption key randomness</li>
                    <li>• Test security policies and requirements</li>
                    <li>• Generate memorable yet secure passphrases</li>
                  </ul>
                </div>
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaFont className="mr-2 text-yellow-500" />
                    Designers & Typographers
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Prioritize font design for common letters (E, T, A, O)</li>
                    <li>• Analyze text samples for character set optimization</li>
                    <li>• Test typography with realistic letter distributions</li>
                    <li>• Design logos and branding with letter balance</li>
                    <li>• Create custom fonts based on usage patterns</li>
                  </ul>
                </div>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground mt-6 sm:mt-8 leading-relaxed">
                Whether you're a student exploring linguistic patterns, a writer perfecting your prose rhythm, a security professional creating strong passwords, or a designer optimizing typography, Letter Counter gives you detailed insights into letter composition that help you work smarter and more effectively. It's not just about counting letters—it's about understanding the building blocks of language and using that knowledge to improve everything you create.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
