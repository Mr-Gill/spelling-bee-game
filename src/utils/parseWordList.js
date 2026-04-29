const requiredFields = ['word', 'definition'];

function cleanHeader(value) {
  return value.trim().replace(/^"|"$/g, '');
}

function parseDelimitedLine(line, delimiter) {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '\\' && next === '"') {
      current += '"';
      i++;
      continue;
    }

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i++;
        continue;
      }

      const following = line[i + 1];
      const isBoundary = following === delimiter || following === undefined || following === '\r';
      if (!inQuotes || isBoundary) {
        inQuotes = !inQuotes;
      } else {
        current += char;
      }
      continue;
    }

    if (char === delimiter && !inQuotes) {
      values.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values.map(value => value.replace(/^"|"$/g, '').trim());
}

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

function parseSyllables(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    if (value.startsWith('[')) {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        // fall through to string splitting
      }
    }
    return value.split(/[-·|]/).map(s => s.trim()).filter(Boolean);
  }
  return null;
}

function normalizeWord(raw) {
  return {
    ...raw,
    word: String(raw.word || ''),
    definition: raw.definition != null ? String(raw.definition) : null,
    syllables: parseSyllables(raw.syllables),
    origin: raw.origin != null ? String(raw.origin) : null,
    example: raw.example != null ? String(raw.example) : null,
    prefix: raw.prefix != null ? String(raw.prefix) : undefined,
    suffix: raw.suffix != null ? String(raw.suffix) : undefined,
    pronunciation: raw.pronunciation != null ? String(raw.pronunciation) : undefined
  };
}

function parseWordList(content) {
  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      validateWords(parsed);
      return parsed.map(normalizeWord);
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
  const headers = parseDelimitedLine(lines[0], delimiter).map(cleanHeader);
  const words = lines
    .slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = parseDelimitedLine(line, delimiter);
      const wordObj = {};
      headers.forEach((header, idx) => {
        wordObj[header] = values[idx] ? values[idx].trim() : '';
      });
      return wordObj;
    });

  validateWords(words);
  return words.map(normalizeWord);
}

module.exports = { parseWordList };
