/**
 * Service for generating word lists using GitHub Models API
 * This works client-side and is compatible with GitHub Pages deployment
 */

export interface WordListPrompt {
  topic: string;
  count: number;
}

export interface GeneratedWord {
  word: string;
  syllables: string[];
  definition: string;
  origin: string;
  example: string;
  prefix: string;
  suffix: string;
  pronunciation: string;
}

export class GitHubWordListGenerator {
  private baseUrl = 'https://models.github.ai';
  private apiVersion = '2022-11-28';

  constructor(private githubToken: string) {}

  /**
   * Generate word list using GitHub Models API
   */
  async generateWordList(prompt: WordListPrompt): Promise<GeneratedWord[]> {
    const systemPrompt = `ROLE

Generate a CSV for an AU Years 7–8 spelling bee on TOPIC. Your voice is a witty, knowledgeable lexicographer making a fun but challenging list.

INPUT

TOPIC (string) and N (int). If N invalid/missing → N=10.

OUTPUT (JSON ONLY)

Generate exactly N words. Return as JSON array of objects with this exact structure:
[{"word":"word","syllables":["syl","la","bles"],"definition":"definition","origin":"origin","example":"example","prefix":"prefix","suffix":"suffix","pronunciation":"pronunciation"}]

CONTENT

AU/UK spelling. ≥70% headwords clearly fit TOPIC (others closely related).
Difficulty: ~30% 1–2 syllables (foundational), ~50% 2–3 (core), ~20% 4+
ASCII only; straight quotes (").
Syllables as JSON string array.
CORRECT: ["har","mo","ny"]
INCORRECT: ["har","mo","ny"]

Return ONLY valid JSON array, no additional text.`;

    const userMessage = `TOPIC: ${prompt.topic}\nN: ${prompt.count}`;

    try {
      const response = await fetch(`${this.baseUrl}/inference/chat/completions`, {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github+json',
          'Authorization': `Bearer ${this.githubToken}`,
          'X-GitHub-Api-Version': this.apiVersion,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o-mini', // Use a cost-effective model
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage }
          ],
          temperature: 0.7,
          max_tokens: 4000,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`GitHub API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error('No content received from GitHub Models API');
      }

      // Parse the JSON response
      const words = JSON.parse(content.trim());

      if (!Array.isArray(words)) {
        throw new Error('Invalid response format: expected array of words');
      }

      // Validate and clean the word data
      return words.map(word => ({
        word: word.word || '',
        syllables: Array.isArray(word.syllables) ? word.syllables : [],
        definition: word.definition || '',
        origin: word.origin || '',
        example: word.example || '',
        prefix: word.prefix || '',
        suffix: word.suffix || '',
        pronunciation: word.pronunciation || '',
      }));

    } catch (error) {
      console.error('Error generating word list:', error);
      throw new Error(`Failed to generate word list: ${error.message}`);
    }
  }

  /**
   * Test if the GitHub token is valid and has required permissions
   */
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/inference/chat/completions`, {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github+json',
          'Authorization': `Bearer ${this.githubToken}`,
          'X-GitHub-Api-Version': this.apiVersion,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o-mini',
          messages: [{ role: 'user', content: 'Hello' }],
          max_tokens: 10,
        }),
      });

      return response.ok || response.status === 400; // 400 is OK for test, means API is accessible
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }

  /**
   * Get available models (for future use)
   */
  async getAvailableModels(): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/catalog/models`, {
        headers: {
          'Accept': 'application/vnd.github+json',
          'Authorization': `Bearer ${this.githubToken}`,
          'X-GitHub-Api-Version': this.apiVersion,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching models:', error);
      return [];
    }
  }
}

// Export for use in the app
export default GitHubWordListGenerator;
