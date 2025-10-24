/**
 * API Route: Answer Question
 * POST /api/ai/answer
 */

import { NextRequest, NextResponse } from 'next/server';
import { answerQuestion } from '@/lib/services/openai.service';
import type { AIQuestionAnswerRequest, AIError } from '@/lib/types/ai.types';

export async function POST(request: NextRequest) {
  try {
    const body: AIQuestionAnswerRequest = await request.json();
    
    if (!body.question || !body.context) {
      return NextResponse.json(
        { error: 'Question and context are required' } as AIError,
        { status: 400 }
      );
    }
    
    const result = await answerQuestion(body);
    
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Answer API Error:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to answer question',
        details: error instanceof Error ? error.message : 'Unknown error',
      } as AIError,
      { status: 500 }
    );
  }
}

