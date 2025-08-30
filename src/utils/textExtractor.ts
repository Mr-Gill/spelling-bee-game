import type { Word } from '../types';

/**
 * Read text from a File. Supports plain text and PDF files.
 */
export const extractTextFromFile = async (file: File): Promise<string> => {
  const lower = file.name.toLowerCase();
  if (file.type === 'text/plain' || lower.endsWith('.txt')) {
    return await file.text();
  }
  if (file.type === 'application/pdf' || lower.endsWith('.pdf')) {
    try {
      const pdfjs = await import('pdfjs-dist/legacy/build/pdf');
      const data = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data }).promise;
      let text = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item: any) => item.str).join(' ') + '\n';
      }
      return text;
    } catch {
      throw new Error('PDF extraction requires the optional pdfjs-dist dependency');
    }
  }
  throw new Error('Unsupported file type');
};

const slugify = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/**
 * Send passage text to the AI backend and return generated vocabulary words.
 * Each word is tagged with the source book title and saved to the wordlists
 * directory for future reuse.
 */
export const generateWords = async (passage: string, bookTitle: string): Promise<Word[]> => {
  const prompt = `Extract key vocabulary words from the following passage and return a JSON array where each item has fields word, syllables (array), definition, origin, example, prefix, suffix, pronunciation.\n\n${passage}`;
  const res = await fetch('https://api.github.com/models/gpt-4o-mini-instruct', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN || ''}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages: [{ role: 'user', content: prompt }] }),
  });
  const json = await res.json();
  const content = json?.choices?.[0]?.message?.content || '[]';
  let words: Word[] = [];
  try {
    words = JSON.parse(content);
  } catch (err) {
    console.error('Failed to parse model response', err);
    throw err;
  }
  const tagged = words.map(w => ({ ...w, source: bookTitle }));
  await saveWordList(bookTitle, tagged);
  return tagged;
};

async function saveWordList(title: string, words: Word[]) {
  if (typeof window !== 'undefined') {
    const blob = new Blob([JSON.stringify(words, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slugify(title)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    return;
  }
  const { writeFile } = await import('fs/promises');
  const path = await import('path');
  const filePath = path.join(process.cwd(), 'wordlists', `${slugify(title)}.json`);
  await writeFile(filePath, JSON.stringify(words, null, 2), 'utf8');
}

/**
 * Convenience wrapper that accepts either a string or File input and returns
 * the extracted text. If a File is provided it will be read appropriately.
 */
export const extractText = async (input: string | File): Promise<string> => {
  if (typeof input === 'string') return input;
  return extractTextFromFile(input);
};

