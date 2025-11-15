import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

// Configure PDF.js worker - use local worker file instead of CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export interface FileUploadOptions {
  acceptedTypes?: string[];
  maxSizeInMB?: number;
  onSuccess?: (content: string, filename: string) => void;
  onError?: (error: string) => void;
}

export default function useFileUpload(options: FileUploadOptions = {}) {
  const {
    acceptedTypes = [
      '.txt', '.docx', '.pdf', '.rtf', '.md', '.csv', '.html',
      'text/plain', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/pdf',
      'text/rtf',
      'text/markdown',
      'text/csv',
      'text/html'
    ],
    maxSizeInMB = 10,
    onSuccess,
    onError
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const readTextFromFile = async (file: File): Promise<string> => {
    const fileName = file.name.toLowerCase();
    
    // Handle PDF files
    if (file.type === 'application/pdf' || fileName.endsWith('.pdf')) {
      return await extractTextFromPDF(file);
    }
    
    // Handle Word documents (.docx)
    if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileName.endsWith('.docx')) {
      return await extractTextFromDocx(file);
    }
    
    // Handle plain text files
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          resolve(result);
        } else {
          reject(new Error('Failed to read file as text'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };
      
      reader.readAsText(file);
    });
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }

    return fullText.trim();
  };

  const extractTextFromDocx = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  };

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    
    try {
      // Check file size
      if (file.size > maxSizeInMB * 1024 * 1024) {
        throw new Error(`File size must be less than ${maxSizeInMB}MB`);
      }

      // Check file type
      const isValidType = acceptedTypes.some(type => 
        type.startsWith('.') ? file.name.toLowerCase().endsWith(type.toLowerCase()) : 
        file.type === type
      );

      if (!isValidType) {
        throw new Error(`Please upload a valid file type: ${acceptedTypes.join(', ')}`);
      }

      // Read file content
      const content = await readTextFromFile(file);
      
      if (!content.trim()) {
        throw new Error('File appears to be empty or contains no readable text');
      }

      // Success callback
      if (onSuccess) {
        onSuccess(content, file.name);
      }

      toast({
        title: "File Uploaded Successfully",
        description: `"${file.name}" has been processed and text content loaded.`,
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      if (onError) {
        onError(errorMessage);
      }

      toast({
        title: "Upload Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      // Clear the input so the same file can be uploaded again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const FileInput = () => (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={handleInputChange}
        style={{ display: 'none' }}
        aria-label="Upload text file"
      />
      {/* Full-page loading overlay */}
      {isLoading && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          data-testid="upload-loading-overlay"
        >
          <LoadingSpinner size="md" text="Uploading..." />
        </div>
      )}
    </>
  );

  return {
    isLoading,
    triggerFileUpload,
    FileInput
  };
}