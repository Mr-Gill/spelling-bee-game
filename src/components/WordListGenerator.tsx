import { useState, useCallback } from 'react';
import { BookOpen, Wand2, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import GitHubWordListGenerator, { GeneratedWord } from '../services/githubWordListGenerator';

interface WordListGeneratorProps {
  onWordsGenerated?: (words: GeneratedWord[]) => void;
  className?: string;
}

export default function WordListGenerator({ onWordsGenerated, className = '' }: WordListGeneratorProps) {
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [generatedWords, setGeneratedWords] = useState<GeneratedWord[]>([]);
  
  // Get token from environment
  const githubToken = process.env.GITHUB_MODELS_TOKEN || '';
  const [isTokenConfigured, setIsTokenConfigured] = useState(!!githubToken);

  const handleGenerate = useCallback(async () => {
    // Reset states
    setError('');
    setSuccess('');
    
    // Validate inputs
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    if (!githubToken) {
      setError('GitHub token not configured. Please check the README for setup instructions.');
      setIsTokenConfigured(false);
      return;
    }

    if (count < 1 || count > 50) {
      setError('Word count must be between 1 and 50');
      return;
    }

    setIsGenerating(true);
    setError('');
    setSuccess('Generating word list...');
    setGeneratedWords([]);

    try {
      const generator = new GitHubWordListGenerator();

      // Test connection first
      const isConnected = await generator.testConnection();
      if (!isConnected) {
        throw new Error('Unable to connect to GitHub Models API. Please check your token has "models: read" permission.');
      }

      const words = await generator.generateWordList({ topic, count });
      setGeneratedWords(words);
      setSuccess(`Successfully generated ${words.length} words about "${topic}"`);

      if (onWordsGenerated) {
        onWordsGenerated(words);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      console.error('Error generating word list:', err);
      setError(`Failed to generate word list: ${errorMessage}`);
      setSuccess('');
    } finally {
      setIsGenerating(false);
    }
  }, [topic, count, onWordsGenerated, githubToken]);

  const handleSaveToLocalStorage = useCallback(async () => {
    if (generatedWords.length === 0) return;

    const wordList = {
      topic,
      count,
      words: generatedWords,
      generatedAt: new Date().toISOString(),
    };

    const savedLists = JSON.parse(localStorage.getItem('generatedWordLists') || '[]');
    savedLists.push(wordList);
    localStorage.setItem('generatedWordLists', JSON.stringify(savedLists));

    setSuccess(`Word list saved! You can now use it in your spelling bee.`);
  }, [generatedWords, topic, count]);

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">AI Word List Generator</h2>
      </div>

      {!isTokenConfigured && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                GitHub token not configured. Please check the <a href="#github-token-setup" className="font-medium underline text-yellow-700 hover:text-yellow-600">setup instructions</a> to enable AI word list generation.
              </p>
            </div>
          </div>
        </div>
      )}
        
      <div className="space-y-4 mb-6">
        {/* Topic Input */}
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
            Topic
          </label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., science, animals, geography"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Word Count */}
        <div>
          <label htmlFor="count" className="block text-sm font-medium text-gray-700 mb-1">
            Number of Words (1-50)
          </label>
          <input
            id="count"
            type="number"
            min="1"
            max="50"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
        >
          {isGenerating ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              Generate Word List
            </>
          )}
        </button>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md mb-4">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md mb-4">
          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
          <p className="text-sm text-green-700">{success}</p>
        </div>
      )}

      {/* Generated Words Display */}
      {generatedWords.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-800">
              Generated Words ({generatedWords.length})
            </h3>
            <button
              onClick={handleSaveToLocalStorage}
              className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
            >
              Save List
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto space-y-2">
            {generatedWords.map((word, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-md border">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{word.word}</h4>
                    <p className="text-sm text-gray-600 mt-1">{word.definition}</p>
                    {word.example && (
                      <p className="text-sm text-gray-500 mt-1 italic">
                        "{word.example}"
                      </p>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 ml-4">
                    <div>Syllables: {word.syllables.join('·')}</div>
                    {word.pronunciation && (
                      <div>Pronunciation: {word.pronunciation}</div>
                    )}
                  </div>
                </div>
                {word.origin && (
                  <p className="text-xs text-gray-500 mt-2">
                    Origin: {word.origin}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
