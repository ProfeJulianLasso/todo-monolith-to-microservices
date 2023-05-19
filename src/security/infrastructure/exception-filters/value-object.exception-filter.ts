import { status } from '@grpc/grpc-js';
import { Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ValueObjectException } from '@sofkau/ddd';
import { Observable } from 'rxjs';

@Catch(ValueObjectException)
export class ValueObjectExceptionFilter implements ExceptionFilter {
  catch(exception: ValueObjectException): Observable<any> {
    // console.log('-------------------------');
    // console.log('ValueObjectExceptionFilter');
    // console.log(exception.message);
    // console.log(exception.errors);
    // console.log('-------------------------');

    return new Observable<any>((subscriber) => {
      subscriber.error(
        new RpcException({
          code: status.INVALID_ARGUMENT,
          message: JSON.stringify({
            code: status.INVALID_ARGUMENT,
            message: exception.message,
            errors: exception.errors,
          }),
          metadata: exception.errors,
        }),
      );
    });
  }
}
