export type Word = {
  word: string;
  difficulty: 'easy' | 'medium' | 'tricky';
};

export function parseWordList(content: string): Word[] {
  // For now, return an empty array. We can implement parsing later.
  return [];
}
