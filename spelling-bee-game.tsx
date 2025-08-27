import React, { useState, useEffect } from 'react';
import { Volume2, Users, BookOpen, Globe, Layers, RotateCcw, Play, Pause } from 'lucide-react';

const SpellingBeeGame = () => {
  // Word database organized by difficulty
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
      },
      {
        word: "rainbow",
        syllables: "rain-bow (2 syllables)",
        definition: "A curved band of colors in the sky after rain",
        origin: "Old English compound: 'regn' (rain) + 'boga' (bow)",
        sentence: "After the storm, a beautiful rainbow appeared.",
        prefixSuffix: "Compound word: rain + bow",
        pronunciation: "RAYN-boh"
      },
      {
        word: "butterfly",
        syllables: "but-ter-fly (3 syllables)",
        definition: "A flying insect with colorful wings",
        origin: "Old English compound, possibly from 'buttorfleoge'",
        sentence: "The butterfly landed gently on the flower.",
        prefixSuffix: "Compound word: butter + fly",
        pronunciation: "BUT-er-fly"
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
      },
      {
        word: "democracy",
        syllables: "de-moc-ra-cy (4 syllables)",
        definition: "A system where people vote to choose their leaders",
        origin: "Greek 'demokratia': 'demos' (people) + 'kratos' (power)",
        sentence: "In a democracy, citizens have the right to vote.",
        prefixSuffix: "Greek roots: demo- (people) + -cracy (government)",
        pronunciation: "dih-MOK-ruh-see"
      },
      {
        word: "scientific",
        syllables: "sci-en-tif-ic (4 syllables)",
        definition: "Related to or based on science",
        origin: "Latin 'scientia' meaning knowledge",
        sentence: "The scientific method helps us understand nature.",
        prefixSuffix: "Base 'scient' + suffix '-ific'",
        pronunciation: "sy-un-TIF-ik"
      },
      {
        word: "impossible",
        syllables: "im-pos-si-ble (4 syllables)",
        definition: "Not able to occur, exist, or be done",
        origin: "Latin 'impossibilis': 'in-' (not) + 'possibilis'",
        sentence: "It seemed impossible to climb such a tall mountain.",
        prefixSuffix: "Prefix 'im-' (not) + base 'possible'",
        pronunciation: "im-POS-uh-bul"
      }
    ],
    tricky: [
      {
        word: "chrysanthemum",
        syllables: "chry-san-the-mum (4 syllables)",
        definition: "A type of flower with many thin petals",
        origin: "Greek 'chrysos' (gold) + 'anthemon' (flower)",
        sentence: "The chrysanthemum bloomed beautifully in autumn.",
        prefixSuffix: "Greek compound: chryso- (gold) + -anthemum (flower)",
        pronunciation: "kri-SAN-thuh-mum"
      },
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
        word: "pneumonia",
        syllables: "pneu-mo-nia (3 syllables)",
        definition: "A serious infection of the lungs",
        origin: "Greek 'pneumon' meaning lung",
        sentence: "The doctor treated the patient's pneumonia with medicine.",
        prefixSuffix: "Greek root: pneumo- (lung) + suffix '-ia'",
        pronunciation: "noo-MOH-nee-uh"
      },
      {
        word: "archaeology",
        syllables: "ar-chae-ol-o-gy (5 syllables)",
        definition: "The study of ancient people through their artifacts",
        origin: "Greek 'archaios' (ancient) + 'logos' (study)",
        sentence: "Archaeology helps us learn about ancient civilizations.",
        prefixSuffix: "Greek compound: archae- (ancient) + -ology (study)",
        pronunciation: "ar-kee-OL-uh-jee"
      },
      {
        word: "pharmaceutical",
        syllables: "phar-ma-ceu-ti-cal (5 syllables)",
        definition: "Related to medicinal drugs",
        origin: "Greek 'pharmakon' (drug) + 'tekhnē' (art)",
        sentence: "The pharmaceutical company developed a new medicine.",
        prefixSuffix: "Greek root: pharmac- (drug) + suffix '-eutical'",
        pronunciation: "far-muh-SOO-ti-kul"
      }
    ]
  };

  // Game state
  const [gameState, setGameState] = useState('setup'); // setup, playing, wordDisplay, results
  const [teams, setTeams] = useState([]);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [currentDifficulty, setCurrentDifficulty] = useState('easy');
  const [currentWord, setCurrentWord] = useState(null);
  const [round, setRound] = useState(1);
  const [usedWords, setUsedWords] = useState(new Set());
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
        },
        {
          "word": "challenge",
          "syllables": "chal-lenge (2 syllables)",
          "definition": "A task or situation that tests someone's ability",
          "origin": "Old French 'chalenge' meaning 'accusation, claim'",
          "sentence": "Climbing the mountain was a real challenge.",
          "prefixSuffix": "Base word with no prefix or suffix",
          "pronunciation": "CHAL-inj"
        },
        {
          "word": "microscope",
          "syllables": "mi-cro-scope (3 syllables)",
          "definition": "An instrument used to see very small objects",
          "origin": "Greek 'mikros' (small) + 'skopein' (to look at)",
          "sentence": "We looked at the leaf under the microscope.",
          "prefixSuffix": "Prefix 'micro-' + base word 'scope'",
          "pronunciation": "MY-kro-skope"
        },
        {
          "word": "destruction",
          "syllables": "de-struc-tion (3 syllables)",
          "definition": "The act of destroying something",
          "origin": "Latin 'destructio' from 'destruere' (to pull down)",
          "sentence": "The storm caused great destruction.",
          "prefixSuffix": "Prefix 'de-' + base word 'struct' + suffix '-ion'",
          "pronunciation": "dih-STRUHK-shun"
        }
      ],
      "hard": [
        {
          "word": "constipation",
          "syllables": "con-sti-pa-tion (4 syllables)",
          "definition": "A condition where bowel movements are infrequent or hard",
          "origin": "Latin 'constipare' meaning 'to press together'",
          "sentence": "He went to the doctor for his constipation.",
          "prefixSuffix": "Base 'constipate' + suffix '-ion'",
          "pronunciation": "kon-sti-PAY-shun"
        },
        {
          "word": "entrepreneur",
          "syllables": "en-tre-pre-neur (4 syllables)",
          "definition": "A person who starts and runs a business",
          "origin": "French 'entreprendre' meaning 'to undertake'",
          "sentence": "The entrepreneur launched a new app.",
          "prefixSuffix": "Base word with no prefix or suffix",
          "pronunciation": "on-truh-pruh-NUR"
        },
        {
          "word": "haemoglobin",
          "syllables": "hae-mo-glo-bin (4 syllables)",
          "definition": "A protein in red blood cells that carries oxygen",
          "origin": "Greek 'haima' (blood) + Latin 'globus' (ball)",
          "sentence": "Haemoglobin is essential for transporting oxygen in the body.",
          "prefixSuffix": "Base word with no prefix or suffix",
          "pronunciation": "HEE-moh-gloh-bin"
        },
        {
          "word": "apocalypse",
          "syllables": "a-poc-a-lypse (4 syllables)",
          "definition": "The end of the world or great destruction",
          "origin": "Greek 'apokalupsis' meaning 'uncovering, revelation'",
          "sentence": "The movie was about a zombie apocalypse.",
          "prefixSuffix": "Base word with no prefix or suffix",
          "pronunciation": "uh-POK-uh-lips"
        },
        {
          "word": "carbohydrate",
          "syllables": "car-bo-hy-drate (4 syllables)",
          "definition": "A type of nutrient that provides energy, found in bread, rice, etc.",
          "origin": "French 'carbone' + 'hydrate'",
          "sentence": "Pasta is rich in carbohydrate.",
          "prefixSuffix": "Prefix 'carbo-' + base word 'hydrate'",
          "pronunciation": "kar-bo-HY-drayt"
        },
        {
          "word": "annihilation",
          "syllables": "an-ni-hi-la-tion (5 syllables)",
          "definition": "Complete destruction or obliteration",
          "origin": "Latin 'annihilare' meaning 'reduce to nothing'",
          "sentence": "The town faced total annihilation after the attack.",
          "prefixSuffix": "Base word 'annihilate' + suffix '-ion'",
          "pronunciation": "uh-ny-uh-LAY-shun"
        },
        {
          "word": "tyrannosaurus rex",
          "syllables": "ty-ran-no-saur-us rex (6 syllables)",
          "definition": "A large carnivorous dinosaur",
          "origin": "Greek 'tyrannos' (tyrant) + 'sauros' (lizard) + Latin 'rex' (king)",
          "sentence": "The tyrannosaurus rex had very sharp teeth.",
          "prefixSuffix": "Compound of Greek and Latin roots",
          "pronunciation": "tuh-RAN-uh-SOR-us reks"
        },
        {
          "word": "onomatopoeia",
          "syllables": "on-o-mat-o-poe-ia (6 syllables)",
          "definition": "A word that imitates the sound it represents",
          "origin": "Greek 'onoma' (name) + 'poiein' (to make)",
          "sentence": "Words like 'buzz' and 'bang' are examples of onomatopoeia.",
          "prefixSuffix": "Base word with no prefix or suffix",
          "pronunciation": "on-uh-mat-uh-PEE-uh"
        }
      ]
    }
  });
  const [selectedWordList, setSelectedWordList] = useState('August 27th - Today\'s Lesson');
  const [gameMode, setGameMode] = useState('team'); // 'individual' or 'team'
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showWordCenter, setShowWordCenter] = useState(false);
  const [currentWordAttempts, setCurrentWordAttempts] = useState(0);
  const [difficultyProgression, setDifficultyProgression] = useState(['easy', 'medium', 'hard']);
  const [currentDifficultyIndex, setCurrentDifficultyIndex] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState([]);
  const [teamPoints, setTeamPoints] = useState({});

  const addTeam = () => {
    const name = gameMode === 'individual' ? prompt("Enter student name:") : prompt("Enter team name:");
    if (name) {
      const lives = gameMode === 'individual' ? 5 : 10;
      setTeams([...teams, { name: name, lives: lives, wordsAttempted: 0, wordsCorrect: 0, color: getTeamColor(teams.length) }]);
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

    // Create a textarea element for better JSON input
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
    
    // Pre-fill with sample format
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
        alert("Error parsing word list. Please check the JSON format and try again.\n\nError: " + error.message);
      }
    };
  };

  const removeWordList = (listName) => {
    if (selectedWordList === listName) {
      setSelectedWordList('default');
    }
    setCustomWordLists(prev => {
      const newLists = { ...prev };
      delete newLists[listName];
      return newLists;
    });
  };

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
      // Reset used words if all have been used
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
    
    const availableDifficulties = getAvailableDifficulties();
    if (availableDifficulties.length === 0) {
      alert("No words available in the selected word list! Please choose a different word list.");
      return;
    }
    
    // Set first difficulty
    setCurrentDifficulty('easy');
    setCurrentDifficultyIndex(0);
    
    setGameState('playing');
    startNewWord();
  };

  const markCorrect = () => {
    setIsTimerActive(false);
    const updatedTeams = [...teams];
    updatedTeams[currentTeamIndex].wordsAttempted++;
    updatedTeams[currentTeamIndex].wordsCorrect++;
    setTeams(updatedTeams);
    
    // Award point for correct answer
    setTeamPoints(prev => ({
      ...prev,
      [currentTeamIndex]: (prev[currentTeamIndex] || 1) + 1
    }));
    
    // Play success sound
    playSuccessSound();
    
    nextTurn();
  };

  const markIncorrect = () => {
    setIsTimerActive(false);
    const updatedTeams = [...teams];
    updatedTeams[currentTeamIndex].lives--;
    updatedTeams[currentTeamIndex].wordsAttempted++;
    setTeams(updatedTeams);
    
    // Add to incorrect words list
    setIncorrectWords(prev => [...prev, currentWord]);
    
    // Play error sound
    playErrorSound();
    
    if (gameMode === 'team' && teams.length > 1 && currentWordAttempts === 0) {
      // Give other team a chance
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

    // Auto-progress through difficulties
    const totalWords = teams.reduce((sum, team) => sum + team.wordsAttempted, 0);
    if (totalWords > 0 && totalWords % (teams.length * 3) === 0) {
      // Move to next difficulty after each team has had 3 words
      const nextDiffIndex = currentDifficultyIndex + 1;
      if (nextDiffIndex < difficultyProgression.length) {
        setCurrentDifficultyIndex(nextDiffIndex);
        setCurrentDifficulty(difficultyProgression[nextDiffIndex]);
      } else if (incorrectWords.length > 0) {
        // Revisit incorrect words
        const randomIncorrect = incorrectWords[Math.floor(Math.random() * incorrectWords.length)];
        setCurrentWord(randomIncorrect);
        setTimeLeft(30);
        setIsTimerActive(true);
        setCurrentWordAttempts(0);
        return;
      }
    }

    let nextIndex = (currentTeamIndex + 1) % teams.length;
    while (teams[nextIndex].lives <= 0) {
      nextIndex = (nextIndex + 1) % teams.length;
    }
    
    setCurrentTeamIndex(nextIndex);
    startNewWord();
  };

  const playSuccessSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const playErrorSound = () => {
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
    
    // Apply help based on type
    switch(helpType) {
      case 'reveal':
        setShowWordCenter(true);
        break;
      case 'extraTime':
        setTimeLeft(prev => prev + 15);
        break;
      // Add more help types as needed
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
    // Keep gameMode and word list selections
  };

  const playAudio = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.volume = 0.8;
    speechSynthesis.speak(utterance);
  };

  // Reset difficulty when word list changes
  useEffect(() => {
    const availableDifficulties = getAvailableDifficulties();
    if (availableDifficulties.length > 0 && !availableDifficulties.includes(currentDifficulty)) {
      setCurrentDifficulty(availableDifficulties[0]);
    }
  }, [selectedWordList, customWordLists]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
      // Auto mark as incorrect when time runs out
      markIncorrect();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  // Initialize team points when teams change
  useEffect(() => {
    const newPoints = {};
    teams.forEach((team, index) => {
      newPoints[index] = teamPoints[index] || 1; // Start with 1 point each
    });
    setTeamPoints(newPoints);
  }, [teams]);

  // Setup Screen
  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-4 text-yellow-300">🏆 SPELLING BEE CHAMPIONSHIP</h1>
            <p className="text-2xl">Get ready to spell your way to victory!</p>
          </div>

          {/* Game Mode Selection */}
          <div className="bg-white/20 backdrop-blur rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center text-yellow-300">Choose Game Mode</h2>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setGameMode('individual');
                  setTeams([]);
                }}
                className={`px-8 py-4 rounded-xl text-xl font-semibold transition-colors ${
                  gameMode === 'individual'
                    ? 'bg-yellow-300 text-black'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                👤 Individual Students<br />
                <span className="text-sm opacity-80">5 lives each (Lesson Plan Mode)</span>
              </button>
              <button
                onClick={() => {
                  setGameMode('team');
                  setTeams([]);
                }}
                className={`px-8 py-4 rounded-xl text-xl font-semibold transition-colors ${
                  gameMode === 'team'
                    ? 'bg-yellow-300 text-black'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                👥 Team Competition<br />
                <span className="text-sm opacity-80">10 lives per team</span>
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {/* Team/Player Management */}
            <div className="bg-white/20 backdrop-blur rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Users className="text-yellow-300" />
                {gameMode === 'individual' ? `Students (${teams.length})` : `Teams (${teams.length})`}
              </h2>
              
              {/* Quick Setup */}
              {gameMode === 'team' && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Quick Setup:</h3>
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => {
                        setTeams([]);
                        setTeams([
                          { name: "Team Red", lives: 10, wordsAttempted: 0, wordsCorrect: 0, color: 'bg-red-500' },
                          { name: "Team Blue", lives: 10, wordsAttempted: 0, wordsCorrect: 0, color: 'bg-blue-500' }
                        ]);
                      }}
                      className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      2 Teams
                    </button>
                    <button
                      onClick={() => {
                        setTeams([]);
                        setTeams([
                          { name: "Team Red", lives: 10, wordsAttempted: 0, wordsCorrect: 0, color: 'bg-red-500' },
                          { name: "Team Blue", lives: 10, wordsAttempted: 0, wordsCorrect: 0, color: 'bg-blue-500' },
                          { name: "Team Green", lives: 10, wordsAttempted: 0, wordsCorrect: 0, color: 'bg-green-500' }
                        ]);
                      }}
                      className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      3 Teams
                    </button>
                    <button
                      onClick={() => {
                        setTeams([]);
                        setTeams([
                          { name: "Team Red", lives: 10, wordsAttempted: 0, wordsCorrect: 0, color: 'bg-red-500' },
                          { name: "Team Blue", lives: 10, wordsAttempted: 0, wordsCorrect: 0, color: 'bg-blue-500' },
                          { name: "Team Green", lives: 10, wordsAttempted: 0, wordsCorrect: 0, color: 'bg-green-500' },
                          { name: "Team Purple", lives: 10, wordsAttempted: 0, wordsCorrect: 0, color: 'bg-purple-500' }
                        ]);
                      }}
                      className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      4 Teams
                    </button>
                  </div>
                </div>
              )}
              
              <div className="space-y-4 mb-6">
                {teams.map((entity, index) => (
                  <div key={index} className={`${entity.color} rounded-lg p-4 flex justify-between items-center text-white`}>
                    <div>
                      <span className="text-xl font-semibold">{entity.name}</span>
                      <div className="text-sm opacity-90">Lives: {entity.lives}</div>
                    </div>
                    <button
                      onClick={() => removeTeam(index)}
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              
              <button
                onClick={addTeam}
                className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl text-xl font-semibold transition-colors"
              >
                + Add {gameMode === 'individual' ? 'Student' : 'Team'}
              </button>
            </div>

            {/* Word List Management */}
            <div className="bg-white/20 backdrop-blur rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <BookOpen className="text-yellow-300" />
                Word Lists
              </h2>
              
              {/* Current Selection */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Selected Word List:</h3>
                <select
                  value={selectedWordList}
                  onChange={(e) => setSelectedWordList(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20"
                >
                  <option value="default" className="text-black">Default Word List</option>
                  {Object.keys(customWordLists).map(listName => (
                    <option key={listName} value={listName} className="text-black">
                      {listName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Available Difficulties for Selected List */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Available Difficulties:</h3>
                <div className="flex flex-wrap gap-2">
                  {getAvailableDifficulties().map(diff => (
                    <span key={diff} className="bg-green-500 px-3 py-1 rounded-full text-sm">
                      {diff.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Custom Word Lists */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Custom Lists:</h3>
                <div className="space-y-2 mb-4">
                  {Object.keys(customWordLists).map(listName => (
                    <div key={listName} className="bg-white/10 rounded-lg p-3 flex justify-between items-center">
                      <span className="font-semibold">{listName}</span>
                      <button
                        onClick={() => removeWordList(listName)}
                        className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  {Object.keys(customWordLists).length === 0 && (
                    <div className="text-center text-white/60 py-4">No custom word lists added yet</div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <button
                  onClick={addWordList}
                  className="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-6 py-4 rounded-xl text-xl font-semibold transition-colors"
                >
                  + Add Word List
                </button>
                <button
                  onClick={() => {
                    const sampleFormat = {
                      "easy": [
                        {
                          "word": "cat",
                          "syllables": "cat (1 syllable)",
                          "definition": "A small furry animal that purrs",
                          "origin": "Old English 'catt' from Latin 'cattus'",
                          "sentence": "The cat sat on the mat.",
                          "prefixSuffix": "Base word with no prefix or suffix",
                          "pronunciation": "KAT"
                        }
                      ],
                      "medium": [
                        {
                          "word": "wonderful",
                          "syllables": "won-der-ful (3 syllables)",
                          "definition": "Inspiring delight or admiration; excellent",
                          "origin": "Middle English from 'wonder' + '-ful'",
                          "sentence": "It was a wonderful day at the beach.",
                          "prefixSuffix": "Base word 'wonder' + suffix '-ful'",
                          "pronunciation": "WUN-der-ful"
                        }
                      ]
                    };
                    navigator.clipboard.writeText(JSON.stringify(sampleFormat, null, 2));
                    alert("Sample word list format copied to clipboard!");
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-4 rounded-xl text-sm font-semibold transition-colors"
                >
                  📋 Copy Sample Format
                </button>
              </div>
              
              <div className="text-sm text-white/80 bg-black/20 p-3 rounded">
                <strong>📝 Word List Format:</strong> Submit your word list as JSON with "easy", "medium", and/or "tricky" arrays. Each word needs: word, syllables, definition, origin, sentence, prefixSuffix, pronunciation.
              </div>
            </div>

            {/* Game Settings */}
            <div className="bg-white/20 backdrop-blur rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <BookOpen className="text-yellow-300" />
                Difficulty Level
              </h2>
              
              <div className="space-y-4 mb-8">
                {getAvailableDifficulties().map(difficulty => (
                  <button
                    key={difficulty}
                    onClick={() => setCurrentDifficulty(difficulty)}
                    className={`w-full p-4 rounded-xl text-xl font-semibold transition-colors ${
                      currentDifficulty === difficulty
                        ? 'bg-yellow-300 text-black'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {difficulty.toUpperCase()}
                    <div className="text-sm mt-1 opacity-80">
                      {selectedWordList === 'default' ? (
                        <>
                          {difficulty === 'easy' && '3-6 letter words'}
                          {difficulty === 'medium' && '7-10 letter words'}
                          {difficulty === 'tricky' && '10+ letter words'}
                        </>
                      ) : (
                        `Custom word list: ${selectedWordList}`
                      )}
                    </div>
                  </button>
                ))}
                {getAvailableDifficulties().length === 0 && (
                  <div className="text-center text-red-300 py-8">
                    No words available in selected word list!<br />
                    Please select a different word list or add words to this one.
                  </div>
                )}
              </div>
              
              <button
                onClick={startGame}
                disabled={(gameMode === 'individual' ? teams.length < 1 : teams.length < 2) || getAvailableDifficulties().length === 0}
                className={`w-full px-6 py-4 rounded-xl text-2xl font-bold transition-colors flex items-center justify-center gap-3 ${
                  (gameMode === 'individual' ? teams.length >= 1 : teams.length >= 2) && getAvailableDifficulties().length > 0
                    ? 'bg-yellow-300 hover:bg-yellow-400 text-black'
                    : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                }`}
              >
                <Play />
                START SPELLING BEE
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Game Playing Screen
  if (gameState === 'playing') {
    const currentTeam = teams[currentTeamIndex];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-800 p-8 text-white">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-yellow-300 mb-2">SPELLING BEE - {currentDifficulty.toUpperCase()}</h1>
            <div className="text-xl">Round {round} | Active {gameMode === 'individual' ? 'Students' : 'Teams'}: {teams.filter(t => t.lives > 0).length}</div>
            <div className="text-lg text-yellow-200">
              📚 {selectedWordList === 'default' ? 'Default Word List' : `Custom: ${selectedWordList}`}
            </div>
          </div>

          {/* Current Team/Student */}
          <div className={`${currentTeam.color} backdrop-blur rounded-xl p-8 mb-8 text-center text-white shadow-2xl border-4 border-yellow-300`}>
            <h2 className="text-5xl font-bold mb-4">
              {currentTeam.name}'s Turn
            </h2>
            <div className="flex justify-center items-center gap-8 text-2xl">
              <div>Lives: {'❤️'.repeat(Math.min(currentTeam.lives, 10))}{currentTeam.lives > 10 ? `+${currentTeam.lives - 10}` : ''}</div>
              <div>Score: {currentTeam.wordsCorrect}/{currentTeam.wordsAttempted}</div>
            </div>
            {gameMode === 'individual' && currentTeam.lives <= 2 && (
              <div className="mt-2 text-lg text-yellow-200 animate-pulse">
                ⚠️ Low Lives - Be Careful!
              </div>
            )}
          </div>

          {/* Word Information */}
  // Game Playing Screen
  if (gameState === 'playing') {
    const currentTeam = teams[currentTeamIndex];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-800 p-8 text-white">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-yellow-300 mb-2">SPELLING BEE - {currentDifficulty.toUpperCase()}</h1>
            <div className="text-xl">Round {round} | Active {gameMode === 'individual' ? 'Students' : 'Teams'}: {teams.filter(t => t.lives > 0).length}</div>
            <div className="text-lg text-yellow-200">
              📚 {selectedWordList === 'default' ? 'Default Word List' : `Custom: ${selectedWordList}`}
            </div>
          </div>

          {/* Timer */}
          <div className="text-center mb-6">
            <div className={`text-6xl font-bold ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              ⏰ {timeLeft}s
            </div>
          </div>

          {/* Current Word Display (When Revealed) */}
          {showWordCenter && (
            <div className="text-center mb-8 bg-yellow-300 text-black p-8 rounded-xl">
              <h2 className="text-8xl font-bold">{currentWord?.word.toUpperCase()}</h2>
            </div>
          )}

          {/* Current Team/Student */}
          <div className={`${currentTeam.color} backdrop-blur rounded-xl p-8 mb-8 text-center text-white shadow-2xl border-4 border-yellow-300`}>
            <h2 className="text-5xl font-bold mb-4">
              {currentTeam.name}'s Turn
            </h2>
            <div className="flex justify-center items-center gap-8 text-2xl">
              <div>Lives: {'❤️'.repeat(Math.min(currentTeam.lives, 10))}{currentTeam.lives > 10 ? `+${currentTeam.lives - 10}` : ''}</div>
              <div>Score: {currentTeam.wordsCorrect}/{currentTeam.wordsAttempted}</div>
              <div>Points: 💰 {teamPoints[currentTeamIndex] || 1}</div>
            </div>
            {gameMode === 'individual' && currentTeam.lives <= 2 && (
              <div className="mt-2 text-lg text-yellow-200 animate-pulse">
                ⚠️ Low Lives - Be Careful!
              </div>
            )}
            {currentWordAttempts > 0 && (
              <div className="mt-2 text-lg text-yellow-200">
                🔄 Second Chance - Other team's turn!
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Word Information */}
            <div className="bg-white/20 backdrop-blur rounded-xl p-6">
              <h3 className="text-3xl font-bold mb-4 text-yellow-300 flex items-center gap-3">
                <BookOpen />
                Word Information
              </h3>
              <div className="space-y-4 text-lg">
                <div><strong>Definition:</strong> {currentWord?.definition}</div>
                <div><strong>Syllables:</strong> {currentWord?.syllables}</div>
                <div><strong>Pronunciation:</strong> {currentWord?.pronunciation}</div>
                <div className="flex gap-2">
                  <strong>Example:</strong>
                  <button
                    onClick={() => playAudio(currentWord?.sentence)}
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded flex items-center gap-2 text-sm"
                  >
                    <Volume2 size={16} />
                    Play
                  </button>
                </div>
                <div className="text-base italic bg-black/20 p-3 rounded">
                  "{currentWord?.sentence}"
                </div>
              </div>
            </div>

            {/* Etymology & Structure */}
            <div className="bg-white/20 backdrop-blur rounded-xl p-6">
              <h3 className="text-3xl font-bold mb-4 text-yellow-300 flex items-center gap-3">
                <Globe />
                Word Origin & Structure
              </h3>
              <div className="space-y-4 text-lg">
                <div><strong>Origin:</strong> {currentWord?.origin}</div>
                <div><strong>Word Parts:</strong> {currentWord?.prefixSuffix}</div>
              </div>
            </div>

            {/* Help Shop */}
            <div className="bg-white/20 backdrop-blur rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-4 text-yellow-300">🛍️ Help Shop</h3>
              <div className="text-sm mb-3">Points: 💰 {teamPoints[currentTeamIndex] || 1}</div>
              <div className="space-y-2">
                <button
                  onClick={() => useHelpItem('reveal', 3)}
                  disabled={!currentWord || (teamPoints[currentTeamIndex] || 1) < 3}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-500 px-3 py-2 rounded text-sm"
                >
                  Reveal Word (3 pts)
                </button>
                <button
                  onClick={() => setTimeLeft(prev => prev + 15)}
                  disabled={(teamPoints[currentTeamIndex] || 1) < 2}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 px-3 py-2 rounded text-sm"
                >
                  +15 Seconds (2 pts)
                </button>
                <button
                  onClick={() => playAudio(`The word has ${currentWord?.syllables}`)}
                  disabled={(teamPoints[currentTeamIndex] || 1) < 1}
                  className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-500 px-3 py-2 rounded text-sm"
                >
                  Syllable Count (1 pt)
                </button>
              </div>
            </div>
          </div>

          {/* Teacher Controls */}
          <div className="bg-white/20 backdrop-blur rounded-xl p-6 mb-6">
            <h3 className="text-2xl font-bold mb-4 text-yellow-300">Teacher Controls</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => playAudio(`The word is ${currentWord?.word}`)}
                className="bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-semibold"
              >
                <Volume2 />
                Say Word
              </button>
              <button
                onClick={() => playAudio(currentWord?.sentence)}
                className="bg-purple-500 hover:bg-purple-600 px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-semibold"
              >
                <Volume2 />
                Play Sentence
              </button>
              <button
                onClick={() => setShowWordCenter(!showWordCenter)}
                className="bg-yellow-500 hover:bg-yellow-600 px-4 py-3 rounded-xl text-sm font-semibold text-black"
              >
                {showWordCenter ? '👁️ Hide Word' : '👁️ Show Word'}
              </button>
              <button
                onClick={() => {
                  setIsTimerActive(!isTimerActive);
                }}
                className="bg-orange-500 hover:bg-orange-600 px-4 py-3 rounded-xl text-sm font-semibold"
              >
                {isTimerActive ? '⏸️ Pause' : '▶️ Resume'}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <button
                onClick={markCorrect}
                className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl text-lg font-semibold"
              >
                ✓ Correct
              </button>
              <button
                onClick={markIncorrect}
                className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl text-lg font-semibold"
              >
                ✗ Incorrect
              </button>
              <button
                onClick={() => startNewWord()}
                className="bg-gray-500 hover:bg-gray-600 px-6 py-3 rounded-xl flex items-center gap-2 text-lg font-semibold"
              >
                <RotateCcw />
                New Word
              </button>
            </div>
          </div>

          {/* Team Status */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {teams.map((team, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl text-center text-white border-2 ${
                  index === currentTeamIndex
                    ? 'border-yellow-300 scale-105 shadow-lg'
                    : team.lives > 0
                    ? 'border-transparent'
                    : 'opacity-50 border-red-500'
                } ${team.color}`}
              >
                <div className="font-semibold text-lg">{team.name}</div>
                <div className="text-xl">❤️ {team.lives}</div>
                <div className="text-sm">{team.wordsCorrect}/{team.wordsAttempted}</div>
                <div className="text-xs">💰 {teamPoints[index] || 1}</div>
              </div>
            ))}
          </div>

          {/* Incorrect Words Tracker */}
          {incorrectWords.length > 0 && (
            <div className="bg-red-800/30 backdrop-blur rounded-xl p-4">
              <h3 className="text-lg font-bold mb-2 text-red-300">📝 Words to Review:</h3>
              <div className="flex flex-wrap gap-2">
                {[...new Set(incorrectWords.map(w => w.word))].slice(-10).map((word, index) => (
                  <span key={index} className="bg-red-600 px-3 py-1 rounded-full text-sm">
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Results Screen
  if (gameState === 'results') {
    const sortedTeams = [...teams].sort((a, b) => {
      if (b.lives !== a.lives) return b.lives - a.lives;
      return b.wordsCorrect - a.wordsCorrect;
    });

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-600 to-blue-700 p-8 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-8 text-yellow-300">🏆 FINAL RESULTS</h1>
          
          <div className="space-y-6 mb-8">
            {sortedTeams.map((team, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl flex justify-between items-center text-white ${
                  index === 0
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-2xl shadow-2xl border-4 border-yellow-300'
                    : team.color + ' text-xl'
                }`}
              >
                <div className="flex items-center gap-6">
                  <span className="text-4xl">
                    {index === 0 ? '👑' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅'}
                  </span>
                  <div>
                    <div className="font-bold text-2xl">{team.name}</div>
                    <div className="text-lg opacity-90">
                      {index === 0 ? 'CHAMPION!' : index === 1 ? 'Runner-up' : index === 2 ? 'Third Place' : `${index + 1}th Place`}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">Lives: {team.lives}</div>
                  <div className="text-lg">Score: {team.wordsCorrect}/{team.wordsAttempted}</div>
                  <div className="text-sm opacity-80">
                    {team.wordsAttempted > 0 ? `${Math.round((team.wordsCorrect / team.wordsAttempted) * 100)}% accuracy` : '0% accuracy'}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button
            onClick={resetGame}
            className="bg-yellow-300 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl text-2xl font-bold transition-colors"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }
};

export default SpellingBeeGame;