export async function generateWordList(prompt: string): Promise<string> {
  const response = await fetch('http://localhost:3001/generate-word-list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.wordList;
}
