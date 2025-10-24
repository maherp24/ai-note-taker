/**
 * API Route: Generate Text
 * POST /api/ai/generate
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateText } from '@/lib/services/openai.service';
import type { AIGenerateRequest, AIError } from '@/lib/types/ai.types';

export async function POST(request: NextRequest) {
  try {
    const body: AIGenerateRequest = await request.json();
    
    if (!body.prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' } as AIError,
        { status: 400 }
      );
    }
    
    const result = await generateText(body);
    
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Generate API Error:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to generate text',
        details: error instanceof Error ? error.message : 'Unknown error',
      } as AIError,
      { status: 500 }
    );
  }
}

