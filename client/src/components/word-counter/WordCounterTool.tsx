import { useState, useEffect } from 'react';
import { useTextAnalysisOptimized as useTextAnalysis } from '@/hooks/useTextAnalysisOptimized';
import StatsCard from './StatsCard';
import KeywordTable from './KeywordTable';
import ExportButtons from './ExportButtons';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { lazy, Suspense } from 'react';

// Lazy load heavy feature components
const AdvancedAnalytics = lazy(() => import('@/components/features/AdvancedAnalytics'));
const SEOAnalyzer = lazy(() => import('@/components/features/SEOAnalyzer'));
const SocialMediaOptimizer = lazy(() => import('@/components/features/SocialMediaOptimizer'));
const CompetitorAnalysis = lazy(() => import('@/components/features/CompetitorAnalysis'));
const ContentGoals = lazy(() => import('@/components/features/ContentGoals'));

// Feature loading fallback
const FeatureLoader = () => (
  <div className="flex items-center justify-center py-8">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
  </div>
);

import { BarChart3, Search, Share2, TrendingUp, Target, Sparkles } from 'lucide-react';
import { FaCheck, FaEraser, FaHighlighter, FaPaste, FaTrash, FaUpload, FaCopy, FaSync, FaSort, FaBook, FaClock, FaInfoCircle, FaCalendar } from "@/components/common/Icons";

// Using icons from the common Icons file that are already working
// import AdSenseUnit from '@/components/ads/AdSenseUnit'; // Commented out - ads disabled

