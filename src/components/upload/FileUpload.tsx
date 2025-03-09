import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFileUpload } from '@/hooks/useFileUpload';

export const FileUpload = () => {
  const { selectedFiles, isUploading, handleFileSelect, handleFileRemove, uploadFiles } = useFileUpload({
    onUploadSuccess: (data) => {
      console.log('Upload successful:', data);
    },
    onUploadError: (error) => {
      console.error('Upload failed:', error);
    }
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    handleFileSelect(acceptedFiles);
  }, [handleFileSelect]);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: true
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className="p-8 border-2 border-dashed border-gray-300 rounded-lg bg-white"
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <button
            type="button"
            onClick={open}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Select Files
          </button>
          <p className="mt-2 text-sm text-gray-500">or drag and drop</p>
          <p className="text-xs text-gray-500">PDF, PNG, JPG, DOC, DOCX</p>
        </div>

        {selectedFiles.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900">Selected files:</h4>
            <ul className="mt-2 divide-y divide-gray-200">
              {selectedFiles.map((file, index) => (
                <li key={index} className="py-3 flex justify-between items-center">
                  <span className="text-sm text-gray-500">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => handleFileRemove(index)}
                    className="text-sm text-red-600 hover:text-red-900"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <button
                type="button"
                onClick={uploadFiles}
                disabled={isUploading}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
              >
                {isUploading ? 'Uploading...' : 'Upload Files'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
