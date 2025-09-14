const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const requestCounts = new Map();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 5;

const rateLimiter = (req, res, next) => {
  const now = Date.now();
  const ip = req.ip;
  const entry = requestCounts.get(ip) || { count: 0, start: now };
  if (now - entry.start > WINDOW_MS) {
    entry.count = 0;
    entry.start = now;
  }
  entry.count += 1;
  requestCounts.set(ip, entry);
  if (entry.count > MAX_REQUESTS) {
    return res.status(429).json({ error: 'Too many requests, please try again later.' });
  }
  next();
};

const openai = new OpenAI({
  apiKey: process.env.GITHUB_TOKEN,
  baseURL: 'https://api.githubcopilot.com/v1'
});

const generateWordList = async (prompt) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4.1',
    messages: [
      { role: 'system', content: 'You are a helpful assistant that generates spelling bee word lists.' },
      { role: 'user', content: prompt }
    ],
    temperature: 1.0,
    top_p: 1.0
  });

  return response.choices[0].message.content;
};

app.post('/generate-word-list', rateLimiter, async (req, res) => {
  try {
    if (!process.env.GITHUB_TOKEN) {
      return res.status(500).json({ error: 'GITHUB_TOKEN not configured' });
    }

    const { prompt } = req.body;
    if (typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (prompt.length > 200) {
      return res.status(400).json({ error: 'Prompt too long' });
    }

    const wordList = await generateWordList(prompt);

    res.json({ wordList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/wordlist', async (req, res) => {
  try {
    const { prompt } = req.body;
    const wordList = await generateWordList(prompt);
    res.json({ wordList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate word list' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
