export const loadAudioFiles = async () => {
  try {
    const [correct, wrong, letterCorrect, letterWrong] = await Promise.all([
      import('../audio/correct.mp3'),
      import('../audio/wrong.mp3'),
      import('../audio/letter-correct.mp3'),
      import('../audio/letter-wrong.mp3')
    ]);
    
    return {
      correctSoundFile: correct.default,
      wrongSoundFile: wrong.default,
      letterCorrectSoundFile: letterCorrect.default,
      letterWrongSoundFile: letterWrong.default
    };
  } catch (error) {
    console.error('Failed to load audio files:', error);
    return {};
  }
};
