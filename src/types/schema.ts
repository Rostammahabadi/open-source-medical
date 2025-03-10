export interface MedicalBillData {
  id?: string; // UUID
  user_id?: string; // UUID
  rawText: string;
  procedureDescriptions: string[]; // Array from JSONB
  procedureCodes: { code: string; type: string }[]; // Array from JSONB
  costs: {
    subtotal?: number;
    total?: number;
    insured_amount?: number;
    patient_responsibility?: number;
  };
  hospitalName: string;
  dateOfService: string; // ISO string for TIMESTAMPTZ
  confidence: number; // 0 to 1
  status: 'pending' | 'verified' | 'disputed' | 'rejected';
  insuranceProvider?: string;
  insurancePolicyId?: string;
  claimId?: string;
  patientResponsibility?: number;
  insuredAmount?: number;
  negotiatedRate?: number;
  isTransparent?: boolean;
  notes?: string;
  sourceFilePath?: string;
}
