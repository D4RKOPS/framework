const enabled = process.env.LOG_LEVEL !== 'silent';

const logger = {
  info: (...args) => enabled && console.log('[INFO]', ...args),
  warn: (...args) => enabled && console.warn('[WARN]', ...args),
  error: (...args) => console.error('[ERROR]', ...args),
};

module.exports = logger;
