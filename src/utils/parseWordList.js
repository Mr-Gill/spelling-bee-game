const requiredFields = ['word', 'definition'];

function validateWords(words) {
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    for (const field of requiredFields) {
      if (!w[field]) {
        throw new Error(`Word at index ${i} is missing required field '${field}'`);
      }
    }
  }
}

function parseWordList(content) {
  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      validateWords(parsed);
      return parsed;
    }
  } catch (e) {
    if (e instanceof SyntaxError) {
      // Ignore JSON parse errors
    } else {
      throw e;
    }
  }

  const lines = content.trim().split('\n');
  if (lines.length < 2) {
    throw new Error('Invalid word list format.');
  }
  const delimiter = lines[0].includes(',') ? ',' : '\t';
  const headers = lines[0].split(delimiter).map(h => h.trim());
  const words = lines
    .slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = line.split(delimiter);
      const wordObj = {};
      headers.forEach((header, idx) => {
        wordObj[header] = values[idx] ? values[idx].trim() : '';
      });
      return wordObj;
    });

  validateWords(words);
  return words;
}

module.exports = { parseWordList };
