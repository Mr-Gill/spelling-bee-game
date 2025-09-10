import React from 'react';
import SpellingBeeGame from './spelling-bee-game';
import { AudioProvider } from './AudioContext';
import { HelpSystemProvider } from './contexts/HelpSystemContext';

function App() {
  return (
    <AudioProvider>
      <HelpSystemProvider>
        <SpellingBeeGame />
      </HelpSystemProvider>
    </AudioProvider>
  );
}

export default App;