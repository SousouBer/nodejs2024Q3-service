import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { LoggingService } from 'src/logging/logging.service';

type ResponseData = {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | object;
};

@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new LoggingService();

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const responseData: ResponseData = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: 'Internal Server Error',
    };

    if (exception instanceof HttpException) {
      responseData.statusCode = exception.getStatus();
      responseData.response = exception.getResponse();
    }

    response.status(responseData.statusCode).json(responseData);

    const errorMessage = this.generateErrorMessage(request, responseData);

    if (responseData.statusCode < 500) {
      this.logger.warn(errorMessage, HttpExceptionFilter.name);
    } else {
      this.logger.error(errorMessage, HttpExceptionFilter.name);
    }
  }

  private generateErrorMessage(
    { url, method }: Request,
    { statusCode, response }: ResponseData,
  ) {
    return `{url: ${url}, method: ${method}, status: ${statusCode}} response: ${JSON.stringify(
      response,
    )}`;
  }
}
