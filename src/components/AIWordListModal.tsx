import { useState, useCallback, useEffect, useRef } from 'react';
import { Wand2, Loader, AlertCircle, CheckCircle, X, ExternalLink, ChevronDown } from 'lucide-react';
import { parseWordList as parseWordListUtil } from '../utils/parseWordList';
import { Word } from '../types';

const GITHUB_MODELS_ENDPOINT = 'https://models.github.ai/inference/chat/completions';
const GITHUB_MODELS_MODEL = 'openai/gpt-4.1-mini';
const GITHUB_MODELS_API_VERSION = '2022-11-28';
const GITHUB_PAT_URL =
  'https://github.com/settings/tokens/new?scopes=&description=Spelling+Bee+Word+Generator';

const buildPrompt = (topic: string, count: number): string => `ROLE
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

INCORRECT: [""har"",""mo"",""ny""]

CONTENT

AU/UK spelling. At least 70% headwords clearly fit TOPIC (others closely related).

Difficulty: about 30% 1-2 syllables (foundational), about 50% 2-3 (core), about 20% 4+ (stretch).

Minima when N>=10: at least 3 one-syllable; at least 3 with 4+ syllables; at least 3 with prefixes; at least 3 with suffixes.

Definition: 10-18 words; witty, accurate, student-friendly. Define by job, ingredients, effect, or an unexpected sensation (not flowery/abstract).

Origin: Real and specific (e.g., Latin; Greek; Old French via Latin). No jokes or speculation.

Example: 12-25 words; exactly one sentence; vividly funny or gently surreal. Bee humour only in examples and in at most floor(N/2) rows.

Bee headwords: Bee words appear only in examples unless TOPIC is bees.

Prefix/Suffix: Include only productive, meaningful derivational affixes (e.g., "re-" in "remake", "-tion" in "creation").

Do not treat compounds as suffixes (e.g., laneway, skyline -> suffix="").

Do not invent prefixes from stems (e.g., federation != "fed-").

Only include a prefix if it carries its usual meaning in the headword (e.g., "im-" in "impossible").

Pronunciation: Hyphenated with PRIMARY stress in CAPS (e.g., par-muh-ZAN, mot-suh-REL-uh).

One-syllable exception: write the syllable in CAPS (e.g., TRAM).

Headwords: standard dictionary items; no brands or proper names (unless TOPIC explicitly requires them - then at most 1 such row).

VALIDATION (silent)
Before printing, fix any violations and output only the valid CSV. Per-row checks: non-empty fields; definition 10-18 words; example 12-25 words; syllables is a JSON string with backslash-escaped inner quotes; real origin; derivational prefix/suffix only; pronunciation format obeyed. After N rows: counts satisfied (one-syllable, 4+ syllables, prefixes, suffixes), at least 70% on-topic, bee examples at most floor(N/2), ASCII-only, no blank lines. If any check fails, regenerate offending rows and re-validate.

TOPIC: ${topic.trim() || 'general classroom vocabulary'}
N: ${Number.isFinite(count) && count > 0 ? count : 10}`;

interface AIWordListModalProps {
  onClose: () => void;
  onWordsGenerated: (words: Word[]) => void;
}

type ModalStep = 'form' | 'result';

