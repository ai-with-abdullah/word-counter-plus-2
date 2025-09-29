import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface FileUploadOptions {
  acceptedTypes?: string[];
  maxSizeInMB?: number;
  onSuccess?: (content: string, filename: string) => void;
  onError?: (error: string) => void;
}

export default function useFileUpload(options: FileUploadOptions = {}) {
  const {
    acceptedTypes = ['.txt', '.doc', '.docx', '.pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    maxSizeInMB = 10,
    onSuccess,
    onError
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const readTextFromFile = async (file: File): Promise<string> => {
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
      
      // Read as text for most file types
      if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        reader.readAsText(file);
      } else {
        // For other file types, try to read as text first
        // In a real implementation, you'd use libraries like mammoth for .docx, pdf-parse for .pdf
        reader.readAsText(file);
      }
    });
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
    <input
      ref={fileInputRef}
      type="file"
      accept={acceptedTypes.join(',')}
      onChange={handleInputChange}
      style={{ display: 'none' }}
      aria-label="Upload text file"
    />
  );

  return {
    isLoading,
    triggerFileUpload,
    FileInput
  };
}