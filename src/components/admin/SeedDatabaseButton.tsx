import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export const SeedDatabaseButton = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; count?: number; error?: any } | null>(null);

  const handleSeedData = async () => {
    if (!user?.id) {
      setResult({ success: false, error: 'User not authenticated' });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/seed-database', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to seed database');
      }
      
      setResult({ success: true, count: data.count });
      
      // Reload the page after 2 seconds to show the new data
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error seeding database:', error);
      setResult({ success: false, error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <button
        onClick={handleSeedData}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Adding Sample Data...' : 'Add Sample Data'}
      </button>
      
      {result && (
        <div className={`mt-4 p-4 rounded-md ${result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {result.success ? (
            <p>Successfully added {result.count} medical bills to the database. Refreshing page...</p>
          ) : (
            <p>Error: {result.error?.message || JSON.stringify(result.error)}</p>
          )}
        </div>
      )}
    </div>
  );
};
