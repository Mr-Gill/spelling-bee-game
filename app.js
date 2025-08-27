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
  var wordDatabase = {
    easy: [
      { word: "friend", syllables: "friend (1 syllable)", definition: "A person you like and know well", origin: "Old English 'freond', from Germanic root meaning 'to love'", sentence: "My best friend and I love to play together.", prefixSuffix: "Base word with no prefix or suffix", pronunciation: "FREND" },
      { word: "happy", syllables: "hap-py (2 syllables)", definition: "Feeling or showing pleasure and contentment", origin: "Middle English 'happy', from 'hap' meaning luck or fortune", sentence: "The children were happy to see the circus.", prefixSuffix: "Base word 'hap' + suffix '-py'", pronunciation: "HAP-ee" }
    ],
    medium: [
      { word: "necessary", syllables: "nec-es-sar-y (4 syllables)", definition: "Required to be done or achieved; essential", origin: "Latin 'necessarius', from 'necesse' meaning unavoidable", sentence: "It is necessary to study hard for the test.", prefixSuffix: "Base 'necess' + suffix '-ary'", pronunciation: "NES-uh-ser-ee" }
    ],
    tricky: [
      { word: "chrysanthemum", syllables: "chry-san-the-mum (4 syllables)", definition: "A type of flower with many thin petals", origin: "Greek 'chrysos' (gold) + 'anthemon' (flower)", sentence: "The chrysanthemum bloomed beautifully in autumn.", prefixSuffix: "Greek compound: chryso- (gold) + -anthemum (flower)", pronunciation: "kri-SAN-thuh-mum" }
    ]
  };
  var SpellingBeeGame = () => {
    const [gameState, setGameState] = (0, import_react.useState)("setup");
    const [gameConfig, setGameConfig] = (0, import_react.useState)(null);
    const [gameResults, setGameResults] = (0, import_react.useState)(null);
    const [customWords, setCustomWords] = (0, import_react.useState)({ easy: [], medium: [], tricky: [] });
    const handleAddCustomWords = (newWords) => {
      const easy = newWords.filter((w) => w.word.length <= 5);
      const medium = newWords.filter((w) => w.word.length > 5 && w.word.length <= 8);
      const tricky = newWords.filter((w) => w.word.length > 8);
      setCustomWords({ easy, medium, tricky });
    };
    const handleStartGame = (config) => {
      const finalWordDatabase = {
        easy: [...wordDatabase.easy, ...customWords.easy],
        medium: [...wordDatabase.medium, ...customWords.medium],
        tricky: [...wordDatabase.tricky, ...customWords.tricky]
      };
      setGameConfig({ ...config, wordDatabase: finalWordDatabase });
      setGameState("playing");
    };
    const handleEndGame = (results) => {
      setGameResults(results);
      setGameState("results");
    };
    const handleRestart = () => {
      setGameState("setup");
      setGameConfig(null);
      setGameResults(null);
    };
    if (gameState === "setup") {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupScreen, { onStartGame: handleStartGame, onAddCustomWords: handleAddCustomWords });
    }
    if (gameState === "playing") {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameScreen, { config: gameConfig, onEndGame: handleEndGame });
    }
    if (gameState === "results") {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultsScreen, { results: gameResults, onRestart: handleRestart });
    }
    return null;
  };
  var SetupScreen = ({ onStartGame, onAddCustomWords }) => {
    const [teams, setTeams] = (0, import_react.useState)([{
      name: "Team Alpha",
      lives: 5
    }, {
      name: "Team Beta",
      lives: 5
    }]);
    const [gameMode, setGameMode] = (0, import_react.useState)("team");
    const [timerDuration, setTimerDuration] = (0, import_react.useState)(30);
    const [customWordListText, setCustomWordListText] = (0, import_react.useState)("");
    const parseWordList = (content) => {
      try {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          onAddCustomWords(parsed);
          return;
        }
      } catch (e) {
      }
      const lines = content.trim().split("\n");
      if (lines.length < 2) return;
      const headerLine = lines[0];
      const delimiter = headerLine.includes(",") ? "," : "	";
      const headers = headerLine.split(delimiter).map((h) => h.trim());
      const words = lines.slice(1).map((line) => {
        const values = line.split(delimiter);
        const wordObj = {};
        headers.forEach((header, index) => {
          wordObj[header] = values[index] ? values[index].trim() : "";
        });
        return wordObj;
      });
      onAddCustomWords(words);
    };
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target.result;
          setCustomWordListText(content);
          parseWordList(content);
        };
        reader.readAsText(file);
      }
    };
    (0, import_react.useEffect)(() => {
      if (customWordListText) {
        parseWordList(customWordListText);
      }
    }, [customWordListText]);
    const handleStart = () => {
      const config = {
        teams,
        gameMode,
        timerDuration
      };
      onStartGame(config);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "text-6xl font-bold mb-4 text-yellow-300", children: "🏆 SPELLING BEE CHAMPIONSHIP" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-2xl", children: "Get ready to spell your way to victory!" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-white/10 p-6 rounded-lg mb-8", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "text-2xl font-bold mb-4", children: "Add Custom Word List" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "file-upload", className: "block text-lg font-medium mb-2", children: "Upload File" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-sm text-gray-300 mb-2", children: "Upload a JSON or TSV file." }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "input",
              {
                id: "file-upload",
                type: "file",
                accept: ".json,.tsv,.txt,.csv",
                onChange: handleFileChange,
                className: "block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-300 file:text-black hover:file:bg-yellow-400"
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "paste-area", className: "block text-lg font-medium mb-2", children: "Or Paste Spreadsheet Data" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-sm text-gray-300 mb-2", children: "Paste data from Excel or Google Sheets (tab-separated)." }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "textarea",
              {
                id: "paste-area",
                rows: "4",
                value: customWordListText,
                onChange: (e) => setCustomWordListText(e.target.value),
                className: "w-full p-2 rounded-md bg-white/20 text-white",
                placeholder: "Paste your tab-separated values here..."
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 text-sm text-gray-300", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Format:" }),
          " The first row should be headers: `word`, `syllables`, `definition`, `origin`, `sentence`, `prefixSuffix`, `pronunciation`. The difficulty will be determined by word length."
        ] }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mb-8", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "text-3xl font-bold mb-4 text-center", children: "Select Timer Duration" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex justify-center gap-4", children: [15, 30, 45, 60].map((time) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "button",
          {
            onClick: () => setTimerDuration(time),
            className: `px-6 py-3 rounded-lg text-xl font-bold ${timerDuration === time ? "bg-yellow-300 text-black" : "bg-blue-500 hover:bg-blue-400"}`,
            children: [
              time,
              "s"
            ]
          },
          time
        )) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: handleStart, className: "w-full bg-yellow-300 hover:bg-yellow-400 text-black px-6 py-4 rounded-xl text-2xl font-bold mt-8", children: "START GAME" })
    ] }) });
  };
  var GameScreen = ({ config, onEndGame }) => {
    const [teams, setTeams] = (0, import_react.useState)(config.teams);
    const [currentTeamIndex, setCurrentTeamIndex] = (0, import_react.useState)(0);
    const [currentWord, setCurrentWord] = (0, import_react.useState)(null);
    const [timeLeft, setTimeLeft] = (0, import_react.useState)(config.timerDuration);
    (0, import_react.useEffect)(() => {
      if (!currentWord || timeLeft <= 0) return;
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1e3);
      return () => clearInterval(timer);
    }, [currentWord, timeLeft]);
    const selectRandomWord = (difficulty) => {
      const words = wordDatabase[difficulty] || wordDatabase.easy;
      const word = words[Math.floor(Math.random() * words.length)];
      setTimeLeft(config.timerDuration);
      return word;
    };
    const skipWord = () => {
      const newWord = selectRandomWord("easy");
      setCurrentWord(newWord);
      nextTurn();
    };
    const nextTurn = () => {
      setCurrentTeamIndex((currentTeamIndex + 1) % teams.length);
    };
    (0, import_react.useEffect)(() => {
      setCurrentWord(selectRandomWord("easy"));
    }, []);
    (0, import_react.useEffect)(() => {
      if (!teams || teams.length === 0) return;
      const activeTeams = teams.filter((t) => t.lives > 0);
      if (activeTeams.length <= 1) {
        onEndGame({ winner: activeTeams[0], teams });
      }
    }, [teams, onEndGame]);
    const [inputValue, setInputValue] = (0, import_react.useState)("");
    const [feedback, setFeedback] = (0, import_react.useState)({ message: "", type: "" });
    const handleSpellingSubmit = () => {
      if (!currentWord) return;
      const isCorrect = inputValue.trim().toLowerCase() === currentWord.word.toLowerCase();
      if (isCorrect) {
        setFeedback({ message: "Correct!", type: "success" });
      } else {
        setFeedback({ message: "Incorrect. Try again next time!", type: "error" });
        const updatedTeams = teams.map((team, index) => {
          if (index === currentTeamIndex) {
            return { ...team, lives: team.lives - 1 };
          }
          return team;
        });
        setTeams(updatedTeams);
      }
      setTimeout(() => {
        setFeedback({ message: "", type: "" });
        setInputValue("");
        const newWord = selectRandomWord("easy");
        setCurrentWord(newWord);
        nextTurn();
      }, 2e3);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "min-h-screen bg-gradient-to-br from-indigo-600 to-purple-800 p-8 text-white flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-8 left-8 flex gap-8", children: teams.map((team, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-2xl font-bold", children: team.name }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-4xl font-bold text-yellow-300", children: "❤️".repeat(team.lives) })
      ] }, index)) }),
      feedback.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute top-8 text-2xl font-bold px-6 py-3 rounded-lg ${feedback.type === "success" ? "bg-green-500" : "bg-red-500"}`, children: feedback.message }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "absolute top-8 right-8 text-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `text-6xl font-bold ${timeLeft <= 10 ? "text-red-500" : "text-yellow-300"}`, children: timeLeft }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-lg", children: "seconds left" })
      ] }),
      currentWord && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "w-full max-w-4xl text-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { className: "text-4xl font-bold mb-4", children: [
          "Word for Team: ",
          teams[currentTeamIndex]?.name || "Team"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-white/10 p-6 rounded-lg mb-8", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-2xl mb-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { className: "text-yellow-300", children: "Definition:" }),
            " ",
            currentWord.definition
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-xl mb-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { className: "text-yellow-300", children: "Origin:" }),
            " ",
            currentWord.origin
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-xl", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "In a sentence:" }),
            ' "',
            currentWord.sentence,
            '"'
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex gap-4 justify-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              type: "text",
              value: inputValue,
              onChange: (e) => setInputValue(e.target.value),
              className: "text-2xl p-4 rounded-lg bg-white/20 border-2 border-transparent focus:border-yellow-300 focus:outline-none w-1/2",
              placeholder: "Type the word here..."
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: handleSpellingSubmit, className: "bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-2xl font-bold", children: "Submit" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: skipWord, className: "absolute bottom-8 right-8 bg-orange-500 hover:bg-orange-600 p-4 rounded-lg text-xl", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.SkipForward, { size: 24 }) })
    ] });
  };
  var ResultsScreen = ({ results, onRestart }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 p-8 text-white text-center flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "text-6xl font-bold mb-4 text-yellow-300", children: "🏆 Game Over! 🏆" }),
      results && results.winner ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { className: "text-4xl mb-8", children: [
        "Winner: ",
        results.winner.name
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "text-4xl mb-8", children: "It's a draw!" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-white/10 p-8 rounded-lg w-full max-w-md", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-3xl font-bold mb-4", children: "Final Scores" }),
        results && results.teams.map((team, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex justify-between items-center text-2xl mb-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: team.name }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "font-bold text-yellow-300", children: [
            team.lives,
            " lives remaining"
          ] })
        ] }, index))
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: onRestart, className: "mt-12 bg-blue-500 hover:bg-blue-600 px-10 py-5 rounded-xl text-2xl font-bold", children: "Play Again" })
    ] });
  };
  var spelling_bee_game_default = SpellingBeeGame;
})();