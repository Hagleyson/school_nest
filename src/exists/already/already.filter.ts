import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AlreadyFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = exception.status ?? 500;

    let body = {
      statusCode: status,
      error: exception.name,
      message: exception.message,
    };

    const existConflict = exception.message.indexOf(
      'Unique constraint failed on the constraint',
    );

    if (existConflict > -1) {
      status = HttpStatus.CONFLICT;
      const fieldError = exception.message.split(':');
      body = {
        statusCode: status,
        error: exception.name,
        message: `Field ${fieldError[fieldError.length - 1]} already existing `,
      };
    }
    response.status(status).json(body);
  }
}
