const winston = require('winston');
require('winston-daily-rotate-file');
const { combine, errors, printf, timestamp } = winston.format;
const { Console, File, DailyRotateFile } = winston.transports;
const { Logtail } = require('@logtail/node');
const { LogtailTransport } = require('@logtail/winston');
const chalk = require('chalk');

class Logger {
  constructor() {
    this.levels = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3,
      http: 4
    };

    const transports = this.createTransports();
    const httpTransports = this.createHttpTransports();

    this.logger = this.createMainLogger(transports);
    this.httpLogger = this.createHttpLogger(httpTransports);

    global.logger = this;
  }

  createTransports() {
    const transports = [
      new Console({
        format: this.createConsoleFormat()
      }),
      new File({
        filename: 'logs/error.log',
        level: 'error',
        zippedArchive: true,
        format: this.createFileFormat()
      }),
      new File({
        filename: 'logs/combined.log',
        zippedArchive: true,
        format: this.createFileFormat()
      }),
      new DailyRotateFile({
        filename: 'logs/%DATE%-error.log',
        datePattern: 'YYYY-MM-DD',
        maxFiles: '14d',
        level: 'error',
        format: this.createFileFormat()
      }),
      new DailyRotateFile({
        filename: 'logs/%DATE%-combined.log',
        datePattern: 'YYYY-MM-DD',
        maxFiles: '14d',
        format: this.createFileFormat()
      })
    ];

    this.addLogtailTransport(transports);
    return transports;
  }

  createHttpTransports() {
    const httpTransports = [
      new Console({
        format: this.createHttpConsoleFormat()
      }),
      new File({
        filename: 'logs/http.log',
        zippedArchive: true,
        format: this.createHttpFileFormat()
      }),
      new DailyRotateFile({
        filename: 'logs/%DATE%-http.log',
        datePattern: 'YYYY-MM-DD',
        maxFiles: '14d',
        format: this.createHttpFileFormat()
      })
    ];

    this.addLogtailTransport(httpTransports);
    return httpTransports;
  }

  addLogtailTransport(transports) {
    if (process.env.NODE_ENV === 'production') {
      if (!process.env.LOGTAIL_SOURCE_TOKEN) {
        console.warn(chalk.yellow('LOGTAIL_SOURCE_TOKEN is not set in production environment.'));
      } else {
        const logtail = new Logtail(process.env.LOGTAIL_SOURCE_TOKEN);
        const transport = new LogtailTransport(logtail);
        transports.push(transport);
      }
    }
  }

  createConsoleFormat() {
    return combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
      printf(({ level, message, timestamp, stack }) => {
        const coloredTimestamp = chalk.gray(timestamp);
        const coloredLevel = this.colorLevel(level);
        const coloredMessage = stack ? chalk.red(stack) : this.colorMessage(level, message);
        return `${coloredTimestamp} ${coloredLevel}: ${coloredMessage}`;
      })
    );
  }

  createFileFormat() {
    return combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
      printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} ${level.toUpperCase()}: ${stack || message}`;
      })
    );
  }

  createHttpConsoleFormat() {
    return combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
      printf(({ message, timestamp }) => {
        return chalk.cyan(`${chalk.gray(timestamp)} HTTP: ${message}`);
      })
    );
  }

  createHttpFileFormat() {
    return combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
      printf(({ message, timestamp }) => {
        return `${timestamp} HTTP: ${message}`;
      })
    );
  }

  createMainLogger(transports) {
    return winston.createLogger({
      levels: this.levels,
      level: 'debug',
      format: combine(errors({ stack: true })),
      transports: transports
    });
  }

  createHttpLogger(httpTransports) {
    return winston.createLogger({
      levels: { http: 0 },
      level: 'http',
      transports: httpTransports
    });
  }

  colorLevel(level) {
    switch (level) {
      case 'error': return chalk.red(level.toUpperCase());
      case 'warn': return chalk.yellow(level.toUpperCase());
      case 'info': return chalk.green(level.toUpperCase());
      case 'debug': return chalk.blue(level.toUpperCase());
      case 'http': return chalk.cyan(level.toUpperCase());
      default: return level.toUpperCase();
    }
  }

  colorMessage(level, message) {
    switch (level) {
      case 'error': return chalk.red(message);
      case 'warn': return chalk.yellow(message);
      case 'info': return chalk.green(message);
      case 'debug': return chalk.blue(message);
      case 'http': return chalk.cyan(message);
      default: return message;
    }
  }

  log(level, ...messages) {
    const message = messages.join(' ');
    this.logger.log(level, message);
  }

  error(...messages) { this.log('error', ...messages); }
  warn(...messages) { this.log('warn', ...messages); }
  info(...messages) { this.log('info', ...messages); }
  debug(...messages) { this.log('debug', ...messages); }
  http(...messages) { this.httpLogger.log('http', messages.join(' ')); }
}

module.exports = Logger;