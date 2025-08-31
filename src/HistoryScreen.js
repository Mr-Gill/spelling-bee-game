function HistoryScreen() {
  const entries = JSON.parse(globalThis.localStorage?.getItem('sessionHistory') || '[]');

  function clearHistory() {
    globalThis.localStorage?.removeItem('sessionHistory');
  }

  return { entries, clearHistory };
}

module.exports = HistoryScreen;
