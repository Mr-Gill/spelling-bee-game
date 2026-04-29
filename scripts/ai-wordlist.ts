import http from 'http';
import dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables from .env file
dotenv.config();

const PORT = Number(process.env.PORT || 3001);
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Validate required environment variables
if (!GITHUB_TOKEN) {
  console.error('Error: GITHUB_TOKEN environment variable is required');
  process.exit(1);
}

// Load the prompt template
const PROMPT_TEMPLATE = fs.readFileSync(
  path.join(__dirname, '../WordList.prompt.yml'),
  'utf-8'
);

// Interface for word data
// Interface for API request body
interface WordListRequest {
  topic: string;
  count: number;
  grade?: number;
  prompt?: string;
}

// Interface for GitHub Models API response
interface GitHubModelsResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  error?: string;
}

const server = http.createServer(async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Only handle POST /wordlist
  if (req.method !== 'POST' || req.url !== '/wordlist') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  // Read and parse request body
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const { topic = '', count = 10, prompt: requestPrompt } = JSON.parse(body || '{}') as WordListRequest;
      
      // Validate count
      const wordCount = Math.min(Math.max(1, Number(count) || 10), 50);
      
      // Generate prompt from template
      const prompt = requestPrompt || PROMPT_TEMPLATE
        .replace('{{topic}}', topic)
        .replace('{{number}}', wordCount.toString());

      // Call GitHub Models API
      const response = await fetch('https://api.github.com/models/gpt-4', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'You are a helpful assistant that generates word lists for spelling bees.' },
            { role: 'user', content: prompt }
          ],
          model: 'gpt-4',
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`GitHub API error: ${error}`);
      }

      const data = await response.json() as GitHubModelsResponse;
      
      if (data.error) {
        throw new Error(data.error);
      }

      const content = data.choices?.[0]?.message?.content?.trim() || '';
      if (!content) throw new Error('Empty model response');

      // Send successful response
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ wordList: content }));
      
    } catch (error) {
      console.error('Error processing request:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        error: 'Failed to generate word list',
        details: error instanceof Error ? error.message : 'Unknown error'
      }));
    }
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  process.exit(1);
});

// Start the server
server.listen(PORT, () => {
  console.log(`AI wordlist server running at http://localhost:${PORT}/wordlist`);
});
