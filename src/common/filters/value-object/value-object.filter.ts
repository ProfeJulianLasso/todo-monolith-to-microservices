import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ValueObjectException } from '@sofkau/ddd';

@Catch(ValueObjectException)
export class ValueObjectFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: ValueObjectException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const statusCode = 400;
    const responseBody = {
      statusCode,
      message: exception.message,
      details: exception.errors,
    };
    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
