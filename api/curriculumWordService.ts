import * as http from 'http';
import * as fs from 'fs/promises';
import * as path from 'path';

const PORT = Number(process.env.PORT || 3002);
const wordlistsDir = path.join(process.cwd(), 'wordlists');

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/curriculumWords') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', async () => {
      try {
        const { subject = '', gradeLevel = 1 } = JSON.parse(body || '{}');
        const prompt = `Return a JSON array of 20 English vocabulary words for grade ${gradeLevel} ${subject} with fields word, syllables, definition, origin, example, prefix, suffix, pronunciation.`;
        const ghRes = await fetch('https://api.github.com/models/gpt-4o-mini-instruct', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [{ role: 'user', content: prompt }],
          }),
        });
        const json = await ghRes.json();
        const content = json?.choices?.[0]?.message?.content || '[]';
        let words: any[];
        try {
          words = JSON.parse(content);
        } catch (err) {
          console.error('Failed to parse model response', content, err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Parse failure' }));
          return;
        }
        const fileName = `subject-${subject.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.json`;
        await fs.mkdir(wordlistsDir, { recursive: true });
        await fs.writeFile(path.join(wordlistsDir, fileName), JSON.stringify(words, null, 2));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ words, file: fileName }));
      } catch (err) {
        console.error('Curriculum word generation failed', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to generate words' }));
      }
    });
  } else if (req.method === 'GET' && req.url === '/curriculumWords') {
    try {
      const files = await fs.readdir(wordlistsDir);
      const list = files.filter(f => f.startsWith('subject-') && f.endsWith('.json'));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(list));
    } catch (err) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify([]));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Curriculum word service running at http://localhost:${PORT}/curriculumWords`);
});
