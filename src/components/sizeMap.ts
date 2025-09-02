export const sizeMap = {
  xs: 16,
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64
} as const;

export type SizeToken = keyof typeof sizeMap;
