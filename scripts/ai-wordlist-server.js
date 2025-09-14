const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 3001;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || 'dummy-token';

console.log('Starting AI wordlist server...');
console.log('GitHub Token available:', GITHUB_TOKEN ? 'Yes' : 'No');

// Simple word generation for testing (without actual AI API calls)
function generateMockWords(topic, count) {
  const mockWords = [
    {
      word: 'elephant',
      syllables: ['el', 'e', 'phant'],
      definition: 'A large mammal with a trunk',
      origin: 'Greek elephas',
      example: 'The elephant trumpeted loudly.',
      prefix: '',
      suffix: '',
      pronunciation: 'EL-uh-fuhnt'
    },
    {
      word: 'giraffe',
      syllables: ['gi', 'raffe'],
      definition: 'A tall African mammal with a long neck',
      origin: 'Arabic zarafa',
      example: 'The giraffe reached the high leaves.',
      prefix: '',
      suffix: '',
      pronunciation: 'juh-RAF'
    },
    {
      word: 'hippopotamus',
      syllables: ['hip', 'po', 'pot', 'a', 'mus'],
      definition: 'A large semi-aquatic mammal',
      origin: 'Greek hippos (horse) + potamos (river)',
      example: 'The hippopotamus wallowed in the mud.',
      prefix: '',
      suffix: '',
      pronunciation: 'hip-uh-POT-uh-muhs'
    },
    {
      word: 'rhinoceros',
      syllables: ['rhi', 'noc', 'er', 'os'],
      definition: 'A large thick-skinned mammal with horns',
      origin: 'Greek rhino (nose) + keras (horn)',
      example: 'The rhinoceros charged through the bush.',
      prefix: '',
      suffix: '',
      pronunciation: 'rahy-NOS-er-uhs'
    },
    {
      word: 'zebra',
      syllables: ['ze', 'bra'],
      definition: 'A horse-like animal with black and white stripes',
      origin: 'Portuguese zebra',
      example: 'The zebra galloped across the savanna.',
      prefix: '',
      suffix: '',
      pronunciation: 'ZEE-bruh'
    }
  ];

  // Filter based on topic if provided
  const filteredWords = topic ? mockWords : mockWords;
  
  // Return requested number of words
  return filteredWords.slice(0, Math.min(count, filteredWords.length));
}

const server = http.createServer(async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  console.log(`${req.method} ${req.url}`);
  
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
      const { topic = '', count = 10 } = JSON.parse(body || '{}');
      
      console.log(`Generating ${count} words for topic: "${topic}"`);
      
      // Validate count
      const wordCount = Math.min(Math.max(1, Number(count) || 10), 50);
      
      // For now, generate mock words (in production, this would call GitHub Models API)
      const words = generateMockWords(topic, wordCount);
      
      console.log(`Generated ${words.length} words successfully`);
      
      // Send successful response
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(words));
      
    } catch (error) {
      console.error('Error processing request:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        error: 'Failed to generate word list',
        details: error.message
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
  console.log('Ready to receive word generation requests!');
});