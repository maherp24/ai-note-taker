/**
 * API Route: Summarize Text
 * POST /api/ai/summarize
 */

import { NextRequest, NextResponse } from 'next/server';
import { summarizeText } from '@/lib/services/openai.service';
import type { AISummarizeRequest, AIError } from '@/lib/types/ai.types';

export async function POST(request: NextRequest) {
  try {
    const body: AISummarizeRequest = await request.json();
    
    if (!body.content) {
      return NextResponse.json(
        { error: 'Content is required' } as AIError,
        { status: 400 }
      );
    }
    
    const result = await summarizeText(body);
    
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Summarize API Error:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to summarize text',
        details: error instanceof Error ? error.message : 'Unknown error',
      } as AIError,
      { status: 500 }
    );
  }
}

