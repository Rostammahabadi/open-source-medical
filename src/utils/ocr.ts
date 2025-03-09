import { MedicalBillData, ProcedureCode, Cost } from '@/types/medical';

const extractProcedureCodes = (text: string): ProcedureCode[] => {
  const codes: ProcedureCode[] = [];
  
  // CPT codes (5 digits)
  const cptMatches = text.match(/\b\d{5}\b/g) || [];
  codes.push(...cptMatches.map(code => ({ code, type: 'CPT' as const })));

  // ICD-10 codes (letter followed by 2 digits, optional decimal and 1-2 digits)
  const icdMatches = text.match(/\b[A-Z]\d{2}(\.\d{1,2})?\b/g) || [];
  codes.push(...icdMatches.map(code => ({ code, type: 'ICD' as const })));

  // HCPCS codes (letter followed by 4 digits)
  const hcpcsMatches = text.match(/\b[A-Z]\d{4}\b/g) || [];
  codes.push(...hcpcsMatches.map(code => ({ code, type: 'HCPCS' as const })));

  return codes;
};

const extractCosts = (text: string): Cost => {
  const costs: Cost = {
    subtotal: 0,
    total: 0
  };

  // Look for currency amounts
  const amounts = text.match(/\$\s*\d+(?:,\d{3})*(?:\.\d{2})?/g) || [];
  const parsedAmounts = amounts.map(amount => 
    parseFloat(amount.replace(/[$,]/g, ''))
  ).sort((a, b) => b - a);

  if (parsedAmounts.length > 0) {
    costs.total = parsedAmounts[0]; // Highest amount is likely the total
    costs.subtotal = parsedAmounts[parsedAmounts.length - 1]; // Lowest amount is likely the subtotal

    // Look for insurance/patient portions
    const insuranceMatch = text.match(/insurance(?:.+?)\$\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/i);
    if (insuranceMatch) {
      costs.insurancePortion = parseFloat(insuranceMatch[1].replace(/,/g, ''));
    }

    const patientMatch = text.match(/patient(?:.+?)\$\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/i);
    if (patientMatch) {
      costs.patientPortion = parseFloat(patientMatch[1].replace(/,/g, ''));
    }
  }

  return costs;
};

const extractDate = (text: string): string => {
  // Look for common date formats
  const dateMatches = text.match(/\b\d{1,2}[-/]\d{1,2}[-/]\d{2,4}\b/g);
  if (dateMatches?.[0]) {
    try {
      const date = new Date(dateMatches[0]);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
      }
    } catch {
      // If date parsing fails, return empty string
    }
  }
  return '';
};

const extractHospitalName = (text: string): string => {
  // Look for common hospital indicators
  const hospitalIndicators = ['HOSPITAL', 'MEDICAL CENTER', 'HEALTH', 'CLINIC'];
  const lines = text.split('\n');
  
  for (const line of lines) {
    if (hospitalIndicators.some(indicator => line.toUpperCase().includes(indicator))) {
      return line.trim();
    }
  }
  
  return '';
};

const extractProcedureDescriptions = (text: string): string[] => {
  const descriptions: string[] = [];
  const lines = text.split('\n');
  
  // Look for lines that might be procedure descriptions
  for (const line of lines) {
    const trimmedLine = line.trim();
    // Skip short lines or lines that are likely headers/footers
    if (trimmedLine.length > 10 && 
        !trimmedLine.includes('$') && 
        !trimmedLine.includes('TOTAL') &&
        !trimmedLine.includes('DATE') &&
        !trimmedLine.match(/^\d+[\s\d]*$/)) {
      descriptions.push(trimmedLine);
    }
  }

  return descriptions;
};

export const processOCRResult = (
  text: string,
  confidence: number
): MedicalBillData => {
  return {
    procedureDescriptions: extractProcedureDescriptions(text),
    procedureCodes: extractProcedureCodes(text),
    costs: extractCosts(text),
    hospitalName: extractHospitalName(text),
    dateOfService: extractDate(text),
    rawText: text,
    confidence
  };
};
