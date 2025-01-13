import { createLogger, format, transports } from 'winston';
import 'dotenv/config';

const { combine, timestamp, json, printf } = format;

const isDevelopment = process.env.NODE_ENV === 'development';

// Custom log format
const logFormat = printf(({ level, message, timestamp, stack, ...metadata }) => {
  const baseMessage = `${timestamp} [${level.toUpperCase()}]: ${message}`;
  if (stack) {
    return `${baseMessage}\nStack: ${stack}\n${JSON.stringify(metadata)}`;
  }
  return `${baseMessage} ${JSON.stringify(metadata)}`;
});

// Logger instance
const logger = createLogger({
  level: isDevelopment ? 'debug' : 'info',
  format: combine(timestamp(), json()),
  transports: [
    new transports.File({
      filename: 'logs/info.log',
      level: 'info',
      format: combine(timestamp(), logFormat),
    }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: combine(timestamp(), logFormat),
    }),
  ],
});

// Add console logs in development mode
if (isDevelopment) {
  logger.add(
    new transports.Console({
      format: combine(format.colorize(), logFormat),
    }),
  );
}

export default logger;
