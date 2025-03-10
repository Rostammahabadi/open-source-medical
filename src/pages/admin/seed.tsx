import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { seedMedicalBills } from '@/utils/seedDummyData';
import { Navigation } from '@/components/common/Navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import Head from 'next/head';
import { useRouter } from 'next/router';

const SeedPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; count?: number; error?: any } | null>(null);

  const handleSeedData = async () => {
    if (!user?.id) {
      setResult({ success: false, error: 'User not authenticated' });
      return;
    }

    setLoading(true);
    try {
      const seedResult = await seedMedicalBills(user.id);
      setResult(seedResult);
      
      if (seedResult.success) {
        // Wait 2 seconds then redirect to home page
        setTimeout(() => {
          router.push('/');
        }, 2000);
      }
    } catch (error) {
      setResult({ success: false, error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Seed Database | Medical Bills Platform</title>
      </Head>
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white shadow rounded-lg p-6">
                <h1 className="text-2xl font-semibold text-gray-900 mb-4">Seed Database with Sample Data</h1>
                <p className="mb-6 text-gray-600">
                  This will add sample medical bill data to your database for demonstration purposes.
                </p>
                
                <button
                  onClick={handleSeedData}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Seeding Database...' : 'Seed Database'}
                </button>
                
                {result && (
                  <div className={`mt-4 p-4 rounded-md ${result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {result.success ? (
                      <p>Successfully added {result.count} medical bills to the database. Redirecting to home page...</p>
                    ) : (
                      <p>Error: {result.error?.message || JSON.stringify(result.error)}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    </>
  );
};

export default SeedPage;
