import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

import { LoggingService } from './logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly loggingService = new LoggingService();

  use(request: Request, response: Response, next: () => void) {
    const { method, baseUrl, body, query } = request;

    response.on('finish', () => {
      const { statusCode } = response;
      const message = `{url: ${baseUrl}, method: ${method}, status: ${statusCode}} body: ${JSON.stringify(
        body,
      )} query: ${JSON.stringify(query)}`;

      if (statusCode < 300) {
        this.loggingService.log(message, 'HTTP');
      }
    });

    next();
  }
}
