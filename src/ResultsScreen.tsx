import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { GameResults, GameConfig, LeaderboardEntry } from './types';
import applauseSoundFile from './audio/applause.mp3';
import { launchConfetti } from './utils/confetti';
import { recordDailyCompletion, StreakInfo } from './DailyChallenge';
import MorphologyCard from './components/MorphologyCard';
import { config as appConfig } from './config';
import { appendHistoryEntry, updateHistoryComfort, type SessionHistoryEntry } from './utils/history';

interface ResultsScreenProps {
  results: GameResults;
  /** The GameConfig used for the completed game (sound, effects, daily challenge, etc.). */
  config?: GameConfig | null;
  onRestart: () => void;
  onViewLeaderboard: () => void;
  isMusicPlaying?: boolean;
  onToggleMusicPlaying?: () => void;
  soundEnabled?: boolean;
  onSoundEnabledChange?: (enabled: boolean) => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  results,
  config,
  onRestart,
  onViewLeaderboard,
  isMusicPlaying,
  onToggleMusicPlaying,
  soundEnabled,
  onSoundEnabledChange,
}) => {
  const applauseAudio = useRef<HTMLAudioElement>(new Audio(applauseSoundFile));
  const totalScore = results.participants.reduce((sum, p) => sum + p.points, 0);
  const [bestClassScore, setBestClassScore] = useState(0);
  const [isBestScore, setIsBestScore] = useState(false);
  const [streakInfo, setStreakInfo] = useState<StreakInfo | null>(null);
  const [bonus, setBonus] = useState(0);
  const [showComfortModal, setShowComfortModal] = useState(true);
  const historyEntryDateRef = useRef<string | null>(null);

  useEffect(() => {
    if (config?.dailyChallenge) {
      const info = recordDailyCompletion();
      setStreakInfo(info);
      setBonus(info.currentStreak > 1 ? (info.currentStreak - 1) * 10 : 0);
    }
  }, [config?.dailyChallenge]);
  
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
      score: p.points + (config?.dailyChallenge ? bonus : 0),
      date: new Date().toISOString(),
      avatar: p.avatar,
    }));
    const updated = [...stored, ...newEntries]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    localStorage.setItem('leaderboard', JSON.stringify(updated));
  }, [results, config?.dailyChallenge, bonus]);

  useEffect(() => {
    historyEntryDateRef.current = appendHistoryEntry({ score: totalScore, duration: results.duration || 0 });

    const storedBest = Number(localStorage.getItem('bestClassScore') || '0');
    if (totalScore > storedBest) {
      localStorage.setItem('bestClassScore', String(totalScore));
      setBestClassScore(totalScore);
      setIsBestScore(true);
    } else {
      setBestClassScore(storedBest);
    }
  }, [totalScore, results.duration]);

  const handleComfortSelect = (comfort: SessionHistoryEntry['comfort']) => {
    if (historyEntryDateRef.current) {
      updateHistoryComfort(historyEntryDateRef.current, comfort);
    }
    setShowComfortModal(false);
  };

  useEffect(() => {
    // Play sound and show confetti if there's a winner and effects are enabled
    if (results.winner) {
      if (config?.soundEnabled ?? true) {
        applauseAudio.current.play().catch(() => { /* audio may be blocked */ });
      }
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if ((config?.effectsEnabled ?? true) && !prefersReducedMotion) {
        launchConfetti();
      }
    }
  }, [results.winner, config?.soundEnabled, config?.effectsEnabled]);

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(results, null, 2));
    const anchor = document.createElement('a');
    anchor.href = dataStr;
    anchor.download = 'spelling-bee-results.json';
    anchor.click();
  };

  const handleExportMissedWords = () => {
    if (!results.missedWords || results.missedWords.length === 0) {
      alert('No missed words to export!');
      return;
    }

    // Create a teacher-friendly format for missed words
    const date = new Date().toLocaleDateString();
    const gameMode = results.gameMode === 'team' ? 'Team Mode' : 'Individual Mode';
    const duration = Math.floor(results.duration / 60);
    
    let csvContent = `Missed Words Report - ${date}\n`;
    csvContent += `Game Mode: ${gameMode}\n`;
    csvContent += `Duration: ${duration} minutes\n`;
    csvContent += `Participants: ${results.participants.map(p => p.name).join(', ')}\n\n`;
    csvContent += 'Word,Definition,Origin,Example,Prefix,Suffix,Pronunciation\n';
    
    results.missedWords.forEach(word => {
      const row = [
        word.word || '',
        (word.definition || '').replace(/,/g, ';'),
        (word.origin || '').replace(/,/g, ';'),
        (word.example || '').replace(/,/g, ';'),
        word.prefix || '',
        word.suffix || '',
        word.pronunciation || ''
      ].join(',');
      csvContent += row + '\n';
    });

    const dataStr = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
    const anchor = document.createElement('a');
    anchor.href = dataStr;
    anchor.download = `missed-words-${date}.csv`;
    anchor.click();
  };

  const getWinnerMessage = () => {
    const { winner, participants } = results;
    if (winner) {
      return `${winner.name} wins. The dictionary has been briefly conquered.`;
    }
    const activeParticipants = participants.filter(p => p.lives > 0);
    if (activeParticipants.length > 1) {
      const names = activeParticipants.map(p => p.name).join(' and ');
      return `It's a draw between ${names}. The alphabet remains neutral.`;
    }
    return 'No one wins this round. The words remain undefeated.';
  };

  return (
    <div className="screen-container bg-gradient-to-br from-indigo-700 via-purple-700 to-purple-900 text-white min-h-screen relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-particle top-10 left-10 delay-100" />
        <div className="floating-particle top-20 right-20 delay-200" />
        <div className="floating-particle bottom-20 left-20 delay-300" />
        <div className="floating-particle bottom-10 right-10 delay-400" />
      </div>

      {/* Floating music / sound controls */}
      {onToggleMusicPlaying && (
        <div className="fixed top-4 right-4 z-50 flex gap-2">
          <button
            type="button"
            onClick={onToggleMusicPlaying}
            className="bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-3 rounded-full border border-white/20 transition-all duration-200 hover:scale-105 shadow-xl"
            aria-label={isMusicPlaying ? 'Pause music' : 'Play music'}
            title={isMusicPlaying ? 'Pause music' : 'Play music'}
          >
            {isMusicPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          {onSoundEnabledChange && (
            <button
              type="button"
              onClick={() => onSoundEnabledChange(!(soundEnabled ?? true))}
              className="bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-3 rounded-full border border-white/20 transition-all duration-200 hover:scale-105 shadow-xl"
              aria-label={(soundEnabled ?? true) ? 'Mute audio' : 'Unmute audio'}
              title={(soundEnabled ?? true) ? 'Mute audio' : 'Unmute audio'}
            >
              {(soundEnabled ?? true) ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
          )}
        </div>
      )}

      <div className="max-w-4xl mx-auto relative z-10 py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8 animate-bounce-in">
          <div className="text-8xl mb-4 animate-wiggle">
            {results.winner ? '🏆' : '🐝'}
          </div>
          <h1 className="screen-title excitement-glow mb-2">
            {results.winner ? 'We Have a Winner!' : "That's Time."}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-bold">{getWinnerMessage()}</p>
        </div>

        {/* Stats summary */}
        <div className="game-card mb-6 animate-scale-in">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {!!results?.duration && (
              <div>
                <div className="text-3xl font-black text-kahoot-yellow-400">
                  {Math.floor(results.duration / 60)}:{String(results.duration % 60).padStart(2, '0')}
                </div>
                <div className="text-white/70 text-sm font-semibold mt-1">Duration</div>
              </div>
            )}
            <div>
              <div className="text-3xl font-black text-kahoot-green-400">{totalScore}</div>
              <div className="text-white/70 text-sm font-semibold mt-1">Session Score</div>
            </div>
            <div>
              <div className="text-3xl font-black text-kahoot-blue-400">
                {bestClassScore}
                {isBestScore && <span className="text-kahoot-yellow-400 ml-2 text-2xl">⭐</span>}
              </div>
              <div className="text-white/70 text-sm font-semibold mt-1">
                Best Score{isBestScore && ' — New Record!'}
              </div>
            </div>
          </div>
        </div>

        {/* Participant results */}
        <div className="game-card mb-6 animate-scale-in delay-100">
          <h3 className="text-2xl font-black mb-4 bg-gradient-to-r from-kahoot-yellow-400 to-kahoot-red-400 bg-clip-text text-transparent">
            📊 The Official Record
          </h3>
          {results.participants.map((p, index) => (
            <div key={index} className="flex items-center gap-3 mb-3 p-4 bg-white/10 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-200">
              <img
                src={
                  p === results.winner ? `${appConfig.baseUrl}img/WinningBee.png` :
                  p.points >= bestClassScore * 0.9 ? `${appConfig.baseUrl}img/CelebratoryBee.png` :
                  p.avatar || `${appConfig.baseUrl}img/bee.png`
                }
                alt={`${p.name} avatar`}
                className="w-12 h-12 rounded-full border-2 border-white/30 object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="font-black text-lg truncate">{p.name}</div>
                <div className="text-white/70 text-sm">
                  {p.wordsCorrect}/{p.wordsAttempted} correct&nbsp;
                  ({p.wordsAttempted > 0 ? Math.round((p.wordsCorrect / p.wordsAttempted) * 100) : 0}%) ·&nbsp;
                  {p.lives} {p.lives === 1 ? 'life' : 'lives'} ·&nbsp;
                  {p.points + (config?.dailyChallenge ? bonus : 0)} pts
                </div>
              </div>
              {p === results.winner && <span className="text-3xl shrink-0">👑</span>}
            </div>
          ))}
        </div>

        {/* Daily challenge streak */}
        {config?.dailyChallenge && streakInfo && (
          <div className="game-card mb-6 animate-scale-in delay-200 text-center">
            <div className="text-4xl font-black text-kahoot-yellow-400 mb-1">
              🔥 {streakInfo.currentStreak} day{streakInfo.currentStreak !== 1 ? 's' : ''}
            </div>
            <div className="text-white/70">Best: {streakInfo.highestStreak} days</div>
            {bonus > 0 && <div className="text-kahoot-green-400 font-bold mt-2">+{bonus} bonus points!</div>}
          </div>
        )}

        {/* Missed words */}
        {results.missedWords && results.missedWords.length > 0 && (
          <div className="game-card mb-6 animate-scale-in delay-300">
            <h3 className="text-2xl font-black mb-4 text-kahoot-yellow-400">
              📋 Words For Next Time
            </h3>
            {results.missedWords.map((w, index) => (
              <div key={index} className="mb-3 p-3 bg-white/5 rounded-xl border border-white/10">
                <span className="font-black text-kahoot-yellow-300">{w.word}</span>
                {w.definition && (
                  <span className="text-white/70 ml-2 text-sm">— {w.definition}</span>
                )}
                {(w.prefix || w.suffix) && config?.wordDatabase && (
                  <MorphologyCard word={w} database={config.wordDatabase} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-8 animate-scale-in delay-400">
          <button
            onClick={handleExport}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-2xl font-black text-lg border border-white/30 transition-all duration-200 hover:scale-105 shadow-lg"
          >
            📤 Export Results
          </button>
          {results.missedWords && results.missedWords.length > 0 && (
            <button
              onClick={handleExportMissedWords}
              className="bg-orange-500/70 hover:bg-orange-500 text-white px-6 py-3 rounded-2xl font-black text-lg border border-orange-400/30 transition-all duration-200 hover:scale-105 shadow-lg"
            >
              📝 Export Missed Words
            </button>
          )}
          <button
            onClick={onViewLeaderboard}
            className="bg-indigo-500/60 hover:bg-indigo-500/80 text-white px-6 py-3 rounded-2xl font-black text-lg border border-indigo-400/30 transition-all duration-200 hover:scale-105 shadow-lg"
          >
            📈 Leaderboard
          </button>
          <button
            onClick={onRestart}
            className="bg-gradient-to-r from-kahoot-yellow-400 to-kahoot-yellow-600 hover:from-kahoot-yellow-500 hover:to-kahoot-yellow-700 text-black px-8 py-3 rounded-2xl font-black text-xl shadow-2xl transform transition-all duration-200 hover:scale-105 animate-glow"
          >
            🚀 Play Again
          </button>
        </div>
      </div>

      {showComfortModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center text-gray-900 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="comfort-heading">
            <h3 id="comfort-heading" className="mb-3 text-2xl font-black text-gray-900">How was that, honestly?</h3>
            <p className="mb-5 text-sm text-gray-600">A small record will be kept. It is not a big deal either way.</p>
            <div className="grid grid-cols-3 gap-3">
              <button onClick={() => handleComfortSelect('happy')} className="rounded-xl bg-green-100 px-3 py-4 text-3xl font-black text-green-800 hover:bg-green-200 transition-colors" aria-label="Comfort happy">
                😊
              </button>
              <button onClick={() => handleComfortSelect('okay')} className="rounded-xl bg-yellow-100 px-3 py-4 text-3xl font-black text-yellow-800 hover:bg-yellow-200 transition-colors" aria-label="Comfort okay">
                😐
              </button>
              <button onClick={() => handleComfortSelect('tough')} className="rounded-xl bg-blue-100 px-3 py-4 text-3xl font-black text-blue-800 hover:bg-blue-200 transition-colors" aria-label="Comfort tough">
                😟
              </button>
            </div>
            <button onClick={() => setShowComfortModal(false)} className="mt-5 rounded-xl bg-gray-200 px-5 py-2 font-bold text-gray-800 hover:bg-gray-300 transition-colors">
              Skip
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsScreen;
