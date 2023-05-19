import { Body, Controller, Post } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, catchError, throwError } from 'rxjs';
import { SecurityService } from '../services';
import { SignInCommand, SignedInResponse } from '../types';

@Controller('security')
export class LoginController {
  constructor(private readonly securityService: SecurityService) {}

  @Post('login')
  login(@Body() user: SignInCommand): Observable<SignedInResponse> {
    return this.securityService.Login(user).pipe(
      catchError((error) => {
        return throwError(() => new RpcException(error));
      }),
    );
  }
}
