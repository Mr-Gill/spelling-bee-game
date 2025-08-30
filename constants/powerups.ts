export interface PowerUp {
  id: string;
  name: string;
  description: string;
  cost: number;
}

export const powerUps: PowerUp[] = [
  {
    id: 'extra-hint',
    name: 'Extra Hint',
    description: 'Reveal a random letter in the current word',
    cost: 5,
  },
  {
    id: 'freeze-timer',
    name: 'Freeze Timer',
    description: 'Pause the timer for five seconds',
    cost: 8,
  },
];
