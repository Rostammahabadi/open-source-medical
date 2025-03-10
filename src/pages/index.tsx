import { Navigation } from '@/components/common/Navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
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
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="pt-24">
          </main>
        </div>
      </ProtectedRoute>
    </>
  );
};

export default HomePage;
