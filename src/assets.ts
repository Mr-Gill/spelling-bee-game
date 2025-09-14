// Centralized asset management
// Provides consistent, typed access to all application assets

// Helper function to build asset URLs
// Uses relative paths for GitHub Pages compatibility
const assetUrl = (path: string): string => {
  // For GitHub Pages project sites, use relative paths
  // For user sites or custom domains, this will work correctly
  return path.startsWith('assets/') ? path : `assets/${path}`;
};

// Audio assets with fallback support
export const AUDIO_ASSETS = {
  // Music tracks
  music: {
    victory: assetUrl('assets/audio/victory-music.mp3'),
    country: assetUrl('assets/audio/spelling-bee-country.mp3'),
    countryInstrumental: assetUrl('assets/audio/spelling-bee-country-instrumental.mp3'),
    deepBass: assetUrl('assets/audio/spelling-bee-deep-bass.mp3'),
    deepBassInstrumental: assetUrl('assets/audio/spelling-bee-deep-bass-instrumental.mp3'),
    funk: assetUrl('assets/audio/spelling-bee-funk.mp3'),
    funkInstrumental: assetUrl('assets/audio/spelling-bee-funk-instrumental.mp3'),
    latin: assetUrl('assets/audio/spelling-bee-latin.mp3'),
    latinInstrumental: assetUrl('assets/audio/spelling-bee-latin-instrumental.mp3'),
    rock: assetUrl('assets/audio/spelling-bee-rock.mp3'),
    rockInstrumental: assetUrl('assets/audio/spelling-bee-rock-instrumental.mp3'),
    spooky: assetUrl('assets/audio/spelling-bee-spooky.mp3'),
    spookyInstrumental: assetUrl('assets/audio/spelling-bee-spooky-instrumental.mp3'),
    techHouse: assetUrl('assets/audio/spelling-bee-tech-house.mp3'),
    techHouseInstrumental: assetUrl('assets/audio/spelling-bee-tech-house-instrumental.mp3'),
  },
  
  // Sound effects
  sfx: {
    applause: assetUrl('assets/audio/applause.mp3'),
    buzzer: assetUrl('assets/audio/buzzer.mp3'),
    buzzer2: assetUrl('assets/audio/buzzer2.mp3'),
    cheer: assetUrl('assets/audio/cheer.mp3'),
    correct: assetUrl('assets/audio/correct.mp3'),
    wrong: assetUrl('assets/audio/wrong.mp3'),
    letterCorrect: assetUrl('assets/audio/letter-correct.mp3'),
    letterWrong: assetUrl('assets/audio/letter-wrong.mp3'),
    loseLife: assetUrl('assets/audio/lose-life.mp3'),
    shop: assetUrl('assets/audio/shop.mp3'),
    timeout: assetUrl('assets/audio/timeout.mp3'),
    davidGreatSpelling: assetUrl('assets/audio/david-great-spelling.mp3'),
  }
};

// Image assets
export const IMAGE_ASSETS = {
  // Main bee mascot images
  bee: {
    default: assetUrl('assets/img/default-bee.png'),
    help: assetUrl('assets/img/help-bee.png'),
    typing: assetUrl('assets/img/typing-bee.png'),
    celebratory: assetUrl('assets/img/celebratory-bee.png'),
    winning: assetUrl('assets/img/winning-bee.png'),
    wrongAnswer: assetUrl('assets/img/wrong-answer-bee.png'),
    flying: assetUrl('assets/img/flying-bee.png'),
    shopping: assetUrl('assets/img/shopping-bee.png'),
    timePressure: assetUrl('assets/img/time-pressure-bee.png'),
  },
  
  // Avatar icons
  avatars: {
    bee: assetUrl('assets/img/avatars/bee.svg'),
    book: assetUrl('assets/img/avatars/book.svg'),
    trophy: assetUrl('assets/img/avatars/trophy.svg'),
  },
  
  // Achievement icons
  achievements: {
    firstWin: assetUrl('assets/img/achievements/first-win.svg'),
  },
  
  // App icon
  app: {
    icon: assetUrl('assets/img/app-icon.png'),
  }
};

// Combined assets object for convenience
export const ASSETS = {
  audio: AUDIO_ASSETS,
  img: IMAGE_ASSETS,
};

// Asset loading utilities with fallbacks
export async function checkAssetExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

export async function loadAudioWithFallbacks(urls: string[]): Promise<string> {
  for (const url of urls) {
    try {
      if (await checkAssetExists(url)) {
        return url;
      }
    } catch {
      // Continue to next fallback
    }
  }
  throw new Error('No audio file available from provided URLs');
}

export async function loadImageWithFallback(primaryUrl: string, fallbackUrl: string): Promise<string> {
  try {
    if (await checkAssetExists(primaryUrl)) {
      return primaryUrl;
    }
  } catch {
    // Use fallback
  }
  
  try {
    if (await checkAssetExists(fallbackUrl)) {
      return fallbackUrl;
    }
  } catch {
    // Return primary URL anyway, let browser handle 404
  }
  
  return primaryUrl;
}

export default ASSETS;