import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Navigation } from '@/components/common/Navigation';
import { MedicalBillsTable } from '@/components/features/home/MedicalBillsTable';
import { FilterParams } from '@/hooks/useMedicalBills';
import Head from 'next/head';

const ResultsPage = () => {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState<FilterParams>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;

    const { state, city, procedure, insurance, cashPrice } = router.query;
    
    setSearchParams({
      state: state as string,
      city: city as string,
      procedure: procedure as string,
      insurance: insurance as string,
      cashPrice: cashPrice === 'true',
    });
    
    setIsLoading(false);
  }, [router.isReady, router.query]);

  const getSearchDescription = () => {
    const parts = [];
    
    if (searchParams.procedure) {
      parts.push(`Procedure: ${searchParams.procedure}`);
    }
    
    if (searchParams.city && searchParams.state) {
      parts.push(`Location: ${searchParams.city}, ${searchParams.state}`);
    } else if (searchParams.state) {
      parts.push(`State: ${searchParams.state}`);
    }
    
    if (searchParams.insurance) {
      parts.push(`Insurance: ${searchParams.insurance}`);
    } else if (searchParams.cashPrice) {
      parts.push('Cash prices only');
    }
    
    return parts.length > 0 
      ? parts.join(' • ') 
      : 'All medical bills';
  };

  return (
    <>
      <Head>
        <title>Search Results | Medical Bills Platform</title>
        <meta
          name="description"
          content="View search results for medical procedures and costs."
        />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Search Results</h1>
                {!isLoading && (
                  <p className="mt-1 text-sm text-gray-500">
                    {getSearchDescription()}
                  </p>
                )}
              </div>
              <button
                onClick={() => router.push('/')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                New Search
              </button>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <svg
                  className="animate-spin h-8 w-8 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            ) : (
              <MedicalBillsTable filters={searchParams} />
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default ResultsPage;
