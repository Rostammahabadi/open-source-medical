import { ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';

interface AuthProviderProps {
  children: ReactNode;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  return <>{children}</>;
};
