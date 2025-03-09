import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export const Hero = () => {
  const { isAuthenticated, isLoading, logout } = useAuth();

  return (
    <section aria-labelledby="hero-title">
      <h1 id="hero-title">CostCure</h1>
      <p>Empowering Transparent Healthcare Costs</p>
      <p>Upload and compare real hospital bills to find the best prices on medical procedures.</p>
      
      {isLoading ? (
        <div role="status" aria-live="polite">
          Loading...
        </div>
      ) : isAuthenticated ? (
        <div>
          <Link 
            href="/upload"
            role="button"
            tabIndex={0}
            aria-label="Upload a medical bill"
            onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.click()}
          >
            Upload a Bill
          </Link>
          <button
            onClick={() => logout()}
            aria-label="Log out"
            tabIndex={0}
          >
            Log Out
          </button>
        </div>
      ) : (
        <Link
          href="/auth"
          role="button"
          tabIndex={0}
          aria-label="Log in or create account"
        >
          Log In / Sign Up
        </Link>
      )}
    </section>
  );
};
