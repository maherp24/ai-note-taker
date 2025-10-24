/**
 * AI-related TypeScript types
 * These types can be used across the application for type safety
 */

export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AISummarizeRequest {
  content: string;
  maxLength?: number;
}

export interface AISummarizeResponse {
  summary: string;
  originalLength: number;
  summaryLength: number;
}

export interface AIGenerateRequest {
  prompt: string;
  context?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIGenerateResponse {
  text: string;
  tokens: number;
}

export interface AIImproveNoteRequest {
  content: string;
  instruction?: string;
}

export interface AIImproveNoteResponse {
  improvedContent: string;
  suggestions?: string[];
}

export interface AIQuestionAnswerRequest {
  question: string;
  context: string;
}

export interface AIQuestionAnswerResponse {
  answer: string;
  confidence?: number;
}

export interface AITagsRequest {
  content: string;
  maxTags?: number;
}

export interface AITagsResponse {
  tags: string[];
}

export interface AIError {
  error: string;
  code?: string;
  details?: string;
}

