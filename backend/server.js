const http = require('http');
const fs = require('fs');
const path = require('path');

const loadDotEnv = () => {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separator = trimmed.indexOf('=');
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^["']|["']$/g, '');
    if (key && process.env[key] == null) process.env[key] = value;
  }
};

loadDotEnv();

const port = Number(process.env.PORT) || 3001;
const token = process.env.MODELS_TOKEN || process.env.GITHUB_MODELS_TOKEN || process.env.GITHUB_TOKEN;
const model = process.env.GITHUB_MODELS_MODEL || 'openai/gpt-4.1-mini';
const endpoint =
  process.env.GITHUB_MODELS_ENDPOINT ||
  (process.env.GITHUB_MODELS_ORG
    ? `https://models.github.ai/orgs/${process.env.GITHUB_MODELS_ORG}/inference/chat/completions`
    : 'https://models.github.ai/inference/chat/completions');
const apiVersion = process.env.GITHUB_MODELS_API_VERSION || '2022-11-28';
const proxyPassword = process.env.AI_SHARED_PASSWORD || '';

const requestCounts = new Map();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_BODY_BYTES = 64 * 1024;

const stripCodeFence = (content) =>
  content
    .trim()
    .replace(/^```(?:csv|json|tsv)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

const sendJson = (res, status, data) => {
  res.writeHead(status, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-AI-Password',
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify(data));
};

const readJsonBody = (req) =>
  new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
      if (Buffer.byteLength(body) > MAX_BODY_BYTES) {
        reject(Object.assign(new Error('Request body too large'), { status: 413 }));
        req.destroy();
      }
    });

    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(Object.assign(new Error('Invalid JSON body'), { status: 400 }));
      }
    });

    req.on('error', reject);
  });

const checkRateLimit = (req) => {
  const now = Date.now();
  const ip = req.socket.remoteAddress || 'unknown';
  const entry = requestCounts.get(ip) || { count: 0, start: now };

  if (now - entry.start > WINDOW_MS) {
    entry.count = 0;
    entry.start = now;
  }

  entry.count += 1;
  requestCounts.set(ip, entry);
  return entry.count <= MAX_REQUESTS;
};

const checkProxyPassword = (req) => {
  if (!proxyPassword) return true;
  const provided = req.headers['x-ai-password'];
  return typeof provided === 'string' && provided === proxyPassword;
};

const generateWordList = async (prompt) => {
  if (!token) {
    throw Object.assign(
      new Error('MODELS_TOKEN (or GITHUB_MODELS_TOKEN / GITHUB_TOKEN) is not configured'),
      { status: 500 }
    );
  }

  const response = await fetch(`${endpoint}?api-version=${apiVersion}`, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': apiVersion,
    },
    body: JSON.stringify({
      model,
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
  });

  if (!response.ok) {
    const details = await response.text();
    throw Object.assign(new Error(`GitHub Models request failed: ${response.status} ${details}`), {
      status: response.status,
    });
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== 'string' || !content.trim()) {
    throw Object.assign(new Error('GitHub Models returned an empty response'), { status: 502 });
  }

  return stripCodeFence(content);
};

const handleGenerate = async (req, res) => {
  if (!checkProxyPassword(req)) {
    return sendJson(res, 401, { error: 'AI proxy password is invalid' });
  }

  if (!checkRateLimit(req)) {
    return sendJson(res, 429, { error: 'Too many requests, please try again later.' });
  }

  const { prompt } = await readJsonBody(req);
  if (typeof prompt !== 'string' || !prompt.trim()) {
    return sendJson(res, 400, { error: 'Prompt is required' });
  }

  if (prompt.length > 12000) {
    return sendJson(res, 400, { error: 'Prompt too long' });
  }

  const wordList = await generateWordList(prompt);
  return sendJson(res, 200, { wordList });
};

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'OPTIONS') return sendJson(res, 204, {});

    if (req.method === 'GET' && req.url === '/health') {
      return sendJson(res, 200, {
        ok: true,
        model,
        endpoint,
        tokenConfigured: Boolean(token),
        passwordProtected: Boolean(proxyPassword),
      });
    }

    if (req.method === 'POST' && (req.url === '/wordlist' || req.url === '/generate-word-list')) {
      return await handleGenerate(req, res);
    }

    return sendJson(res, 404, { error: 'Not found' });
  } catch (error) {
    console.error(error);
    return sendJson(res, error.status || 500, { error: error.message || 'Internal Server Error' });
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`GitHub Models endpoint: ${endpoint}`);
  console.log(`GitHub Models model: ${model}`);
  console.log(`GitHub Models token configured: ${token ? 'yes' : 'no'}`);
  console.log(`AI proxy password configured: ${proxyPassword ? 'yes' : 'no'}`);
});
