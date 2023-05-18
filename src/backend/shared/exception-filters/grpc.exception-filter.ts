import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const error = exception.getError();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // console.log('--------------------------------');
    // console.log(error);
    // console.log(Object.keys(error));
    // console.log('--------------------------------');

    // response.status(error.code).json(error);
    response.status(500).json(error);
  }
}
