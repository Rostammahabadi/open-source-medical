import { Navigation } from '@/components/common/Navigation';
import { MedicalBillsTable } from '@/components/features/home/MedicalBillsTable';
import { GuidedSearchEntry } from '@/components/features/home/GuidedSearchEntry';
import Head from 'next/head';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Medical Bills Platform</title>
        <meta
          name="description"
          content="Upload and compare real hospital bills to find the best prices on medical procedures."
        />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Medical Bills Database</h1>
            <p className="mt-1 text-sm text-gray-500 mb-6">
              Search and compare medical bills from various hospitals and procedures.
            </p>
            <GuidedSearchEntry />
          </div>
          <MedicalBillsTable />
        </main>
      </div>
    </>
  );
};

export default HomePage;
