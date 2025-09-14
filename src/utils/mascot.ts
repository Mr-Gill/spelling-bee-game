// Utility functions for selecting appropriate mascot images based on game context

export interface MascotContext {
  isCorrect?: boolean;
  isWrong?: boolean;
  isWinning?: boolean;
  isCelebrating?: boolean;
  isHelping?: boolean;
  isTyping?: boolean;
  isUnderTimePressure?: boolean;
  isDefault?: boolean;
}

export function getMascotImage(context: MascotContext): string {
  const baseUrl = '/img/';
  
  // Priority order for selecting appropriate mascot
  if (context.isWinning) return `${baseUrl}WinningBee.png`;
  if (context.isCelebrating) return `${baseUrl}CelebratoryBee.png`;
  if (context.isWrong) return `${baseUrl}WrongAnswerBee.png`;
  if (context.isHelping) return `${baseUrl}HelpBee.png`;
  if (context.isTyping) return `${baseUrl}TypingBee.png`;
  if (context.isUnderTimePressure) return `${baseUrl}TimePressureBee.png`;
  if (context.isCorrect) return `${baseUrl}CelebratoryBee.png`;
  
  // Default mascot
  return `${baseUrl}DefaultBee.png`;
}

export function getContextualMascot(
  gameState: {
    isCorrectAnswer?: boolean;
    isWrongAnswer?: boolean;
    timeRemaining?: number;
    maxTime?: number;
    isShowingHelp?: boolean;
    isTyping?: boolean;
    recentScore?: number;
  }
): string {
  const context: MascotContext = {};
  
  // Determine context based on game state
  if (gameState.isCorrectAnswer) {
    context.isCelebrating = true;
  } else if (gameState.isWrongAnswer) {
    context.isWrong = true;
  } else if (gameState.isShowingHelp) {
    context.isHelping = true;
  } else if (gameState.isTyping) {
    context.isTyping = true;
  } else if (gameState.timeRemaining && gameState.maxTime && 
             gameState.timeRemaining < gameState.maxTime * 0.2) {
    context.isUnderTimePressure = true;
  } else {
    context.isDefault = true;
  }
  
  return getMascotImage(context);
}