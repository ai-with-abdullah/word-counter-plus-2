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
                <RelatedToolsSidebar currentTool="/text-case-converter" limit={5} />
              </div>
            </div>

            <div className="hidden lg:block">
              <RelatedToolsSidebar currentTool="/text-case-converter" />
            </div>
          </div>
        </div>
      </div>

      {/* SEO-Optimized Blog Content Section */}
      <section className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-card rounded-lg p-4 sm:p-6 md:p-8 shadow-sm border border-border">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">How to Use Text Case Converter</h2>
                
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
                      Choose from 23 different conversion options organized in three categories:
                    </p>
                    <div className="ml-0 sm:ml-11 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                      <div className="bg-background rounded-lg p-3 border border-border">
                        <h4 className="font-semibold text-sm text-blue-600 dark:text-blue-400 mb-2">Basic Cases</h4>
                        <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                          <li>• UPPERCASE</li>
                          <li>• lowercase</li>
                          <li>• Title Case</li>
                          <li>• Sentence case</li>
                        </ul>
                      </div>
                      <div className="bg-background rounded-lg p-3 border border-border">
                        <h4 className="font-semibold text-sm text-green-600 dark:text-green-400 mb-2">Programming</h4>
                        <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                          <li>• camelCase</li>
                          <li>• PascalCase</li>
                          <li>• kebab-case</li>
                          <li>• snake_case</li>
                        </ul>
                      </div>
                      <div className="bg-background rounded-lg p-3 border border-border">
                        <h4 className="font-semibold text-sm text-purple-600 dark:text-purple-400 mb-2">Creative</h4>
                        <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                          <li>• aLtErNaTiNg</li>
                          <li>• SpOnGeBoB</li>
                          <li>• Reverse Text</li>
                          <li>• W i d e  T e x t</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 flex items-center">
                      <span className="bg-primary text-primary-foreground w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mr-3 text-sm flex-shrink-0">3</span>
                      Copy or Download Result
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground ml-0 sm:ml-11">
                      Once your text is converted, it appears in the same text area. Use the <strong>Download</strong> button to save it as a .txt file, or manually copy the converted text for immediate use in your project.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-4 sm:p-6 md:p-8 shadow-sm border border-border">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 sm:mb-6">How Does Text Case Converter Work? Everything You Need to Know</h2>
                
                <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                    If you've ever accidentally left caps lock on while typing an important email or struggled to format code variable names consistently, you know how frustrating text case issues can be. That's exactly where a text case converter becomes your best friend. But how does this seemingly simple tool actually work? Let's dive deep into the world of text case conversion and discover why it's an essential tool for writers, developers, content creators, and students alike.
                  </p>

                  <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                    <FaBolt className="mr-2 sm:mr-3 text-yellow-500 flex-shrink-0" />
                    How Can Text Case Converter Save You Hours of Manual Work?
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                    Imagine you've just finished writing a 2,000-word article, only to realize the entire first paragraph is in uppercase because you forgot to turn off caps lock. Without a text case converter, you'd need to manually retype or edit each sentence. With this tool, it takes exactly one click to fix everything. The converter automatically processes your text character by character, analyzing each letter's current case and transforming it according to your selected format.
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                    Modern text case converters use intelligent algorithms that understand language patterns. For example, when converting to sentence case, the tool recognizes punctuation marks like periods, question marks, and exclamation points as sentence boundaries. It then capitalizes the first letter after these markers while converting everything else to lowercase. This level of automation can save you hours of tedious editing work.
                  </p>

                  <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                    <FaCheckCircle className="mr-2 sm:mr-3 text-green-500 flex-shrink-0" />
                    How Do Different Case Formats Improve Your Content Quality?
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                    Each case format serves a specific purpose in professional communication. <strong>Title Case</strong> is perfect for blog headlines and article titles because it makes them visually appealing and professional—studies show that properly formatted titles can increase click-through rates by up to 30%. <strong>Sentence case</strong> is ideal for body text as it's the most natural to read and follows standard grammar rules.
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                    For developers, programming cases like <strong>camelCase</strong> and <strong>snake_case</strong> are essential for writing clean, maintainable code. JavaScript developers use camelCase for variable names (like <code className="bg-muted px-2 py-0.5 rounded text-xs sm:text-sm">userName</code>), while Python developers prefer snake_case (like <code className="bg-muted px-2 py-0.5 rounded text-xs sm:text-sm">user_name</code>). Using the right case format makes your code more readable and helps prevent bugs caused by naming inconsistencies.
                  </p>

                  <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                    <FaBook className="mr-2 sm:mr-3 text-blue-500 flex-shrink-0" />
                    How Do Programmers Use Case Conversion in Their Daily Work?
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                    Professional developers rely on case converters to maintain coding standards across their projects. When working with APIs, database fields, or CSS classes, consistency is crucial. A text case converter helps developers quickly transform database column names from "User Name" to <code className="bg-muted px-2 py-0.5 rounded text-xs sm:text-sm">user_name</code>, or convert component names to PascalCase like <code className="bg-muted px-2 py-0.5 rounded text-xs sm:text-sm">UserProfileCard</code>.
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                    SEO professionals also benefit significantly from <strong>kebab-case</strong> conversion for URL slugs. Search engines like Google prefer URLs with hyphens (like <code className="bg-muted px-2 py-0.5 rounded text-xs sm:text-sm">how-to-use-case-converter</code>) over underscores or spaces, making kebab-case the standard for SEO-friendly URLs. This small detail can impact your search rankings and website accessibility.
                  </p>

                  <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                    <FaPenFancy className="mr-2 sm:mr-3 text-purple-500 flex-shrink-0" />
                    How Can Students and Writers Benefit from Case Conversion?
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                    Students working on academic papers often need to format titles according to specific style guides like APA, MLA, or Chicago. Each style has unique capitalization rules—for instance, APA style requires sentence case for most titles, while Chicago style uses title case. A case converter eliminates the guesswork and ensures your formatting meets academic standards every time.
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                    Content creators and social media managers use case converters to optimize their posts. <strong>Alternating case</strong> (like "tHiS iS cOoL") creates eye-catching, playful text perfect for memes and casual social media content. Meanwhile, professional writers use title case to make their headlines stand out and improve readability, which is especially important for email subject lines where proper formatting can increase open rates by 20-40%.
                  </p>

                  <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 rounded-lg p-4 sm:p-6 mt-6 sm:mt-8 mb-6 border border-primary/20">
                    <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4">Key Benefits of Using Text Case Converter</h3>
                    <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                      <li className="flex items-start">
                        <span className="mr-2 text-primary flex-shrink-0">✓</span>
                        <span><strong>Time-Saving:</strong> Convert thousands of characters in seconds instead of hours of manual editing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary flex-shrink-0">✓</span>
                        <span><strong>Error-Free:</strong> Eliminate human typos and inconsistencies in formatting</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary flex-shrink-0">✓</span>
                        <span><strong>SEO-Friendly:</strong> Create optimized URLs and titles that rank better in search engines</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary flex-shrink-0">✓</span>
                        <span><strong>Professional Appearance:</strong> Maintain consistent formatting across all your content</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary flex-shrink-0">✓</span>
                        <span><strong>Code Quality:</strong> Follow programming conventions effortlessly for better collaboration</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary flex-shrink-0">✓</span>
                        <span><strong>Accessibility:</strong> Improve readability for all users, including those using screen readers</span>
                      </li>
                    </ul>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4">Common Use Cases and Real-World Applications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
                    <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                      <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2">For Writers & Bloggers</h4>
                      <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                        <li>• Fix accidental caps lock mistakes instantly</li>
                        <li>• Format blog titles to increase CTR</li>
                        <li>• Standardize headings across articles</li>
                        <li>• Create consistent brand voice</li>
                      </ul>
                    </div>
                    <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                      <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2">For Developers</h4>
                      <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                        <li>• Convert variable names between conventions</li>
                        <li>• Generate SEO-friendly URL slugs</li>
                        <li>• Format database field names</li>
                        <li>• Clean API response data</li>
                      </ul>
                    </div>
                    <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                      <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2">For Students</h4>
                      <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                        <li>• Meet academic style guide requirements</li>
                        <li>• Format essay titles correctly</li>
                        <li>• Clean up research notes</li>
                        <li>• Prepare citations and references</li>
                      </ul>
                    </div>
                    <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                      <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2">For Marketers</h4>
                      <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                        <li>• Optimize email subject lines</li>
                        <li>• Create engaging social media posts</li>
                        <li>• Format meta descriptions for SEO</li>
                        <li>• Standardize campaign materials</li>
                      </ul>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-muted-foreground mt-6 sm:mt-8 leading-relaxed">
                    Whether you're a developer maintaining code standards, a content creator optimizing for SEO, a student following academic guidelines, or a professional who simply wants error-free text formatting, a text case converter is an indispensable tool in your digital toolkit. It combines speed, accuracy, and versatility to handle all your text transformation needs—saving you time and ensuring professional results every single time.
                  </p>
                </div>
              </div>
            </div>
        </section>
    </main>
  );
}
