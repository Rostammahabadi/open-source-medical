import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';

export default function Auth() {
  const router = useRouter();
  const { login, signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isSigningUp) {
        await signup(email, password);
        setError('Please check your email to verify your account.');
      } else {
        await login(email, password);
        router.push('/');
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred during authentication');
    }
  };

  return (
    <main>
      <div>
        <h1>{isSigningUp ? 'Create Account' : 'Log In'}</h1>
        
        {error && (
          <div role="alert" aria-live="polite">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
              minLength={6}
            />
          </div>

          <button type="submit">
            {isSigningUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        <button 
          type="button"
          onClick={() => setIsSigningUp(!isSigningUp)}
        >
          {isSigningUp ? 'Already have an account? Log in' : 'Need an account? Sign up'}
        </button>
      </div>
    </main>
  );
}
