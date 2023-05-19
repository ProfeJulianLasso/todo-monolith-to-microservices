import { Body, Controller, Post } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, catchError, throwError } from 'rxjs';
import { SecurityService } from '../services';
import { CreateUserCommand, CreatedOrUpdatedUserResponse } from '../types';

@Controller('security')
export class RegisterController {
  constructor(private readonly securityService: SecurityService) {}

  @Post('register')
  register(
    @Body() user: CreateUserCommand,
  ): Observable<CreatedOrUpdatedUserResponse> {
    return this.securityService.Register(user).pipe(
      catchError((error) => {
        return throwError(() => new RpcException(error));
      }),
    );
  }
}
