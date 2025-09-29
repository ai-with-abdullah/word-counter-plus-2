import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FaCheck, FaEraser, FaHighlighter, FaPaste, FaTrash, FaCopy, FaSync, FaSort, FaBook, FaClock, FaInfoCircle, FaCalendar, FaUpload } from "@/components/common/Icons";
import { Link } from 'wouter';
import useFileUpload from '@/hooks/useFileUpload';

// Case conversion functions - standalone and reusable
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
  }
};

// Case conversion options with metadata
const caseOptions = [
  {
    key: 'uppercase' as keyof typeof textCaseConverters,
    name: 'UPPERCASE',
    description: 'Convert all letters to uppercase',
    example: 'HELLO WORLD',
    category: 'basic'
  },
  {
    key: 'lowercase' as keyof typeof textCaseConverters,
    name: 'lowercase',
    description: 'Convert all letters to lowercase',
    example: 'hello world',
    category: 'basic'
  },
  {
    key: 'titleCase' as keyof typeof textCaseConverters,
    name: 'Title Case',
    description: 'Capitalize the first letter of each word',
    example: 'Hello World',
    category: 'basic'
  },
  {
    key: 'sentenceCase' as keyof typeof textCaseConverters,
    name: 'Sentence case',
    description: 'Capitalize first letter of sentences',
    example: 'Hello world. How are you?',
    category: 'basic'
  },
  {
    key: 'camelCase' as keyof typeof textCaseConverters,
    name: 'camelCase',
    description: 'First word lowercase, others capitalized, no spaces',
    example: 'helloWorld',
    category: 'programming'
  },
  {
    key: 'pascalCase' as keyof typeof textCaseConverters,
    name: 'PascalCase',
    description: 'All words capitalized, no spaces',
    example: 'HelloWorld',
    category: 'programming'
  },
  {
    key: 'kebabCase' as keyof typeof textCaseConverters,
    name: 'kebab-case',
    description: 'Lowercase with hyphens between words',
    example: 'hello-world',
    category: 'programming'
  },
  {
    key: 'snakeCase' as keyof typeof textCaseConverters,
    name: 'snake_case',
    description: 'Lowercase with underscores between words',
    example: 'hello_world',
    category: 'programming'
  },
  {
    key: 'constantCase' as keyof typeof textCaseConverters,
    name: 'CONSTANT_CASE',
    description: 'Uppercase with underscores between words',
    example: 'HELLO_WORLD',
    category: 'programming'
  },
  {
    key: 'dotCase' as keyof typeof textCaseConverters,
    name: 'dot.case',
    description: 'Lowercase with dots between words',
    example: 'hello.world',
    category: 'other'
  },
  {
    key: 'alternatingCase' as keyof typeof textCaseConverters,
    name: 'aLtErNaTiNg CaSe',
    description: 'Alternating uppercase and lowercase letters',
    example: 'hElLo WoRlD',
    category: 'other'
  },
  {
    key: 'reverseCase' as keyof typeof textCaseConverters,
    name: 'rEVERSE cASE',
    description: 'Reverse the case of each letter',
    example: 'hELLO wORLD',
    category: 'other'
  }
];

