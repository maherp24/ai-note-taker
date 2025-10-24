/**
 * OpenAI Service Layer
 * This service provides a clean interface for all OpenAI API interactions
 * All AI functionality should go through this service for consistency
 */

import OpenAI from 'openai';
import type {
  AIMessage,
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
} from '@/lib/types/ai.types';

// Singleton pattern for OpenAI client
let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not configured in environment variables');
    }
    
    openaiClient = new OpenAI({
      apiKey,
    });
  }
  
  return openaiClient;
}

// Configuration
const DEFAULT_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const DEFAULT_MAX_TOKENS = parseInt(process.env.OPENAI_MAX_TOKENS || '2000', 10);

/**
 * Core function to interact with OpenAI Chat API
 */
async function chatCompletion(
  messages: AIMessage[],
  temperature: number = 0.7,
  maxTokens: number = DEFAULT_MAX_TOKENS
): Promise<string> {
  try {
    const client = getOpenAIClient();
    
    const response = await client.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: messages as OpenAI.Chat.ChatCompletionMessageParam[],
      temperature,
      max_tokens: maxTokens,
    });
    
    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error(`Failed to get response from OpenAI: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Summarize text content
 */
export async function summarizeText(
  request: AISummarizeRequest
): Promise<AISummarizeResponse> {
  const { content, maxLength = 200 } = request;
  
  const messages: AIMessage[] = [
    {
      role: 'system',
      content: 'You are a helpful assistant that creates concise summaries. Provide clear, informative summaries that capture the key points.',
    },
    {
      role: 'user',
      content: `Please summarize the following text in approximately ${maxLength} words:\n\n${content}`,
    },
  ];
  
  const summary = await chatCompletion(messages, 0.5);
  
  return {
    summary,
    originalLength: content.length,
    summaryLength: summary.length,
  };
}

/**
 * Generate text based on a prompt
 */
export async function generateText(
  request: AIGenerateRequest
): Promise<AIGenerateResponse> {
  const { prompt, context, temperature = 0.7, maxTokens = DEFAULT_MAX_TOKENS } = request;
  
  const messages: AIMessage[] = [
    {
      role: 'system',
      content: 'You are a creative and helpful writing assistant.',
    },
  ];
  
  if (context) {
    messages.push({
      role: 'user',
      content: `Context: ${context}`,
    });
  }
  
  messages.push({
    role: 'user',
    content: prompt,
  });
  
  const text = await chatCompletion(messages, temperature, maxTokens);
  
  return {
    text,
    tokens: Math.ceil(text.length / 4), // Rough estimation
  };
}

/**
 * Improve note content with AI suggestions
 */
export async function improveNote(
  request: AIImproveNoteRequest
): Promise<AIImproveNoteResponse> {
  const { content, instruction = 'Improve the clarity, grammar, and structure of this note while maintaining its meaning.' } = request;
  
  const messages: AIMessage[] = [
    {
      role: 'system',
      content: 'You are an expert editor helping users improve their notes. Provide clear, well-structured improvements.',
    },
    {
      role: 'user',
      content: `${instruction}\n\nNote content:\n${content}`,
    },
  ];
  
  const improvedContent = await chatCompletion(messages, 0.3);
  
  return {
    improvedContent,
  };
}

/**
 * Answer questions based on provided context
 */
export async function answerQuestion(
  request: AIQuestionAnswerRequest
): Promise<AIQuestionAnswerResponse> {
  const { question, context } = request;
  
  const messages: AIMessage[] = [
    {
      role: 'system',
      content: 'You are a helpful assistant that answers questions based on provided context. Be accurate and concise.',
    },
    {
      role: 'user',
      content: `Context:\n${context}\n\nQuestion: ${question}`,
    },
  ];
  
  const answer = await chatCompletion(messages, 0.3);
  
  return {
    answer,
  };
}

/**
 * Generate relevant tags for content
 */
export async function generateTags(
  request: AITagsRequest
): Promise<AITagsResponse> {
  const { content, maxTags = 5 } = request;
  
  const messages: AIMessage[] = [
    {
      role: 'system',
      content: `You are a tagging assistant. Generate up to ${maxTags} relevant tags for the content. Return only the tags as a comma-separated list, nothing else.`,
    },
    {
      role: 'user',
      content: `Generate tags for this content:\n\n${content}`,
    },
  ];
  
  const tagsText = await chatCompletion(messages, 0.5);
  const tags = tagsText
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
    .slice(0, maxTags);
  
  return {
    tags,
  };
}

/**
 * Custom AI interaction for flexible use cases
 */
export async function customPrompt(
  systemPrompt: string,
  userPrompt: string,
  temperature: number = 0.7,
  maxTokens: number = DEFAULT_MAX_TOKENS
): Promise<string> {
  const messages: AIMessage[] = [
    {
      role: 'system',
      content: systemPrompt,
    },
    {
      role: 'user',
      content: userPrompt,
    },
  ];
  
  return await chatCompletion(messages, temperature, maxTokens);
}

// Export all functions
export const OpenAIService = {
  summarizeText,
  generateText,
  improveNote,
  answerQuestion,
  generateTags,
  customPrompt,
};

