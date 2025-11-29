import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { FaEraser, FaPaste, FaDownload, FaUpload, FaCheckCircle, FaBolt, FaBook, FaPenFancy } from "@/components/common/Icons";
import useFileUpload from '@/hooks/useFileUpload';
import RelatedToolsSidebar from '@/components/common/RelatedToolsSidebar';
import { UploadButton } from '@/components/ui/upload-button';
import { prepareDownload } from '@/lib/downloadHelper';

export const textCaseConverters = {
  uppercase: (text: string) => text.toUpperCase(),
  lowercase: (text: string) => text.toLowerCase(),
  titleCase: (text: string) => 
    text.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    ),
  sentenceCase: (text: string) => 
    text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => 
      c.toUpperCase()
    ),
  camelCase: (text: string) => {
    return text
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  },
  pascalCase: (text: string) => {
    return text
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
      .replace(/\s+/g, '');
  },
  kebabCase: (text: string) => {
    return text
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  },
  snakeCase: (text: string) => {
    return text
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/[\s-]+/g, '_')
      .toLowerCase();
  },
  constantCase: (text: string) => {
    return text
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/[\s-]+/g, '_')
      .toUpperCase();
  },
  dotCase: (text: string) => {
    return text
      .replace(/([a-z])([A-Z])/g, '$1.$2')
      .replace(/[\s_-]+/g, '.')
      .toLowerCase();
  },
  alternatingCase: (text: string) => {
    return text
      .split('')
      .map((char, index) => 
        index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
      )
      .join('');
  },
  reverseCase: (text: string) => {
    return text
      .split('')
      .map(char => 
        char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
      )
      .join('');
  },
  capitalizeFirst: (text: string) => {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  },
  pathCase: (text: string) => {
    return text
      .replace(/([a-z])([A-Z])/g, '$1/$2')
      .replace(/[\s_-]+/g, '/')
      .toLowerCase();
  },
  trainCase: (text: string) => {
    return text
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('-');
  },
  toggleCase: (text: string) => {
    return text
      .split('')
      .map(char => 
        char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
      )
      .join('');
  },
  randomCase: (text: string) => {
    return text
      .split('')
      .map(char => 
        Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()
      )
      .join('');
  },
  spongebobCase: (text: string) => {
    return text
      .split('')
      .map((char, index) => 
        index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
      )
      .join('');
  },
  inverseCase: (text: string) => {
    return text
      .split('')
      .reverse()
      .join('');
  },
  wideText: (text: string) => {
    return text
      .split('')
      .join(' ');
  },
  capitalizeWords: (text: string) => {
    return text
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  },
  reverseWords: (text: string) => {
    return text
      .split(' ')
      .reverse()
      .join(' ');
  },
  doubleText: (text: string) => {
    return text
      .split('')
      .map(char => char + char)
      .join('');
  }
};

