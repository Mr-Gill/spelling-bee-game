# Word List Generation

This project includes a feature to generate word lists for the Spelling Bee game using GitHub's AI models.

## How It Works

1. **Local Development**:
   - The app uses a pre-generated word list stored in `wordlist.json`
   - This file is copied to the `dist` directory during build
   - The frontend loads this file when the app starts

2. **Production**:
   - Word lists are generated using GitHub Actions workflows
   - The workflow uses GitHub's AI models to generate words
   - The generated word list is deployed with the application

## Generating a New Word List

### Using GitHub Actions

1. Go to the **Actions** tab in your GitHub repository
2. Select **Generate and Deploy Word List**
3. Click **Run workflow**
4. (Optional) Customize the topic and number of words
5. Click **Run workflow**

The workflow will:
1. Generate a new word list
2. Build the project
3. Deploy to GitHub Pages
4. Commit the new word list to the repository

### Local Development

To use the in-app **Generate with AI** button locally:

```bash
# Install dependencies
npm install

# Start the GitHub Models proxy server
GITHUB_MODELS_TOKEN=your_token_here npm run ai:server
```

The token needs the `models: read` permission. The server listens on `http://localhost:3001/wordlist`, which is what the setup screen calls.

On GitHub Pages, the app cannot use repository secrets because it is a static site. Paste a fine-grained GitHub token with `models: read` into the setup screen's **GitHub Models Token** field to generate directly from the browser. The token is stored only in `sessionStorage` for the current browser session.

Quick setup:
1. Enable **Models** in the repository settings.
2. Create a fine-grained token with `models: read`.
3. Paste the token into setup and generate a small list first (10 words).

If it fails:
- `401`: token invalid or missing `models: read`.
- `403`: repository/org Models access not enabled for the selected model.
- `429`: rate limit reached; wait and retry.

Optional environment variables:

```bash
GITHUB_MODELS_MODEL=openai/gpt-4.1
GITHUB_MODELS_ORG=your-org-login
PORT=3001
```

To generate the static `wordlist.json` file instead:

```bash
GITHUB_TOKEN=your_token_here node scripts/generate-wordlist.js "education" 50

# Build the project to include the new word list
npm run build
```

## Customizing Word Generation

You can customize the word generation by modifying the prompt in `WordList.prompt.yml`. The prompt includes detailed instructions for the AI model to generate appropriate words for the spelling bee.

## Word List Format

Downloadable templates are available in:

- `wordlists/template.csv`
- `wordlists/template.tsv`
- `wordlists/template.txt`
- `wordlists/template.json`

The CSV, TSV, and TXT templates include `#` instruction lines. These lines are ignored on upload, so the same downloaded files can be edited and uploaded back into the game.

The word list can be stored as CSV, TSV, TXT, or a JSON object/array. Each word object has the following structure:

```typescript
{
  word: string;          // The word to be spelled
  syllables: string[];   // Array of syllables
  definition: string;    // Word definition
  origin: string;       // Word origin/etymology
  example: string;      // Example sentence
  prefix: string;       // Word prefix (if any)
  suffix: string;       // Word suffix (if any)
  pronunciation: string; // Pronunciation guide
}
```

## Caching

The word list is cached in the browser's memory after the first load to improve performance. The cache is cleared when the page is refreshed.
