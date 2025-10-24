/**
 * AI Note Tester Component
 * This is a sample component demonstrating how to use the AI features
 * You can use this as a reference and integrate the functionality into your actual UI
 */

'use client';

import { useState } from 'react';
import { useAI } from '@/lib/hooks/useAI';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function AINoteTester() {
  const [content, setContent] = useState('');
  const [result, setResult] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  
  const { summarize, improve, generateTags, generate, answer, loading, error } = useAI();

  const handleSummarize = async () => {
    if (!content) return;
    const response = await summarize({ content, maxLength: 150 });
    if (response) {
      setResult(response.summary);
    }
  };

  const handleImprove = async () => {
    if (!content) return;
    const response = await improve({ content });
    if (response) {
      setResult(response.improvedContent);
    }
  };

  const handleGenerateTags = async () => {
    if (!content) return;
    const response = await generateTags({ content, maxTags: 5 });
    if (response) {
      setTags(response.tags);
      setResult(`Generated tags: ${response.tags.join(', ')}`);
    }
  };

  const handleGenerate = async () => {
    const response = await generate({
      prompt: 'Write a short note about the benefits of AI-powered note-taking',
      temperature: 0.7,
    });
    if (response) {
      setContent(response.text);
      setResult('Generated new content!');
    }
  };

  const handleAnswer = async () => {
    if (!content) return;
    const response = await answer({
      question: 'What is the main topic of this note?',
      context: content,
    });
    if (response) {
      setResult(`Answer: ${response.answer}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">AI Note Tester</h1>
        <p className="text-gray-600 mb-6">
          This component demonstrates the AI features. Try entering some text and clicking the buttons!
        </p>

        <div className="space-y-4">
          {/* Input Area */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Note Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your note content here..."
              className="w-full min-h-[200px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleSummarize}
              disabled={loading || !content}
              variant="default"
            >
              Summarize
            </Button>

            <Button
              onClick={handleImprove}
              disabled={loading || !content}
              variant="default"
            >
              Improve Note
            </Button>

            <Button
              onClick={handleGenerateTags}
              disabled={loading || !content}
              variant="default"
            >
              Generate Tags
            </Button>

            <Button
              onClick={handleGenerate}
              disabled={loading}
              variant="default"
            >
              Generate Sample Note
            </Button>

            <Button
              onClick={handleAnswer}
              disabled={loading || !content}
              variant="default"
            >
              Ask Question
            </Button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center gap-2 text-blue-600">
              <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
              <span>Processing...</span>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <strong>Error:</strong> {error}
            </div>
          )}

          {/* Tags Display */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Result Display */}
          {result && !error && (
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">
                Result
              </label>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="whitespace-pre-wrap">{result}</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Usage Instructions */}
      <Card className="p-6 bg-gray-50">
        <h2 className="text-lg font-semibold mb-3">How to Use</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li><strong>Summarize:</strong> Creates a concise summary of your note</li>
          <li><strong>Improve Note:</strong> Enhances grammar, clarity, and structure</li>
          <li><strong>Generate Tags:</strong> Automatically creates relevant tags</li>
          <li><strong>Generate Sample:</strong> Creates example content</li>
          <li><strong>Ask Question:</strong> Asks "What is the main topic?" about your note</li>
        </ul>
      </Card>

      {/* Integration Note */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h2 className="text-lg font-semibold mb-3 text-blue-900">
          📝 Integration Note
        </h2>
        <p className="text-sm text-blue-800">
          This is a standalone demo component. To integrate these features into your app:
        </p>
        <ol className="mt-3 space-y-2 text-sm text-blue-800 list-decimal list-inside">
          <li>Import <code className="bg-blue-100 px-1 rounded">useAI</code> hook into your components</li>
          <li>Call the AI functions where needed (e.g., in your note editor)</li>
          <li>Style the buttons and results to match your UI</li>
          <li>Add authentication checks before AI operations</li>
        </ol>
      </Card>
    </div>
  );
}

