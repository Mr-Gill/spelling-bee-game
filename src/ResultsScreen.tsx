import React, { useEffect, useRef, useState } from 'react';
import { GameResults, GameConfig, LeaderboardEntry } from './types';
import applauseSoundFile from './audio/applause.mp3';
import { launchConfetti } from './utils/confetti';
import { recordDailyCompletion, StreakInfo } from './DailyChallenge';
import MorphologyCard from './components/MorphologyCard';
import { config } from './config';

interface ResultsScreenProps {
  results: GameResults;
  onRestart: () => void;
  onViewLeaderboard: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ results, onRestart, onViewLeaderboard }) => {
  const applauseAudio = useRef<HTMLAudioElement>(new Audio(applauseSoundFile));
  const totalScore = results.participants.reduce((sum, p) => sum + p.points, 0);
  const [bestClassScore, setBestClassScore] = useState(0);
  const [isBestScore, setIsBestScore] = useState(false);
  const [streakInfo, setStreakInfo] = useState<StreakInfo | null>(null);
  const [bonus, setBonus] = useState(0);

  useEffect(() => {
    if (config.dailyChallenge) {
      const info = recordDailyCompletion();
      setStreakInfo(info);
      setBonus(info.currentStreak > 1 ? (info.currentStreak - 1) * 10 : 0);
    }
  }, [config.dailyChallenge]);
  
  useEffect(() => {
    if (localStorage.getItem('teacherMode') === 'true') {
      document.body.classList.add('teacher-mode');
    } else {
      document.body.classList.remove('teacher-mode');
    }
  }, []);

  useEffect(() => {
    // Update the leaderboard with the new scores
    const stored: LeaderboardEntry[] = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    const newEntries: LeaderboardEntry[] = results.participants.map(p => ({
      name: p.name,
      score: p.points + (config.dailyChallenge ? bonus : 0),
      date: new Date().toISOString(),
      avatar: p.avatar,
    }));
    const updated = [...stored, ...newEntries]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    localStorage.setItem('leaderboard', JSON.stringify(updated));
  }, [results, config.dailyChallenge, bonus]);

  useEffect(() => {
    const history: { date: string; score: number; duration: number }[] = JSON.parse(
      localStorage.getItem('sessionHistory') || '[]'
    );
    history.push({ date: new Date().toISOString(), score: totalScore, duration: results.duration || 0 });
    localStorage.setItem('sessionHistory', JSON.stringify(history));

    const storedBest = Number(localStorage.getItem('bestClassScore') || '0');
    if (totalScore > storedBest) {
      localStorage.setItem('bestClassScore', String(totalScore));
      setBestClassScore(totalScore);
      setIsBestScore(true);
    } else {
      setBestClassScore(storedBest);
    }
  }, [totalScore, results.duration]);

  useEffect(() => {
    // Play sound and show confetti if there's a winner and effects are enabled
    if (results.winner) {
      if (config.soundEnabled) {
        applauseAudio.current.play();
      }
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (config.effectsEnabled && !prefersReducedMotion) {
        launchConfetti();
      }
    }
  }, [results.winner, config.soundEnabled, config.effectsEnabled]);

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(results, null, 2));
    const anchor = document.createElement('a');
    anchor.href = dataStr;
    anchor.download = 'spelling-bee-results.json';
    anchor.click();
  };

  const getWinnerMessage = () => {
    const { winner, participants } = results;
    if (winner) {
      return `Winner: ${winner.name}`;
    }
    const activeParticipants = participants.filter(p => p.lives > 0);
    if (activeParticipants.length > 1) {
      const names = activeParticipants.map(p => p.name).join(' and ');
      return `It's a draw between ${names}!`;
    }
    return 'No one wins this round!';
  };

  return (
    <div className="min-h-screen bg-surface p-8 text-on-surface text-center flex flex-col items-center justify-center font-body">
      <h1 className="text-4xl font-bold mb-4 text-primary uppercase font-sans">🏆 Game Over! 🏆</h1>
      <h2 className="text-2xl mb-8 uppercase font-sans">{getWinnerMessage()}</h2>

      {results?.duration && (<div className="text-xl mb-6">Game Duration: {results.duration} seconds</div>)}
      
      <div className="text-xl mb-4">Session Score: {totalScore}</div>
      <div className="text-xl mb-8">
        Best Class Score: {bestClassScore}
        {isBestScore && <span className="text-tertiary font-bold ml-2">New High Score!</span>}
      </div>

        <div className="bg-surface-container-high p-6 rounded-xl w-full max-w-2xl shadow-elevation-1">
          <h3 className="text-2xl font-bold mb-4 uppercase font-sans">📊 Final Scores</h3>
        {results && results.participants.map((p, index) => (
          <div key={index} className="text-left mb-4 p-3 rounded-lg bg-surface-container-low">
            <div className="flex items-center gap-3 mb-1">
              <img 
                src={
                  p === results.winner ? `${config.baseUrl}img/WinningBee.png` :
                  p.points >= bestClassScore * 0.9 ? `${config.baseUrl}img/CelebratoryBee.png` :
                  p.avatar || `${config.baseUrl}img/bee.png`
                } 
                alt={`${p.name} avatar`} 
                className="w-8 h-8 rounded-full" 
              />
              <div className="font-bold text-lg">{p.name}</div>
            </div>
            <div className="text-primary">
              {p.wordsCorrect}/{p.wordsAttempted} correct ({p.wordsAttempted > 0 ? Math.round((p.wordsCorrect / p.wordsAttempted) * 100) : 0}
              %) - {p.lives} lives remaining - {p.points + (config.dailyChallenge ? bonus : 0)} points
            </div>
          </div>
        ))}
      </div>

      {config.dailyChallenge && streakInfo && (
        <div className="bg-surface-container-high p-4 rounded-xl w-full max-w-2xl mt-4 shadow-elevation-1">
          <div className="text-lg">
            🔥 Streak: {streakInfo.currentStreak} day{streakInfo.currentStreak !== 1 ? 's' : ''} (Best {streakInfo.highestStreak})
          </div>
          {bonus > 0 && (<div className="text-tertiary mt-2">Bonus Points: +{bonus}</div>)}
        </div>
      )}

      {results.missedWords && results.missedWords.length > 0 && (
          <div className="bg-surface-container-high p-6 rounded-xl w-full max-w-2xl mt-8 shadow-elevation-1">
            <h3 className="text-2xl font-bold mb-4 uppercase font-sans">❌ Missed Words</h3>
          {results.missedWords.map((w, index) => (
            <div key={index} className="text-left mb-3 p-3 rounded-lg bg-surface-container-low">
              <span className="font-bold">{w.word}</span> - {w.definition}
              {(w.prefix || w.suffix) && (
                <MorphologyCard word={w} database={config.wordDatabase} />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-4 mt-8 flex-wrap justify-center">
        <button 
          onClick={handleExport} 
          className="bg-tertiary-container text-on-tertiary-container px-6 py-3 rounded-full text-lg font-bold hover:shadow-elevation-1"
        >
          📤 Export Results
        </button>
        <button 
          onClick={onViewLeaderboard} 
          className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded-full text-lg font-bold hover:shadow-elevation-1"
        >
          📈 View Leaderboard
        </button>
        <button 
          onClick={onRestart} 
          className="bg-primary text-on-primary px-8 py-3 rounded-full text-lg font-bold hover:shadow-elevation-2"
        >
          🔄 Play Again
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;
