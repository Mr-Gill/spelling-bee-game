// Client-side configuration
export const config = {
  publicUrl: process.env.PUBLIC_URL || '',
  baseUrl: '/spelling-bee-game/',
  githubToken: process.env.GITHUB_MODELS_TOKEN || '',
  githubApiUrl: 'https://api.github.com/models/gpt-4o-mini-instruct',
  elevenLabsApiKey: process.env.ELEVENLABS_API_KEY || '',
  newsApiKey: process.env.NEWS_API_KEY || '',
  openAiApiKey: process.env.OPENAI_API_KEY || '',
  isProduction: process.env.NODE_ENV === 'production',
};
