# 🤖 AI Note Taker

An intelligent note-taking application powered by Next.js and OpenAI, featuring AI-assisted summarization, content improvement, and smart tagging.

## ✨ Features

- 📝 **AI-Powered Summarization** - Automatically generate concise summaries
- 🎯 **Smart Content Generation** - Create notes from prompts
- ✍️ **Note Improvement** - Enhance clarity, grammar, and structure
- 🏷️ **Auto-Tagging** - Generate relevant tags automatically
- 💬 **Question Answering** - Ask questions about your notes
- 🎨 **Modular Architecture** - Easy to customize and extend

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file:

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
OPENAI_MAX_TOKENS=2000
DATABASE_URL="postgresql://user:password@localhost:5432/ai_note_taker"
```

### 3. Set Up Database

```bash
npx prisma migrate dev
npx prisma generate
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🧪 Test AI Features

Visit [http://localhost:3000/ai-demo](http://localhost:3000/ai-demo) to test all AI features!

## 📁 Project Structure

```
├── app/
│   ├── api/ai/          # AI API endpoints
│   ├── ai-demo/         # Demo page for testing
│   └── page.tsx         # Main page
├── lib/
│   ├── types/           # TypeScript types
│   ├── services/        # OpenAI service layer
│   └── hooks/           # React hooks (useAI)
├── components/
│   ├── examples/        # Demo components
│   └── ui/              # UI components
└── prisma/
    └── schema.prisma    # Database schema
```

## 🎯 Using AI Features

```tsx
'use client';

import { useAI } from '@/lib/hooks/useAI';

export default function MyComponent() {
  const { summarize, improve, generateTags, loading } = useAI();

  const handleSummarize = async () => {
    const result = await summarize({ content: 'Your note...' });
    console.log(result?.summary);
  };

  return <button onClick={handleSummarize}>Summarize</button>;
}
```

## 📚 Documentation

- **[AI Setup Guide](./AI_SETUP_INSTRUCTIONS.md)** - Complete setup instructions
- **[AI Integration Guide](./lib/ai-integration-guide.md)** - Detailed API documentation
- **[Demo Component](./components/examples/AINoteTester.tsx)** - Usage examples

## 🔧 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **AI**: OpenAI API (GPT-4o-mini)
- **Database**: PostgreSQL with Prisma
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI

## 🎨 Flexible Architecture

The AI integration is designed to be UI-agnostic:

- **Service Layer**: Pure business logic in `lib/services/`
- **API Routes**: Backend endpoints in `app/api/ai/`
- **React Hook**: Easy-to-use `useAI()` hook
- **TypeScript Types**: Full type safety

**Change the UI anytime without affecting AI functionality!**

## 📝 Available AI Functions

| Function | Description | Endpoint |
|----------|-------------|----------|
| `summarize` | Create concise summaries | `/api/ai/summarize` |
| `generate` | Generate new content | `/api/ai/generate` |
| `improve` | Enhance note quality | `/api/ai/improve` |
| `answer` | Answer questions | `/api/ai/answer` |
| `generateTags` | Create relevant tags | `/api/ai/tags` |

## 🔒 Security Notes

- Never commit `.env.local` to version control
- Add authentication to API routes before production
- Implement rate limiting
- Validate all user inputs

## 💰 Cost Management

- Using `gpt-4o-mini` for cost-effectiveness
- Set token limits in environment variables
- Monitor usage at [OpenAI Platform](https://platform.openai.com/usage)

## 🤝 Contributing

This is a [Next.js](https://nextjs.org) project. Feel free to customize and extend!

## 📄 License

MIT
