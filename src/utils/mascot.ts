// Utility functions for selecting appropriate mascot images based on game context
import { IMAGE_ASSETS } from '../assets';

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
  // Priority order for selecting appropriate mascot
  if (context.isWinning) return IMAGE_ASSETS.bee.winning;
  if (context.isCelebrating) return IMAGE_ASSETS.bee.celebratory;
  if (context.isWrong) return IMAGE_ASSETS.bee.wrongAnswer;
  if (context.isHelping) return IMAGE_ASSETS.bee.help;
  if (context.isTyping) return IMAGE_ASSETS.bee.typing;
  if (context.isUnderTimePressure) return IMAGE_ASSETS.bee.timePressure;
  if (context.isCorrect) return IMAGE_ASSETS.bee.celebratory;
  
  // Default mascot
  return IMAGE_ASSETS.bee.default;
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