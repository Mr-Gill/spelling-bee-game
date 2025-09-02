// Mock audio files globally
jest.mock('../audio/correct.mp3', () => 'mock-correct.mp3');
jest.mock('../audio/wrong.mp3', () => 'mock-wrong.mp3');
jest.mock('../audio/letter-correct.mp3', () => 'mock-letter-correct.mp3');
jest.mock('../audio/letter-wrong.mp3', () => 'mock-letter-wrong.mp3');
