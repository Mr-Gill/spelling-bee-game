// Interactive Spelling Bee Championship Game
// Main Application File

const { useState, useEffect } = React;
const { Volume2, Users, BookOpen, Globe, Layers, RotateCcw, Play, Pause } = lucideReact;

const SpellingBeeGame = () => {
  // Default word database organized by difficulty
  const wordDatabase = {
    easy: [
      {
        word: "friend",
        syllables: "friend (1 syllable)",
        definition: "A person you like and know well",
        origin: "Old English 'freond', from Germanic root meaning 'to love'",
        sentence: "My best friend and I love to play together.",
        prefixSuffix: "Base word with no prefix or suffix",
        pronunciation: "FREND"
      },
      {
        word: "happy",
        syllables: "hap-py (2 syllables)",
        definition: "Feeling or showing pleasure and contentment",
        origin: "Middle English 'happy', from 'hap' meaning luck or fortune",
        sentence: "The children were happy to see the circus.",
        prefixSuffix: "Base word 'hap' + suffix '-py'",
        pronunciation: "HAP-ee"
      },
      {
        word: "school",
        syllables: "school (1 syllable)",
        definition: "A place where children go to learn",
        origin: "Greek 'skhole' meaning leisure or learning",
        sentence: "We learn many subjects at school every day.",
        prefixSuffix: "Base word with no prefix or suffix",
        pronunciation: "SKOOL"
      }
    ],
    medium: [
      {
        word: "necessary",
        syllables: "nec-es-sar-y (4 syllables)",
        definition: "Required to be done or achieved; essential",
        origin: "Latin 'necessarius', from 'necesse' meaning unavoidable",
        sentence: "It is necessary to study hard for the test.",
        prefixSuffix: "Base 'necess' + suffix '-ary'",
        pronunciation: "NES-uh-ser-ee"
      },
      {
        word: "environment",
        syllables: "en-vi-ron-ment (4 syllables)",
        definition: "The natural world or surroundings where people live",
        origin: "French 'environner' meaning to surround",
        sentence: "We must protect our environment for future generations.",
        prefixSuffix: "Prefix 'en-' + base 'viron' + suffix '-ment'",
        pronunciation: "en-VY-run-ment"
      }
    ],
    hard: [
      {
        word: "onomatopoeia",
        syllables: "on-o-mat-o-poe-ia (6 syllables)",
        definition: "Words that imitate sounds (like 'buzz' or 'crash')",
        origin: "Greek 'onoma' (name) + 'poiein' (to make)",
        sentence: "The word 'splash' is an example of onomatopoeia.",
        prefixSuffix: "Greek compound: onoma- (name) + -poeia (making)",
        pronunciation: "on-uh-mat-uh-PEE-uh"
      },
      {
        word: "chrysanthemum",
        syllables: "chry-san-the-mum (4 syllables)",
        definition: "A type of flower with many thin petals",
        origin: "Greek 'chrysos' (gold) + 'anthemon' (flower)",
        sentence: "The chrysanthemum bloomed beautifully in autumn.",
        prefixSuffix: "Greek compound: chryso- (gold) + -anthemum (flower)",
        pronunciation: "kri-SAN-thuh-mum"
      }
    ]
  };

  // Game state management
  const [gameState, setGameState] = useState('setup');
  const [teams, setTeams] = useState([]);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [currentDifficulty, setCurrentDifficulty] = useState('easy');
  const [currentWord, setCurrentWord] = useState(null);
  const [round, setRound] = useState(1);
  const [usedWords, setUsedWords] = useState(new Set());
  
  // Custom word lists functionality
  const [customWordLists, setCustomWordLists] = useState({
    "August 27th - Today's Lesson": {
      "easy": [
        {
          "word": "window",
          "syllables": "win-dow (2 syllables)",
          "definition": "An opening in a wall or roof fitted with glass to let in light or air",
          "origin": "Old Norse 'vindauga' meaning 'wind eye'",
          "sentence": "She opened the window to let in fresh air.",
          "prefixSuffix": "Base word with no prefix or suffix",
          "pronunciation": "WIN-doh"
        },
        {
          "word": "because",
          "syllables": "be-cause (2 syllables)",
          "definition": "For the reason that; since",
          "origin": "Middle English from 'bi cause' meaning 'by cause'",
          "sentence": "He stayed home because it was raining.",
          "prefixSuffix": "Prefix 'be-' + base word 'cause'",
          "pronunciation": "bih-KAWZ"
        },
        {
          "word": "then",
          "syllables": "then (1 syllable)",
          "definition": "At that time; afterwards",
          "origin": "Old English 'þænne'",
          "sentence": "First we had dinner, then we watched a movie.",
          "prefixSuffix": "Base word with no prefix or suffix",
          "pronunciation": "then"
        },
        {
          "word": "away",
          "syllables": "a-way (2 syllables)",
          "definition": "At a distance from a place or person",
          "origin": "Old English 'onweg' meaning 'on one's way'",
          "sentence": "She walked away from the park.",
          "prefixSuffix": "Prefix 'a-' + base word 'way'",
          "pronunciation": "uh-WAY"
        }
      ],
      "medium": [
        {
          "word": "correctly",
          "syllables": "cor-rect-ly (3 syllables)",
          "definition": "In a way that is true, accurate, or proper",
          "origin": "From Latin 'correctus' (made right)",
          "sentence": "He spelled the word correctly.",
          "prefixSuffix": "Base word 'correct' + suffix '-ly'",
          "pronunciation": "kuh-REKT-lee"
        },
        {
          "word": "necessary",
          "syllables": "nec-es-sar-y (4 syllables)",
          "definition": "Required to be done or essential",
          "origin": "Latin 'necessarius' meaning 'unavoidable'",
          "sentence": "Water is necessary for life.",
          "prefixSuffix": "Base word with no prefix or suffix",
          "pronunciation": "NES-uh-ser-ee"
        },
        {
          "word": "emergency",
          "syllables": "e-mer-gen-cy (4 syllables)",
          "definition": "A sudden and urgent situation requiring immediate action",
          "origin": "Latin 'emergere' meaning 'to rise up'",
          "sentence": "Call 000 in case of an emergency.",
          "prefixSuffix": "Base word 'emerge' + suffix '-ency'",
          "pronunciation": "ih-MUR-juhn-see"
        }
      ],
      "hard": [
        {
          "word": "onomatopoeia",
          "syllables": "on-o-mat-o-poe-ia (6 syllables)",
          "definition": "A word that imitates the sound it represents",
          "origin": "Greek 'onoma' (name) + 'poiein' (to make)",
          "sentence": "Words like 'buzz' and 'bang' are examples of onomatopoeia.",
          "prefixSuffix": "Base word with no prefix or suffix",
          "pronunciation": "on-uh-mat-uh-PEE-uh"
        },
        {
          "word": "entrepreneur",
          "syllables": "en-tre-pre-neur (4 syllables)",
          "definition": "A person who starts and runs a business",
          "origin": "French 'entreprendre' meaning 'to undertake'",
          "sentence": "The entrepreneur launched a new app.",
          "prefixSuffix": "Base word with no prefix or suffix",
          "pronunciation": "on-truh-pruh-NUR"
        }
      ]
    }
  });
  
  const [selectedWordList, setSelectedWordList] = useState("August 27th - Today's Lesson");
  
  // New game features
  const [gameMode, setGameMode] = useState('team');
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showWordCenter, setShowWordCenter] = useState(false);
  const [currentWordAttempts, setCurrentWordAttempts] = useState(0);
  const [difficultyProgression, setDifficultyProgression] = useState(['easy', 'medium', 'hard']);
  const [currentDifficultyIndex, setCurrentDifficultyIndex] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState([]);
  const [teamPoints, setTeamPoints] = useState({});

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
      markIncorrect();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  // Initialize team points when teams change
  useEffect(() => {
    const newPoints = {};
    teams.forEach((team, index) => {
      newPoints[index] = teamPoints[index] || 1;
    });
    setTeamPoints(newPoints);
  }, [teams]);

  // Helper functions
  const getTeamColor = (index) => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500', 'bg-teal-500', 'bg-yellow-500'];
    return colors[index % colors.length];
  };

  const getAvailableDifficulties = () => {
    const currentDatabase = selectedWordList === 'default' ? wordDatabase : customWordLists[selectedWordList];
    if (!currentDatabase) return [];
    return Object.keys(currentDatabase).filter(diff => 
      currentDatabase[diff] && Array.isArray(currentDatabase[diff]) && currentDatabase[diff].length > 0
    );
  };

  const selectRandomWord = (difficulty) => {
    const currentDatabase = selectedWordList === 'default' ? wordDatabase : customWordLists[selectedWordList];
    const availableWords = currentDatabase[difficulty]?.filter(word => 
      !usedWords.has(`${difficulty}-${word.word}`)
    ) || [];
    
    if (availableWords.length === 0) {
      setUsedWords(new Set());
      const allWords = currentDatabase[difficulty] || [];
      if (allWords.length === 0) {
        alert(`No words available for ${difficulty} difficulty in the selected word list!`);
        return null;
      }
      return allWords[Math.floor(Math.random() * allWords.length)];
    }
    
    const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    setUsedWords(prev => new Set([...prev, `${difficulty}-${randomWord.word}`]));
    return randomWord;
  };

  // Game control functions
  const addTeam = () => {
    const name = gameMode === 'individual' ? prompt("Enter student name:") : prompt("Enter team name:");
    if (name) {
      const lives = gameMode === 'individual' ? 5 : 10;
      setTeams([...teams, { 
        name: name, 
        lives: lives, 
        wordsAttempted: 0, 
        wordsCorrect: 0, 
        color: getTeamColor(teams.length) 
      }]);
    }
  };

  const removeTeam = (index) => {
    setTeams(teams.filter((_, i) => i !== index));
  };

  const addWordList = () => {
    const listName = prompt("Enter a name for this word list:");
    if (!listName) return;
    
    if (customWordLists[listName] || listName === 'default') {
      alert("Word list name already exists! Please choose a different name.");
      return;
    }

    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
      background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 1000;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
      background: white; padding: 20px; border-radius: 10px; width: 80%; max-width: 600px; max-height: 80%; overflow: auto;
    `;
    
    content.innerHTML = `
      <h3 style="margin: 0 0 15px 0; color: #333;">Add Word List: ${listName}</h3>
      <p style="color: #666; font-size: 14px; margin-bottom: 10px;">Paste your JSON word list below:</p>
      <textarea id="wordListInput" style="width: 100%; height: 300px; font-family: monospace; font-size: 12px; border: 1px solid #ccc; padding: 10px;"></textarea>
      <div style="margin-top: 15px; display: flex; gap: 10px; justify-content: flex-end;">
        <button id="cancelBtn" style="padding: 10px 20px; background: #ccc; border: none; border-radius: 5px; cursor: pointer;">Cancel</button>
        <button id="saveBtn" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">Save</button>
      </div>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    const sampleFormat = {
      "easy": [
        {
          "word": "example",
          "syllables": "ex-am-ple (3 syllables)",
          "definition": "A thing characteristic of its kind",
          "origin": "Latin 'exemplum' meaning sample",
          "sentence": "This is a good example of the format.",
          "prefixSuffix": "Base word with no prefix or suffix",
          "pronunciation": "ig-ZAM-pul"
        }
      ],
      "medium": [],
      "hard": []
    };
    
    document.getElementById('wordListInput').value = JSON.stringify(sampleFormat, null, 2);
    
    document.getElementById('cancelBtn').onclick = () => {
      document.body.removeChild(modal);
    };
    
    document.getElementById('saveBtn').onclick = () => {
      const wordListData = document.getElementById('wordListInput').value;
      
      try {
        const parsedData = JSON.parse(wordListData);
        
        if (!parsedData || typeof parsedData !== 'object') {
          throw new Error("Invalid format");
        }

        const validDifficulties = ['easy', 'medium', 'hard'];
        const hasValidDifficulty = validDifficulties.some(diff => 
          parsedData[diff] && Array.isArray(parsedData[diff]) && parsedData[diff].length > 0
        );

        if (!hasValidDifficulty) {
          throw new Error("Word list must contain at least one difficulty level (easy, medium, or hard) with words");
        }

        setCustomWordLists(prev => ({
          ...prev,
          [listName]: parsedData
        }));

        document.body.removeChild(modal);
        alert(`Word list "${listName}" added successfully!`);
      } catch (error) {
        alert("Error parsing word list. Please check the JSON format and try again.\\n\\nError: " + error.message);
      }
    };
  };

  const startNewWord = () => {
    const word = selectRandomWord(currentDifficulty);
    setCurrentWord(word);
    setTimeLeft(30);
    setIsTimerActive(true);
    setCurrentWordAttempts(0);
    setShowWordCenter(false);
  };

  const startGame = () => {
    const minRequired = gameMode === 'individual' ? 1 : 2;
    if (teams.length < minRequired) {
      const entityName = gameMode === 'individual' ? 'student' : 'teams';
      alert(`Please add at least ${minRequired === 1 ? 'one ' + entityName : 'two ' + entityName}!`);
      return;
    }
    
    setCurrentDifficulty('easy');
    setCurrentDifficultyIndex(0);
    setGameState('playing');
    startNewWord();
  };

  // Audio functions
  const playSuccessSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  const playErrorSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(150, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  const playAudio = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.volume = 0.8;
    speechSynthesis.speak(utterance);
  };

  // Game scoring functions
  const markCorrect = () => {
    setIsTimerActive(false);
    const updatedTeams = [...teams];
    updatedTeams[currentTeamIndex].wordsAttempted++;
    updatedTeams[currentTeamIndex].wordsCorrect++;
    setTeams(updatedTeams);
    
    setTeamPoints(prev => ({
      ...prev,
      [currentTeamIndex]: (prev[currentTeamIndex] || 1) + 1
    }));
    
    playSuccessSound();
    nextTurn();
  };

  const markIncorrect = () => {
    setIsTimerActive(false);
    const updatedTeams = [...teams];
    updatedTeams[currentTeamIndex].lives--;
    updatedTeams[currentTeamIndex].wordsAttempted++;
    setTeams(updatedTeams);
    
    setIncorrectWords(prev => [...prev, currentWord]);
    playErrorSound();
    
    if (gameMode === 'team' && teams.length > 1 && currentWordAttempts === 0) {
      setCurrentWordAttempts(1);
      let nextIndex = (currentTeamIndex + 1) % teams.length;
      while (teams[nextIndex].lives <= 0) {
        nextIndex = (nextIndex + 1) % teams.length;
      }
      setCurrentTeamIndex(nextIndex);
      setTimeLeft(30);
      setIsTimerActive(true);
      return;
    }
    
    if (updatedTeams[currentTeamIndex].lives <= 0) {
      alert(`${updatedTeams[currentTeamIndex].name} is eliminated!`);
    }
    
    nextTurn();
  };

  const nextTurn = () => {
    const activeTeams = teams.filter(t => t.lives > 0);
    if (activeTeams.length <= 1 && gameMode === 'team') {
      setGameState('results');
      return;
    }
    if (activeTeams.length === 0 && gameMode === 'individual') {
      setGameState('results');
      return;
    }

    const totalWords = teams.reduce((sum, team) => sum + team.wordsAttempted, 0);
    if (totalWords > 0 && totalWords % (teams.length * 3) === 0) {
      const nextDiffIndex = currentDifficultyIndex + 1;
      if (nextDiffIndex < difficultyProgression.length) {
        setCurrentDifficultyIndex(nextDiffIndex);
        setCurrentDifficulty(difficultyProgression[nextDiffIndex]);
      }
    }

    let nextIndex = (currentTeamIndex + 1) % teams.length;
    while (teams[nextIndex].lives <= 0) {
      nextIndex = (nextIndex + 1) % teams.length;
    }
    
    setCurrentTeamIndex(nextIndex);
    startNewWord();
  };

  const useHelpItem = (helpType, cost) => {
    const currentPoints = teamPoints[currentTeamIndex] || 0;
    if (currentPoints < cost) {
      alert("Not enough points!");
      return;
    }
    
    setTeamPoints(prev => ({
      ...prev,
      [currentTeamIndex]: currentPoints - cost
    }));
    
    switch(helpType) {
      case 'reveal':
        setShowWordCenter(true);
        break;
      case 'extraTime':
        setTimeLeft(prev => prev + 15);
        break;
      case 'syllables':
        playAudio(`The word has ${currentWord?.syllables}`);
        break;
    }
  };

  const resetGame = () => {
    setGameState('setup');
    setTeams([]);
    setCurrentTeamIndex(0);
    setCurrentDifficulty('easy');
    setCurrentWord(null);
    setRound(1);
    setUsedWords(new Set());
    setIncorrectWords([]);
    setTeamPoints({});
  };

  // Setup Screen Component
  if (gameState === 'setup') {
    return React.createElement('div', {
      className: "min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white"
    }, 
      React.createElement('div', {className: "max-w-7xl mx-auto"}, 
        React.createElement('div', {className: "text-center mb-12"}, 
          React.createElement('h1', {className: "text-6xl font-bold mb-4 text-yellow-300"}, "🏆 SPELLING BEE CHAMPIONSHIP"),
          React.createElement('p', {className: "text-2xl"}, "Get ready to spell your way to victory!")
        ),

        // Game Mode Selection
        React.createElement('div', {className: "bg-white/20 backdrop-blur rounded-xl p-6 mb-8"}, 
          React.createElement('h2', {className: "text-2xl font-bold mb-4 text-center text-yellow-300"}, "Choose Game Mode"),
          React.createElement('div', {className: "flex gap-4 justify-center"}, 
            React.createElement('button', {
              onClick: () => {
                setGameMode('individual');
                setTeams([]);
              },
              className: `px-8 py-4 rounded-xl text-xl font-semibold transition-colors ${
                gameMode === 'individual'
                  ? 'bg-yellow-300 text-black'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`
            }, 
              "👤 Individual Students",
              React.createElement('br'),
              React.createElement('span', {className: "text-sm opacity-80"}, "5 lives each (Lesson Plan Mode)")
            ),
            React.createElement('button', {
              onClick: () => {
                setGameMode('team');
                setTeams([]);
              },
              className: `px-8 py-4 rounded-xl text-xl font-semibold transition-colors ${
                gameMode === 'team'
                  ? 'bg-yellow-300 text-black'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`
            }, 
              "👥 Team Competition",
              React.createElement('br'),
              React.createElement('span', {className: "text-sm opacity-80"}, "10 lives per team")
            )
          )
        ),

        React.createElement('div', {className: "grid lg:grid-cols-3 md:grid-cols-2 gap-8"}, 
          // Team/Player Management
          React.createElement('div', {className: "bg-white/20 backdrop-blur rounded-xl p-8"}, 
            React.createElement('h2', {className: "text-3xl font-bold mb-6 flex items-center gap-3"}, 
              React.createElement(Users, {className: "text-yellow-300"}),
              `${gameMode === 'individual' ? 'Students' : 'Teams'} (${teams.length})`
            ),
            
            React.createElement('div', {className: "space-y-4 mb-6"}, 
              teams.map((entity, index) => 
                React.createElement('div', {
                  key: index, 
                  className: `${entity.color} rounded-lg p-4 flex justify-between items-center text-white team-card`
                }, 
                  React.createElement('div', {}, 
                    React.createElement('span', {className: "text-xl font-semibold"}, entity.name),
                    React.createElement('div', {className: "text-sm opacity-90"}, `Lives: ${entity.lives}`)
                  ),
                  React.createElement('button', {
                    onClick: () => removeTeam(index),
                    className: "bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                  }, "Remove")
                )
              )
            ),
            
            React.createElement('button', {
              onClick: addTeam,
              className: "w-full bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl text-xl font-semibold transition-colors btn-primary"
            }, `+ Add ${gameMode === 'individual' ? 'Student' : 'Team'}`)
          ),
          
          // Word List Management
          React.createElement('div', {className: "bg-white/20 backdrop-blur rounded-xl p-8"}, 
            React.createElement('h2', {className: "text-3xl font-bold mb-6 flex items-center gap-3"}, 
              React.createElement(BookOpen, {className: "text-yellow-300"}),
              "Word Lists"
            ),
            
            React.createElement('div', {className: "mb-6"}, 
              React.createElement('h3', {className: "text-xl font-semibold mb-3"}, "Selected Word List:"),
              React.createElement('select', {
                value: selectedWordList,
                onChange: (e) => setSelectedWordList(e.target.value),
                className: "w-full p-3 rounded-lg bg-white/10 text-white border border-white/20"
              }, 
                React.createElement('option', {value: "default", className: "text-black"}, "Default Word List"),
                Object.keys(customWordLists).map(listName => 
                  React.createElement('option', {key: listName, value: listName, className: "text-black"}, listName)
                )
              )
            ),
            
            React.createElement('button', {
              onClick: addWordList,
              className: "w-full bg-purple-500 hover:bg-purple-600 text-white px-6 py-4 rounded-xl text-xl font-semibold transition-colors btn-primary"
            }, "+ Add Word List")
          ),

          // Game Settings
          React.createElement('div', {className: "bg-white/20 backdrop-blur rounded-xl p-8"}, 
            React.createElement('h2', {className: "text-3xl font-bold mb-6 flex items-center gap-3"}, 
              React.createElement(Globe, {className: "text-yellow-300"}),
              "Game Settings"
            ),
            
            React.createElement('button', {
              onClick: startGame,
              disabled: (gameMode === 'individual' ? teams.length < 1 : teams.length < 2),
              className: `w-full px-6 py-4 rounded-xl text-2xl font-bold transition-colors flex items-center justify-center gap-3 ${
                (gameMode === 'individual' ? teams.length >= 1 : teams.length >= 2)
                  ? 'bg-yellow-300 hover:bg-yellow-400 text-black btn-primary'
                  : 'bg-gray-500 text-gray-300 cursor-not-allowed'
              }`
            }, 
              React.createElement(Play),
              "START SPELLING BEE"
            )
          )
        )
      )
    );
  }

  // Game Playing Screen Component
  if (gameState === 'playing') {
    const currentTeam = teams[currentTeamIndex];
    
    return React.createElement('div', {
      className: "min-h-screen bg-gradient-to-br from-indigo-600 to-purple-800 p-8 text-white"
    }, 
      React.createElement('div', {className: "max-w-6xl mx-auto"}, 
        // Header
        React.createElement('div', {className: "text-center mb-8"}, 
          React.createElement('h1', {className: "text-4xl font-bold text-yellow-300 mb-2"}, 
            `SPELLING BEE - ${currentDifficulty.toUpperCase()}`
          ),
          React.createElement('div', {className: "text-xl"}, 
            `Round ${round} | Active ${gameMode === 'individual' ? 'Students' : 'Teams'}: ${teams.filter(t => t.lives > 0).length}`
          ),
          React.createElement('div', {className: "text-lg text-yellow-200"}, 
            `📚 ${selectedWordList === 'default' ? 'Default Word List' : `Custom: ${selectedWordList}`}`
          )
        ),

        // Timer
        React.createElement('div', {className: "text-center mb-6"}, 
          React.createElement('div', {
            className: `text-6xl font-bold ${timeLeft <= 10 ? 'text-red-400 animate-pulse timer-warning' : 'text-white timer-normal'}`
          }, 
            `⏰ ${timeLeft}s`
          )
        ),

        // Current Word Display (When Revealed)
        showWordCenter && React.createElement('div', {
          className: "text-center mb-8 bg-yellow-300 text-black p-8 rounded-xl word-reveal"
        }, 
          React.createElement('h2', {className: "text-8xl font-bold"}, currentWord?.word.toUpperCase())
        ),

        // Current Team/Student
        React.createElement('div', {
          className: `${currentTeam.color} backdrop-blur rounded-xl p-8 mb-8 text-center text-white shadow-2xl border-4 border-yellow-300 team-card active`
        }, 
          React.createElement('h2', {className: "text-5xl font-bold mb-4"}, `${currentTeam.name}'s Turn`),
          React.createElement('div', {className: "flex justify-center items-center gap-8 text-2xl"}, 
            React.createElement('div', {}, 
              `Lives: ${'❤️'.repeat(Math.min(currentTeam.lives, 10))}${currentTeam.lives > 10 ? `+${currentTeam.lives - 10}` : ''}`
            ),
            React.createElement('div', {}, `Score: ${currentTeam.wordsCorrect}/${currentTeam.wordsAttempted}`),
            React.createElement('div', {}, `Points: 💰 ${teamPoints[currentTeamIndex] || 1}`)
          ),
          (gameMode === 'individual' && currentTeam.lives <= 2) && React.createElement('div', {
            className: "mt-2 text-lg text-yellow-200 animate-pulse"
          }, "⚠️ Low Lives - Be Careful!"),
          (currentWordAttempts > 0) && React.createElement('div', {
            className: "mt-2 text-lg text-yellow-200"
          }, "🔄 Second Chance - Other team's turn!")
        ),

        React.createElement('div', {className: "grid md:grid-cols-3 gap-8 mb-8"}, 
          // Word Information
          React.createElement('div', {className: "bg-white/20 backdrop-blur rounded-xl p-6"}, 
            React.createElement('h3', {className: "text-3xl font-bold mb-4 text-yellow-300 flex items-center gap-3"}, 
              React.createElement(BookOpen),
              "Word Information"
            ),
            React.createElement('div', {className: "space-y-4 text-lg"}, 
              React.createElement('div', {}, 
                React.createElement('strong', {}, "Definition: "),
                currentWord?.definition
              ),
              React.createElement('div', {}, 
                React.createElement('strong', {}, "Syllables: "),
                currentWord?.syllables
              ),
              React.createElement('div', {}, 
                React.createElement('strong', {}, "Pronunciation: "),
                currentWord?.pronunciation
              ),
              React.createElement('div', {className: "flex gap-2"}, 
                React.createElement('strong', {}, "Example:"),
                React.createElement('button', {
                  onClick: () => playAudio(currentWord?.sentence),
                  className: "bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded flex items-center gap-2 text-sm help-button"
                }, 
                  React.createElement(Volume2, {size: 16}),
                  "Play"
                )
              ),
              React.createElement('div', {className: "text-base italic bg-black/20 p-3 rounded"}, 
                `"${currentWord?.sentence}"`
              )
            )
          ),

          // Etymology & Structure
          React.createElement('div', {className: "bg-white/20 backdrop-blur rounded-xl p-6"}, 
            React.createElement('h3', {className: "text-3xl font-bold mb-4 text-yellow-300 flex items-center gap-3"}, 
              React.createElement(Globe),
              "Word Origin & Structure"
            ),
            React.createElement('div', {className: "space-y-4 text-lg"}, 
              React.createElement('div', {}, 
                React.createElement('strong', {}, "Origin: "),
                currentWord?.origin
              ),
              React.createElement('div', {}, 
                React.createElement('strong', {}, "Word Parts: "),
                currentWord?.prefixSuffix
              )
            )
          ),

          // Help Shop
          React.createElement('div', {className: "bg-white/20 backdrop-blur rounded-xl p-6"}, 
            React.createElement('h3', {className: "text-2xl font-bold mb-4 text-yellow-300"}, "🛍️ Help Shop"),
            React.createElement('div', {className: "text-sm mb-3"}, `Points: 💰 ${teamPoints[currentTeamIndex] || 1}`),
            React.createElement('div', {className: "space-y-2"}, 
              React.createElement('button', {
                onClick: () => useHelpItem('reveal', 3),
                disabled: !currentWord || (teamPoints[currentTeamIndex] || 1) < 3,
                className: "w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-500 px-3 py-2 rounded text-sm help-button"
              }, "Reveal Word (3 pts)"),
              React.createElement('button', {
                onClick: () => useHelpItem('extraTime', 2),
                disabled: (teamPoints[currentTeamIndex] || 1) < 2,
                className: "w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 px-3 py-2 rounded text-sm help-button"
              }, "+15 Seconds (2 pts)"),
              React.createElement('button', {
                onClick: () => useHelpItem('syllables', 1),
                disabled: (teamPoints[currentTeamIndex] || 1) < 1,
                className: "w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-500 px-3 py-2 rounded text-sm help-button"
              }, "Syllable Count (1 pt)")
            )
          )
        ),

        // Teacher Controls
        React.createElement('div', {className: "bg-white/20 backdrop-blur rounded-xl p-6 mb-6"}, 
          React.createElement('h3', {className: "text-2xl font-bold mb-4 text-yellow-300"}, "Teacher Controls"),
          React.createElement('div', {className: "grid grid-cols-2 md:grid-cols-4 gap-4"}, 
            React.createElement('button', {
              onClick: () => playAudio(`The word is ${currentWord?.word}`),
              className: "bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-semibold btn-primary"
            }, 
              React.createElement(Volume2),
              "Say Word"
            ),
            React.createElement('button', {
              onClick: () => playAudio(currentWord?.sentence),
              className: "bg-purple-500 hover:bg-purple-600 px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-semibold btn-primary"
            }, 
              React.createElement(Volume2),
              "Play Sentence"
            ),
            React.createElement('button', {
              onClick: () => setShowWordCenter(!showWordCenter),
              className: "bg-yellow-500 hover:bg-yellow-600 px-4 py-3 rounded-xl text-sm font-semibold text-black btn-primary"
            }, showWordCenter ? '👁️ Hide Word' : '👁️ Show Word'),
            React.createElement('button', {
              onClick: () => setIsTimerActive(!isTimerActive),
              className: "bg-orange-500 hover:bg-orange-600 px-4 py-3 rounded-xl text-sm font-semibold btn-primary"
            }, isTimerActive ? '⏸️ Pause' : '▶️ Resume')
          ),
          React.createElement('div', {className: "grid grid-cols-1 md:grid-cols-3 gap-4 mt-4"}, 
            React.createElement('button', {
              onClick: markCorrect,
              className: "bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl text-lg font-semibold btn-primary"
            }, "✓ Correct"),
            React.createElement('button', {
              onClick: markIncorrect,
              className: "bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl text-lg font-semibold btn-primary"
            }, "✗ Incorrect"),
            React.createElement('button', {
              onClick: startNewWord,
              className: "bg-gray-500 hover:bg-gray-600 px-6 py-3 rounded-xl flex items-center gap-2 text-lg font-semibold btn-primary"
            }, 
              React.createElement(RotateCcw),
              "New Word"
            )
          )
        ),

        // Team Status
        React.createElement('div', {className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"}, 
          teams.map((team, index) => 
            React.createElement('div', {
              key: index,
              className: `p-4 rounded-xl text-center text-white border-2 team-card ${
                index === currentTeamIndex
                  ? 'border-yellow-300 scale-105 shadow-lg active'
                  : team.lives > 0
                  ? 'border-transparent'
                  : 'opacity-50 border-red-500'
              } ${team.color}`
            }, 
              React.createElement('div', {className: "font-semibold text-lg"}, team.name),
              React.createElement('div', {className: "text-xl"}, `❤️ ${team.lives}`),
              React.createElement('div', {className: "text-sm"}, `${team.wordsCorrect}/${team.wordsAttempted}`),
              React.createElement('div', {className: "text-xs"}, `💰 ${teamPoints[index] || 1}`)
            )
          )
        ),

        // Incorrect Words Tracker
        (incorrectWords.length > 0) && React.createElement('div', {
          className: "bg-red-800/30 backdrop-blur rounded-xl p-4"
        }, 
          React.createElement('h3', {className: "text-lg font-bold mb-2 text-red-300"}, "📝 Words to Review:"),
          React.createElement('div', {className: "flex flex-wrap gap-2"}, 
            [...new Set(incorrectWords.map(w => w.word))].slice(-10).map((word, index) => 
              React.createElement('span', {
                key: index, 
                className: "bg-red-600 px-3 py-1 rounded-full text-sm"
              }, word)
            )
          )
        )
      )
    );
  }

  // Results Screen Component
  if (gameState === 'results') {
    const sortedTeams = [...teams].sort((a, b) => {
      if (b.lives !== a.lives) return b.lives - a.lives;
      return b.wordsCorrect - a.wordsCorrect;
    });

    return React.createElement('div', {
      className: "min-h-screen bg-gradient-to-br from-green-600 to-blue-700 p-8 text-white"
    }, 
      React.createElement('div', {className: "max-w-4xl mx-auto text-center"}, 
        React.createElement('h1', {className: "text-6xl font-bold mb-8 text-yellow-300"}, "🏆 FINAL RESULTS"),
        
        React.createElement('div', {className: "space-y-6 mb-8"}, 
          sortedTeams.map((team, index) => 
            React.createElement('div', {
              key: index,
              className: `p-6 rounded-xl flex justify-between items-center text-white ${
                index === 0
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-2xl shadow-2xl border-4 border-yellow-300'
                  : team.color + ' text-xl'
              }`
            }, 
              React.createElement('div', {className: "flex items-center gap-6"}, 
                React.createElement('span', {className: "text-4xl"}, 
                  index === 0 ? '👑' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅'
                ),
                React.createElement('div', {}, 
                  React.createElement('div', {className: "font-bold text-2xl"}, team.name),
                  React.createElement('div', {className: "text-lg opacity-90"}, 
                    index === 0 ? 'CHAMPION!' : 
                    index === 1 ? 'Runner-up' : 
                    index === 2 ? 'Third Place' : `${index + 1}th Place`
                  )
                )
              ),
              React.createElement('div', {className: "text-right"}, 
                React.createElement('div', {className: "text-xl font-bold"}, `Lives: ${team.lives}`),
                React.createElement('div', {className: "text-lg"}, `Score: ${team.wordsCorrect}/${team.wordsAttempted}`),
                React.createElement('div', {className: "text-sm opacity-80"}, 
                  `${team.wordsAttempted > 0 ? Math.round((team.wordsCorrect / team.wordsAttempted) * 100) : 0}% accuracy`
                )
              )
            )
          )
        ),
        
        React.createElement('button', {
          onClick: resetGame,
          className: "bg-yellow-300 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl text-2xl font-bold transition-colors btn-primary"
        }, "Play Again")
      )
    );
  }
};

// Render the app
ReactDOM.render(React.createElement(SpellingBeeGame), document.getElementById('root'));