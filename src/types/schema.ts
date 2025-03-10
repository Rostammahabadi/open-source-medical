export type MedicalBill = {
  id: string;
  user_id: string;
  raw_text: string;
  procedure_codes: string[] | string; // Can be an array of strings or a string
  costs: number[] | string; // Can be an array of numbers or a string
  hospital_name: string;
  date_of_service: string;
  confidence_score: number;
  status: 'pending' | 'verified' | 'disputed';
  created_at: string;
  updated_at: string;
  published_at: string | null;
  verification_count: number;
  dispute_count: number;
};