export default function AIWordListModal({ onClose, onWordsGenerated }: AIWordListModalProps) {
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState(10);
  const [token, setToken] = useState('');
  const [proxyUrl, setProxyUrl] = useState(() => {
    try { return sessionStorage.getItem('aiProxyUrl') || ''; } catch { return ''; }
  });
  const [proxyPassword, setProxyPassword] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedWords, setGeneratedWords] = useState<Word[]>([]);
  const [step, setStep] = useState<ModalStep>('form');
  const topicInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    topicInputRef.current?.focus();
  }, []);

  const handleGenerate = useCallback(async () => {
    const wordCount = Math.min(Math.max(1, Number(count) || 10), 50);
    const prompt = buildPrompt(topic, wordCount);
    setLoading(true);
    setError('');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);

    try {
      let content = '';
      const trimmedToken = token.trim();

      if (trimmedToken) {
        const res = await fetch(
          `${GITHUB_MODELS_ENDPOINT}?api-version=${GITHUB_MODELS_API_VERSION}`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: `Bearer ${trimmedToken}`,
              'Content-Type': 'application/json',
              'X-GitHub-Api-Version': GITHUB_MODELS_API_VERSION,
            },
            body: JSON.stringify({
              model: GITHUB_MODELS_MODEL,
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
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`GITHUB_MODELS_${res.status}:${errorText.trim().slice(0, 500)}`);
        }

        const data = await res.json();
        content = String(data?.choices?.[0]?.message?.content || '');
      } else {
        const trimmedProxyUrl = proxyUrl.trim();
        if (!trimmedProxyUrl) {
          throw new Error('NO_TOKEN_NO_PROXY');
        }

        sessionStorage.setItem('aiProxyUrl', trimmedProxyUrl);
        const trimmedPassword = proxyPassword.trim();

        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (trimmedPassword) headers['X-AI-Password'] = trimmedPassword;

        const res = await fetch(trimmedProxyUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify({ topic, count: wordCount, prompt }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`PROXY_${res.status}:${errorText.trim().slice(0, 500)}`);
        }

        const data = await res.json();
        content = String(data.wordList || data.csv || data.content || '');
      }

      const cleanContent = content
        .trim()
        .replace(/^```(?:csv|json|tsv)?\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim();

      const words = parseWordListUtil(cleanContent);
      if (!Array.isArray(words) || words.length === 0) {
        throw new Error('Generated response was empty or invalid. Please try again.');
      }

      setGeneratedWords(words);
      setStep('result');
    } catch (err) {
      clearTimeout(timeoutId);
      const message = err instanceof Error ? err.message : String(err || '');

      if (message.startsWith('GITHUB_MODELS_401')) {
        setError(
          'Token rejected (401). Make sure you are using a valid GitHub personal access token.'
        );
      } else if (message.startsWith('GITHUB_MODELS_403')) {
        setError(
          'Access denied (403). Enable GitHub Models in your account settings and ensure your token has the "models: read" permission.'
        );
      } else if (message.startsWith('GITHUB_MODELS_404')) {
        setError(
          'Model not found (404). GitHub Models may not be available for this account yet.'
        );
      } else if (message.startsWith('GITHUB_MODELS_429')) {
        setError('Rate limit reached (429). Please wait a few minutes and try again.');
      } else if (message === 'NO_TOKEN_NO_PROXY') {
        setError('Please enter a GitHub Models token or expand Advanced settings to configure a proxy URL.');
      } else if (message.startsWith('PROXY_401')) {
        setError('Proxy password rejected. Check the shared password on your proxy server.');
      } else if (message.startsWith('PROXY_404')) {
        setError(
          'Proxy URL not found (404). Check the endpoint URL is correct (e.g. https://your-proxy.example.com/wordlist).'
        );
      } else if (message.startsWith('PROXY_500')) {
        setError(
          'Proxy server error (500). Check that MODELS_TOKEN is configured on your proxy server.'
        );
      } else if (message.includes('AbortError') || message.includes('aborted')) {
        setError('Request timed out. Try reducing the word count, or try again.');
      } else if (message.includes('Failed to fetch') || message.includes('NetworkError')) {
        setError('Network request failed. Check your internet connection.');
      } else {
        setError(message || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [topic, count, token, proxyUrl, proxyPassword]);

  const handleUseList = () => {
    onWordsGenerated(generatedWords);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal={true}
        aria-labelledby="ai-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-purple-600" aria-hidden="true" />
            <h2 id="ai-modal-title" className="text-lg font-bold text-gray-800">
              Generate AI Word List
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 'form' ? (
            <div className="space-y-4">
              {/* Topic */}
              <div>
                <label
                  htmlFor="ai-topic-input"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Topic <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="ai-topic-input"
                  ref={topicInputRef}
                  type="text"
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && topic.trim() && !loading) handleGenerate();
                  }}
                  placeholder="e.g., animals, space, Australian history"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Word Count */}
              <div>
                <label
                  htmlFor="ai-count-input"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Number of words{' '}
                  <span className="text-gray-400 font-normal">(1–50)</span>
                </label>
                <input
                  id="ai-count-input"
                  type="number"
                  min={1}
                  max={50}
                  value={count}
                  onChange={e =>
                    setCount(Math.min(50, Math.max(1, Number(e.target.value) || 10)))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Token */}
              <div>
                <label
                  htmlFor="ai-token-input"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  GitHub Models Token
                </label>
                <input
                  id="ai-token-input"
                  type="password"
                  value={token}
                  onChange={e => setToken(e.target.value)}
                  placeholder="github_pat_…"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  autoComplete="off"
                />
                <p className="mt-1.5 text-xs text-gray-500">
                  Add a GitHub personal access token, or expand Advanced settings below to use a proxy URL instead.{' '}
                  <a
                    href={GITHUB_PAT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline inline-flex items-center gap-0.5"
                  >
                    Create one here <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                  .
                </p>
              </div>

              {/* Advanced: proxy */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowAdvanced(v => !v)}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                  aria-expanded={showAdvanced}
                >
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                  Advanced: use a proxy server instead of a direct token
                </button>
                {showAdvanced && (
                  <div className="mt-3 space-y-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <label
                        htmlFor="ai-proxy-url-input"
                        className="block text-xs font-semibold text-gray-600 mb-1"
                      >
                        Proxy URL
                      </label>
                      <input
                        id="ai-proxy-url-input"
                        type="url"
                        value={proxyUrl}
                        onChange={e => setProxyUrl(e.target.value)}
                        placeholder="https://your-proxy.example.com/wordlist"
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        autoComplete="off"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="ai-proxy-pw-input"
                        className="block text-xs font-semibold text-gray-600 mb-1"
                      >
                        Proxy Password{' '}
                        <span className="font-normal text-gray-400">(optional)</span>
                      </label>
                      <input
                        id="ai-proxy-pw-input"
                        type="password"
                        value={proxyPassword}
                        onChange={e => setProxyPassword(e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        autoComplete="off"
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      Proxy is used when no direct token is provided.
                    </p>
                  </div>
                )}
              </div>

              {/* Error */}
              {error && (
                <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle
                    className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle
                  className="w-4 h-4 text-green-600 flex-shrink-0"
                  aria-hidden="true"
                />
                <p className="text-sm text-green-700 font-medium">
                  Generated {generatedWords.length} word
                  {generatedWords.length !== 1 ? 's' : ''} about &ldquo;{topic}&rdquo;
                </p>
              </div>

              <div className="max-h-72 overflow-y-auto border border-gray-200 rounded-lg divide-y divide-gray-100">
                {generatedWords.map((word, i) => (
                  <div key={i} className="px-3 py-2">
                    <span className="font-semibold text-gray-800">{word.word}</span>
                    {word.definition && (
                      <span className="text-sm text-gray-500 ml-2">— {word.definition}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 flex-shrink-0">
          {step === 'form' ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleGenerate}
                disabled={loading || !topic.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" aria-hidden="true" />
                    Generating…
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" aria-hidden="true" />
                    Generate
                  </>
                )}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setStep('form');
                  setGeneratedWords([]);
                  setError('');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ← Regenerate
              </button>
              <button
                type="button"
                onClick={handleUseList}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
              >
                <CheckCircle className="w-4 h-4" aria-hidden="true" />
                Use This List
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
