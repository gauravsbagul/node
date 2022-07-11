import { config, createLogger, format, transports } from 'winston'
const { combine, timestamp, printf } = format

enum levels {
  error,
  warn,
  info,
  http,
  verbose,
  debug,
  silly
}
/**
 * @description: Winston Logger
 * @param {logger} logger - logger object
 */
const myFormat = printf(log => JSON.stringify(log))

export const logger = createLogger({
  levels: config.syslog.levels,
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.Console({ level: 'error' }),
    new transports.File({ filename: 'combined.log', level: 'info' })
  ],
  exceptionHandlers: [new transports.File({ filename: 'exceptions.log' })],
  rejectionHandlers: [new transports.File({ filename: 'rejections.log' })]
})
