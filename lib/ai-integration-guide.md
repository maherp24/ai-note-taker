# AI Integration Guide

## Overview
This AI note-taker app now includes OpenAI integration with a clean, modular architecture that's easy to maintain and extend.

## Setup

### 1. Environment Variables
Create a `.env.local` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
OPENAI_MAX_TOKENS=2000
DATABASE_URL="postgresql://user:password@localhost:5432/ai_note_taker?schema=public"
```

### 2. Database Migration
After updating the schema, run:
```bash
npx prisma migrate dev --name add-ai-fields
npx prisma generate
```

## Architecture

### File Structure
```
lib/
├── types/ai.types.ts          # TypeScript types for AI operations
├── services/openai.service.ts # Core OpenAI service layer
└── hooks/useAI.ts             # React hook for client-side AI operations

app/api/ai/
├── summarize/route.ts         # Summarize text endpoint
├── generate/route.ts          # Generate text endpoint
├── improve/route.ts           # Improve note endpoint
├── answer/route.ts            # Answer questions endpoint
└── tags/route.ts              # Generate tags endpoint
```

## Usage Examples

### Client-Side Usage (React Components)

```tsx
'use client';

import { useAI } from '@/lib/hooks/useAI';
import { useState } from 'react';

export default function NoteEditor() {
  const [content, setContent] = useState('');
  const { summarize, improve, generateTags, loading, error } = useAI();

  const handleSummarize = async () => {
    const result = await summarize({ content });
    if (result) {
      console.log('Summary:', result.summary);
    }
  };

  const handleImprove = async () => {
    const result = await improve({ content });
    if (result) {
      setContent(result.improvedContent);
    }
  };

  const handleGenerateTags = async () => {
    const result = await generateTags({ content, maxTags: 5 });
    if (result) {
      console.log('Tags:', result.tags);
    }
  };

  return (
    <div>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      
      <button onClick={handleSummarize} disabled={loading}>
        Summarize
      </button>
      
      <button onClick={handleImprove} disabled={loading}>
        Improve Note
      </button>
      
      <button onClick={handleGenerateTags} disabled={loading}>
        Generate Tags
      </button>
      
      {error && <p className="error">{error}</p>}
    </div>
  );
}
```

### Server-Side Usage (API Routes or Server Actions)

```tsx
import { summarizeText, improveNote } from '@/lib/services/openai.service';

// In a server action or API route
export async function processNote(content: string) {
  const summary = await summarizeText({ content, maxLength: 150 });
  const improved = await improveNote({ content });
  
  return {
    summary: summary.summary,
    improved: improved.improvedContent,
  };
}
```

### Direct API Calls

```typescript
// POST /api/ai/summarize
const response = await fetch('/api/ai/summarize', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    content: 'Your text here...',
    maxLength: 200
  })
});

const result = await response.json();
console.log(result.summary);
```

## Available AI Features

### 1. Summarize Text
- **Endpoint**: `/api/ai/summarize`
- **Purpose**: Create concise summaries of notes
- **Usage**: `summarize({ content, maxLength? })`

### 2. Generate Text
- **Endpoint**: `/api/ai/generate`
- **Purpose**: Generate new content based on prompts
- **Usage**: `generate({ prompt, context?, temperature?, maxTokens? })`

### 3. Improve Note
- **Endpoint**: `/api/ai/improve`
- **Purpose**: Enhance note clarity, grammar, and structure
- **Usage**: `improve({ content, instruction? })`

### 4. Answer Questions
- **Endpoint**: `/api/ai/answer`
- **Purpose**: Answer questions based on note content
- **Usage**: `answer({ question, context })`

### 5. Generate Tags
- **Endpoint**: `/api/ai/tags`
- **Purpose**: Auto-generate relevant tags for notes
- **Usage**: `generateTags({ content, maxTags? })`

## Extending the AI Features

### Adding a New AI Feature

1. **Add types** in `lib/types/ai.types.ts`:
```typescript
export interface AINewFeatureRequest {
  input: string;
}

export interface AINewFeatureResponse {
  output: string;
}
```

2. **Add service function** in `lib/services/openai.service.ts`:
```typescript
export async function newFeature(
  request: AINewFeatureRequest
): Promise<AINewFeatureResponse> {
  const messages: AIMessage[] = [
    { role: 'system', content: 'System prompt...' },
    { role: 'user', content: request.input },
  ];
  
  const output = await chatCompletion(messages);
  return { output };
}
```

3. **Create API route** at `app/api/ai/new-feature/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { newFeature } from '@/lib/services/openai.service';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await newFeature(body);
  return NextResponse.json(result);
}
```

4. **Add to hook** in `lib/hooks/useAI.ts`:
```typescript
const useNewFeature = async (
  request: AINewFeatureRequest
): Promise<AINewFeatureResponse | null> => {
  return handleRequest<AINewFeatureResponse>('/api/ai/new-feature', request);
};

// Add to return object
return {
  ...state,
  // ... other methods
  useNewFeature,
};
```

## Best Practices

1. **Error Handling**: Always check for errors when using AI features
2. **Loading States**: Use the `loading` state to show user feedback
3. **Rate Limiting**: Consider implementing rate limiting for production
4. **Caching**: Cache frequently used AI responses to reduce API costs
5. **Environment Variables**: Never commit API keys to version control
6. **Type Safety**: Use TypeScript types for all AI operations

## Troubleshooting

### "OPENAI_API_KEY is not configured"
- Make sure `.env.local` exists with your OpenAI API key
- Restart your development server after adding environment variables

### API Errors
- Check your OpenAI account has sufficient credits
- Verify the API key is valid
- Check network connectivity

### Type Errors
- Run `npm install` to ensure all dependencies are installed
- Check that types are imported correctly

## Cost Management

- Use `gpt-4o-mini` for cost-effective operations
- Set appropriate `maxTokens` limits
- Implement caching for repeated queries
- Monitor usage via OpenAI dashboard

## Security Considerations

1. **API Keys**: Store in environment variables only
2. **Rate Limiting**: Implement on API routes
3. **Input Validation**: Validate all user inputs
4. **Authentication**: Add auth checks before AI operations
5. **Content Filtering**: Consider content moderation for user inputs

