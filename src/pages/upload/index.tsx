import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { FileUpload } from '@/components/upload/FileUpload';

const formatFileSize = (bytes: number): string => {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

const UploadPage = () => {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Upload Medical Bills</h1>
        <p className="text-gray-600 mb-8">
          Upload your medical bills to help others understand healthcare costs.
          We accept PDF files and images.
        </p>
        <FileUpload />
      </div>
    </ProtectedRoute>
  );
};

export default UploadPage;
