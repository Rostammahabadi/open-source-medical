import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';
import { MedicalBill } from '@/types/schema';

type MedicalBillSeed = Omit<MedicalBill, 'id' | 'created_at' | 'updated_at'>;

// Sample data for medical bills
const medicalBillsData: Omit<MedicalBillSeed, 'user_id'>[] = [
  {
    raw_text: "Mayo Clinic\nPatient: John Doe\nDate: 12/15/2024\nProcedure: MRI Scan - Brain\nTotal: $2,800.00",
    procedure_codes: ["70551"],
    costs: [2800.00],
    hospital_name: "Mayo Clinic",
    date_of_service: "2024-12-15",
    confidence_score: 0.95,
    status: "verified",
    published_at: "2024-12-16",
    verification_count: 3,
    dispute_count: 0
  },
  {
    raw_text: "Cleveland Clinic\nPatient: Jane Smith\nDate: 11/22/2024\nProcedure: Colonoscopy\nTotal: $3,200.00",
    procedure_codes: ["45378"],
    costs: [3200.00],
    hospital_name: "Cleveland Clinic",
    date_of_service: "2024-11-22",
    confidence_score: 0.92,
    status: "verified",
    published_at: "2024-11-25",
    verification_count: 5,
    dispute_count: 0
  },
  {
    raw_text: "Johns Hopkins Hospital\nPatient: Robert Johnson\nDate: 01/05/2025\nProcedure: CT Scan - Chest\nTotal: $1,950.00",
    procedure_codes: ["71260"],
    costs: [1950.00],
    hospital_name: "Johns Hopkins Hospital",
    date_of_service: "2025-01-05",
    confidence_score: 0.88,
    status: "pending",
    published_at: null,
    verification_count: 0,
    dispute_count: 0
  },
  {
    raw_text: "Massachusetts General Hospital\nPatient: Emily Wilson\nDate: 10/18/2024\nProcedure: Appendectomy\nTotal: $18,500.00",
    procedure_codes: ["44950"],
    costs: [18500.00],
    hospital_name: "Massachusetts General Hospital",
    date_of_service: "2024-10-18",
    confidence_score: 0.97,
    status: "verified",
    published_at: "2024-10-20",
    verification_count: 8,
    dispute_count: 0
  },
  {
    raw_text: "UCSF Medical Center\nPatient: Michael Brown\nDate: 02/03/2025\nProcedure: Physical Therapy Session\nTotal: $250.00",
    procedure_codes: ["97110"],
    costs: [250.00],
    hospital_name: "UCSF Medical Center",
    date_of_service: "2025-02-03",
    confidence_score: 0.91,
    status: "verified",
    published_at: "2025-02-04",
    verification_count: 2,
    dispute_count: 0
  },
  {
    raw_text: "Mayo Clinic\nPatient: Sarah Davis\nDate: 09/25/2024\nProcedure: Knee Replacement Surgery\nTotal: $32,000.00",
    procedure_codes: ["27447"],
    costs: [32000.00],
    hospital_name: "Mayo Clinic",
    date_of_service: "2024-09-25",
    confidence_score: 0.98,
    status: "verified",
    published_at: "2024-09-28",
    verification_count: 12,
    dispute_count: 0
  },
  {
    raw_text: "Stanford Health Care\nPatient: David Miller\nDate: 01/12/2025\nProcedure: Cardiac Stress Test\nTotal: $1,200.00",
    procedure_codes: ["93015"],
    costs: [1200.00],
    hospital_name: "Stanford Health Care",
    date_of_service: "2025-01-12",
    confidence_score: 0.86,
    status: "disputed",
    published_at: "2025-01-14",
    verification_count: 1,
    dispute_count: 2
  },
  {
    raw_text: "NYU Langone Health\nPatient: Lisa Taylor\nDate: 12/05/2024\nProcedure: Endoscopy\nTotal: $2,800.00",
    procedure_codes: ["43235"],
    costs: [2800.00],
    hospital_name: "NYU Langone Health",
    date_of_service: "2024-12-05",
    confidence_score: 0.89,
    status: "pending",
    published_at: null,
    verification_count: 0,
    dispute_count: 0
  },
  {
    raw_text: "Cleveland Clinic\nPatient: Thomas Anderson\nDate: 02/18/2025\nProcedure: MRI Scan - Knee\nTotal: $2,400.00",
    procedure_codes: ["73721"],
    costs: [2400.00],
    hospital_name: "Cleveland Clinic",
    date_of_service: "2025-02-18",
    confidence_score: 0.94,
    status: "verified",
    published_at: "2025-02-20",
    verification_count: 4,
    dispute_count: 0
  },
  {
    raw_text: "Mount Sinai Hospital\nPatient: Jennifer White\nDate: 11/10/2024\nProcedure: Childbirth - Vaginal Delivery\nTotal: $15,000.00",
    procedure_codes: ["59400"],
    costs: [15000.00],
    hospital_name: "Mount Sinai Hospital",
    date_of_service: "2024-11-10",
    confidence_score: 0.96,
    status: "verified",
    published_at: "2024-11-12",
    verification_count: 7,
    dispute_count: 0
  },
  {
    raw_text: "Johns Hopkins Hospital\nPatient: Amanda Clark\nDate: 01/22/2025\nProcedure: Chemotherapy Session\nTotal: $8,500.00",
    procedure_codes: ["96413"],
    costs: [8500.00],
    hospital_name: "Johns Hopkins Hospital",
    date_of_service: "2025-01-22",
    confidence_score: 0.93,
    status: "pending",
    published_at: null,
    verification_count: 0,
    dispute_count: 0
  },
  {
    raw_text: "Cedars-Sinai Medical Center\nPatient: Kevin Martinez\nDate: 10/30/2024\nProcedure: Gallbladder Removal\nTotal: $14,200.00",
    procedure_codes: ["47562"],
    costs: [14200.00],
    hospital_name: "Cedars-Sinai Medical Center",
    date_of_service: "2024-10-30",
    confidence_score: 0.95,
    status: "verified",
    published_at: "2024-11-01",
    verification_count: 6,
    dispute_count: 0
  },
  {
    raw_text: "Mayo Clinic\nPatient: Susan Wilson\nDate: 02/08/2025\nProcedure: Annual Physical Exam\nTotal: $350.00",
    procedure_codes: ["99395"],
    costs: [350.00],
    hospital_name: "Mayo Clinic",
    date_of_service: "2025-02-08",
    confidence_score: 0.90,
    status: "verified",
    published_at: "2025-02-09",
    verification_count: 3,
    dispute_count: 0
  },
  {
    raw_text: "UCSF Medical Center\nPatient: Rachel Green\nDate: 12/22/2024\nProcedure: Childbirth - C-Section\nTotal: $25,000.00",
    procedure_codes: ["59510"],
    costs: [25000.00],
    hospital_name: "UCSF Medical Center",
    date_of_service: "2024-12-22",
    confidence_score: 0.87,
    status: "disputed",
    published_at: "2024-12-24",
    verification_count: 2,
    dispute_count: 3
  },
  {
    raw_text: "Northwestern Memorial Hospital\nPatient: Brian Johnson\nDate: 01/15/2025\nProcedure: Broken Arm - ER Visit and Cast\nTotal: $3,800.00",
    procedure_codes: ["25565"],
    costs: [3800.00],
    hospital_name: "Northwestern Memorial Hospital",
    date_of_service: "2025-01-15",
    confidence_score: 0.92,
    status: "verified",
    published_at: "2025-01-17",
    verification_count: 5,
    dispute_count: 0
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Check if the table exists
    const { error: tableCheckError } = await supabase
      .from('medical_bills')
      .select('id')
      .limit(1);

    // If table doesn't exist, we'll create it
    if (tableCheckError) {
      console.error('Error checking table:', tableCheckError);
      return res.status(500).json({ 
        message: 'Error checking if table exists. You may need to create the medical_bills table in your Supabase dashboard with the correct schema.' 
      });
    }

    // Add user_id to each record
    const dataWithUserId = medicalBillsData.map(bill => ({
      ...bill,
      user_id: userId
    }));

    // Insert data
    const { data, error } = await supabase
      .from('medical_bills')
      .insert(dataWithUserId)
      .select();

    if (error) {
      console.error('Error inserting data:', error);
      return res.status(500).json({ message: 'Error inserting data', error });
    }

    return res.status(200).json({ success: true, count: data.length });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ message: 'Unexpected error', error });
  }
}