export default function WordCounterTool() {
  const [text, setText] = useState('');
  const [wordLimit, setWordLimit] = useState(500);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [uploadedFileInfo, setUploadedFileInfo] = useState<{name: string, size: number, type: string} | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { stats, readability, keywords } = useTextAnalysis(text);
  const { toast } = useToast();

  // Auto-save and restore text
  useEffect(() => {
    const savedText = localStorage.getItem('savedText');
    if (savedText) {
      setText(savedText);
    }

    const savedWordLimit = localStorage.getItem('wordLimit');
    if (savedWordLimit) {
      setWordLimit(parseInt(savedWordLimit));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('savedText', text);
  }, [text]);

  useEffect(() => {
    localStorage.setItem('wordLimit', wordLimit.toString());
  }, [wordLimit]);

  const clearText = () => {
    setText('');
    setIsHighlighted(false);
    setUploadedFileInfo(null);
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

  const highlightKeywords = () => {
    if (keywords.single.length === 0) {
      toast({
        title: "No Keywords",
        description: "Enter some text to analyze keywords.",
        variant: "destructive",
      });
      return;
    }
    setIsHighlighted(true);
  };

  const clearHighlights = () => {
    setIsHighlighted(false);
  };

  // Text case conversion functions
  const convertToUppercase = () => {
    setText(text.toUpperCase());
    toast({
      title: "Text Converted",
      description: "Text has been converted to uppercase.",
    });
  };

  const convertToLowercase = () => {
    setText(text.toLowerCase());
    toast({
      title: "Text Converted",
      description: "Text has been converted to lowercase.",
    });
  };

  const convertToTitleCase = () => {
    const titleCase = text.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
    setText(titleCase);
    toast({
      title: "Text Converted",
      description: "Text has been converted to title case.",
    });
  };

  const convertToSentenceCase = () => {
    const sentenceCase = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => 
      c.toUpperCase()
    );
    setText(sentenceCase);
    toast({
      title: "Text Converted",
      description: "Text has been converted to sentence case.",
    });
  };

  // SECURITY FIX: Safe file content extraction utilities
  const extractHtmlText = (htmlContent: string): string => {
    try {
      // Use DOMParser to safely extract text from HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      
      // Remove script and style elements completely
      const scripts = doc.querySelectorAll('script, style, noscript');
      scripts.forEach(element => element.remove());
      
      // Extract text content
      const textContent = doc.body?.textContent || doc.documentElement?.textContent || '';
      
      // Clean up the extracted text
      return textContent
        .replace(/\s+/g, ' ')  // Normalize whitespace
        .replace(/\n\s*\n/g, '\n\n')  // Preserve paragraph breaks
        .trim();
    } catch (error) {
      console.warn('Failed to parse HTML content:', error);
      // Fallback: strip basic HTML tags
      return htmlContent.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    }
  };

  const extractRtfText = (rtfContent: string): string => {
    try {
      // Basic RTF control word removal
      let text = rtfContent;
      
      // Remove RTF header and control words
      text = text.replace(/\{\\rtf1[^\}]*\}/g, ''); // Remove RTF header
      text = text.replace(/\\[a-zA-Z]+\d*\s?/g, ''); // Remove control words
      text = text.replace(/\{[^\}]*\}/g, ''); // Remove control groups
      text = text.replace(/\\[^a-zA-Z]/g, ''); // Remove escape sequences
      
      // Clean up the text
      return text
        .replace(/\s+/g, ' ')
        .replace(/\n\s*\n/g, '\n\n')
        .trim();
    } catch (error) {
      console.warn('Failed to parse RTF content:', error);
      return rtfContent.replace(/\\[a-zA-Z]+\d*\s?/g, '').replace(/[{}]/g, '').trim();
    }
  };

  const extractMarkdownText = (markdownContent: string): string => {
    try {
      let text = markdownContent;
      
      // Remove markdown syntax
      text = text.replace(/^#{1,6}\s+/gm, ''); // Headers
      text = text.replace(/\*\*([^*]+)\*\*/g, '$1'); // Bold
      text = text.replace(/\*([^*]+)\*/g, '$1'); // Italic
      text = text.replace(/`([^`]+)`/g, '$1'); // Inline code
      text = text.replace(/```[\s\S]*?```/g, ''); // Code blocks
      text = text.replace(/\[[^\]]*\]\([^\)]*\)/g, ''); // Links
      text = text.replace(/!\[[^\]]*\]\([^\)]*\)/g, ''); // Images
      text = text.replace(/^[-*+]\s+/gm, ''); // List items
      text = text.replace(/^\d+\.\s+/gm, ''); // Numbered lists
      text = text.replace(/^>\s+/gm, ''); // Blockquotes
      text = text.replace(/\|[^\n]*\|/g, ''); // Tables
      text = text.replace(/^[-=]+$/gm, ''); // Horizontal rules
      
      // Clean up whitespace
      return text
        .replace(/\s+/g, ' ')
        .replace(/\n\s*\n/g, '\n\n')
        .trim();
    } catch (error) {
      console.warn('Failed to parse Markdown content:', error);
      return markdownContent.replace(/[#*`\[\]()>|-]/g, '').replace(/\s+/g, ' ').trim();
    }
  };


  const processFileContent = (content: string, fileName: string, fileType: string): string => {
    const extension = fileName.toLowerCase().split('.').pop();
    
    // Determine file format and process accordingly
    if (fileType.includes('html') || extension === 'html' || extension === 'htm') {
      return extractHtmlText(content);
    } else if (fileType.includes('rtf') || extension === 'rtf') {
      return extractRtfText(content);
    } else if (fileType.includes('markdown') || extension === 'md' || extension === 'markdown') {
      return extractMarkdownText(content);
    } else {
      // Plain text or CSV - just normalize line endings
      return content
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .trim();
    }
  };

  // Enhanced file upload functionality with PDF and Word support
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset the input value so the same file can be uploaded again if needed
    event.target.value = '';

    // File type validation - support only text-based formats
    const validTypes = [
      'text/plain', 'text/markdown', 'text/html', 'application/rtf', 'text/csv'
    ];
    const validExtensions = [
      '.txt', '.md', '.markdown', '.rtf', '.html', '.htm', '.csv'
    ];
    
    const fileName = file.name.toLowerCase();
    const isValidType = validTypes.includes(file.type) || 
                       validExtensions.some(ext => fileName.endsWith(ext));

    // Special handling for .doc files (not supported)
    if (fileName.endsWith('.doc')) {
      toast({
        title: "Unsupported File Format",
        description: "Legacy Word (.doc) files are not supported. Please convert to a text format (.txt, .rtf, .html) and try again.",
        variant: "destructive",
      });
      return;
    }

    if (!isValidType) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a text-based file: Text (.txt), Markdown (.md), HTML, RTF, or CSV.",
        variant: "destructive",
      });
      return;
    }

    // Check file size (limit to 100MB)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 100MB.",
        variant: "destructive",
      });
      return;
    }

    // Show loading state with file size info
    setIsUploading(true);
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
    toast({
      title: "Processing File...",
      description: `Processing "${file.name}" (${fileSizeMB}MB). This may take a moment for large files.`,
    });

    try {
      // Handle text-based files only
      const content = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file, 'UTF-8');
      });
      
      if (!content || content.trim().length === 0) {
        throw new Error('File appears to be empty');
      }
      
      const extractedText = processFileContent(content, file.name, file.type);
      
      if (!extractedText || extractedText.trim().length === 0) {
        throw new Error('No text content found in the file');
      }
      
      setText(extractedText);
      setIsHighlighted(false); // Reset highlighting
      
      // Store file information for display
      setUploadedFileInfo({
        name: file.name,
        size: file.size,
        type: file.type || 'application/octet-stream'
      });
      
      // Show success message with file details
      const wordCount = extractedText.split(/\s+/).filter(word => word.length > 0).length;
      toast({
        title: "File Processed Successfully!",
        description: `"${file.name}" analyzed successfully. Found ${wordCount.toLocaleString()} words.`,
      });
      
    } catch (error: any) {
      console.error('File upload error:', error);
      
      // Determine error type and show appropriate message
      const errorMessage = error.message || 'Unknown error occurred';
      let title = "Upload Error";
      let description = "Failed to process the file. Please try again.";
      
      // Handle password-protected files specifically
      if (errorMessage.includes('password-protected')) {
        title = "Password-Protected File";
        description = "This file is password-protected. Please remove the password protection and try uploading again.";
      } 
      // Handle corrupted/invalid structure
      else if (errorMessage.includes('corrupted') || errorMessage.includes('invalid structure')) {
        title = "File Structure Issue";
        description = "The file appears to be corrupted or has an invalid structure. Please try a different file or re-export it.";
      }
      // Handle unsupported PDF format
      else if (errorMessage.includes('format is not supported') || errorMessage.includes('unsupported features')) {
        title = "Unsupported File Format";
        description = "This file uses features that aren't supported. Try saving/exporting it in a standard format.";
      }
      // Handle image-based PDFs (no text)
      else if (errorMessage.includes('no readable text') || errorMessage.includes('scan or image-based')) {
        title = "Image-Based Document";
        description = "This appears to be a scanned document or image-based PDF with no extractable text. Try using OCR software first.";
      }
      // Handle empty files
      else if (errorMessage.includes('empty') || errorMessage.includes('No text content found')) {
        title = "Empty File";
        description = "The file appears to be empty or contains no readable text content.";
      }
      // Handle processing timeouts
      else if (errorMessage.includes('timeout') || errorMessage.includes('network')) {
        title = "Processing Timeout";
        description = "The file is taking too long to process. Please try a smaller file or check your connection.";
      }
      // Generic fallback
      else {
        title = "Processing Error";
        description = errorMessage.length > 100 ? "Unable to process this file. Please try a different file or format." : errorMessage;
      }
      
      toast({
        title,
        description,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Additional text manipulation functions
  const reverseText = () => {
    setText(text.split('').reverse().join(''));
    toast({
      title: "Text Reversed",
      description: "Text has been reversed.",
    });
  };

  const removeExtraSpaces = () => {
    const cleaned = text.replace(/\s+/g, ' ').trim();
    setText(cleaned);
    toast({
      title: "Spaces Cleaned",
      description: "Extra spaces have been removed.",
    });
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

  const sortLines = () => {
    const lines = text.split('\n').sort();
    setText(lines.join('\n'));
    toast({
      title: "Lines Sorted",
      description: "Text lines have been sorted alphabetically.",
    });
  };

  const getReadingLevelColor = (score: number) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 100) return 'var(--destructive)';
    if (percentage >= 80) return 'var(--chart-3)';
    return 'var(--primary)';
  };

  const progressPercentage = Math.min((stats.wordCount / wordLimit) * 100, 100);

  // SECURITY FIX: Safe React text rendering instead of dangerouslySetInnerHTML
  const renderTextWithHighlights = () => {
    if (!isHighlighted || keywords.single.length === 0) {
      return text.split('\n').map((line, lineIndex) => (
        <div key={lineIndex}>{line}</div>
      ));
    }

    const topKeywords = keywords.single.slice(0, 5).map(k => k.keyword);
    
    // Create a safe highlighting function that returns React elements
    const highlightText = (inputText: string) => {
      let parts: (string | { type: 'highlight'; text: string })[] = [inputText];
      
      // Process each keyword to create highlighted segments
      topKeywords.forEach(keyword => {
        const newParts: (string | { type: 'highlight'; text: string })[] = [];
        
        parts.forEach(part => {
          if (typeof part === 'string') {
            // Split by keyword while preserving case and word boundaries
            const regex = new RegExp(`\\b(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'gi');
            const segments = part.split(regex);
            
            for (let i = 0; i < segments.length; i++) {
              if (i % 2 === 0) {
                // Non-highlighted text
                if (segments[i]) newParts.push(segments[i]);
              } else {
                // Highlighted text (matched keyword)
                newParts.push({ type: 'highlight', text: segments[i] });
              }
            }
          } else {
            // Already highlighted part, keep as is
            newParts.push(part);
          }
        });
        
        parts = newParts;
      });
      
      return parts;
    };

    // Process text line by line to maintain structure
    return text.split('\n').map((line, lineIndex) => {
      const highlightedParts = highlightText(line);
      
      return (
        <div key={lineIndex}>
          {highlightedParts.map((part, partIndex) => {
            if (typeof part === 'string') {
              return part;
            } else {
              return (
                <mark key={partIndex} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
                  {part.text}
                </mark>
              );
            }
          })}
        </div>
      );
    });
  };

  return (
    <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      {/* Strategic Top Banner Ad - Non-intrusive placement */}
      {/* 
      <div className="mb-6 no-print">
        <AdSenseUnit 
          adSlot="1234567890"
          adFormat="horizontal"
          style={{ minHeight: '90px' }}
          className="w-full"
          adTest={true}
        />
      </div>
      */}

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 lg:gap-6">
        {/* Main Tool Area */}
        <div className="xl:col-span-3 space-y-4 sm:space-y-6">
          {/* Tool Header */}
          <div className="text-center mb-4 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
              Word Counter Plus
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Analyze your text with advanced word counting and readability tools
            </p>
          </div>

          {/* File Information Display */}
          {uploadedFileInfo && (
            <div className="bg-green-50 dark:bg-green-950 rounded-lg p-4 border border-green-200 dark:border-green-800 mb-4">
              <h3 className="text-sm font-semibold text-green-800 dark:text-green-200 mb-2 flex items-center">
                <FaUpload className="mr-2" />
                File Analysis Complete
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-green-600 dark:text-green-400 font-medium">File:</span>
                  <p className="text-green-800 dark:text-green-200 break-all" data-testid="text-uploaded-filename">{uploadedFileInfo.name}</p>
                </div>
                <div>
                  <span className="text-green-600 dark:text-green-400 font-medium">Size:</span>
                  <p className="text-green-800 dark:text-green-200" data-testid="text-uploaded-filesize">
                    {Math.round(uploadedFileInfo.size / 1024)}KB ({uploadedFileInfo.size} bytes)
                  </p>
                </div>
                <div>
                  <span className="text-green-600 dark:text-green-400 font-medium">Type:</span>
                  <p className="text-green-800 dark:text-green-200" data-testid="text-uploaded-filetype">{uploadedFileInfo.type}</p>
                </div>
              </div>
            </div>
          )}

          {/* Text Input Area */}
          <div className="bg-card rounded-lg p-3 sm:p-6 shadow-sm border border-border">
            <div className="mb-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                <label htmlFor="textInput" className="text-base sm:text-lg font-semibold text-foreground">Enter Your Text</label>
                <div className="flex gap-2 w-full sm:w-auto">
                  {/* File Upload */}
                  <label className={`flex-1 sm:flex-none px-3 py-1.5 rounded text-sm transition-colors text-center ${
                    isUploading 
                      ? 'bg-primary/50 text-primary-foreground cursor-wait' 
                      : 'bg-primary text-primary-foreground hover:bg-primary/80 cursor-pointer'
                  }`}
                         data-testid="button-upload-file"
                         title="Upload text-based files: Text (.txt), Markdown (.md), HTML, RTF, CSV">
                    {isUploading ? (
                      <>
                        <div className="inline-block w-4 h-4 mr-1 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden="true" />
                        <span className="hidden sm:inline">Uploading...</span>
                        <span className="sm:hidden">Uploading...</span>
                      </>
                    ) : (
                      <>
                        <FaUpload className="inline mr-1" aria-hidden="true" />
                        <span className="hidden sm:inline">Upload</span>
                        <span className="sm:hidden">Upload File</span>
                      </>
                    )}
                    <input 
                      type="file" 
                      accept=".txt,.md,.markdown,.rtf,.html,.htm,.csv,text/plain,text/markdown,text/html,application/rtf,text/csv" 
                      onChange={handleFileUpload}
                      disabled={isUploading}
                      className="sr-only"
                      aria-label="Upload text-based files: Text (.txt), Markdown (.md), HTML, RTF, CSV"
                    />
                  </label>

                  {/* Clear Button */}
                  <button 
                    onClick={clearText}
                    className="flex-1 sm:flex-none px-3 py-1.5 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/80 transition-colors"
                    data-testid="button-clear-text"
                    aria-label="Clear all text"
                  >
                    <FaTrash className="inline mr-1" aria-hidden="true" />
                    Clear
                  </button>
                </div>
              </div>
            </div>
            
            {!isHighlighted ? (
              <div>
                {/* Hidden label for screen readers */}

                <textarea 
                  id="textInput"
                  aria-describedby="textHelp"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full h-48 sm:h-64 p-3 sm:p-4 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all text-sm sm:text-base" 
                  placeholder="Start typing or paste your text here to analyze it in real-time..."
                  
                  data-testid="textarea-text-input"
                />


                {/* Helper text (screen readers کے لیے) */}
                <p id="textHelp" className="sr-only">
                  Paste or type your text here. The tool will count words, characters, and show readability analysis in real-time.
                </p>
              </div>
            ) : (
              <div 
                className="w-full h-64 p-4 bg-background border border-border rounded-lg overflow-auto whitespace-pre-wrap"
                aria-label="Highlighted text with top keywords marked"
                data-testid="text-highlighted-preview"
              >
                {renderTextWithHighlights()}
              </div>
            )}


            {/* Word Limit Tracker */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Word Limit Progress</span>
                <div className="flex items-center gap-2">
                  <label htmlFor="wordLimit" className="sr-only">
                    Set word limit for analysis
                  </label>
                  <input 
                    id="wordLimit" 
                    type="number" 
                    value={wordLimit}
                    onChange={(e) => setWordLimit(parseInt(e.target.value) || 500)}
                    min="1" 
                    className="w-20 px-2 py-1 text-sm bg-background border border-border rounded"
                    data-testid="input-word-limit"
                  />
                  <span className="text-sm text-muted-foreground">words</span>
                </div>
              </div>

              {/* Accessible Progress Bar */}
              <div 
                className="progress-bar h-2 bg-muted rounded-full" 
                role="progressbar"
                aria-valuenow={stats.wordCount}
                aria-valuemin={0}
                aria-valuemax={wordLimit}
                aria-label="Word limit progress"
                style={{
                  '--progress': `${progressPercentage}%`,
                  background: `linear-gradient(90deg, ${getProgressBarColor(progressPercentage)} ${progressPercentage}%, var(--muted) ${progressPercentage}%)`
                } as React.CSSProperties}>
              </div>

              <p className="text-xs text-muted-foreground mt-1">
                <span data-testid="text-current-words">{stats.wordCount}</span> / 
                <span data-testid="text-word-limit">{wordLimit}</span> words
              </p>
            </div>

          </div>

          {/* Quick Actions */}
          {text.trim() && (
            <div className="bg-card rounded-lg p-3 sm:p-4 shadow-sm border border-border">
              <h3 className="text-sm sm:text-base font-medium text-foreground mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                <button 
                  onClick={copyToClipboard}
                  className="px-2 sm:px-3 py-1.5 bg-green-600 text-white rounded text-xs sm:text-sm hover:bg-green-700 transition-colors"
                  data-testid="button-copy-text"
                >
                  <FaCopy className="inline mr-1" />
                  Copy
                </button>
                <button 
                  onClick={convertToUppercase}
                  className="px-2 sm:px-3 py-1.5 bg-blue-600 text-white rounded text-xs sm:text-sm hover:bg-blue-700 transition-colors"
                  data-testid="button-uppercase"
                >
                  <span className="hidden sm:inline">UPPERCASE</span>
                  <span className="sm:hidden">UPPER</span>
                </button>
                <button 
                  onClick={convertToLowercase}
                  className="px-2 sm:px-3 py-1.5 bg-blue-600 text-white rounded text-xs sm:text-sm hover:bg-blue-700 transition-colors"
                  data-testid="button-lowercase"
                >
                  <span className="hidden sm:inline">lowercase</span>
                  <span className="sm:hidden">lower</span>
                </button>
                <button 
                  onClick={convertToTitleCase}
                  className="px-2 sm:px-3 py-1.5 bg-blue-600 text-white rounded text-xs sm:text-sm hover:bg-blue-700 transition-colors"
                  data-testid="button-titlecase"
                >
                  <span className="hidden sm:inline">Title Case</span>
                  <span className="sm:hidden">Title</span>
                </button>
                <button 
                  onClick={removeExtraSpaces}
                  className="px-2 sm:px-3 py-1.5 bg-purple-600 text-white rounded text-xs sm:text-sm hover:bg-purple-700 transition-colors"
                  data-testid="button-clean-spaces"
                >
                  <span className="hidden sm:inline">Clean Spaces</span>
                  <span className="sm:hidden">Clean</span>
                </button>
                <button 
                  onClick={sortLines}
                  className="px-2 sm:px-3 py-1.5 bg-purple-600 text-white rounded text-xs sm:text-sm hover:bg-purple-700 transition-colors"
                  data-testid="button-sort-lines"
                >
                  <FaSort className="inline mr-1" />
                  <span className="hidden sm:inline">Sort Lines</span>
                  <span className="sm:hidden">Sort</span>
                </button>
              </div>
            </div>
          )}

          {/* Real-time Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-8">
            <StatsCard value={stats.wordCount} label="Words" Icon={FaBook} iconColor="text-blue-600" />
            <StatsCard value={stats.charCount} label="Characters" Icon={FaCopy} iconColor="text-green-600" />
            <StatsCard value={stats.sentenceCount} label="Sentences" Icon={FaInfoCircle} iconColor="text-orange-600" />
            <StatsCard value={stats.paragraphCount} label="Paragraphs" Icon={FaCalendar} iconColor="text-purple-600" />
          </div>

          {/* Advanced Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
            {/* Readability Analysis */}
            <div className="bg-card rounded-lg p-3 sm:p-6 shadow-sm border border-border">
              <h2 className="text-base sm:text-lg font-semibold text-foreground mb-4">Readability Analysis</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Flesch-Kincaid Score</span>
                  <span className="font-semibold" data-testid="text-readability-score">{readability.score}</span>
                </div>
                <div className="flex justify-between items-center">
                  {/* <span className="text-muted-foreground">Reading Level</span>
                  <span className={`px-3 py-1 text-white rounded-full text-sm ${getReadingLevelColor(readability.score)}`} data-testid="text-reading-level">
                    {readability.level}
                  </span> */}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Reading Time</span>
                  <span className="font-semibold" data-testid="text-reading-time">~{readability.readingTime} min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Speaking Time</span>
                  <span className="font-semibold" data-testid="text-speaking-time">~{readability.speakingTime} min</span>
                </div>
              </div>
            </div>

            {/* Text Statistics */}
            <div className="bg-card rounded-lg p-3 sm:p-6 shadow-sm border border-border">
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">Text Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Average Word Length</span>
                  <span className="font-semibold" data-testid="text-avg-word-length">{stats.avgWordLength}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Longest Word</span>
                  <span className="font-semibold" data-testid="text-longest-word">{stats.longestWord || '-'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Shortest Word</span>
                  <span className="font-semibold" data-testid="text-shortest-word">{stats.shortestWord || '-'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Characters (no spaces)</span>
                  <span className="font-semibold" data-testid="text-char-no-spaces">{stats.charNoSpaces}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Features */}
          {text.trim() && (
            <div className="bg-card rounded-lg shadow-sm border border-border">
              <Tabs defaultValue="keywords" className="w-full">
                <div className="border-b border-border px-6 pt-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="keywords" aria-label='Keywords Tab' className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      <span className="hidden sm:inline">Keywords</span>
                    </TabsTrigger>
                    <TabsTrigger value="analytics" aria-label='Analytics Tab' className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      <span className="hidden sm:inline">Analytics</span>
                    </TabsTrigger>
                    <TabsTrigger value="seo" aria-label='SEO Tab' className="flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      <span className="hidden sm:inline">SEO</span>
                    </TabsTrigger>
                  </TabsList>
                </div>

              <div className="p-6">
                <TabsContent value="analytics" className="mt-0">
                  <Suspense fallback={<FeatureLoader />}>
                    <AdvancedAnalytics 
                      text={text}
                      wordCount={stats.wordCount}
                      sentenceCount={stats.sentenceCount}
                      paragraphCount={stats.paragraphCount}
                      readabilityScore={readability.score}
                    />
                  </Suspense>
                </TabsContent>

                <TabsContent value="seo" className="mt-0">
                  <Suspense fallback={<FeatureLoader />}>
                    <SEOAnalyzer 
                      text={text}
                      title="Word Counter Plus Analysis"
                      metaDescription="Advanced text analysis with professional insights"
                    />
                  </Suspense>
                </TabsContent>

                <TabsContent value="social" className="mt-0">
                  <Suspense fallback={<FeatureLoader />}>
                    <SocialMediaOptimizer 
                      text={text}
                      title="Check out my text analysis results!"
                    />
                  </Suspense>
                </TabsContent>

                <TabsContent value="competitor" className="mt-0">
                  <Suspense fallback={<FeatureLoader />}>
                    <CompetitorAnalysis 
                      text={text}
                      wordCount={stats.wordCount}
                      readabilityScore={readability.score}
                    />
                  </Suspense>
                </TabsContent>

                <TabsContent value="goals" className="mt-0">
                  <Suspense fallback={<FeatureLoader />}>
                    <ContentGoals 
                      wordCount={stats.wordCount}
                      readingTime={readability.readingTime}
                      readabilityScore={readability.score}
                    />
                  </Suspense>
                </TabsContent>

                <TabsContent value="keywords" className="mt-0">
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <h3 className="text-lg font-semibold text-foreground">Keyword Density Analysis</h3>
                      <div className="flex gap-2">
                        <button 
                          onClick={highlightKeywords}
                          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition-colors"
                          data-testid="button-highlight-keywords"
                        >
                          <FaHighlighter className="inline mr-2" aria-hidden="true" />
                          Highlight Keywords
                        </button>
                        <button 
                          onClick={clearHighlights}
                          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                          data-testid="button-clear-highlights"
                        >
                          <FaEraser className="inline mr-2" aria-hidden="true" />
                          Clear
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <KeywordTable title="Top Single Keywords" keywords={keywords.single} />
                      <KeywordTable title="Top Two-word Phrases" keywords={keywords.twoWord} />
                      <KeywordTable title="Top Three-word Phrases" keywords={keywords.threeWord} />
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
          )}

          {/* Export & Share Options */}
          <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Export & Share</h3>
            <ExportButtons text={text} stats={stats} readability={readability} keywords={keywords} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="xl:col-span-1 space-y-4 sm:space-y-6">
          {/* Strategic Sidebar Ad - Rectangle format */}
          {/* 
          <div className="no-print">
            <AdSenseUnit 
              adSlot="2345678901"
              adFormat="rectangle"
              style={{ minHeight: '250px' }}
              className="w-full"
              adTest={true}
            />
          </div>
          */}

          {/* Quick Tips */}
          <div className="bg-card rounded-lg p-3 sm:p-6 shadow-sm border border-border">
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">💡 Quick Tips</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
              <li className="flex items-start">
                <FaCheck className="text-primary mr-2 mt-0.5 flex-shrink-0" aria-label="Check Icon" />
                Keep sentences under 20 words for better readability
              </li>
              <li className="flex items-start">
                <FaCheck className="text-primary mr-2 mt-0.5 flex-shrink-0" aria-label="Check Icon" />
                Aim for 1-2% keyword density for SEO
              </li>
              <li className="flex items-start">
                <FaCheck className="text-primary mr-2 mt-0.5 flex-shrink-0" aria-label="Check Icon" />
                Use active voice for clearer writing
              </li>
              <li className="flex items-start">
                <FaCheck className="text-primary mr-2 mt-0.5 flex-shrink-0" aria-label="Check Icon" />
                Break up long paragraphs for better flow
              </li>
            </ul>
          </div>

          {/* Word Target Goals */}
          <div className="bg-card rounded-lg p-3 sm:p-6 shadow-sm border border-border">
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">📊 Word Count Goals</h3>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span>Blog Post</span>
                <span className="font-semibold">1,500-2,500</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span>Social Media</span>
                <span className="font-semibold">100-280</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span>Email Subject</span>
                <span className="font-semibold">6-10</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span>Meta Description</span>
                <span className="font-semibold">120-160</span>
              </div>
            </div>
          </div>

          {/* Strategic Sidebar Ad 2 - Skyscraper format */}
          {/* 
          <div className="no-print">
            <AdSenseUnit 
              adSlot="3456789012"
              adFormat="vertical"
              style={{ minHeight: '600px' }}
              className="w-full"
              adTest={true}
            />
          </div>
          */}
        </div>
      </div>
    </main>
  );
}