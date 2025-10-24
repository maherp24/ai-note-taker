/**
 * API Route: Generate Tags
 * POST /api/ai/tags
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateTags } from '@/lib/services/openai.service';
import type { AITagsRequest, AIError } from '@/lib/types/ai.types';

export async function POST(request: NextRequest) {
  try {
    const body: AITagsRequest = await request.json();
    
    if (!body.content) {
      return NextResponse.json(
        { error: 'Content is required' } as AIError,
        { status: 400 }
      );
    }
    
    const result = await generateTags(body);
    
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Tags API Error:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to generate tags',
        details: error instanceof Error ? error.message : 'Unknown error',
      } as AIError,
      { status: 500 }
    );
  }
}

