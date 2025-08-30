export interface SpeakOptions {
  voice?: SpeechSynthesisVoice;
  rate?: number;
  pitch?: number;
}

export const speak = (text: string, options: SpeakOptions = {}) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  const { voice, rate, pitch } = options;

  if (voice) {
    utterance.voice = voice;
  } else {
    const savedVoice = localStorage.getItem('selectedVoice');
    if (savedVoice) {
      const voices = window.speechSynthesis.getVoices();
      const matched = voices.find(v => v.voiceURI === savedVoice || v.name === savedVoice);
      if (matched) utterance.voice = matched;
    }
  }

  if (rate) utterance.rate = rate;
  if (pitch) utterance.pitch = pitch;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};
