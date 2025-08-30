import { Configuration, OpenAIApi } from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import * as dotenv from 'dotenv';

dotenv.config();

interface PromptConfig {
  messages: Array<{
    role: string;
    content: string;
  }>;
}

async function loadPromptConfig(): Promise<PromptConfig> {
  const promptPath = path.join(__dirname, '..', 'WordList.prompt.yml');
  const fileContents = fs.readFileSync(promptPath, 'utf8');
  return yaml.load(fileContents) as PromptConfig;
}

async function generateWordList(topic: string, count: number = 10): Promise<string> {
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  const openai = new OpenAIApi(config);
  const promptConfig = await loadPromptConfig();
  
  // Add the topic and count to the prompt
  const userMessage = `TOPIC: ${topic}\nN: ${count}`;
  
  const messages = [
    ...promptConfig.messages,
    { role: 'user', content: userMessage }
  ];

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4', // or another appropriate model
      messages,
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = response.data.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content in AI response');
    }
    
    return content;
  } catch (error) {
    console.error('Error generating word list:', error);
    throw error;
  }
}

async function saveWordList(content: string, topic: string): Promise<void> {
  const outputDir = path.join(__dirname, '..', 'wordlists');
  const filename = `wordlist_${topic.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
  const filePath = path.join(outputDir, filename);
  
  await fs.promises.mkdir(outputDir, { recursive: true });
  await fs.promises.writeFile(filePath, content);
  
  console.log(`Word list saved to: ${filePath}`);
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Please provide a topic as an argument');
    process.exit(1);
  }
  
  const topic = args[0];
  const count = args[1] ? parseInt(args[1], 10) : 10;
  
  if (isNaN(count) || count < 1) {
    console.error('Count must be a positive number');
    process.exit(1);
  }
  
  try {
    console.log(`Generating ${count} words about ${topic}...`);
    const wordList = await generateWordList(topic, count);
    await saveWordList(wordList, topic);
  } catch (error) {
    console.error('Failed to generate word list:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}
