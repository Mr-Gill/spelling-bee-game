import { AUDIO_ASSETS } from '../assets';

export const loadAudioFiles = async () => {
  try {
    // Return the asset URLs directly since we're using a build system
    // that will handle the asset copying
    return {
      correctSoundFile: AUDIO_ASSETS.sfx.correct,
      wrongSoundFile: AUDIO_ASSETS.sfx.wrong,
      letterCorrectSoundFile: AUDIO_ASSETS.sfx.letterCorrect,
      letterWrongSoundFile: AUDIO_ASSETS.sfx.letterWrong
    };
  } catch (error) {
    console.error('Failed to load audio files:', error);
    return {};
  }
};
