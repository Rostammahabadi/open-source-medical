import { useState } from 'react';

interface UseFileUploadProps {
  onUploadSuccess?: (data: any) => void;
  onUploadError?: (error: string) => void;
  onVerificationComplete?: (result: VerificationResult, fileIndex: number) => void;
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
  const [verifiedFiles, setVerifiedFiles] = useState<boolean[]>([]);
  const [invalidFiles, setInvalidFiles] = useState<boolean[]>([]);

  const handleFileSelect = async (files: File[]) => {
    try {
      const validFiles = files.filter(file => ALLOWED_FILE_TYPES.includes(file.type));
      const rejectedFiles = files.filter(file => !ALLOWED_FILE_TYPES.includes(file.type));
      
      if (rejectedFiles.length > 0) {
        const rejectedNames = rejectedFiles.map(f => f.name).join(', ');
        onUploadError?.(`Invalid file type(s): ${rejectedNames}. Only PDF and image files (PNG, JPEG, GIF, WEBP) are allowed.`);
      }

      if (validFiles.length === 0) {
        return;
      }

      const newFileStartIndex = selectedFiles.length;
      setSelectedFiles(prev => [...prev, ...validFiles]);
      setVerifiedFiles(prev => [...prev, ...Array(validFiles.length).fill(false)]);
      setInvalidFiles(prev => [...prev, ...Array(validFiles.length).fill(false)]);
      setPreviewUrls(prev => [...prev, ...Array(validFiles.length).fill('')]);
      
      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        const fileIndex = newFileStartIndex + i;
        try {
          if (file.type === 'application/pdf') {
            const imageUrl = await convertPdfToImage(file);
            setPreviewUrls(prev => {
              const newPreviews = [...prev];
              newPreviews[fileIndex] = imageUrl;
              return newPreviews;
            });
            await verifyDocument(imageUrl, fileIndex);
          } else {
            const url = URL.createObjectURL(file);
            setPreviewUrls(prev => {
              const newPreviews = [...prev];
              newPreviews[fileIndex] = url;
              return newPreviews;
            });
            const base64 = await getBase64FromUrl(url);
            await verifyDocument(base64, fileIndex);
          }
        } catch (error) {
          console.error('Failed to process file:', error);
          onUploadError?.(`Failed to process ${file.name}. Please ensure it is a valid medical document.`);
          setInvalidFiles(prev => {
            const newInvalid = [...prev];
            newInvalid[fileIndex] = true;
            return newInvalid;
          });
        }
      }
    } catch (error) {
      console.error('File selection error:', error);
      onUploadError?.('Failed to process files. Please try again.');
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
    setVerifiedFiles(prev => prev.filter((_, i) => i !== index));
    setInvalidFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!selectedFiles.length) {
      onUploadError?.('Please select at least one medical document to upload.');
      return;
    }

    if (invalidFiles.some(Boolean)) {
      onUploadError?.('Please remove invalid files before submitting.');
      return;
    }

    const unverifiedCount = selectedFiles.length - verifiedFiles.filter(Boolean).length;
    if (unverifiedCount > 0) {
      onUploadError?.('Please wait for all documents to be verified before submitting.');
      return;
    }

    setIsUploading(true);
    try {
      // Here you would implement the actual upload logic
      onUploadSuccess?.(selectedFiles);
    } catch (error) {
      console.error('Upload error:', error);
      onUploadError?.('Failed to upload files. Please try again.');
    } finally {
      setIsUploading(false);
    }
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
      throw new Error('Failed to process PDF. Please ensure it is a valid document.');
    }
  };

  const verifyDocument = async (imageUrl: string, fileIndex: number) => {
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
      if (!result.isLegitimate) {
        setInvalidFiles(prev => {
          const newInvalid = [...prev];
          newInvalid[fileIndex] = true;
          return newInvalid;
        });
        onUploadError?.(`${selectedFiles[fileIndex].name} is not a valid medical document. Please remove it or upload a valid medical document.`);
      } else {
        setVerifiedFiles(prev => {
          const newVerified = [...prev];
          newVerified[fileIndex] = true;
          return newVerified;
        });
      }
      onVerificationComplete?.(result, fileIndex);
      return result;
    } catch (error) {
      console.error('Document verification error:', error);
      onUploadError?.(`Failed to verify ${selectedFiles[fileIndex].name}. Please try again.`);
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
    verifiedFiles,
    invalidFiles,
    handleFileSelect,
    handleFileRemove,
    handleSubmit
  };
};
