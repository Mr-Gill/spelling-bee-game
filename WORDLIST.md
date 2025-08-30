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

To generate a word list locally:

```bash
# Install dependencies
npm install

# Generate word list (requires GITHUB_TOKEN in .env)
GITHUB_TOKEN=your_token_here node scripts/generate-wordlist.js "education" 50

# Build the project to include the new word list
npm run build
```

## Customizing Word Generation

You can customize the word generation by modifying the prompt in `WordList.prompt.yml`. The prompt includes detailed instructions for the AI model to generate appropriate words for the spelling bee.

## Word List Format

The word list is stored as a JSON array of word objects. Each word object has the following structure:

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
