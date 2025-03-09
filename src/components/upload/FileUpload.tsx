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
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { 
    selectedFiles, 
    isUploading,
    isVerifying, 
    verifiedFiles,
    invalidFiles,
    handleFileSelect, 
    handleFileRemove,
    handleSubmit 
  } = useFileUpload({
    onVerificationComplete: (result, fileIndex) => {
      setVerifications(prev => [...prev, { ...result, index: fileIndex }]);
    },
    onUploadError: (error) => {
      setError(error);
      setTimeout(() => setError(null), 5000);
    },
    onUploadSuccess: (files) => {
      console.log('Files uploaded successfully:', files);
      setError(null);
    }
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
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
      {error && (
        <div className="mb-4 p-4 rounded-md bg-red-50 border border-red-200" role="alert">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      
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
          Accepted formats: PDF, PNG, JPEG, GIF, WEBP (Medical documents only)
        </p>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900">Selected files</h3>
          <ul className="mt-4 space-y-4">
            {selectedFiles.map((file, index) => (
              <li key={index} className={`bg-white p-4 rounded-lg shadow-sm ${invalidFiles[index] ? 'border border-red-300' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${invalidFiles[index] ? 'text-red-600' : 'text-gray-500'}`}>
                      {file.name}
                    </span>
                    {verifiedFiles[index] && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        Verified
                      </span>
                    )}
                    {invalidFiles[index] && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                        Invalid
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleFileRemove(index)}
                    className={`text-sm ${invalidFiles[index] ? 'text-red-600 hover:text-red-700' : 'text-gray-600 hover:text-gray-700'}`}
                    aria-label={`Remove ${file.name}`}
                  >
                    Remove
                  </button>
                </div>
                <div className="mt-4">
                  {isVerifying && index === selectedFiles.length - 1 && (
                    <p className="text-sm text-gray-500" role="status">
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
              </li>
            ))}
          </ul>
          
          <div className="mt-6">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isUploading || isVerifying || selectedFiles.length === 0 || invalidFiles.some(Boolean)}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isUploading || isVerifying || selectedFiles.length === 0 || invalidFiles.some(Boolean)
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
              aria-label="Submit verified documents"
            >
              {isUploading ? 'Uploading...' : 'Submit'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
