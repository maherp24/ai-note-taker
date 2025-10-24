/**
 * API Route: Improve Note
 * POST /api/ai/improve
 */

import { NextRequest, NextResponse } from 'next/server';
import { improveNote } from '@/lib/services/openai.service';
import type { AIImproveNoteRequest, AIError } from '@/lib/types/ai.types';

export async function POST(request: NextRequest) {
  try {
    const body: AIImproveNoteRequest = await request.json();
    
    if (!body.content) {
      return NextResponse.json(
        { error: 'Content is required' } as AIError,
        { status: 400 }
      );
    }
    
    const result = await improveNote(body);
    
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Improve API Error:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to improve note',
        details: error instanceof Error ? error.message : 'Unknown error',
      } as AIError,
      { status: 500 }
    );
  }
}

