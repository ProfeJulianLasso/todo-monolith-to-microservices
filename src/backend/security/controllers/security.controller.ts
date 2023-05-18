import { Body, Controller, Post } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, catchError, throwError } from 'rxjs';
import { SecurityService } from '../services';
import {
  CreateUserCommand,
  CreatedOrUpdatedUserResponse,
  SignInCommand,
  SignedInResponse,
} from '../types';

@Controller('security')
export class SecurityController {
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

  @Post('login')
  login(@Body() user: SignInCommand): Observable<SignedInResponse> {
    return this.securityService.Login(user);
  }
}
