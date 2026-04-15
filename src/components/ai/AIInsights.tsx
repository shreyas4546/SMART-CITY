import React, { useState } from 'react';
import { Bin, Alert } from '@/src/types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { BrainCircuit, Loader2 } from 'lucide-react';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

interface AIInsightsProps {
  bins: Bin[];
  alerts: Alert[];
}

export function AIInsights({ bins, alerts }: AIInsightsProps) {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAskAI = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError('');
    setResponse('');

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Gemini API key is not configured.');
      }

      const ai = new GoogleGenAI({ apiKey });

      // Prepare context for the AI
      const systemContext = `
        You are an advanced AI assistant for a Smart City Waste Management Command Center.
        Current System State:
        - Total Bins: ${bins.length}
        - Critical Bins: ${bins.filter(b => b.status === 'critical').length}
        - Warning Bins: ${bins.filter(b => b.status === 'warning').length}
        - Active Alerts: ${alerts.filter(a => !a.read).length}
        
        Provide concise, actionable insights based on this data. Use markdown for formatting.
      `;

      const result = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: `${systemContext}\n\nUser Query: ${query}`,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH }
        }
      });

      setResponse(result.text || 'No response generated.');
    } catch (err: any) {
      console.error('AI Error:', err);
      setError(err.message || 'Failed to generate insights.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <BrainCircuit className="w-6 h-6 text-blue-400" />
          AI System Insights
        </h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ask the Command Center AI</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
              placeholder="e.g., What are the most critical sectors right now?"
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
            />
            <Button onClick={handleAskAI} disabled={isLoading || !query.trim()}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Analyze'}
            </Button>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {response && (
            <div className="p-6 bg-blue-900/10 border border-blue-500/20 rounded-lg mt-4">
              <div className="prose prose-invert max-w-none text-sm text-white/80">
                {response.split('\n').map((line, i) => (
                  <p key={i} className="mb-2">{line}</p>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