export default function TextCaseConverter() {
  const [text, setText] = useState('');
  const { toast } = useToast();

  // File upload functionality
  const { isLoading: isUploading, triggerFileUpload, FileInput } = useFileUpload({
    onSuccess: (content, filename) => {
      setText(content);
    },
    maxSizeInMB: 10,
    acceptedTypes: ['.txt', 'text/plain']
  });

  // Auto-save and restore text
  useEffect(() => {
    const savedText = localStorage.getItem('textCaseConverter_text');
    if (savedText) {
      setText(savedText);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('textCaseConverter_text', text);
  }, [text]);

  const clearText = () => {
    setText('');
  };

  const pasteText = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
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



  const copyToClipboard = async (text: string, caseName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to Clipboard",
        description: `${caseName} text copied successfully.`,
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy text to clipboard.",
        variant: "destructive",
      });
    }
  };

  const downloadText = (text: string, caseName: string) => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${caseName.toLowerCase().replace(/\s+/g, '-')}-converted-text.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Download Started",
      description: `${caseName} text file download started.`,
    });
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

  // ✅ Always Visible Scrollbar Text Display 
  const ScrollableResult = ({ convertedText }: { convertedText: string }) => {
    // Force content to always need scrolling
    const paddedContent = convertedText + '\n\n\n\n\n\n\n\n'; // Lots of extra lines

    return (
      <div className="mb-3 relative">
        <div 
          className="bg-muted/50 rounded-md p-3 font-mono text-sm break-all"
          style={{
            height: '150px', // Small fixed height
            overflowY: 'scroll',
            border: '1px solid #94a3b8', // Thick visible border
            scrollbarWidth: 'auto',
            // scrollbarColor: '#f59e0b #e5e7eb' // Bright orange scrollbar
          } as React.CSSProperties}
        >
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
            {paddedContent}
          </pre>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          ↑ Scroll to see more content
        </div>
      </div>
    );
  };

  // Group options by category
  const basicOptions = caseOptions.filter(opt => opt.category === 'basic');
  const programmingOptions = caseOptions.filter(opt => opt.category === 'programming');
  const otherOptions = caseOptions.filter(opt => opt.category === 'other');

  return (
    <main className="min-h-screen bg-background">
      {/* Centered Container with Max Width */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          {/* Tool Header */}
          <div className="text-center mb-4 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
              Text Case Converter Plus
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Convert text between different case formats
            </p>
          </div>


          {/* Text Input Area */}
          <div className="bg-card rounded-lg p-3 sm:p-6 shadow-sm border border-border">
            <div className="mb-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                <label htmlFor="textInput" className="text-base sm:text-lg font-semibold text-foreground">Enter Your Text</label>
                <div className="flex gap-2 w-full sm:w-auto">
                  {/* Upload Button */}
                  <button 
                    onClick={triggerFileUpload}
                    disabled={isUploading}
                    className="flex-1 sm:flex-none px-3 py-1.5 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    data-testid="button-upload-text"
                    title="Upload text file"
                  >
                    <FaUpload className="inline mr-1" aria-hidden="true" />
                    <span className="hidden sm:inline">{isUploading ? 'Uploading...' : 'Upload'}</span>
                    <span className="sm:hidden">{isUploading ? 'Up...' : 'Upload'}</span>
                  </button>
                  {/* Clear Button */}
                  <button 
                    onClick={clearText}
                    className="flex-1 sm:flex-none px-3 py-1.5 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/80 transition-colors"
                    data-testid="button-clear-text"
                    title="Clear all text and reset"
                  >
                    <FaEraser className="inline mr-1" aria-hidden="true" />
                    <span className="hidden sm:inline">Clear</span>
                    <span className="sm:hidden">Clear</span>
                  </button>
                </div>
              </div>
              
              <textarea
                id="textInput"
                className="w-full min-h-[200px] sm:min-h-[250px] p-3 border border-border rounded-lg resize-y bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                placeholder="Enter your text here to convert between different cases..."
                aria-describedby="textHelp"
                value={text}
                onChange={(e) => setText(e.target.value)}
                data-testid="input-text-converter"
              />
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 gap-2">
                <div className="text-xs sm:text-sm text-muted-foreground" data-testid="text-stats">
                  {getStatsText()}
                </div>
                
                {/* Quick Actions */}
                <div className="flex gap-2">
                  <button 
                    onClick={pasteText}
                    className="px-2 py-1 text-xs bg-muted hover:bg-muted/80 rounded transition-colors flex items-center"
                    data-testid="button-paste-text"
                    title="Paste text from clipboard"
                  >
                    <FaPaste className="mr-1" aria-hidden="true" />
                    Paste
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Case Conversion Results */}
          {text.trim() && (
            <div className="bg-card rounded-lg p-3 sm:p-6 shadow-sm border border-border">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic" data-testid="tab-basic-cases">Basic Cases</TabsTrigger>
                  <TabsTrigger value="programming" data-testid="tab-programming-cases">Programming</TabsTrigger>
                  <TabsTrigger value="other" data-testid="tab-other-cases">Creative</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 sm:gap-4">
                    {basicOptions.map((option) => (
                      <div key={option.key} className="border border-border rounded-lg p-3 sm:p-4">
                        <div className="mb-3">
                          <h3 className="font-semibold text-foreground mb-1">{option.name}</h3>
                          <p className="text-xs text-muted-foreground">{option.description}</p>
                        </div>
                        <ScrollableResult 
                          convertedText={textCaseConverters[option.key](text)}
                        />
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => copyToClipboard(textCaseConverters[option.key](text), option.name)}
                            className="flex-1 px-3 py-2 sm:py-1.5 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/80 transition-colors flex items-center justify-center"
                            data-testid={`button-copy-${option.key}`}
                          >
                            <FaCopy className="mr-1" />
                            Copy
                          </button>
                          <button
                            onClick={() => downloadText(textCaseConverters[option.key](text), option.name)}
                            className="w-full sm:w-auto px-3 py-2 sm:py-1.5 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/80 transition-colors flex items-center justify-center sm:justify-start"
                            data-testid={`button-download-${option.key}`}
                            title="Download as text file"
                          >
                            📥 <span className="ml-1 sm:hidden">Download</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="programming" className="mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 sm:gap-4">
                    {programmingOptions.map((option) => (
                      <div key={option.key} className="border border-border rounded-lg p-3 sm:p-4">
                        <div className="mb-3">
                          <h3 className="font-semibold text-foreground mb-1">{option.name}</h3>
                          <p className="text-xs text-muted-foreground">{option.description}</p>
                        </div>
                        <ScrollableResult 
                          convertedText={textCaseConverters[option.key](text)}
                        />
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => copyToClipboard(textCaseConverters[option.key](text), option.name)}
                            className="flex-1 px-3 py-2 sm:py-1.5 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/80 transition-colors flex items-center justify-center"
                            data-testid={`button-copy-${option.key}`}
                          >
                            <FaCopy className="mr-1" />
                            Copy
                          </button>
                          <button
                            onClick={() => downloadText(textCaseConverters[option.key](text), option.name)}
                            className="w-full sm:w-auto px-3 py-2 sm:py-1.5 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/80 transition-colors flex items-center justify-center sm:justify-start"
                            data-testid={`button-download-${option.key}`}
                            title="Download as text file"
                          >
                            📥 <span className="ml-1 sm:hidden">Download</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="other" className="mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 sm:gap-4">
                    {otherOptions.map((option) => (
                      <div key={option.key} className="border border-border rounded-lg p-3 sm:p-4">
                        <div className="mb-3">
                          <h3 className="font-semibold text-foreground mb-1">{option.name}</h3>
                          <p className="text-xs text-muted-foreground">{option.description}</p>
                        </div>
                        <ScrollableResult 
                          convertedText={textCaseConverters[option.key](text)}
                        />
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => copyToClipboard(textCaseConverters[option.key](text), option.name)}
                            className="flex-1 px-3 py-2 sm:py-1.5 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/80 transition-colors flex items-center justify-center"
                            data-testid={`button-copy-${option.key}`}
                          >
                            <FaCopy className="mr-1" />
                            Copy
                          </button>
                          <button
                            onClick={() => downloadText(textCaseConverters[option.key](text), option.name)}
                            className="w-full sm:w-auto px-3 py-2 sm:py-1.5 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/80 transition-colors flex items-center justify-center sm:justify-start"
                            data-testid={`button-download-${option.key}`}
                            title="Download as text file"
                          >
                            📥 <span className="ml-1 sm:hidden">Download</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* How to Use Section */}
          {!text.trim() && (
            <div className="bg-card rounded-lg p-3 sm:p-6 shadow-sm border border-border">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">How to Use the Text Case Converter</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Basic Cases</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• <strong>UPPERCASE:</strong> ALL CAPITAL LETTERS</li>
                    <li>• <strong>lowercase:</strong> all small letters</li>
                    <li>• <strong>Title Case:</strong> First Letter Of Each Word</li>
                    <li>• <strong>Sentence case:</strong> First letter of sentence</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Programming Cases</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• <strong>camelCase:</strong> variableName</li>
                    <li>• <strong>PascalCase:</strong> ClassName</li>
                    <li>• <strong>kebab-case:</strong> file-name</li>
                    <li>• <strong>snake_case:</strong> variable_name</li>
                    <li>• <strong>CONSTANT_CASE:</strong> MAX_VALUE</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Creative Cases</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• <strong>dot.case:</strong> config.file.name</li>
                    <li>• <strong>aLtErNaTiNg:</strong> mixed case</li>
                    <li>• <strong>rEVERSE cASE:</strong> inverted case</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2 text-foreground">File Upload Support</h4>
                <p className="text-sm text-muted-foreground">
                  Upload text files (TXT, HTML, RTF, Markdown, CSV) to quickly convert large amounts of text. 
                  The tool will extract the text content and allow you to convert it to any case format.
                </p>
              </div>
            </div>
          )}

          {/* Quick Stats - Moved to Main Content */}
          {text.trim() && (
            <div className="bg-card rounded-lg p-3 sm:p-4 shadow-sm border border-border">
              <h3 className="text-base font-semibold text-foreground mb-3">Text Statistics</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <span className="block text-muted-foreground">Characters</span>
                  <span className="font-medium text-lg" data-testid="stat-characters">{text.length.toLocaleString()}</span>
                </div>
                <div className="text-center">
                  <span className="block text-muted-foreground">Words</span>
                  <span className="font-medium text-lg" data-testid="stat-words">{text.trim().split(/\s+/).filter(word => word.length > 0).length.toLocaleString()}</span>
                </div>
                <div className="text-center">
                  <span className="block text-muted-foreground">Lines</span>
                  <span className="font-medium text-lg" data-testid="stat-lines">{text.split('\n').length.toLocaleString()}</span>
                </div>
                <div className="text-center">
                  <span className="block text-muted-foreground">Sentences</span>
                  <span className="font-medium text-lg" data-testid="stat-sentences">{text.split(/[.!?]+/).filter(s => s.trim().length > 0).length.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* SEO-Optimized Blog Content */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <article className="prose prose-gray dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-foreground mb-6">Master Text Case Conversion: The Complete Guide to Text Formatting</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Why Text Case Conversion Matters</h3>
                    <p className="text-muted-foreground mb-4">
                      Text case conversion is essential for various professional and creative tasks. Whether you're a developer working with different naming conventions, a content creator formatting titles, or a student preparing academic papers, understanding text case formats can significantly improve your workflow efficiency.
                    </p>
                    
                    <h4 className="text-lg font-semibold text-foreground mb-3">Programming Applications</h4>
                    <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                      <li><strong>camelCase:</strong> Perfect for JavaScript variables and functions</li>
                      <li><strong>PascalCase:</strong> Ideal for class names and components</li>
                      <li><strong>snake_case:</strong> Standard for Python variables and database fields</li>
                      <li><strong>kebab-case:</strong> Essential for CSS classes and file names</li>
                      <li><strong>CONSTANT_CASE:</strong> Required for environment variables and constants</li>
                    </ul>

                    <h4 className="text-lg font-semibold text-foreground mb-3">Content Creation Uses</h4>
                    <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                      <li><strong>Title Case:</strong> Professional headlines and article titles</li>
                      <li><strong>Sentence case:</strong> Natural reading flow for body text</li>
                      <li><strong>UPPERCASE:</strong> Attention-grabbing calls-to-action</li>
                      <li><strong>lowercase:</strong> Modern, minimalist design aesthetics</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Advanced Text Formatting Techniques</h3>
                    <p className="text-muted-foreground mb-4">
                      Our text case converter supports 12 different formatting options, making it the most comprehensive tool available online. Each format serves specific use cases and industries.
                    </p>

                    <h4 className="text-lg font-semibold text-foreground mb-3">SEO Benefits</h4>
                    <p className="text-muted-foreground mb-4">
                      Proper text case formatting improves content readability and user experience, which are crucial SEO ranking factors. Search engines favor well-structured, easy-to-read content that provides value to users.
                    </p>

                    <h4 className="text-lg font-semibold text-foreground mb-3">Time-Saving Features</h4>
                    <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                      <li>Instant real-time conversion as you type</li>
                      <li>Bulk text processing for large documents</li>
                      <li>Copy-to-clipboard functionality for quick workflow</li>
                      <li>Mobile-responsive design for on-the-go formatting</li>
                      <li>File upload support for .txt, .docx, and .pdf files</li>
                    </ul>

                    <h4 className="text-lg font-semibold text-foreground mb-3">Professional Applications</h4>
                    <p className="text-muted-foreground">
                      From database administrators standardizing field names to social media managers creating consistent hashtags, text case conversion is a fundamental skill in the digital workplace. Our tool ensures accuracy and consistency across all your text formatting needs.
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-muted/30 rounded-lg">
                  <h4 className="text-lg font-semibold text-foreground mb-3">Pro Tips for Effective Text Formatting</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-foreground mb-2">Code Standards</h5>
                      <p className="text-muted-foreground">Follow language-specific naming conventions to maintain code readability and team collaboration.</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground mb-2">Brand Consistency</h5>
                      <p className="text-muted-foreground">Establish text case guidelines for your brand to ensure consistent communication across all platforms.</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground mb-2">Accessibility</h5>
                      <p className="text-muted-foreground">Use proper sentence case for body text to improve readability for users with dyslexia and other reading difficulties.</p>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
      {/* Hidden file input */}
      <FileInput />
    </main>
  );
}

// Export the case options for reuse
export { caseOptions };