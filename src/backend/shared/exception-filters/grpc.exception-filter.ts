import { status } from '@grpc/grpc-js';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  static HttpStatusCode: Record<number, number> = {
    // standard gRPC error mapping
    // https://cloud.google.com/apis/design/errors#handling_errors
    [status.INVALID_ARGUMENT]: HttpStatus.BAD_REQUEST,
    [status.UNAUTHENTICATED]: HttpStatus.UNAUTHORIZED,
    [status.PERMISSION_DENIED]: HttpStatus.FORBIDDEN,
    [status.NOT_FOUND]: HttpStatus.NOT_FOUND,
    [status.ALREADY_EXISTS]: HttpStatus.CONFLICT,
    [status.ABORTED]: HttpStatus.GONE,
    [status.RESOURCE_EXHAUSTED]: HttpStatus.TOO_MANY_REQUESTS,
    [status.CANCELLED]: 499,
    [status.INTERNAL]: HttpStatus.INTERNAL_SERVER_ERROR,
    [status.UNIMPLEMENTED]: HttpStatus.NOT_IMPLEMENTED,
    [status.UNKNOWN]: HttpStatus.BAD_GATEWAY,
    [status.UNAVAILABLE]: HttpStatus.SERVICE_UNAVAILABLE,
    [status.DEADLINE_EXCEEDED]: HttpStatus.GATEWAY_TIMEOUT,

    // additional built-in http exceptions
    // https://docs.nestjs.com/exception-filters#built-in-http-exceptions
    [status.UNAVAILABLE]: HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
    [status.OUT_OF_RANGE]: HttpStatus.PAYLOAD_TOO_LARGE,
    [status.CANCELLED]: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    [status.CANCELLED]: HttpStatus.UNPROCESSABLE_ENTITY,
    [status.UNKNOWN]: HttpStatus.I_AM_A_TEAPOT,
    [status.CANCELLED]: HttpStatus.METHOD_NOT_ALLOWED,
    [status.FAILED_PRECONDITION]: HttpStatus.PRECONDITION_FAILED,
  };

  catch(exception: RpcException, host: ArgumentsHost): void {
    const error = exception.getError();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // console.log('<==========================>');
    // console.log('Backend: RpcExceptionFilter');
    // console.log('Error: ', error);
    // console.log('<==========================>');

    let statusCode =
      RpcExceptionFilter.HttpStatusCode[(error as any).code] ?? status.UNKNOWN;
    let message = (error as any).details;
    let code = (error as any).code;
    let details = { message: (error as any).message, other_details: error };

    if ((error as any).code === status.UNKNOWN) {
      const data = JSON.parse(message);
      statusCode = RpcExceptionFilter.HttpStatusCode[data.code];
      code = data.code;
      message = data.message;
      details = data.errors;
    }

    response.status(statusCode).json({ code, message, details });
  }
}
