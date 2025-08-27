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
    const [gameState, setGameState] = (0, import_react.useState)("setup");
    const [gameConfig, setGameConfig] = (0, import_react.useState)(null);
    const [gameResults, setGameResults] = (0, import_react.useState)(null);
    const handleStartGame = (config) => {
      setGameConfig(config);
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
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupScreen, { onStartGame: handleStartGame });
    }
    if (gameState === "playing") {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameScreen, { config: gameConfig, onEndGame: handleEndGame });
    }
    if (gameState === "results") {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultsScreen, { results: gameResults, onRestart: handleRestart });
    }
    return null;
  };
  var SetupScreen = ({ onStartGame }) => {
    const [teams, setTeams] = (0, import_react.useState)([]);
    const [gameMode, setGameMode] = (0, import_react.useState)("team");
    const handleStart = () => {
      const config = {
        teams,
        gameMode
        /* ... other configs */
      };
      onStartGame(config);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "text-6xl font-bold mb-4 text-yellow-300", children: "\u{1F3C6} SPELLING BEE CHAMPIONSHIP" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-2xl", children: "Get ready to spell your way to victory!" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: handleStart, className: "w-full bg-yellow-300 hover:bg-yellow-400 text-black px-6 py-4 rounded-xl text-2xl font-bold", children: "START GAME" })
    ] }) });
  };
  var GameScreen = ({ config, onEndGame }) => {
    const [teams, setTeams] = (0, import_react.useState)(config.teams);
    const [currentTeamIndex, setCurrentTeamIndex] = (0, import_react.useState)(0);
    const [currentWord, setCurrentWord] = (0, import_react.useState)(null);
    const selectRandomWord = (difficulty) => {
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
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-screen bg-gradient-to-br from-indigo-600 to-purple-800 p-8 text-white", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { onClick: skipWord, className: "bg-orange-500 hover:bg-orange-600 p-2 rounded-lg", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.SkipForward, {}),
      " Skip Word"
    ] }) });
  };
  var ResultsScreen = ({ results, onRestart }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 p-8 text-white text-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "text-5xl font-bold mb-4", children: "Game Over!" }),
      results && results.winner && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { className: "text-3xl text-yellow-300", children: [
        "Winner: ",
        results.winner.name
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: onRestart, className: "mt-8 bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-xl text-xl font-semibold", children: "Play Again" })
    ] });
  };
  var spelling_bee_game_default = SpellingBeeGame;
})();
