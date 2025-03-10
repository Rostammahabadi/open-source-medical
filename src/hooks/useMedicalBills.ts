import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { MedicalBill } from '@/types/schema';

export const useMedicalBills = (searchTerm: string = '') => {
  const [bills, setBills] = useState<MedicalBill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true);
        
        let query = supabase
          .from('medical_bills')
          .select('*')
          .order('created_at', { ascending: false });
        
        // Apply search filter if searchTerm exists
        if (searchTerm) {
          query = query.or(
            `hospital_name.ilike.%${searchTerm}%,raw_text.ilike.%${searchTerm}%`
          );
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        setBills(data || []);
      } catch (err) {
        console.error('Error fetching medical bills:', err);
        setError('Failed to load medical bills');
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, [searchTerm]);

  return { bills, loading, error };
};
