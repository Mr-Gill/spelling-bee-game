const ResultsScreen = ({ results }) => {
  const totalScore = results.participants.reduce((sum, p) => sum + (p.points || 0), 0);
  const history = JSON.parse(globalThis.localStorage?.getItem('sessionHistory') || '[]');
  history.push({
    date: new Date().toISOString(),
    score: totalScore,
    duration: results.duration
  });
  globalThis.localStorage?.setItem('sessionHistory', JSON.stringify(history));
  return {};
};

module.exports = ResultsScreen;