const caseOptions = [
  {
    key: 'uppercase' as keyof typeof textCaseConverters,
    name: 'UPPERCASE',
    description: 'All letters uppercase',
    category: 'basic'
  },
  {
    key: 'lowercase' as keyof typeof textCaseConverters,
    name: 'lowercase',
    description: 'All letters lowercase',
    category: 'basic'
  },
  {
    key: 'titleCase' as keyof typeof textCaseConverters,
    name: 'Title Case',
    description: 'First letter of each word capitalized',
    category: 'basic'
  },
  {
    key: 'sentenceCase' as keyof typeof textCaseConverters,
    name: 'Sentence case',
    description: 'First letter of sentences capitalized',
    category: 'basic'
  },
  {
    key: 'capitalizeFirst' as keyof typeof textCaseConverters,
    name: 'Capitalize First',
    description: 'Only first letter capitalized',
    category: 'basic'
  },
  {
    key: 'capitalizeWords' as keyof typeof textCaseConverters,
    name: 'Capitalize Words',
    description: 'First letter of each word capitalized',
    category: 'basic'
  },
  {
    key: 'camelCase' as keyof typeof textCaseConverters,
    name: 'camelCase',
    description: 'First word lowercase, others capitalized',
    category: 'programming'
  },
  {
    key: 'pascalCase' as keyof typeof textCaseConverters,
    name: 'PascalCase',
    description: 'All words capitalized, no spaces',
    category: 'programming'
  },
  {
    key: 'snakeCase' as keyof typeof textCaseConverters,
    name: 'snake_case',
    description: 'Lowercase with underscores',
    category: 'programming'
  },
  {
    key: 'kebabCase' as keyof typeof textCaseConverters,
    name: 'kebab-case',
    description: 'Lowercase with hyphens',
    category: 'programming'
  },
  {
    key: 'constantCase' as keyof typeof textCaseConverters,
    name: 'CONSTANT_CASE',
    description: 'Uppercase with underscores',
    category: 'programming'
  },
  {
    key: 'dotCase' as keyof typeof textCaseConverters,
    name: 'dot.case',
    description: 'Lowercase with dots',
    category: 'programming'
  },
  {
    key: 'pathCase' as keyof typeof textCaseConverters,
    name: 'path/case',
    description: 'Lowercase with slashes',
    category: 'programming'
  },
  {
    key: 'trainCase' as keyof typeof textCaseConverters,
    name: 'Train-Case',
    description: 'Capitalized with hyphens',
    category: 'programming'
  },
  {
    key: 'alternatingCase' as keyof typeof textCaseConverters,
    name: 'aLtErNaTiNg',
    description: 'Alternating upper and lower',
    category: 'creative'
  },
  {
    key: 'reverseCase' as keyof typeof textCaseConverters,
    name: 'rEVERSE cASE',
    description: 'Inverted case for each letter',
    category: 'creative'
  },
  {
    key: 'toggleCase' as keyof typeof textCaseConverters,
    name: 'tOGGLE cASE',
    description: 'Toggle case of all letters',
    category: 'creative'
  },
  {
    key: 'randomCase' as keyof typeof textCaseConverters,
    name: 'RaNdOm CaSe',
    description: 'Random uppercase/lowercase',
    category: 'creative'
  },
  {
    key: 'spongebobCase' as keyof typeof textCaseConverters,
    name: 'SpOnGeBoB cAsE',
    description: 'Mocking spongebob case',
    category: 'creative'
  },
  {
    key: 'inverseCase' as keyof typeof textCaseConverters,
    name: 'Inverse Text',
    description: 'Reverse text characters',
    category: 'creative'
  },
  {
    key: 'wideText' as keyof typeof textCaseConverters,
    name: 'W i d e  T e x t',
    description: 'Add spaces between characters',
    category: 'creative'
  },
  {
    key: 'reverseWords' as keyof typeof textCaseConverters,
    name: 'Reverse Words',
    description: 'Reverse word order',
    category: 'creative'
  },
  {
    key: 'doubleText' as keyof typeof textCaseConverters,
    name: 'DDoouubbllee',
    description: 'Double each character',
    category: 'creative'
  }
];

