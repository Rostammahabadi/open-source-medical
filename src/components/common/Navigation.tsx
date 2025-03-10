import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';

export const Navigation = () => {
  const { logout, isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      // Redirect to home page after logout instead of auth page
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="w-full">
      {/* This div ensures proper spacing below the fixed nav */}
      <div className="h-20"></div>
      
      {/* Fixed navigation */}
      <nav className="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 fixed w-full top-0 left-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center space-x-8">
              <Link 
                href="/"
                className="text-white font-bold text-2xl tracking-tight"
              >
                Medical Bills Platform
              </Link>
              <div className="flex space-x-2">
                <Link
                  href="/"
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    router.pathname === '/' 
                      ? 'text-blue-700 bg-white shadow-lg transform scale-105'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  Home
                </Link>
                {isAuthenticated && (
                  <Link
                    href="/upload"
                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      router.pathname === '/upload'
                        ? 'text-blue-700 bg-white shadow-lg transform scale-105'
                        : 'text-white hover:bg-white/20'
                    }`}
                  >
                    Upload
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className={`ml-4 px-6 py-2.5 text-sm font-medium text-indigo-700 bg-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                    isLoggingOut ? 'opacity-75 cursor-not-allowed' : 'hover:bg-gray-100'
                  }`}
                  aria-label="Logout"
                >
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </button>
              ) : (
                <Link
                  href="/auth"
                  className="ml-4 px-6 py-2.5 text-sm font-medium text-indigo-700 bg-white rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
