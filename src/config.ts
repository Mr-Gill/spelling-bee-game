// Client-side configuration
export const config = {
  publicUrl: '',
  baseUrl: '/spelling-bee-game/',
  githubToken: process.env.API_TOKEN || '',
  githubApiUrl: 'https://api.github.com/models/gpt-4o-mini-instruct',
  elevenLabsApiKey: '',
  newsApiKey: '',
  openAiApiKey: '',
  isProduction: false,
};