export default function TextCaseConverter() {
  const [text, setText] = useState('');
  const [originalText, setOriginalText] = useState('');
  const [activeCase, setActiveCase] = useState<string | null>(null);
  const { toast } = useToast();

  const { isLoading: isUploading, triggerFileUpload, FileInput } = useFileUpload({
    onSuccess: (content, filename) => {
      setText(content);
      setOriginalText(content);
      setActiveCase(null);
    },
    maxSizeInMB: 10
  });

  useEffect(() => {
    const savedText = localStorage.getItem('textCaseConverter_text');
    if (savedText) {
      setText(savedText);
      setOriginalText(savedText);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('textCaseConverter_text', text);
  }, [text]);

  const clearText = () => {
    setText('');
    setOriginalText('');
    setActiveCase(null);
  };

  const pasteText = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
      setOriginalText(clipboardText);
      setActiveCase(null);
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

  const convertText = (caseKey: keyof typeof textCaseConverters, caseName: string) => {
    if (!originalText.trim()) {
      toast({
        title: "No Text",
        description: "Please enter some text first.",
        variant: "destructive",
      });
      return;
    }

    const converted = textCaseConverters[caseKey](originalText);
    setText(converted);
    setActiveCase(caseKey);
    toast({
      title: "Text Converted",
      description: `Converted to ${caseName}`,
    });
  };

  const downloadText = () => {
    if (!text.trim()) {
      toast({
        title: "No Text",
        description: "Please enter some text to download.",
        variant: "destructive",
      });
      return;
    }

    const caseName = activeCase 
      ? caseOptions.find(opt => opt.key === activeCase)?.name || 'converted'
      : 'text';
    
    const charCount = text.length;
    const charCountNoSpaces = text.replace(/\s/g, '').length;
    const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    const lineCount = text.split('\n').length;
    const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

    const formattedContent = `
================================================================================
TEXT CASE CONVERTER ANALYSIS REPORT
================================================================================

STATISTICS:
-----------
Conversion Type: ${caseName}
Characters (with spaces): ${charCount}
Characters (without spaces): ${charCountNoSpaces}
Words: ${wordCount}
Sentences: ${sentenceCount}
Lines: ${lineCount}

READING METRICS:
---------------
Original Text Length: ${originalText.length} characters
Converted Text Length: ${text.length} characters
${activeCase ? `Applied Conversion: ${caseName}` : 'No conversion applied'}

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
      filename: `${caseName.toLowerCase().replace(/\s+/g, '-')}-text.txt`,
      fileType: 'txt',
      mimeType: 'text/plain',
      sourceToolId: 'text-case-converter'
    });
    
    toast({
      title: "Download Started",
      description: `Text file download started.`,
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setOriginalText(e.target.value);
    setActiveCase(null);
  };

  const getStatsText = () => {
    if (!text.trim()) return 'Enter text to see statistics';
    
    const charCount = text.length;
    const charCountNoSpaces = text.replace(/\s/g, '').length;
    const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    const lineCount = text.split('\n').length;
    const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    
    return `${charCount} characters • ${charCountNoSpaces} without spaces • ${wordCount} words • ${sentenceCount} sentences • ${lineCount} lines`;
  };

  return (
    <main className="min-h-screen bg-background">
      <FileInput />
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
          <div className="text-center mb-4 sm:mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
              Text Case Converter
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground px-2">
              Convert text between different case formats
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <div className="bg-card rounded-lg p-3 sm:p-4 md:p-6 shadow-sm border border-border">
                <div className="mb-3 sm:mb-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                    <label htmlFor="textInput" className="text-base sm:text-lg font-semibold text-foreground">
                      Enter Your Text
                    </label>
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                      <UploadButton
                        onClick={triggerFileUpload}
                        isLoading={isUploading}
                        size="sm"
                        className="flex-1 sm:flex-none"
                        data-testid="button-upload"
                      />
                    </div>
                  </div>
                  
                  <textarea
                    id="textInput"
                    className="w-full min-h-[200px] sm:min-h-[250px] md:min-h-[300px] p-3 sm:p-4 border border-border rounded-lg resize-y bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    placeholder="Enter or paste your text here... Then select a conversion option below."
                    aria-describedby="textHelp"
                    value={text}
                    onChange={handleTextChange}
                    data-testid="input-text-converter"
                  />

                  {/* Action Buttons */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button 
                      onClick={copyToClipboard}
                      disabled={!text}
                      className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      data-testid="button-copy"
                    >
                      <FaPenFancy className="inline mr-1" aria-hidden="true" />
                      Copy
                    </button>
                    <button 
                      onClick={clearText}
                      disabled={!text}
                      className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      data-testid="button-clear"
                    >
                      <FaEraser className="inline mr-1" aria-hidden="true" />
                      Clear
                    </button>
                    <button 
                      onClick={downloadText}
                      disabled={!text}
                      className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      data-testid="button-export"
                    >
                      <FaDownload className="inline mr-1" aria-hidden="true" />
                      Export
                    </button>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 gap-2">
                    <div className="text-xs sm:text-sm text-muted-foreground w-full sm:w-auto overflow-x-auto" data-testid="text-stats">
                      {getStatsText()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-3 sm:p-4 md:p-6 shadow-sm border border-border">
                <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Case Conversion Options</h2>
                
                <div className="mb-5 sm:mb-6">
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs mr-2">BASIC</span>
                    Basic Text Cases
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {caseOptions.filter(opt => opt.category === 'basic').map((option) => (
                      <button
                        key={option.key}
                        onClick={() => convertText(option.key, option.name)}
                        className={`px-2 sm:px-3 py-2 sm:py-2.5 rounded text-xs sm:text-sm font-medium transition-colors ${
                          activeCase === option.key
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        }`}
                        data-testid={`button-convert-${option.key}`}
                        title={option.description}
                      >
                        <span className="block truncate">{option.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-5 sm:mb-6">
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs mr-2">CODE</span>
                    Programming Cases
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {caseOptions.filter(opt => opt.category === 'programming').map((option) => (
                      <button
                        key={option.key}
                        onClick={() => convertText(option.key, option.name)}
                        className={`px-2 sm:px-3 py-2 sm:py-2.5 rounded text-xs sm:text-sm font-medium transition-colors ${
                          activeCase === option.key
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        }`}
                        data-testid={`button-convert-${option.key}`}
                        title={option.description}
                      >
                        <span className="block truncate">{option.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                    <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded text-xs mr-2">FUN</span>
                    Creative Cases
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {caseOptions.filter(opt => opt.category === 'creative').map((option) => (
                      <button
                        key={option.key}
                        onClick={() => convertText(option.key, option.name)}
                        className={`px-2 sm:px-3 py-2 sm:py-2.5 rounded text-xs sm:text-sm font-medium transition-colors ${
                          activeCase === option.key
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        }`}
                        data-testid={`button-convert-${option.key}`}
                        title={option.description}
                      >
                        <span className="block truncate">{option.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:hidden">
                <RelatedToolsSidebar currentTool="/text-case-convert" limit={5} />
              </div>
            </div>

            <div className="hidden lg:block">
              <RelatedToolsSidebar currentTool="/text-case-convert" />
            </div>
          </div>
        </div>
      </div>

      {/* SEO-Optimized Blog Content Section - 3500+ Words Comprehensive Guide */}
      <section className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Quick How-To Section */}
          <div className="bg-card rounded-lg p-4 sm:p-6 md:p-8 shadow-sm border border-border">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">How to Use This Free Text Case Converter Tool</h2>
            <div className="space-y-6">
              <div className="bg-muted/30 rounded-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 flex items-center">
                  <span className="bg-primary text-primary-foreground w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mr-3 text-sm flex-shrink-0">1</span>
                  Enter Your Text
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground ml-0 sm:ml-11">
                  Simply type, paste, or upload your text in the text area above. You can use the <strong>Upload</strong> button to import text files (.txt, .md, .html) or click <strong>Paste</strong> to quickly insert content from your clipboard. The tool accepts unlimited text length.
                </p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 flex items-center">
                  <span className="bg-primary text-primary-foreground w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mr-3 text-sm flex-shrink-0">2</span>
                  Select a Case Format
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground ml-0 sm:ml-11 mb-4">
                  Choose from 23 different conversion options organized in three categories: Basic (UPPERCASE, lowercase, Title Case, Sentence case), Programming (camelCase, PascalCase, snake_case, kebab-case), and Creative (aLtErNaTiNg, SpOnGeBoB, Wide Text).
                </p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 flex items-center">
                  <span className="bg-primary text-primary-foreground w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mr-3 text-sm flex-shrink-0">3</span>
                  Copy or Download Result
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground ml-0 sm:ml-11">
                  Once your text is converted, it appears in the same text area. Use the <strong>Export</strong> button to save it as a .txt file, or click <strong>Copy</strong> to paste the converted text anywhere you need it.
                </p>
              </div>
            </div>
          </div>

          {/* Main Comprehensive Blog Article */}
          <div className="bg-card rounded-lg p-4 sm:p-6 md:p-8 shadow-sm border border-border">
            <article className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 sm:mb-6">
                The Complete Guide to Text Case Conversion: Everything Writers, Developers, and Content Creators Need to Know in 2025
              </h2>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                Let's talk about something that happens to literally everyone who uses a computer. You're typing away, crafting the perfect email or blog post, and suddenly you realize your entire paragraph is in ALL CAPS because you accidentally hit the Caps Lock key. We've all been there, and honestly, it's one of those small frustrations that can eat up way more time than it should.
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                That's exactly why I built this <strong>free text case converter</strong> tool. By the way, if you've landed on this page looking for a quick fix to your text formatting problems, you're in the right place. Whether you need to convert text to uppercase, lowercase, title case, sentence case, or even programming formats like camelCase and snake_case, this tool handles it all in literally one click.
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                But here's the thing, understanding text case isn't just about fixing mistakes. It's about making your content look professional, improving your SEO rankings, writing cleaner code, and honestly, just saving yourself a ton of time. So let me walk you through everything you need to know about text case conversion, and I promise to keep it practical and actually useful.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-8 mb-4">
                What Exactly Is Text Case and Why Should You Care?
              </h3>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Text case refers to how letters are capitalized in your writing. Sounds simple enough, right? But here's where it gets interesting. The way you capitalize text sends subtle signals to your readers about formality, importance, and even emotion. Let me break down the main types of text cases you'll encounter:
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                <strong>UPPERCASE (ALL CAPS)</strong> is when every letter is capitalized. You've probably noticed that reading ALL CAPS text feels like someone is shouting at you. That's because our brains are wired to interpret uppercase as emphasis or urgency. It works great for warning labels, acronyms like NASA or FBI, and headlines that need to grab attention. But use it sparingly because too much uppercase text actually reduces readability by about 13-20%, according to various typography studies.
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                <strong>lowercase</strong> is the opposite, where every letter is small. It creates a casual, modern, approachable vibe. You'll see tech startups and creative brands using all lowercase in their branding because it feels fresh and unconventional. However, using lowercase for professional communication might make you look unprofessional, so context matters here.
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                <strong>Title Case</strong> capitalizes the first letter of most words, like "The Quick Brown Fox Jumps Over the Lazy Dog." This is the go-to format for headlines, book titles, and anything that needs to look polished and professional. I personally use title case for most of my blog post headings because it just looks cleaner and more intentional.
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                <strong>Sentence case</strong> follows normal grammatical rules, where only the first word and proper nouns are capitalized. This is how you're reading this paragraph right now. It's the most natural format for body text and is increasingly popular for headlines too because it feels more conversational and less "salesy."
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-8 mb-4">
                Programming Case Formats: A Developer's Essential Guide
              </h3>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Now, let's talk about something that developers deal with every single day. If you write code, you know that naming conventions aren't just style preferences; they're essential for maintainable, readable code. Here's a breakdown of the programming case formats our <strong>text case converter</strong> supports:
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                <strong>camelCase</strong> starts with a lowercase letter, and each subsequent word begins with an uppercase letter, like <code className="bg-muted px-2 py-0.5 rounded text-xs sm:text-sm">getUserProfile</code> or <code className="bg-muted px-2 py-0.5 rounded text-xs sm:text-sm">firstName</code>. This is the standard in JavaScript, TypeScript, and Java for variables and function names. If you're working on a React project, you'll use camelCase constantly.
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                <strong>PascalCase</strong> is similar to camelCase, but the first letter is also uppercase, like <code className="bg-muted px-2 py-0.5 rounded text-xs sm:text-sm">UserProfile</code> or <code className="bg-muted px-2 py-0.5 rounded text-xs sm:text-sm">DatabaseConnection</code>. React developers use PascalCase for component names, and it's the convention for class names in many languages. Fun fact: it's named after the Pascal programming language.
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                <strong>snake_case</strong> uses underscores between words, all lowercase, like <code className="bg-muted px-2 py-0.5 rounded text-xs sm:text-sm">user_profile</code> or <code className="bg-muted px-2 py-0.5 rounded text-xs sm:text-sm">database_connection</code>. This is the standard in Python, Ruby, and for database column names. If you've ever looked at a PostgreSQL table, you've seen snake_case everywhere.
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                <strong>kebab-case</strong> uses hyphens between words, all lowercase, like <code className="bg-muted px-2 py-0.5 rounded text-xs sm:text-sm">user-profile</code> or <code className="bg-muted px-2 py-0.5 rounded text-xs sm:text-sm">blog-post-title</code>. This is super important for URLs and CSS class names. Google actually prefers kebab-case URLs because they're more readable and SEO-friendly than underscores or no separators.
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                By the way, if you need to check your <a href="/character-counter" className="text-primary hover:underline">character count</a> while naming variables or crafting URLs, our character counter tool is perfect for that. And if you're working on SEO content, our <a href="/seo-content-analyzer" className="text-primary hover:underline">SEO content analyzer</a> can help you optimize your text beyond just case formatting.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-8 mb-4">
                How Text Case Affects Your SEO and Content Marketing
              </h3>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Here's something a lot of people don't realize: text case can actually impact your SEO and click-through rates. Let me explain how.
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                First, let's talk about URLs. Google has stated that URLs should be readable and descriptive. Using kebab-case (hyphens) in your URLs is considered a best practice because search engines treat hyphens as word separators. So <code className="bg-muted px-2 py-0.5 rounded text-xs sm:text-sm">how-to-convert-text-case</code> is better for SEO than <code className="bg-muted px-2 py-0.5 rounded text-xs sm:text-sm">howtconverttextcase</code> or <code className="bg-muted px-2 py-0.5 rounded text-xs sm:text-sm">how_to_convert_text_case</code>.
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Second, your title tags and meta descriptions matter for click-through rates. Studies have shown that properly formatted title case headlines can increase CTR by up to 30% compared to all lowercase or inconsistent formatting. When users see a professional, properly capitalized title in search results, they're more likely to trust and click on it.
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Third, readability affects user engagement metrics, which indirectly impacts SEO. Text that's easier to read keeps people on your page longer, reducing bounce rates and signaling to Google that your content is valuable. Our <a href="/readability-calculator" className="text-primary hover:underline">readability calculator</a> can help you analyze and improve your content's readability score.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-8 mb-4">
                Real-World Examples: When to Use Each Text Case Format
              </h3>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Let me give you some practical examples of when to use each format. I've organized these by profession because I know different people have different needs:
              </p>

              <div className="bg-muted/30 rounded-lg p-4 sm:p-6 my-6">
                <h4 className="font-semibold text-foreground mb-3">For Writers and Bloggers:</h4>
                <ul className="text-sm sm:text-base text-muted-foreground space-y-2">
                  <li className="flex items-start"><span className="mr-2 text-primary">•</span><strong>Blog Post Titles:</strong> Use Title Case or Sentence case (e.g., "10 Ways to Improve Your Writing" or "10 ways to improve your writing")</li>
                  <li className="flex items-start"><span className="mr-2 text-primary">•</span><strong>Email Subject Lines:</strong> Sentence case often performs best for open rates</li>
                  <li className="flex items-start"><span className="mr-2 text-primary">•</span><strong>Headings and Subheadings:</strong> Title Case for H1/H2, Sentence case for H3 and below</li>
                  <li className="flex items-start"><span className="mr-2 text-primary">•</span><strong>Call-to-Action Buttons:</strong> Title Case (e.g., "Download Now" or "Get Started")</li>
                </ul>
              </div>

              <div className="bg-muted/30 rounded-lg p-4 sm:p-6 my-6">
                <h4 className="font-semibold text-foreground mb-3">For Developers and Programmers:</h4>
                <ul className="text-sm sm:text-base text-muted-foreground space-y-2">
                  <li className="flex items-start"><span className="mr-2 text-primary">•</span><strong>JavaScript/TypeScript Variables:</strong> camelCase (e.g., <code className="bg-muted px-1.5 py-0.5 rounded text-xs">const userName = "John"</code>)</li>
                  <li className="flex items-start"><span className="mr-2 text-primary">•</span><strong>React Components:</strong> PascalCase (e.g., <code className="bg-muted px-1.5 py-0.5 rounded text-xs">{'<UserProfile />'}</code>)</li>
                  <li className="flex items-start"><span className="mr-2 text-primary">•</span><strong>Python Variables:</strong> snake_case (e.g., <code className="bg-muted px-1.5 py-0.5 rounded text-xs">user_name = "John"</code>)</li>
                  <li className="flex items-start"><span className="mr-2 text-primary">•</span><strong>CSS Classes:</strong> kebab-case (e.g., <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.user-profile-card</code>)</li>
                  <li className="flex items-start"><span className="mr-2 text-primary">•</span><strong>Constants:</strong> CONSTANT_CASE (e.g., <code className="bg-muted px-1.5 py-0.5 rounded text-xs">const MAX_RETRY_COUNT = 3</code>)</li>
                </ul>
              </div>

              <div className="bg-muted/30 rounded-lg p-4 sm:p-6 my-6">
                <h4 className="font-semibold text-foreground mb-3">For Students and Academics:</h4>
                <ul className="text-sm sm:text-base text-muted-foreground space-y-2">
                  <li className="flex items-start"><span className="mr-2 text-primary">•</span><strong>APA Style:</strong> Sentence case for article titles in references</li>
                  <li className="flex items-start"><span className="mr-2 text-primary">•</span><strong>MLA Style:</strong> Title Case for titles of works</li>
                  <li className="flex items-start"><span className="mr-2 text-primary">•</span><strong>Essay Headings:</strong> Follow your professor's style guide (usually Title Case)</li>
                  <li className="flex items-start"><span className="mr-2 text-primary">•</span><strong>Paper Titles:</strong> Title Case is standard for most academic papers</li>
                </ul>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                If you're a student working on essays, you might also find our <a href="/" className="text-primary hover:underline">word counter</a> helpful for meeting word count requirements, and our <a href="/grammar-checker" className="text-primary hover:underline">grammar checker</a> can help polish your writing before submission.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-8 mb-4">
                The Psychology Behind Text Case: Why It Matters More Than You Think
              </h3>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Here's something fascinating that I learned while researching typography and user experience. The way text is capitalized actually affects how our brains process information.
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                When we read, we don't actually look at each letter individually. Instead, we recognize word shapes. That's why you can read "tihs sentnece eevn thuogh the letetrs are jumbeld" because your brain recognizes the overall shape. Lowercase text creates more distinctive word shapes (with ascenders like 'b' and 'd' and descenders like 'p' and 'g'), which is why it's faster to read than ALL CAPS, where every letter is the same height.
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                This is why body text should almost always be in sentence case. Readability studies consistently show that mixed-case text is processed about 13-20% faster than all-uppercase text. If you want people to actually read your content instead of bouncing off the page, proper text case formatting is essential.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-8 mb-4">
                Common Text Case Mistakes and How to Avoid Them
              </h3>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Over the years, I've seen the same text case mistakes pop up again and again. Let me share the most common ones so you can avoid them:
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                <strong>Mistake 1: Using ALL CAPS for emphasis in emails.</strong> It comes across as aggressive or angry, even if that's not your intention. Instead, use bold or italics for emphasis, or restructure your sentence to naturally emphasize the important parts.
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                <strong>Mistake 2: Inconsistent title case application.</strong> People often capitalize random words in titles or miss small words that should be lowercase. In proper title case, you lowercase articles (a, an, the), short prepositions (in, on, at, to), and coordinating conjunctions (and, but, or) unless they're the first or last word.
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                <strong>Mistake 3: Mixing case conventions in code.</strong> I've seen codebases where the same concept is called <code className="bg-muted px-1.5 py-0.5 rounded text-xs">userName</code>, <code className="bg-muted px-1.5 py-0.5 rounded text-xs">user_name</code>, and <code className="bg-muted px-1.5 py-0.5 rounded text-xs">UserName</code> in different files. This creates confusion and bugs. Pick a convention and stick with it.
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                <strong>Mistake 4: Using underscores in URLs.</strong> Google treats underscores as word joiners, not separators. So <code className="bg-muted px-1.5 py-0.5 rounded text-xs">text_case_converter</code> is seen as one word, while <code className="bg-muted px-1.5 py-0.5 rounded text-xs">text-case-converter</code> is correctly parsed as three separate words for SEO purposes.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-8 mb-4">
                Creative Text Cases for Social Media and Marketing
              </h3>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Let's have some fun now. Our text case converter includes several creative case options that are perfect for social media, memes, and attention-grabbing content:
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                <strong>SpOnGeBoB CaSe</strong> (alternating case) became famous from the mocking SpongeBob meme. It's perfect for conveying sarcasm or playful mockery in a visually obvious way. Just don't use it in professional contexts unless you want to confuse your boss.
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                <strong>W i d e  T e x t</strong> (aesthetic text) adds spaces between each character, creating a stretched, artistic look. It's popular on Vaporwave-inspired content and can make text stand out in creative designs.
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                <strong>Reverse Text</strong> flips your text backwards, which can be fun for puzzles, games, or creating mirror-readable content. Kids love this feature, and it's surprisingly useful for certain design applications.
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                By the way, if you're creating social media content, you'll probably want to check the <a href="/character-counter" className="text-primary hover:underline">character count</a> to make sure your posts fit within platform limits. Twitter has 280 characters, Instagram captions can go up to 2,200, and LinkedIn posts are capped at 3,000.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-8 mb-4">
                Why Our Free Text Case Converter Stands Out
              </h3>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                There are plenty of text case converters out there, so what makes this one special? Let me be honest about what we've built:
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                First, we offer 23 different case conversion options, which is more than most tools. From basic transformations like uppercase and lowercase to programming-specific formats like camelCase, PascalCase, snake_case, and kebab-case, we've got you covered. We even include creative options like SpOnGeBoB case and wide text for social media content.
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Second, this tool is completely free with no registration required. You don't need to create an account, provide an email, or watch ads. Just paste your text, click a button, and you're done.
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Third, we process everything in your browser. Your text never gets sent to a server, which means it's completely private. This is especially important if you're working with sensitive content or proprietary code.
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Fourth, we've integrated this tool with our suite of writing tools. After converting your text case, you can check your <a href="/" className="text-primary hover:underline">word count</a>, analyze <a href="/readability-calculator" className="text-primary hover:underline">readability</a>, run a <a href="/grammar-checker" className="text-primary hover:underline">grammar check</a>, or even <a href="/plagiarism-checker" className="text-primary hover:underline">check for plagiarism</a>. It's a complete writing workflow in one place.
              </p>

              {/* FAQ Section */}
              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-10 mb-6">
                Frequently Asked Questions About Text Case Conversion
              </h3>

              <div className="space-y-4">
                <div className="bg-muted/30 rounded-lg p-4 sm:p-5">
                  <h4 className="font-semibold text-foreground mb-2">What is the difference between Title Case and Sentence case?</h4>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Title Case capitalizes the first letter of most words (except articles and short prepositions), like "The Quick Brown Fox Jumps Over the Lazy Dog." Sentence case only capitalizes the first word and proper nouns, like "The quick brown fox jumps over the lazy dog." Title Case looks more formal and is typically used for headlines, while Sentence case is more conversational and increasingly popular for modern content.
                  </p>
                </div>

                <div className="bg-muted/30 rounded-lg p-4 sm:p-5">
                  <h4 className="font-semibold text-foreground mb-2">What is camelCase and when should I use it?</h4>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    camelCase is a naming convention where the first word is lowercase and each subsequent word starts with an uppercase letter, with no spaces (like firstName or getUserData). It's the standard convention for variable and function names in JavaScript, TypeScript, and Java. If you're a developer working in these languages, you'll use camelCase daily.
                  </p>
                </div>

                <div className="bg-muted/30 rounded-lg p-4 sm:p-5">
                  <h4 className="font-semibold text-foreground mb-2">Why is kebab-case better for URLs than underscores?</h4>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Google treats hyphens as word separators but treats underscores as word joiners. This means "text-case-converter" is seen as three separate words for SEO purposes, while "text_case_converter" is seen as one long word. Using kebab-case in your URLs helps search engines understand your content better and can improve your rankings.
                  </p>
                </div>

                <div className="bg-muted/30 rounded-lg p-4 sm:p-5">
                  <h4 className="font-semibold text-foreground mb-2">Is ALL CAPS bad for readability?</h4>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Yes, research shows that all-uppercase text is 13-20% slower to read than mixed-case text. This is because we recognize words by their shapes, and uppercase letters all have the same height, eliminating distinctive word shapes. Use ALL CAPS sparingly for short phrases, warnings, or emphasis, but never for long-form content.
                  </p>
                </div>

                <div className="bg-muted/30 rounded-lg p-4 sm:p-5">
                  <h4 className="font-semibold text-foreground mb-2">What's the difference between PascalCase and camelCase?</h4>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    The only difference is the first letter. In PascalCase, the first letter is uppercase (like UserProfile), while in camelCase, the first letter is lowercase (like userProfile). PascalCase is used for class names and React components, while camelCase is used for variables and function names.
                  </p>
                </div>

                <div className="bg-muted/30 rounded-lg p-4 sm:p-5">
                  <h4 className="font-semibold text-foreground mb-2">Can I use this text case converter for free?</h4>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Yes, our text case converter is 100% free with no limits. You can convert as much text as you want, as many times as you want, without creating an account or paying anything. We believe basic writing tools should be accessible to everyone.
                  </p>
                </div>

                <div className="bg-muted/30 rounded-lg p-4 sm:p-5">
                  <h4 className="font-semibold text-foreground mb-2">Is my text private when I use this tool?</h4>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Absolutely. All text processing happens directly in your browser. Your text is never sent to our servers or stored anywhere. This makes our tool safe for sensitive content, proprietary code, or any text you want to keep private.
                  </p>
                </div>

                <div className="bg-muted/30 rounded-lg p-4 sm:p-5">
                  <h4 className="font-semibold text-foreground mb-2">What is CONSTANT_CASE used for?</h4>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    CONSTANT_CASE (also called SCREAMING_SNAKE_CASE) is all uppercase with underscores between words. It's used in programming for constants, which are values that never change. For example, MAX_RETRY_COUNT = 3 or API_BASE_URL = "https://api.example.com".
                  </p>
                </div>

                <div className="bg-muted/30 rounded-lg p-4 sm:p-5">
                  <h4 className="font-semibold text-foreground mb-2">Which text case is best for email subject lines?</h4>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Email marketing research suggests that sentence case often performs best for email subject lines because it feels more personal and less like a marketing message. However, Title Case can work well for more formal communications. Never use ALL CAPS as it triggers spam filters and feels like shouting.
                  </p>
                </div>

                <div className="bg-muted/30 rounded-lg p-4 sm:p-5">
                  <h4 className="font-semibold text-foreground mb-2">What text case should I use for headings on my website?</h4>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Most websites use Title Case for H1 and H2 headings and Sentence case for H3 and smaller headings. However, the trend is moving toward Sentence case for all headings as it feels more approachable and modern. The most important thing is consistency, pick one approach and stick with it throughout your site.
                  </p>
                </div>
              </div>

              {/* Conclusion Section */}
              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-10 mb-4">
                Conclusion: Making Text Case Work for You
              </h3>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Let's wrap this up with a few final thoughts. Text case might seem like a small detail, but as I hope I've shown you, it has real implications for readability, professionalism, SEO, and user experience. Whether you're a writer trying to format headlines, a developer naming variables, or a student formatting academic papers, getting text case right matters.
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                The good news is that you don't have to memorize all these rules or manually reformat your text. That's what this tool is for. Just paste your text, click the case format you need, and you're done in seconds. No more tedious manual editing, no more inconsistent formatting, no more accidentally sending emails in ALL CAPS.
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                I genuinely hope this guide and tool help you work more efficiently. If you found this useful, check out our other free tools like the <a href="/" className="text-primary hover:underline">word counter</a>, <a href="/word-frequency-counter" className="text-primary hover:underline">word frequency analyzer</a>, <a href="/sentence-counter" className="text-primary hover:underline">sentence counter</a>, and <a href="/paragraph-counter" className="text-primary hover:underline">paragraph counter</a>. They're all designed to make your writing and coding life easier.
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Happy writing, and may your text always be perfectly formatted!
              </p>

              {/* Related Tools Section */}
              <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 rounded-lg p-4 sm:p-6 mt-8 border border-primary/20">
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-4">Explore Our Other Free Writing Tools</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <a href="/" className="text-sm text-primary hover:underline flex items-center">Word Counter</a>
                  <a href="/character-counter" className="text-sm text-primary hover:underline flex items-center">Character Counter</a>
                  <a href="/word-frequency-counter" className="text-sm text-primary hover:underline flex items-center">Word Frequency</a>
                  <a href="/sentence-counter" className="text-sm text-primary hover:underline flex items-center">Sentence Counter</a>
                  <a href="/paragraph-counter" className="text-sm text-primary hover:underline flex items-center">Paragraph Counter</a>
                  <a href="/readability-calculator" className="text-sm text-primary hover:underline flex items-center">Readability Calculator</a>
                  <a href="/grammar-checker" className="text-sm text-primary hover:underline flex items-center">Grammar Checker</a>
                  <a href="/plagiarism-checker" className="text-sm text-primary hover:underline flex items-center">Plagiarism Checker</a>
                  <a href="/seo-content-analyzer" className="text-sm text-primary hover:underline flex items-center">SEO Analyzer</a>
                  <a href="/random-word-generator" className="text-sm text-primary hover:underline flex items-center">Random Word Generator</a>
                  <a href="/words-per-page" className="text-sm text-primary hover:underline flex items-center">Words Per Page</a>
                  <a href="/resume-cv-checker" className="text-sm text-primary hover:underline flex items-center">Resume Checker</a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
