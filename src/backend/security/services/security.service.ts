import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ISecurityService } from '../interfaces';
import {
  CreateUserCommand,
  CreatedOrUpdatedUserResponse,
  SignInCommand,
  SignedInResponse,
} from '../types';

@Injectable()
export class SecurityService implements OnModuleInit {
  private securityService: ISecurityService;

  constructor(
    @Inject('SECURITY') private readonly clientSecurity: ClientGrpc,
  ) {}

  onModuleInit() {
    this.securityService =
      this.clientSecurity.getService<ISecurityService>('SecurityService');
  }

  Register(data: CreateUserCommand): Observable<CreatedOrUpdatedUserResponse> {
    return this.securityService.Register(data);
  }

  Login(data: SignInCommand): Observable<SignedInResponse> {
    return this.securityService.Login(data);
  }
}
