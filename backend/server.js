const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

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

app.post('/generate-word-list', async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.chat.completions.create({
      model: 'gpt-4.1',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that generates spelling bee word lists.' },
        { role: 'user', content: prompt }
      ],
      temperature: 1.0,
      top_p: 1.0
    });

    res.json({ wordList: response.choices[0].message.content });
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
