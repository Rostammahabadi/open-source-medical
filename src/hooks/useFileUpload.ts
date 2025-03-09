import { useState } from 'react';

interface UseFileUploadProps {
  onUploadSuccess?: (data: any) => void;
  onUploadError?: (error: string) => void;
  onVerificationComplete?: (result: VerificationResult) => void;
}

interface VerificationResult {
  result: string;
  isLegitimate: boolean;
}

const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'application/pdf'];

export const useFileUpload = ({ onUploadSuccess, onUploadError, onVerificationComplete }: UseFileUploadProps = {}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleFileSelect = async (files: File[]) => {
    try {
      const validFiles = files.filter(file => ALLOWED_FILE_TYPES.includes(file.type));
      const rejectedFiles = files.filter(file => !ALLOWED_FILE_TYPES.includes(file.type));
      
      if (rejectedFiles.length > 0) {
        const rejectedNames = rejectedFiles.map(f => f.name).join(', ');
        onUploadError?.(`Rejected files: ${rejectedNames}. Only PDF and image files (PNG, JPEG, GIF, WEBP) are allowed.`);
      }

      if (validFiles.length === 0) {
        return;
      }

      setSelectedFiles(validFiles);
      setPreviewUrls([]);
      
      for (const file of validFiles) {
        try {
          if (file.type === 'application/pdf') {
            const imageUrl = await convertPdfToImage(file);
            setPreviewUrls(prev => [...prev, imageUrl]);
            await verifyDocument(imageUrl);
          } else {
            const url = URL.createObjectURL(file);
            setPreviewUrls(prev => [...prev, url]);
            const base64 = await getBase64FromUrl(url);
            await verifyDocument(base64);
          }
        } catch (error) {
          console.error('Failed to process file:', error);
          onUploadError?.(`Failed to process ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
    } catch (error) {
      console.error('File selection error:', error);
      onUploadError?.(error instanceof Error ? error.message : 'File selection failed');
    }
  };

  const getBase64FromUrl = async (url: string): Promise<string> => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch image');
      
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          resolve(base64String);
        };
        reader.onerror = () => reject(new Error('Failed to convert image to base64'));
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Base64 conversion error:', error);
      throw error;
    }
  };

  const handleFileRemove = (index: number) => {
    if (previewUrls[index]) {
      URL.revokeObjectURL(previewUrls[index]);
    }
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const convertPdfToImage = async (file: File): Promise<string> => {
    try {
      const pdfjsLib = await import('pdfjs-dist');
      if (typeof window !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
      }

      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (!context) throw new Error('Could not get canvas context');
      
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({
        canvasContext: context,
        viewport: viewport
      }).promise;

      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('PDF conversion error:', error);
      throw new Error(`Failed to convert PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const verifyDocument = async (imageUrl: string) => {
    try {
      setIsVerifying(true);
      const response = await fetch('/api/verify-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageBase64: imageUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to verify document');
      }

      const result = await response.json();
      onVerificationComplete?.(result);
      return result;
    } catch (error) {
      console.error('Document verification error:', error);
      onUploadError?.(error instanceof Error ? error.message : 'Document verification failed');
      throw error;
    } finally {
      setIsVerifying(false);
    }
  };

  return {
    selectedFiles,
    isUploading,
    isVerifying,
    previewUrls,
    handleFileSelect,
    handleFileRemove
  };
};
