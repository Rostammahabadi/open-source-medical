import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { MedicalBillData } from '@/types/schema';

export type SortField = 'hospital_id' | 'date_of_service' | 'patient_responsibility_numeric' | 'status' | 'confidence_score' | 'created_at' | 'raw_text';
export type SortDirection = 'asc' | 'desc';

export interface FilterParams {
  state?: string;
  city?: string;
  procedure?: string;
  insurance?: string;
  cashPrice?: boolean;
}

export const useMedicalBills = (
  searchTerm: string = '',
  sortField: SortField = 'created_at',
  sortDirection: SortDirection = 'desc',
  filters: FilterParams = {}
) => {
  const [bills, setBills] = useState<MedicalBillData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Use refs to prevent dependency array issues
  const searchTermRef = useRef(searchTerm);
  const sortFieldRef = useRef(sortField);
  const sortDirectionRef = useRef(sortDirection);
  const filtersRef = useRef(filters);
  
  // Update refs when props change
  useEffect(() => {
    searchTermRef.current = searchTerm;
    sortFieldRef.current = sortField;
    sortDirectionRef.current = sortDirection;
    filtersRef.current = filters;
  }, [searchTerm, sortField, sortDirection, filters]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true);
        
        // Use ref values to prevent dependency issues
        const currentSearchTerm = searchTermRef.current;
        const currentSortField = sortFieldRef.current;
        const currentSortDirection = sortDirectionRef.current;
        const currentFilters = filtersRef.current;
        
        // First, if we have location filters, get the hospital IDs that match
        let hospitalIds: string[] = [];
        
        if (currentFilters.state || currentFilters.city) {
          let hospitalQuery = supabase.from('hospitals').select('id');
          
          if (currentFilters.state) {
            hospitalQuery = hospitalQuery.filter('address->>state', 'eq', currentFilters.state);
          }
          
          if (currentFilters.city) {
            hospitalQuery = hospitalQuery.filter('address->>city', 'eq', currentFilters.city);
          }
          
          const { data: hospitalData, error: hospitalError } = await hospitalQuery;
          
          if (hospitalError) throw hospitalError;
          
          if (hospitalData && hospitalData.length > 0) {
            hospitalIds = hospitalData.map(hospital => hospital.id);
          } else {
            // No hospitals match the criteria, return empty result
            setBills([]);
            setLoading(false);
            return;
          }
        }
        
        // Join with hospitals table to get hospital names
        let query = supabase
          .from('medical_bills')
          .select(`
            *,
            hospitals:hospital_id (
              name,
              address
            )
          `)
          .order(currentSortField, { ascending: currentSortDirection === 'asc' });
        
        // Apply hospital filter if we have location filters
        if (hospitalIds.length > 0) {
          query = query.in('hospital_id', hospitalIds);
        }
        
        // Apply search filter if searchTerm exists
        if (currentSearchTerm) {
          query = query.or(
            `hospitals.name.ilike.%${currentSearchTerm}%,raw_text.ilike.%${currentSearchTerm}%,procedure_descriptions.ilike.%${currentSearchTerm}%`
          );
        }
        
        // Apply procedure filter if it exists
        if (currentFilters.procedure) {
          query = query.filter('procedure_codes', 'cs', `{"code":"${currentFilters.procedure}"}`);
        }
        
        // Apply insurance filter if it exists
        if (currentFilters.insurance) {
          query = query.filter('insurance_provider', 'eq', currentFilters.insurance);
        } else if (currentFilters.cashPrice) {
          // If cashPrice is true and no insurance is selected, only show bills without insurance
          query = query.filter('insurance_provider', 'is', null);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        // Transform data to match our MedicalBillData interface
        const transformedData = data?.map(bill => ({
          id: bill.id,
          user_id: bill.user_id,
          rawText: bill.raw_text || '',
          procedureDescriptions: bill.procedure_descriptions ? 
            (typeof bill.procedure_descriptions === 'string' ? 
              JSON.parse(bill.procedure_descriptions) : 
              bill.procedure_descriptions) : [],
          procedureCodes: bill.procedure_codes ? 
            (typeof bill.procedure_codes === 'string' ? 
              JSON.parse(bill.procedure_codes) : 
              bill.procedure_codes) : [],
          costs: {
            total: bill.costs?.total || bill.patient_responsibility_numeric,
            insured_amount: bill.insured_amount_numeric,
            patient_responsibility: bill.patient_responsibility_numeric,
            negotiated_rate: bill.negotiated_rate
          },
          hospitalName: bill.hospitals?.name || 'Unknown Hospital',
          dateOfService: bill.date_of_service,
          confidence: bill.confidence_score,
          status: bill.status,
          insuranceProvider: bill.insurance_provider,
          insurancePolicyId: bill.insurance_policy_id,
          claimId: bill.claim_id,
          patientResponsibility: bill.patient_responsibility_numeric,
          insuredAmount: bill.insured_amount_numeric,
          negotiatedRate: bill.negotiated_rate,
          isTransparent: bill.is_transparent,
          notes: bill.notes,
          sourceFilePath: bill.source_file_path
        })) || [];
        
        setBills(transformedData);
      } catch (err) {
        console.error('Error fetching medical bills:', err);
        setError('Failed to load medical bills');
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
    
    // Empty dependency array to run only once on mount
    // The refs will handle updates to dependencies
  }, []);

  return { bills, loading, error };
};
