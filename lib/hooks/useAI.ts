/**
 * Custom React Hook for AI Operations
 * This hook provides a clean interface for components to interact with AI features
 */

'use client';

import { useState } from 'react';
import type {
  AISummarizeRequest,
  AISummarizeResponse,
  AIGenerateRequest,
  AIGenerateResponse,
  AIImproveNoteRequest,
  AIImproveNoteResponse,
  AIQuestionAnswerRequest,
  AIQuestionAnswerResponse,
  AITagsRequest,
  AITagsResponse,
  AIError,
} from '@/lib/types/ai.types';

interface UseAIState {
  loading: boolean;
  error: string | null;
}

export function useAI() {
  const [state, setState] = useState<UseAIState>({
    loading: false,
    error: null,
  });

  const handleRequest = async <T,>(
    endpoint: string,
    body: any
  ): Promise<T | null> => {
    setState({ loading: true, error: null });

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        const error = data as AIError;
        throw new Error(error.error || 'Request failed');
      }

      setState({ loading: false, error: null });
      return data as T;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setState({ loading: false, error: errorMessage });
      return null;
    }
  };

  const summarize = async (
    request: AISummarizeRequest
  ): Promise<AISummarizeResponse | null> => {
    return handleRequest<AISummarizeResponse>('/api/ai/summarize', request);
  };

  const generate = async (
    request: AIGenerateRequest
  ): Promise<AIGenerateResponse | null> => {
    return handleRequest<AIGenerateResponse>('/api/ai/generate', request);
  };

  const improve = async (
    request: AIImproveNoteRequest
  ): Promise<AIImproveNoteResponse | null> => {
    return handleRequest<AIImproveNoteResponse>('/api/ai/improve', request);
  };

  const answer = async (
    request: AIQuestionAnswerRequest
  ): Promise<AIQuestionAnswerResponse | null> => {
    return handleRequest<AIQuestionAnswerResponse>('/api/ai/answer', request);
  };

  const generateTags = async (
    request: AITagsRequest
  ): Promise<AITagsResponse | null> => {
    return handleRequest<AITagsResponse>('/api/ai/tags', request);
  };

  return {
    ...state,
    summarize,
    generate,
    improve,
    answer,
    generateTags,
  };
}

