type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const levels: Record<LogLevel, number> = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const env = (typeof process !== 'undefined' && (process as any).env) || {};

const envLevel = (env.LOG_LEVEL || '').toLowerCase() as LogLevel;

const defaultLevel: LogLevel = env.NODE_ENV === 'production' ? 'warn' : 'info';

const currentLevel: LogLevel = levels[envLevel] !== undefined ? envLevel : defaultLevel;

function shouldLog(level: LogLevel): boolean {
  return levels[level] <= levels[currentLevel];
}

function log(level: LogLevel, ...args: any[]): void {
  if (!shouldLog(level)) return;
  const method =
    level === 'debug'
      ? console.debug
      : level === 'info'
      ? console.log
      : level === 'warn'
      ? console.warn
      : console.error;
  method(...args);
}

const logger = {
  debug: (...args: any[]) => log('debug', ...args),
  info: (...args: any[]) => log('info', ...args),
  warn: (...args: any[]) => log('warn', ...args),
  error: (...args: any[]) => log('error', ...args),
};

export default logger;
