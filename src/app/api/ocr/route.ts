import { NextRequest, NextResponse } from 'next/server';
import { processOCRResult } from '@/utils/ocr';
import { validateMedicalBillData } from '@/utils/validation';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';
export const preferredRegion = ['sfo1'];

// Azure Computer Vision API configuration
const endpoint = process.env.AZURE_VISION_ENDPOINT!;
const apiKey = process.env.AZURE_VISION_KEY!;

async function performOCR(file: ArrayBuffer): Promise<{ text: string; confidence: number }> {
  // First, upload the image to Azure's read API
  const readResponse = await fetch(`${endpoint}/vision/v3.2/read/analyze`, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': apiKey,
      'Content-Type': 'application/octet-stream',
    },
    body: file,
  });

  if (!readResponse.ok) {
    throw new Error('Failed to initiate OCR process');
  }

  // Get the operation location for polling
  const operationLocation = readResponse.headers.get('Operation-Location');
  if (!operationLocation) {
    throw new Error('No operation location returned');
  }

  // Poll until the analysis is complete
  let result;
  for (let i = 0; i < 10; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const resultResponse = await fetch(operationLocation, {
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey,
      },
    });

    if (!resultResponse.ok) {
      throw new Error('Failed to get OCR results');
    }

    result = await resultResponse.json();
    if (result.status === 'succeeded') break;
  }

  if (!result || result.status !== 'succeeded') {
    throw new Error('OCR process failed or timed out');
  }

  // Extract text and calculate confidence
  let fullText = '';
  let totalConfidence = 0;
  let lineCount = 0;

  for (const readResult of result.analyzeResult.readResults) {
    for (const line of readResult.lines) {
      fullText += line.text + '\n';
      totalConfidence += line.confidence;
      lineCount++;
    }
  }

  return {
    text: fullText.trim(),
    confidence: lineCount > 0 ? totalConfidence / lineCount : 0
  };
}

export async function POST(request: NextRequest) {
  try {
    // Get the file from the request
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Check file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF and images are allowed.' },
        { status: 400 }
      );
    }

    // Convert file to ArrayBuffer
    const buffer = await file.arrayBuffer();

    // Perform OCR
    const { text, confidence } = await performOCR(buffer);

    // Process OCR results
    const extractedData = processOCRResult(text, confidence);

    // Validate extracted data
    const validationResult = validateMedicalBillData(extractedData);

    if (!validationResult.isValid) {
      return NextResponse.json(
        {
          error: 'Invalid medical bill data',
          details: validationResult.errors,
          warnings: validationResult.warnings
        },
        { status: 400 }
      );
    }

    // Create Supabase client with edge runtime compatible config
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false
      }
    });

    // Store the validated data in Supabase
    const { data, error } = await supabase
      .from('medical_bills')
      .insert([
        {
          raw_text: extractedData.rawText,
          procedure_descriptions: extractedData.procedureDescriptions,
          procedure_codes: extractedData.procedureCodes,
          costs: extractedData.costs,
          hospital_name: extractedData.hospitalName,
          date_of_service: extractedData.dateOfService,
          confidence_score: extractedData.confidence,
          status: validationResult.warnings.length > 0 ? 'needs_review' : 'validated'
        }
      ])
      .select();

    if (error) {
      console.error('Error storing data:', error);
      return NextResponse.json(
        { error: 'Failed to store data' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data[0],
      warnings: validationResult.warnings
    });

  } catch (error) {
    console.error('OCR processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process document' },
      { status: 500 }
    );
  }
}
