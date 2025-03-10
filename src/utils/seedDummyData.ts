import { supabase } from '@/lib/supabase';

export type MedicalBillSeed = {
  hospital_name: string;
  procedure_name: string;
  total_cost: number;
  insurance_payment: number;
  out_of_pocket: number;
  date_of_service: string;
  status: 'pending' | 'verified' | 'disputed';
  user_id?: string;
};

// Sample data for medical bills
const medicalBillsData: MedicalBillSeed[] = [
  {
    hospital_name: 'Mayo Clinic',
    procedure_name: 'MRI Scan - Brain',
    total_cost: 2800.00,
    insurance_payment: 2100.00,
    out_of_pocket: 700.00,
    date_of_service: '2024-12-15',
    status: 'verified',
  },
  {
    hospital_name: 'Cleveland Clinic',
    procedure_name: 'Colonoscopy',
    total_cost: 3200.00,
    insurance_payment: 2560.00,
    out_of_pocket: 640.00,
    date_of_service: '2024-11-22',
    status: 'verified',
  },
  {
    hospital_name: 'Johns Hopkins Hospital',
    procedure_name: 'CT Scan - Chest',
    total_cost: 1950.00,
    insurance_payment: 1560.00,
    out_of_pocket: 390.00,
    date_of_service: '2025-01-05',
    status: 'pending',
  },
  {
    hospital_name: 'Massachusetts General Hospital',
    procedure_name: 'Appendectomy',
    total_cost: 18500.00,
    insurance_payment: 15725.00,
    out_of_pocket: 2775.00,
    date_of_service: '2024-10-18',
    status: 'verified',
  },
  {
    hospital_name: 'UCSF Medical Center',
    procedure_name: 'Physical Therapy Session',
    total_cost: 250.00,
    insurance_payment: 200.00,
    out_of_pocket: 50.00,
    date_of_service: '2025-02-03',
    status: 'verified',
  },
  {
    hospital_name: 'Mayo Clinic',
    procedure_name: 'Knee Replacement Surgery',
    total_cost: 32000.00,
    insurance_payment: 25600.00,
    out_of_pocket: 6400.00,
    date_of_service: '2024-09-25',
    status: 'verified',
  },
  {
    hospital_name: 'Stanford Health Care',
    procedure_name: 'Cardiac Stress Test',
    total_cost: 1200.00,
    insurance_payment: 960.00,
    out_of_pocket: 240.00,
    date_of_service: '2025-01-12',
    status: 'disputed',
  },
  {
    hospital_name: 'NYU Langone Health',
    procedure_name: 'Endoscopy',
    total_cost: 2800.00,
    insurance_payment: 2240.00,
    out_of_pocket: 560.00,
    date_of_service: '2024-12-05',
    status: 'pending',
  },
  {
    hospital_name: 'Cleveland Clinic',
    procedure_name: 'MRI Scan - Knee',
    total_cost: 2400.00,
    insurance_payment: 1920.00,
    out_of_pocket: 480.00,
    date_of_service: '2025-02-18',
    status: 'verified',
  },
  {
    hospital_name: 'Mount Sinai Hospital',
    procedure_name: 'Childbirth - Vaginal Delivery',
    total_cost: 15000.00,
    insurance_payment: 12750.00,
    out_of_pocket: 2250.00,
    date_of_service: '2024-11-10',
    status: 'verified',
  },
  {
    hospital_name: 'Johns Hopkins Hospital',
    procedure_name: 'Chemotherapy Session',
    total_cost: 8500.00,
    insurance_payment: 7225.00,
    out_of_pocket: 1275.00,
    date_of_service: '2025-01-22',
    status: 'pending',
  },
  {
    hospital_name: 'Cedars-Sinai Medical Center',
    procedure_name: 'Gallbladder Removal',
    total_cost: 14200.00,
    insurance_payment: 12070.00,
    out_of_pocket: 2130.00,
    date_of_service: '2024-10-30',
    status: 'verified',
  },
  {
    hospital_name: 'Mayo Clinic',
    procedure_name: 'Annual Physical Exam',
    total_cost: 350.00,
    insurance_payment: 350.00,
    out_of_pocket: 0.00,
    date_of_service: '2025-02-08',
    status: 'verified',
  },
  {
    hospital_name: 'UCSF Medical Center',
    procedure_name: 'Childbirth - C-Section',
    total_cost: 25000.00,
    insurance_payment: 21250.00,
    out_of_pocket: 3750.00,
    date_of_service: '2024-12-22',
    status: 'disputed',
  },
  {
    hospital_name: 'Northwestern Memorial Hospital',
    procedure_name: 'Broken Arm - ER Visit and Cast',
    total_cost: 3800.00,
    insurance_payment: 3040.00,
    out_of_pocket: 760.00,
    date_of_service: '2025-01-15',
    status: 'verified',
  }
];

export const seedMedicalBills = async (userId: string) => {
  try {
    console.log('Seeding database with medical bills data...');
    
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
      return { success: false, error };
    }
    
    console.log(`Successfully inserted ${data.length} medical bills.`);
    return { success: true, count: data.length };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, error };
  }
};
