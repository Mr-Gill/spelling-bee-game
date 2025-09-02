import OpenAI from "openai";

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

export async function generateWordList(prompt: string): Promise<string> {
  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

  const response = await client.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant that generates spelling bee word lists." },
      { role: "user", content: prompt }
    ],
    temperature: 1.0,
    top_p: 1.0,
    model: model
  });

  return response.choices[0].message.content;
}
