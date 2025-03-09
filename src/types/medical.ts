export interface ProcedureCode {
  code: string;
  type: 'CPT' | 'ICD' | 'HCPCS' | 'OTHER';
}

export interface Cost {
  subtotal: number;
  insurancePortion?: number;
  patientPortion?: number;
  total: number;
}

export interface MedicalBillData {
  procedureDescriptions: string[];
  procedureCodes: ProcedureCode[];
  costs: Cost;
  hospitalName: string;
  dateOfService: string;
  rawText: string;
  confidence: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  data?: MedicalBillData;
}
