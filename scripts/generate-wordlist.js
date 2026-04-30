const fs = require('fs').promises;
const path = require('path');
const { parseWordList } = require('../src/utils/parseWordList.js');

const token = process.env.MODELS_TOKEN || process.env.GITHUB_MODELS_TOKEN || process.env.GITHUB_TOKEN;
const model = process.env.GITHUB_MODELS_MODEL || 'openai/gpt-4.1-mini';
const fallbackModels = (process.env.GITHUB_MODELS_MODEL_FALLBACKS || 'openai/gpt-4.1,openai/gpt-4o-mini')
  .split(',')
  .map((m) => m.trim())
  .filter(Boolean);
const endpoint =
  process.env.GITHUB_MODELS_ENDPOINT ||
  (process.env.GITHUB_MODELS_ORG
    ? `https://models.github.ai/orgs/${process.env.GITHUB_MODELS_ORG}/inference/chat/completions`
    : 'https://models.github.ai/inference/chat/completions');
const apiVersion = process.env.GITHUB_MODELS_API_VERSION || '2022-11-28';

const stripCodeFence = (content) =>
  String(content || '')
    .trim()
    .replace(/^```(?:csv|json|tsv)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

const clampCount = (value) => {
  const n = Number(value);
  if (!Number.isFinite(n)) return 10;
  if (n < 1) return 1;
  if (n > 50) return 50;
  return Math.floor(n);
};

const buildAIWordListPrompt = (topic, count) => `ROLE
Generate a CSV for an AU Years 7-8 spelling bee on TOPIC. Your voice is a witty, knowledgeable lexicographer making a fun but challenging list.

INPUT
TOPIC (string) and N (int). If N invalid/missing -> N=10.

OUTPUT (CSV ONLY)

One CSV. No preface, no code fences, no blank lines.

Header EXACTLY: "word","syllables","definition","origin","example","prefix","suffix","pronunciation"

Then exactly N rows.

ASCII only; straight quotes (").

Quote every field.

The syllables field is a JSON string of a string array.

CORRECT: "[\\"har\\",\\"mo\\",\\"ny\\"]"

CONTENT

AU/UK spelling. At least 70% headwords clearly fit TOPIC (others closely related).

Difficulty: about 30% 1-2 syllables (foundational), about 50% 2-3 (core), about 20% 4+ (stretch).

Minima when N>=10: at least 3 one-syllable; at least 3 with 4+ syllables; at least 3 with prefixes; at least 3 with suffixes.

Definition: 10-18 words; witty, accurate, student-friendly.

Origin: Real and specific (e.g., Latin; Greek; Old French via Latin). No jokes or speculation.

Example: 12-25 words; exactly one sentence; vividly funny or gently surreal.

Prefix/Suffix: Include only productive, meaningful derivational affixes.

Pronunciation: Hyphenated with PRIMARY stress in CAPS (e.g., par-muh-ZAN, mot-suh-REL-uh).

One-syllable exception: write the syllable in CAPS (e.g., TRAM).

VALIDATION (silent)
Before printing, fix any violations and output only the valid CSV.

TOPIC: ${topic}
N: ${count}`;

async function requestCSVWithModel(prompt, modelId) {
  if (!token) {
    throw new Error('MODELS_TOKEN (or GITHUB_MODELS_TOKEN / GITHUB_TOKEN) is not configured');
  }

  const response = await fetch(`${endpoint}?api-version=${apiVersion}`, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': apiVersion,
    },
    body: JSON.stringify({
      model: modelId,
      messages: [
        {
          role: 'system',
          content:
            'You generate classroom spelling bee word lists. Return only the requested CSV text, with no markdown fences or commentary.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.8,
      top_p: 1,
      max_tokens: 3000,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`GitHub Models request failed for ${modelId}: ${response.status} ${details}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content || !String(content).trim()) {
    throw new Error(`GitHub Models returned an empty response for ${modelId}`);
  }
  return stripCodeFence(content);
}

async function generateWordList(topicInput = 'general classroom vocabulary', countInput = 10) {
  const topic = String(topicInput || 'general classroom vocabulary').trim() || 'general classroom vocabulary';
  const count = clampCount(countInput);
  const prompt = buildAIWordListPrompt(topic, count);

  const modelCandidates = Array.from(new Set([model, ...fallbackModels]));

  let lastError = null;
  for (const candidate of modelCandidates) {
    try {
      console.log(`Trying model: ${candidate}`);
      const csv = await requestCSVWithModel(prompt, candidate);
      const words = parseWordList(csv);
      if (!Array.isArray(words) || words.length === 0) {
        throw new Error(`Parsed list is empty for ${candidate}`);
      }
      return words;
    } catch (error) {
      lastError = error;
      console.error(`Model ${candidate} failed:`, error.message || error);
      continue;
    }
  }

  throw lastError || new Error('Failed to generate word list');
}

async function main() {
  const topic = process.argv[2] || 'general classroom vocabulary';
  const count = process.argv[3] ? parseInt(process.argv[3], 10) : 10;

  try {
    console.log(`Generating ${clampCount(count)} words about "${topic}"`);
    const words = await generateWordList(topic, count);
    await fs.writeFile(path.join(process.cwd(), 'wordlist.json'), JSON.stringify(words, null, 2));
    console.log(`Successfully generated ${words.length} words to wordlist.json`);
  } catch (error) {
    console.error('Error generating word list:', error.message || error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
