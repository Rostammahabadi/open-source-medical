import React, { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFileUpload } from '@/hooks/useFileUpload';

interface VerificationResult {
  index: number;
  result: string;
  isLegitimate: boolean;
}

const ACCEPTED_FILE_TYPES = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/gif': ['.gif'],
  'image/webp': ['.webp'],
  'application/pdf': ['.pdf']
};

export const FileUpload: React.FC = () => {
  const [verifications, setVerifications] = useState<VerificationResult[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { selectedFiles, previewUrls, isVerifying, handleFileSelect, handleFileRemove } = useFileUpload({
    onVerificationComplete: (result) => {
      setVerifications(prev => [...prev, { ...result, index: selectedFiles.length - 1 }]);
    },
    onUploadError: (error) => {
      console.error('Upload error:', error);
    }
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    handleFileSelect(acceptedFiles);
  }, [handleFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    multiple: true,
    noClick: true
  });

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} ref={fileInputRef} />
        <button
          type="button"
          onClick={handleButtonClick}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label="Select files to upload"
        >
          Select Files
        </button>
        <p className="text-gray-600 mt-2">
          {isDragActive
            ? 'Drop the files here...'
            : 'or drag and drop files here'}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Accepted formats: PDF, PNG, JPEG, GIF, WEBP
        </p>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900">Selected files</h3>
          <ul className="mt-4 space-y-4">
            {selectedFiles.map((file, index) => (
              <li key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{file.name}</span>
                  <button
                    onClick={() => handleFileRemove(index)}
                    className="text-sm text-red-600 hover:text-red-700"
                    aria-label={`Remove ${file.name}`}
                  >
                    Remove
                  </button>
                </div>
                {previewUrls[index] && (
                  <div className="mt-4">
                    {isVerifying && index === selectedFiles.length - 1 && (
                      <p className="mt-2 text-sm text-gray-500" role="status">
                        Verifying document...
                      </p>
                    )}
                    {verifications.find(v => v.index === index) && (
                      <div 
                        className={`mt-2 p-3 rounded-md ${
                          verifications.find(v => v.index === index)?.isLegitimate 
                            ? 'bg-green-50 text-green-700' 
                            : 'bg-red-50 text-red-700'
                        }`}
                        role="status"
                        aria-live="polite"
                      >
                        <p className="text-sm">
                          {verifications.find(v => v.index === index)?.result}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
