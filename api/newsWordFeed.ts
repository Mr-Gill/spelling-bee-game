import http from 'http';

interface HeadlineWord {
  word: string;
  context: string;
}

const PORT = Number(process.env.NEWS_PORT || 3002);

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url === '/headlines') {
    try {
      const newsKey = process.env.NEWS_API_KEY;
      const newsRes = await fetch(`https://newsapi.org/v2/top-headlines?language=en&apiKey=${newsKey}`);
      const newsJson = await newsRes.json();
      const articles: any[] = newsJson.articles?.slice(0, 5) || [];
      const joined = articles
        .map(a => `${a.title}. ${a.description || ''}`)
        .join('\n');
      const prompt =
        'Extract a list of important vocabulary words from the following news summaries. ' +
        'Return a JSON array where each entry has a word and a short context sentence in an object with keys "word" and "context".\n' +
        joined;

      const ghRes = await fetch('https://api.github.com/models/gpt-4o-mini-instruct', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [{ role: 'user', content: prompt }] }),
      });
      const json = await ghRes.json();
      const content = json?.choices?.[0]?.message?.content || '[]';
      let parsed: HeadlineWord[] = [];
      try {
        parsed = JSON.parse(content);
      } catch (err) {
        console.error('Failed to parse model response', content, err);
        parsed = [];
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify(
          parsed.map(w => ({
            word: w.word,
            syllables: [],
            definition: '',
            origin: '',
            example: w.context,
          }))
        )
      );
    } catch (err) {
      console.error('News word feed failed', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to fetch headlines' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`News word feed server running at http://localhost:${PORT}/headlines`);
});

export default server;
