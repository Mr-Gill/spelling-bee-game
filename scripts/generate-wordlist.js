const fs = require('fs').promises;
const path = require('path');

// Static word list with educational words
const STATIC_WORDS = [
  {
    "word": "education",
    "syllables": ["ed", "u", "ca", "tion"],
    "definition": "The process of receiving or giving systematic instruction, especially at a school or university.",
    "origin": "Latin 'educatio', from 'educare' meaning 'to bring up, rear, educate'.",
    "example": "The school is committed to providing quality education to all its students.",
    "prefix": "",
    "suffix": "-tion",
    "pronunciation": "ej-oo-KAY-shun"
  },
  {
    "word": "spelling",
    "syllables": ["spell", "ing"],
    "definition": "The process of writing or naming the letters of a word.",
    "origin": "Old English 'spellian' meaning 'to tell, speak, utter'.",
    "example": "She won first place in the school spelling competition.",
    "prefix": "",
    "suffix": "-ing",
    "pronunciation": "SPEL-ing"
  },
  {
    "word": "vocabulary",
    "syllables": ["vo", "cab", "u", "lar", "y"],
    "definition": "The body of words used in a particular language or known to a particular person.",
    "origin": "Late Latin 'vocabularium', from Latin 'vocabulum' meaning 'name, word'.",
    "example": "Reading regularly helps to expand your vocabulary.",
    "prefix": "",
    "suffix": "-ary",
    "pronunciation": "voh-KAB-yuh-lair-ee"
  },
  {
    "word": "mathematics",
    "syllables": ["math", "e", "mat", "ics"],
    "definition": "The abstract science of number, quantity, and space.",
    "origin": "From Greek 'mathēmatikē' meaning 'mathematical, scientific'.",
    "example": "She excelled in mathematics and won several awards.",
    "prefix": "",
    "suffix": "-ics",
    "pronunciation": "math-uh-MAT-iks"
  },
  {
    "word": "science",
    "syllables": ["sci", "ence"],
    "definition": "The systematic study of the structure and behavior of the physical and natural world.",
    "origin": "From Latin 'scientia' meaning 'knowledge'.",
    "example": "The science fair showcased many innovative student projects.",
    "prefix": "",
    "suffix": "-ence",
    "pronunciation": "SY-uhns"
  },
  {
    "word": "literature",
    "syllables": ["lit", "er", "a", "ture"],
    "definition": "Written works, especially those considered of superior or lasting artistic merit.",
    "origin": "From Latin 'litteratura' meaning 'writing, grammar'.",
    "example": "She studied English literature in college.",
    "prefix": "",
    "suffix": "-ture",
    "pronunciation": "LIT-er-uh-cher"
  },
  {
    "word": "history",
    "syllables": ["his", "to", "ry"],
    "definition": "The study of past events, particularly in human affairs.",
    "origin": "From Greek 'historia' meaning 'inquiry, knowledge acquired by investigation'.",
    "example": "We learned about ancient civilizations in history class.",
    "prefix": "",
    "suffix": "-story",
    "pronunciation": "HIS-tuh-ree"
  },
  {
    "word": "geography",
    "syllables": ["ge", "og", "ra", "phy"],
    "definition": "The study of the physical features of the earth and its atmosphere.",
    "origin": "From Greek 'geographia' meaning 'earth description'.",
    "example": "We're studying European geography this semester.",
    "prefix": "geo-",
    "suffix": "-graphy",
    "pronunciation": "jee-OG-ruh-fee"
  },
  {
    "word": "biology",
    "syllables": ["bi", "ol", "o", "gy"],
    "definition": "The study of living organisms, divided into many specialized fields.",
    "origin": "From Greek 'bios' (life) + 'logia' (study of).",
    "example": "Biology class taught us about the human body and ecosystems.",
    "prefix": "bio-",
    "suffix": "-logy",
    "pronunciation": "by-OL-uh-jee"
  },
  {
    "word": "chemistry",
    "syllables": ["chem", "is", "try"],
    "definition": "The branch of science that deals with the identification of substances.",
    "origin": "From Greek 'khemeia' meaning 'art of alloying metals'.",
    "example": "We conducted experiments in chemistry lab.",
    "prefix": "",
    "suffix": "-try",
    "pronunciation": "KEM-uh-stree"
  }
];

async function generateWordList(topic = 'general', count = 5) {
  try {
    // Filter words by topic if specified
    let words = STATIC_WORDS;
    if (topic && topic !== 'general') {
      const topicLower = topic.toLowerCase();
      words = STATIC_WORDS.filter(word => 
        word.word.toLowerCase().includes(topicLower) ||
        word.definition.toLowerCase().includes(topicLower) ||
        word.origin.toLowerCase().includes(topicLower)
      );
    }
    
    // Limit the number of words
    words = words.slice(0, Math.min(count, words.length));
    
    // If we don't have enough words, duplicate some to reach the requested count
    while (words.length < count) {
      words = words.concat(STATIC_WORDS.slice(0, Math.min(count - words.length, STATIC_WORDS.length)));
    }

    // Save to file
    await fs.writeFile(
      path.join(process.cwd(), 'wordlist.json'),
      JSON.stringify(words, null, 2)
    );
    
    console.log(`Successfully generated ${words.length} words`);
    return words;
  } catch (error) {
    console.error('Error generating word list:', error);
    process.exit(1);
  }
}

// Get command line arguments
const topic = process.argv[2] || 'general';
const count = parseInt(process.argv[3] || '10', 10);

// Generate the word list
generateWordList(topic, count);
