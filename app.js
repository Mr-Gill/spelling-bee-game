(() => {
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });

  // spelling-bee-game.tsx
  var import_react = __require("react");
  var import_lucide_react = __require("lucide-react");
  var import_jsx_runtime = __require("react/jsx-runtime");
  var SpellingBeeGame = () => {
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
          origin: "Greek 'pharmakon' (drug) + 'tekhn\u0113' (art)",
          sentence: "The pharmaceutical company developed a new medicine.",
          prefixSuffix: "Greek root: pharmac- (drug) + suffix '-eutical'",
          pronunciation: "far-muh-SOO-ti-kul"
        }
      ]
    };
    const [gameState, setGameState] = (0, import_react.useState)("setup");
    const [teams, setTeams] = (0, import_react.useState)([]);
    const [currentTeamIndex, setCurrentTeamIndex] = (0, import_react.useState)(0);
    const [currentDifficulty, setCurrentDifficulty] = (0, import_react.useState)("easy");
    const [currentWord, setCurrentWord] = (0, import_react.useState)(null);
    const [round, setRound] = (0, import_react.useState)(1);
    const [usedWords, setUsedWords] = (0, import_react.useState)(/* @__PURE__ */ new Set());
    const [customWordLists, setCustomWordLists] = (0, import_react.useState)({
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
            "origin": "Old English '\xFE\xE6nne'",
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
    const [selectedWordList, setSelectedWordList] = (0, import_react.useState)("August 27th - Today's Lesson");
    const [gameMode, setGameMode] = (0, import_react.useState)("team");
    const [timeLeft, setTimeLeft] = (0, import_react.useState)(30);
    const [isTimerActive, setIsTimerActive] = (0, import_react.useState)(false);
    const [showWordCenter, setShowWordCenter] = (0, import_react.useState)(false);
    const [currentWordAttempts, setCurrentWordAttempts] = (0, import_react.useState)(0);
    const [difficultyProgression, setDifficultyProgression] = (0, import_react.useState)(["easy", "medium", "hard"]);
    const [currentDifficultyIndex, setCurrentDifficultyIndex] = (0, import_react.useState)(0);
    const [incorrectWords, setIncorrectWords] = (0, import_react.useState)([]);
    const [teamPoints, setTeamPoints] = (0, import_react.useState)({});
    const addTeam = () => {
      const name = gameMode === "individual" ? prompt("Enter student name:") : prompt("Enter team name:");
      if (name) {
        const lives = gameMode === "individual" ? 5 : 10;
        setTeams([...teams, { name, lives, wordsAttempted: 0, wordsCorrect: 0, color: getTeamColor(teams.length) }]);
      }
    };
    const removeTeam = (index) => {
      setTeams(teams.filter((_, i) => i !== index));
    };
    const addWordList = () => {
      const listName = prompt("Enter a name for this word list:");
      if (!listName) return;
      if (customWordLists[listName] || listName === "default") {
        alert("Word list name already exists! Please choose a different name.");
        return;
      }
      const modal = document.createElement("div");
      modal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
      background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 1000;
    `;
      const content = document.createElement("div");
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
      document.getElementById("wordListInput").value = JSON.stringify(sampleFormat, null, 2);
      document.getElementById("cancelBtn").onclick = () => {
        document.body.removeChild(modal);
      };
      document.getElementById("saveBtn").onclick = () => {
        const wordListData = document.getElementById("wordListInput").value;
        try {
          const parsedData = JSON.parse(wordListData);
          if (!parsedData || typeof parsedData !== "object") {
            throw new Error("Invalid format");
          }
          const validDifficulties = ["easy", "medium", "hard"];
          const hasValidDifficulty = validDifficulties.some(
            (diff) => parsedData[diff] && Array.isArray(parsedData[diff]) && parsedData[diff].length > 0
          );
          if (!hasValidDifficulty) {
            throw new Error("Word list must contain at least one difficulty level (easy, medium, or hard) with words");
          }
          setCustomWordLists((prev) => ({
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
        setSelectedWordList("default");
      }
      setCustomWordLists((prev) => {
        const newLists = { ...prev };
        delete newLists[listName];
        return newLists;
      });
    };
    const getTeamColor = (index) => {
      const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-pink-500", "bg-teal-500", "bg-yellow-500"];
      return colors[index % colors.length];
    };
    const getAvailableDifficulties = () => {
      const currentDatabase = selectedWordList === "default" ? wordDatabase : customWordLists[selectedWordList];
      if (!currentDatabase) return [];
      return Object.keys(currentDatabase).filter(
        (diff) => currentDatabase[diff] && Array.isArray(currentDatabase[diff]) && currentDatabase[diff].length > 0
      );
    };
    const selectRandomWord = (difficulty) => {
      const currentDatabase = selectedWordList === "default" ? wordDatabase : customWordLists[selectedWordList];
      const availableWords = currentDatabase[difficulty]?.filter(
        (word) => !usedWords.has(`${difficulty}-${word.word}`)
      ) || [];
      if (availableWords.length === 0) {
        setUsedWords(/* @__PURE__ */ new Set());
        const allWords = currentDatabase[difficulty] || [];
        if (allWords.length === 0) {
          alert(`No words available for ${difficulty} difficulty in the selected word list!`);
          return null;
        }
        return allWords[Math.floor(Math.random() * allWords.length)];
      }
      const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
      setUsedWords((prev) => /* @__PURE__ */ new Set([...prev, `${difficulty}-${randomWord.word}`]));
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
      const minRequired = gameMode === "individual" ? 1 : 2;
      if (teams.length < minRequired) {
        const entityName = gameMode === "individual" ? "student" : "teams";
        alert(`Please add at least ${minRequired === 1 ? "one " + entityName : "two " + entityName}!`);
        return;
      }
      const availableDifficulties = getAvailableDifficulties();
      if (availableDifficulties.length === 0) {
        alert("No words available in the selected word list! Please choose a different word list.");
        return;
      }
      setCurrentDifficulty("easy");
      setCurrentDifficultyIndex(0);
      setGameState("playing");
      startNewWord();
    };
    const markCorrect = () => {
      setIsTimerActive(false);
      const updatedTeams = [...teams];
      updatedTeams[currentTeamIndex].wordsAttempted++;
      updatedTeams[currentTeamIndex].wordsCorrect++;
      setTeams(updatedTeams);
      setTeamPoints((prev) => ({
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
      setIncorrectWords((prev) => [...prev, currentWord]);
      playErrorSound();
      if (gameMode === "team" && teams.length > 1 && currentWordAttempts === 0) {
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
      const activeTeams = teams.filter((t) => t.lives > 0);
      if (activeTeams.length <= 1 && gameMode === "team") {
        setGameState("results");
        return;
      }
      if (activeTeams.length === 0 && gameMode === "individual") {
        setGameState("results");
        return;
      }
      const totalWords = teams.reduce((sum, team) => sum + team.wordsAttempted, 0);
      if (totalWords > 0 && totalWords % (teams.length * 3) === 0) {
        const nextDiffIndex = currentDifficultyIndex + 1;
        if (nextDiffIndex < difficultyProgression.length) {
          setCurrentDifficultyIndex(nextDiffIndex);
          setCurrentDifficulty(difficultyProgression[nextDiffIndex]);
        } else if (incorrectWords.length > 0) {
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
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
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
      setTeamPoints((prev) => ({
        ...prev,
        [currentTeamIndex]: currentPoints - cost
      }));
      switch (helpType) {
        case "reveal":
          setShowWordCenter(true);
          break;
        case "extraTime":
          setTimeLeft((prev) => prev + 15);
          break;
      }
    };
    const resetGame = () => {
      setGameState("setup");
      setTeams([]);
      setCurrentTeamIndex(0);
      setCurrentDifficulty("easy");
      setCurrentWord(null);
      setRound(1);
      setUsedWords(/* @__PURE__ */ new Set());
    };
    const playAudio = (text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    };
    (0, import_react.useEffect)(() => {
      const availableDifficulties = getAvailableDifficulties();
      if (availableDifficulties.length > 0 && !availableDifficulties.includes(currentDifficulty)) {
        setCurrentDifficulty(availableDifficulties[0]);
      }
    }, [selectedWordList, customWordLists]);
    (0, import_react.useEffect)(() => {
      let interval = null;
      if (isTimerActive && timeLeft > 0) {
        interval = setInterval(() => {
          setTimeLeft(timeLeft - 1);
        }, 1e3);
      } else if (timeLeft === 0) {
        setIsTimerActive(false);
        markIncorrect();
      }
      return () => clearInterval(interval);
    }, [isTimerActive, timeLeft]);
    (0, import_react.useEffect)(() => {
      const newPoints = {};
      teams.forEach((team, index) => {
        newPoints[index] = teamPoints[index] || 1;
      });
      setTeamPoints(newPoints);
    }, [teams]);
    if (gameState === "setup") {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "max-w-7xl mx-auto", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "text-6xl font-bold mb-4 text-yellow-300", children: "\u{1F3C6} SPELLING BEE CHAMPIONSHIP" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-2xl", children: "Get ready to spell your way to victory!" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-white/20 backdrop-blur rounded-xl p-6 mb-8", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "text-2xl font-bold mb-4 text-center text-yellow-300", children: "Choose Game Mode" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex gap-4 justify-center", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "button",
              {
                onClick: () => {
                  setGameMode("individual");
                  setTeams([]);
                },
                className: `px-8 py-4 rounded-xl text-xl font-semibold transition-colors ${gameMode === "individual" ? "bg-yellow-300 text-black" : "bg-white/10 hover:bg-white/20 text-white"}`,
                children: [
                  "\u{1F464} Individual Students",
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-sm opacity-80", children: "5 lives each (Lesson Plan Mode)" })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "button",
              {
                onClick: () => {
                  setGameMode("team");
                  setTeams([]);
                },
                className: `px-8 py-4 rounded-xl text-xl font-semibold transition-colors ${gameMode === "team" ? "bg-yellow-300 text-black" : "bg-white/10 hover:bg-white/20 text-white"}`,
                children: [
                  "\u{1F465} Team Competition",
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-sm opacity-80", children: "10 lives per team" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid lg:grid-cols-3 md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-white/20 backdrop-blur rounded-xl p-8", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { className: "text-3xl font-bold mb-6 flex items-center gap-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Users, { className: "text-yellow-300" }),
              gameMode === "individual" ? `Students (${teams.length})` : `Teams (${teams.length})`
            ] }),
            gameMode === "team" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mb-6", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-xl font-semibold mb-3", children: "Quick Setup:" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex gap-2 mb-4", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    onClick: () => {
                      setTeams([]);
                      setTeams([
                        { name: "Team Red", lives: 10, wordsAttempted: 0, wordsCorrect: 0, color: "bg-red-500" },
                        { name: "Team Blue", lives: 10, wordsAttempted: 0, wordsCorrect: 0, color: "bg-blue-500" }
                      ]);
                    },
                    className: "bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm transition-colors",
                    children: "2 Teams"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    onClick: () => {
                      setTeams([]);
                      setTeams([
                        { name: "Team Red", lives: 10, wordsAttempted: 0, wordsCorrect: 0, color: "bg-red-500" },
                        { name: "Team Blue", lives: 10, wordsAttempted: 0, wordsCorrect: 0, color: "bg-blue-500" },
                        { name: "Team Green", lives: 10, wordsAttempted: 0, wordsCorrect: 0, color: "bg-green-500" }
                      ]);
                    },
                    className: "bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm transition-colors",
                    children: "3 Teams"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    onClick: () => {
                      setTeams([]);
                      setTeams([
                        { name: "Team Red", lives: 10, wordsAttempted: 0, wordsCorrect: 0, color: "bg-red-500" },
                        { name: "Team Blue", lives: 10, wordsAttempted: 0, wordsCorrect: 0, color: "bg-blue-500" },
                        { name: "Team Green", lives: 10, wordsAttempted: 0, wordsCorrect: 0, color: "bg-green-500" },
                        { name: "Team Purple", lives: 10, wordsAttempted: 0, wordsCorrect: 0, color: "bg-purple-500" }
                      ]);
                    },
                    className: "bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm transition-colors",
                    children: "4 Teams"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "space-y-4 mb-6", children: teams.map((entity, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `${entity.color} rounded-lg p-4 flex justify-between items-center text-white`, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-xl font-semibold", children: entity.name }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-sm opacity-90", children: [
                  "Lives: ",
                  entity.lives
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  onClick: () => removeTeam(index),
                  className: "bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors",
                  children: "Remove"
                }
              )
            ] }, index)) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "button",
              {
                onClick: addTeam,
                className: "w-full bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl text-xl font-semibold transition-colors",
                children: [
                  "+ Add ",
                  gameMode === "individual" ? "Student" : "Team"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-white/20 backdrop-blur rounded-xl p-8", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { className: "text-3xl font-bold mb-6 flex items-center gap-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.BookOpen, { className: "text-yellow-300" }),
              "Word Lists"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mb-6", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-xl font-semibold mb-3", children: "Selected Word List:" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "select",
                {
                  value: selectedWordList,
                  onChange: (e) => setSelectedWordList(e.target.value),
                  className: "w-full p-3 rounded-lg bg-white/10 text-white border border-white/20",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "default", className: "text-black", children: "Default Word List" }),
                    Object.keys(customWordLists).map((listName) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: listName, className: "text-black", children: listName }, listName))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mb-6", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-lg font-semibold mb-2", children: "Available Difficulties:" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-wrap gap-2", children: getAvailableDifficulties().map((diff) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bg-green-500 px-3 py-1 rounded-full text-sm", children: diff.toUpperCase() }, diff)) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mb-6", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-xl font-semibold mb-3", children: "Custom Lists:" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-2 mb-4", children: [
                Object.keys(customWordLists).map((listName) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-white/10 rounded-lg p-3 flex justify-between items-center", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-semibold", children: listName }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "button",
                    {
                      onClick: () => removeWordList(listName),
                      className: "bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm transition-colors",
                      children: "Remove"
                    }
                  )
                ] }, listName)),
                Object.keys(customWordLists).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-center text-white/60 py-4", children: "No custom word lists added yet" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex gap-2 mb-4", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  onClick: addWordList,
                  className: "flex-1 bg-purple-500 hover:bg-purple-600 text-white px-6 py-4 rounded-xl text-xl font-semibold transition-colors",
                  children: "+ Add Word List"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  onClick: () => {
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
                  },
                  className: "bg-blue-500 hover:bg-blue-600 text-white px-4 py-4 rounded-xl text-sm font-semibold transition-colors",
                  children: "\u{1F4CB} Copy Sample Format"
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-sm text-white/80 bg-black/20 p-3 rounded", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "\u{1F4DD} Word List Format:" }),
              ' Submit your word list as JSON with "easy", "medium", and/or "tricky" arrays. Each word needs: word, syllables, definition, origin, sentence, prefixSuffix, pronunciation.'
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-white/20 backdrop-blur rounded-xl p-8", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { className: "text-3xl font-bold mb-6 flex items-center gap-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.BookOpen, { className: "text-yellow-300" }),
              "Difficulty Level"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-4 mb-8", children: [
              getAvailableDifficulties().map((difficulty) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "button",
                {
                  onClick: () => setCurrentDifficulty(difficulty),
                  className: `w-full p-4 rounded-xl text-xl font-semibold transition-colors ${currentDifficulty === difficulty ? "bg-yellow-300 text-black" : "bg-white/10 hover:bg-white/20"}`,
                  children: [
                    difficulty.toUpperCase(),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-sm mt-1 opacity-80", children: selectedWordList === "default" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
                      difficulty === "easy" && "3-6 letter words",
                      difficulty === "medium" && "7-10 letter words",
                      difficulty === "tricky" && "10+ letter words"
                    ] }) : `Custom word list: ${selectedWordList}` })
                  ]
                },
                difficulty
              )),
              getAvailableDifficulties().length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-center text-red-300 py-8", children: [
                "No words available in selected word list!",
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
                "Please select a different word list or add words to this one."
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "button",
              {
                onClick: startGame,
                disabled: (gameMode === "individual" ? teams.length < 1 : teams.length < 2) || getAvailableDifficulties().length === 0,
                className: `w-full px-6 py-4 rounded-xl text-2xl font-bold transition-colors flex items-center justify-center gap-3 ${(gameMode === "individual" ? teams.length >= 1 : teams.length >= 2) && getAvailableDifficulties().length > 0 ? "bg-yellow-300 hover:bg-yellow-400 text-black" : "bg-gray-500 text-gray-300 cursor-not-allowed"}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Play, {}),
                  "START SPELLING BEE"
                ]
              }
            )
          ] })
        ] })
      ] }) });
    }
    if (gameState === "playing") {
      const currentTeam = teams[currentTeamIndex];
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-screen bg-gradient-to-br from-indigo-600 to-purple-800 p-8 text-white", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "max-w-6xl mx-auto", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-center mb-8", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { className: "text-4xl font-bold text-yellow-300 mb-2", children: [
            "SPELLING BEE - ",
            currentDifficulty.toUpperCase()
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-xl", children: [
            "Round ",
            round,
            " | Active ",
            gameMode === "individual" ? "Students" : "Teams",
            ": ",
            teams.filter((t) => t.lives > 0).length
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-lg text-yellow-200", children: [
            "\u{1F4DA} ",
            selectedWordList === "default" ? "Default Word List" : `Custom: ${selectedWordList}`
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-center mb-6", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `text-6xl font-bold ${timeLeft <= 10 ? "text-red-400 animate-pulse" : "text-white"}`, children: [
          "\u23F0 ",
          timeLeft,
          "s"
        ] }) }),
        showWordCenter && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-center mb-8 bg-yellow-300 text-black p-8 rounded-xl", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "text-8xl font-bold", children: currentWord?.word.toUpperCase() }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `${currentTeam.color} backdrop-blur rounded-xl p-8 mb-8 text-center text-white shadow-2xl border-4 border-yellow-300`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { className: "text-5xl font-bold mb-4", children: [
            currentTeam.name,
            "'s Turn"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex justify-center items-center gap-8 text-2xl", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              "Lives: ",
              "\u2764\uFE0F".repeat(Math.min(currentTeam.lives, 10)),
              currentTeam.lives > 10 ? `+${currentTeam.lives - 10}` : ""
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              "Score: ",
              currentTeam.wordsCorrect,
              "/",
              currentTeam.wordsAttempted
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              "Points: \u{1F4B0} ",
              teamPoints[currentTeamIndex] || 1
            ] })
          ] }),
          gameMode === "individual" && currentTeam.lives <= 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-2 text-lg text-yellow-200 animate-pulse", children: "\u26A0\uFE0F Low Lives - Be Careful!" }),
          currentWordAttempts > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-2 text-lg text-yellow-200", children: "\u{1F504} Second Chance - Other team's turn!" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid md:grid-cols-3 gap-8 mb-8", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-white/20 backdrop-blur rounded-xl p-6", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { className: "text-3xl font-bold mb-4 text-yellow-300 flex items-center gap-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.BookOpen, {}),
              "Word Information"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-4 text-lg", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Definition:" }),
                " ",
                currentWord?.definition
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Syllables:" }),
                " ",
                currentWord?.syllables
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Pronunciation:" }),
                " ",
                currentWord?.pronunciation
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Example:" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                  "button",
                  {
                    onClick: () => playAudio(currentWord?.sentence),
                    className: "bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded flex items-center gap-2 text-sm",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Volume2, { size: 16 }),
                      "Play"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-base italic bg-black/20 p-3 rounded", children: [
                '"',
                currentWord?.sentence,
                '"'
              ] })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-white/20 backdrop-blur rounded-xl p-6", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { className: "text-3xl font-bold mb-4 text-yellow-300 flex items-center gap-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Globe, {}),
              "Word Origin & Structure"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-4 text-lg", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Origin:" }),
                " ",
                currentWord?.origin
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Word Parts:" }),
                " ",
                currentWord?.prefixSuffix
              ] })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-white/20 backdrop-blur rounded-xl p-6", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-2xl font-bold mb-4 text-yellow-300", children: "\u{1F6CD}\uFE0F Help Shop" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-sm mb-3", children: [
              "Points: \u{1F4B0} ",
              teamPoints[currentTeamIndex] || 1
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  onClick: () => useHelpItem("reveal", 3),
                  disabled: !currentWord || (teamPoints[currentTeamIndex] || 1) < 3,
                  className: "w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-500 px-3 py-2 rounded text-sm",
                  children: "Reveal Word (3 pts)"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  onClick: () => setTimeLeft((prev) => prev + 15),
                  disabled: (teamPoints[currentTeamIndex] || 1) < 2,
                  className: "w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 px-3 py-2 rounded text-sm",
                  children: "+15 Seconds (2 pts)"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  onClick: () => playAudio(`The word has ${currentWord?.syllables}`),
                  disabled: (teamPoints[currentTeamIndex] || 1) < 1,
                  className: "w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-500 px-3 py-2 rounded text-sm",
                  children: "Syllable Count (1 pt)"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-white/20 backdrop-blur rounded-xl p-6 mb-6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-2xl font-bold mb-4 text-yellow-300", children: "Teacher Controls" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "button",
              {
                onClick: () => playAudio(`The word is ${currentWord?.word}`),
                className: "bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-semibold",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Volume2, {}),
                  "Say Word"
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "button",
              {
                onClick: () => playAudio(currentWord?.sentence),
                className: "bg-purple-500 hover:bg-purple-600 px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-semibold",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Volume2, {}),
                  "Play Sentence"
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                onClick: () => setShowWordCenter(!showWordCenter),
                className: "bg-yellow-500 hover:bg-yellow-600 px-4 py-3 rounded-xl text-sm font-semibold text-black",
                children: showWordCenter ? "\u{1F441}\uFE0F Hide Word" : "\u{1F441}\uFE0F Show Word"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                onClick: () => {
                  setIsTimerActive(!isTimerActive);
                },
                className: "bg-orange-500 hover:bg-orange-600 px-4 py-3 rounded-xl text-sm font-semibold",
                children: isTimerActive ? "\u23F8\uFE0F Pause" : "\u25B6\uFE0F Resume"
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mt-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                onClick: markCorrect,
                className: "bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl text-lg font-semibold",
                children: "\u2713 Correct"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                onClick: markIncorrect,
                className: "bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl text-lg font-semibold",
                children: "\u2717 Incorrect"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "button",
              {
                onClick: () => startNewWord(),
                className: "bg-gray-500 hover:bg-gray-600 px-6 py-3 rounded-xl flex items-center gap-2 text-lg font-semibold",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.RotateCcw, {}),
                  "New Word"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6", children: teams.map((team, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "div",
          {
            className: `p-4 rounded-xl text-center text-white border-2 ${index === currentTeamIndex ? "border-yellow-300 scale-105 shadow-lg" : team.lives > 0 ? "border-transparent" : "opacity-50 border-red-500"} ${team.color}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "font-semibold text-lg", children: team.name }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-xl", children: [
                "\u2764\uFE0F ",
                team.lives
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-sm", children: [
                team.wordsCorrect,
                "/",
                team.wordsAttempted
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-xs", children: [
                "\u{1F4B0} ",
                teamPoints[index] || 1
              ] })
            ]
          },
          index
        )) }),
        incorrectWords.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-red-800/30 backdrop-blur rounded-xl p-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-lg font-bold mb-2 text-red-300", children: "\u{1F4DD} Words to Review:" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-wrap gap-2", children: [...new Set(incorrectWords.map((w) => w.word))].slice(-10).map((word, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bg-red-600 px-3 py-1 rounded-full text-sm", children: word }, index)) })
        ] })
      ] }) });
    }
  };
  var spelling_bee_game_default = SpellingBeeGame;
})();
