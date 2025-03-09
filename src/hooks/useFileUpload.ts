import { useState } from 'react';

interface UseFileUploadProps {
  onUploadSuccess?: (data: any) => void;
  onUploadError?: (error: string) => void;
}

export const useFileUpload = ({ onUploadSuccess, onUploadError }: UseFileUploadProps = {}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handleFileRemove = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      selectedFiles.forEach(file => {
        formData.append('file', file);
      });

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const data = await response.json();
      setSelectedFiles([]);
      onUploadSuccess?.(data);
    } catch (error) {
      onUploadError?.(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return {
    selectedFiles,
    isUploading,
    handleFileSelect,
    handleFileRemove,
    uploadFiles
  };
};
