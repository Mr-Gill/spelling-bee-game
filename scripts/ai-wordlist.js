"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// Load environment variables from .env file
dotenv_1.default.config();
const PORT = Number(process.env.PORT || 3001);
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
// Validate required environment variables
if (!GITHUB_TOKEN) {
    console.error('Error: GITHUB_TOKEN environment variable is required');
    process.exit(1);
}
// Load the prompt template
const PROMPT_TEMPLATE = fs.readFileSync(path.join(__dirname, '../WordList.prompt.yml'), 'utf-8');
const server = http_1.default.createServer(async (req, res) => {
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
            const { topic = '', count = 10, grade = 7 } = JSON.parse(body || '{}');
            // Validate count
            const wordCount = Math.min(Math.max(1, Number(count) || 10), 50);
            // Generate prompt from template
            const prompt = PROMPT_TEMPLATE
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
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }
            // Extract and parse the response
            const content = data.choices?.[0]?.message?.content || '[]';
            let words;
            try {
                // Try to parse as JSON first
                words = JSON.parse(content);
            }
            catch (err) {
                // If JSON parsing fails, try to extract JSON from markdown code blocks
                const jsonMatch = content.match(/```(?:json)?\n([\s\S]*?)\n```/);
                if (jsonMatch) {
                    words = JSON.parse(jsonMatch[1]);
                }
                else {
                    throw new Error('Failed to parse response as JSON');
                }
            }
            // Validate words array
            if (!Array.isArray(words) || words.length === 0) {
                throw new Error('Invalid response format: expected an array of words');
            }
            // Send successful response
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(words));
        }
        catch (error) {
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
