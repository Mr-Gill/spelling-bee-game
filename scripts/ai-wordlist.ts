import http from 'http';

const PORT = Number(process.env.PORT || 3001);

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/wordlist') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', async () => {
      try {
        const { grade = 5, topic = '', count = 10 } = JSON.parse(body || '{}');
        const prompt = `Return a JSON array of ${count} English words${topic ? ` about ${topic}` : ''} with fields word, syllables, definition, origin, example, prefix, suffix, pronunciation suitable for grade ${grade}`;
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
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(words));
      } catch (err) {
        console.error('AI word generation failed', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to generate words' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`AI wordlist server running at http://localhost:${PORT}/wordlist`);
});
