import { ConsoleLogger, Injectable } from '@nestjs/common';

import * as path from 'node:path';
import * as fsPromises from 'node:fs/promises';

import { ErrorLogLevel } from './enums/error-levels.enum';
import { ErrorLog } from './enums/error-level-names.enum';

@Injectable()
export class LoggingService extends ConsoleLogger {
  private readonly logLevel: ErrorLogLevel = +process.env.LOG_LEVEL;
  private readonly maxBytes: number = +process.env.FILE_MAX_SIZE;
  private readonly maxFilesCount: number = +process.env.FILE_MAX_NUMBER;

  log(message: any, context?: string): void {
    if (this.logLevel >= ErrorLogLevel.LOG) {
      this.logToFile(ErrorLog.LOG, message, context);
      super.log(message, context);
    }
  }

  error(message: any, stackOrContext?: string): void {
    if (this.logLevel >= ErrorLogLevel.ERROR) {
      this.logToFile(ErrorLog.ERROR, message, stackOrContext);
      super.error(message, stackOrContext);
    }
  }

  warn(message: any, context?: string): void {
    if (this.logLevel >= ErrorLogLevel.WARN) {
      this.logToFile(ErrorLog.WARN, message, context);
      super.warn(message, context);
    }
  }

  debug(message: any, context?: string): void {
    if (this.logLevel >= ErrorLogLevel.DEBUG) {
      this.logToFile(ErrorLog.DEBUG, message, context);
      super.debug(message, context);
    }
  }

  verbose(message: any, context?: string): void {
    if (this.logLevel >= ErrorLogLevel.VERBOSE) {
      this.logToFile(ErrorLog.VERBOSE, message, context);
      super.verbose(message, context);
    }
  }

  fatal(message: any, context?: string): void {
    if (this.logLevel >= ErrorLogLevel.FATAL) {
      super.log(message, context);
    }
  }

  private async logToFile(
    logType: ErrorLog,
    message: any,
    context?: string,
  ): Promise<void> {
    const formattedEntry = `${Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date())}\t${logType}\t[${context}]\t${message}\n`;

    try {
      const dstDirPath =
        logType === ErrorLog.ERROR
          ? path.join(__dirname, '..', '..', 'logs', 'errors')
          : path.join(__dirname, '..', '..', 'logs');

      const logFilename = logType === ErrorLog.ERROR ? 'errorFile' : 'logFile';
      const dstFilePath = path.join(dstDirPath, `${logFilename}.log`);

      await fsPromises.mkdir(dstDirPath, { recursive: true });
      await fsPromises.appendFile(dstFilePath, formattedEntry);

      const fileStat = await fsPromises.stat(dstFilePath);

      if (fileStat.size > this.maxBytes) {
        const renamedFilePath = path.join(
          dstDirPath,
          `${logFilename}_${Date.now()}.log`,
        );

        await fsPromises.copyFile(dstFilePath, renamedFilePath);
        await fsPromises.writeFile(dstFilePath, '');
      }

      const readdir = await fsPromises.readdir(dstDirPath);

      const fileStats = await Promise.all(
        readdir.map(async (fileName) => {
          const filePath = path.join(dstDirPath, fileName);
          const fileStat = await fsPromises.stat(filePath);
          return fileStat.isFile()
            ? { filePath, mtime: fileStat.mtime.getTime() }
            : null;
        }),
      );

      const listOfFiles = fileStats
        .filter(Boolean)
        .sort((a, b) => a.mtime - b.mtime);

      if (listOfFiles.length > this.maxFilesCount) {
        const indexToRemove = listOfFiles.length - this.maxFilesCount;
        const fileNamestoRemove = listOfFiles.slice(0, indexToRemove);

        await Promise.all(
          fileNamestoRemove.map(({ filePath }) => fsPromises.unlink(filePath)),
        );

        await fsPromises.appendFile(dstFilePath, '');
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        return null;
      } else {
        this.error(error.message);
      }
    }
  }
}
