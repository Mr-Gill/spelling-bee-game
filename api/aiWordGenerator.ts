import { Word } from '../types';

const API_URL = 'https://api.github.com/models/gpt-4o-mini-instruct';

export async function generateWords(prompt: string): Promise<Word[]> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to generate words');
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content ?? '[]';
  try {
    return JSON.parse(content);
  } catch (err) {
    console.error('Failed to parse model response', content, err);
    throw new Error('Invalid response format');
  }
}
