import { Word } from '../types';

const REQUIRED_FIELDS = ['word', 'definition'];
const VALID_DIFFICULTIES = new Set<string>(['easy', 'medium', 'hard']);

function cleanHeader(value: string): string {
  return value.trim().replace(/^"|"$/g, '');
}

function parseDelimitedLine(line: string, delimiter: string): string[] {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '\\' && next === '"') {
      current += '"';
      i++;
      continue;
    }

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i++;
        continue;
      }

      const following = line[i + 1];
      const isBoundary = following === delimiter || following === undefined || following === '\r';
      if (!inQuotes || isBoundary) {
        inQuotes = !inQuotes;
      } else {
        current += char;
      }
      continue;
    }

    if (char === delimiter && !inQuotes) {
      values.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values.map(value => value.replace(/^"|"$/g, '').trim());
}

function parseSyllables(value: unknown): string[] | null {
  if (Array.isArray(value)) return value as string[];
  if (typeof value === 'string' && value.trim()) {
    // Handle JSON-encoded array strings like "[\"ap\",\"ple\"]"
    if (value.startsWith('[')) {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) return parsed as string[];
      } catch {
        // fall through to string splitting
      }
    }
    // Split on common syllable separators: -, ·, |
    return value.split(/[-·|]/).map((s) => s.trim()).filter(Boolean);
  }
  return null;
}

function normalizeDifficulty(value: unknown): Word['difficulty'] {
  if (typeof value === 'string') {
    const lower = value.toLowerCase();
    if (lower === 'tricky') return 'hard';
    if (VALID_DIFFICULTIES.has(lower)) return lower as Word['difficulty'];
  }
  return undefined;
}

function validateWords(words: Record<string, unknown>[]): void {
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    for (const field of REQUIRED_FIELDS) {
      if (!w[field]) {
        throw new Error(`Word at index ${i} is missing required field '${field}'`);
      }
    }
  }
}

function normalizeWord(raw: Record<string, unknown>): Word {
  return {
    word: String(raw.word ?? ''),
    definition: raw.definition != null ? String(raw.definition) : null,
    syllables: parseSyllables(raw.syllables),
    phonemes: Array.isArray(raw.phonemes) ? (raw.phonemes as string[]) : null,
    origin: raw.origin != null ? String(raw.origin) : null,
    example: raw.example != null ? String(raw.example) : null,
    prefix: raw.prefix != null ? String(raw.prefix) : undefined,
    suffix: raw.suffix != null ? String(raw.suffix) : undefined,
    prefixMeaning: raw.prefixMeaning != null ? String(raw.prefixMeaning) : undefined,
    suffixMeaning: raw.suffixMeaning != null ? String(raw.suffixMeaning) : undefined,
    pronunciation: raw.pronunciation != null ? String(raw.pronunciation) : undefined,
    source: raw.source != null ? String(raw.source) : undefined,
    difficulty: normalizeDifficulty(raw.difficulty),
  };
}

export function parseWordList(content: string): Word[] {
  // Try JSON first
  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      const words = parsed as Record<string, unknown>[];
      validateWords(words);
      return words.map(normalizeWord);
    }
    // Handle nested format: { easy: [...], medium: [...], tricky: [...] }
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      const flat: Record<string, unknown>[] = [];
      for (const [category, items] of Object.entries(parsed as Record<string, unknown>)) {
        if (Array.isArray(items)) {
          for (const w of items as Record<string, unknown>[]) {
            flat.push({ ...w, difficulty: normalizeDifficulty(category) ?? normalizeDifficulty(w.difficulty) });
          }
        }
      }
      if (flat.length > 0) {
        validateWords(flat);
        return flat.map(normalizeWord);
      }
    }
  } catch (e) {
    if (!(e instanceof SyntaxError)) {
      throw e;
    }
  }

  // Parse CSV / TSV
  const lines = content.trim().split('\n');
  if (lines.length < 2) {
    throw new Error('Invalid word list format.');
  }
  const delimiter = lines[0].includes('\t') ? '\t' : ',';
  const headers = parseDelimitedLine(lines[0], delimiter).map(cleanHeader);
  const words: Record<string, unknown>[] = lines
    .slice(1)
    .filter((line) => line.trim())
    .map((line) => {
      const values = parseDelimitedLine(line, delimiter);
      const wordObj: Record<string, unknown> = {};
      headers.forEach((header, idx) => {
        wordObj[header] = values[idx] ? values[idx].trim() : '';
      });
      return wordObj;
    });

  validateWords(words);
  return words.map(normalizeWord);
}
