import { MedicalBillData, ValidationResult, ProcedureCode } from '@/types/medical';

const isValidCPTCode = (code: string): boolean => /^\d{5}$/.test(code);
const isValidICDCode = (code: string): boolean => /^[A-Z]\d{2}(\.\d{1,2})?$/.test(code);
const isValidHCPCSCode = (code: string): boolean => /^[A-Z]\d{4}$/.test(code);

const isValidCost = (cost: number): boolean => {
  return !isNaN(cost) && cost >= 0 && cost < 1000000; // Basic sanity check for costs
};

const isValidDate = (date: string): boolean => {
  const parsedDate = new Date(date);
  const now = new Date();
  return parsedDate instanceof Date && !isNaN(parsedDate.getTime()) && 
         parsedDate <= now && parsedDate >= new Date('2000-01-01');
};

export const validateProcedureCode = (code: ProcedureCode): boolean => {
  switch (code.type) {
    case 'CPT':
      return isValidCPTCode(code.code);
    case 'ICD':
      return isValidICDCode(code.code);
    case 'HCPCS':
      return isValidHCPCSCode(code.code);
    default:
      return code.code.length > 0;
  }
};

export const validateMedicalBillData = (data: MedicalBillData): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate procedure descriptions
  if (!data.procedureDescriptions.length) {
    errors.push('No procedure descriptions found');
  } else if (data.procedureDescriptions.some(desc => desc.length < 5)) {
    warnings.push('Some procedure descriptions are unusually short');
  }

  // Validate procedure codes
  if (data.procedureCodes.length) {
    data.procedureCodes.forEach((code, index) => {
      if (!validateProcedureCode(code)) {
        errors.push(`Invalid procedure code at index ${index}: ${code.code}`);
      }
    });
  } else {
    warnings.push('No procedure codes found');
  }

  // Validate costs
  if (!isValidCost(data.costs.total)) {
    errors.push('Invalid total cost');
  }
  if (!isValidCost(data.costs.subtotal)) {
    errors.push('Invalid subtotal cost');
  }
  if (data.costs.insurancePortion !== undefined && !isValidCost(data.costs.insurancePortion)) {
    errors.push('Invalid insurance portion');
  }
  if (data.costs.patientPortion !== undefined && !isValidCost(data.costs.patientPortion)) {
    errors.push('Invalid patient portion');
  }

  // Validate hospital name
  if (!data.hospitalName || data.hospitalName.length < 3) {
    errors.push('Invalid or missing hospital name');
  }

  // Validate date of service
  if (!isValidDate(data.dateOfService)) {
    errors.push('Invalid date of service');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    data: errors.length === 0 ? data : undefined
  };
};
