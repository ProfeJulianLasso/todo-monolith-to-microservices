import { status } from '@grpc/grpc-js';
import { Controller, UseFilters } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { Observable, from } from 'rxjs';
import { UseCaseDelegate } from '../../application';
import {
  CreateUserCommand,
  CreatedOrUpdatedUserResponse,
  SignInCommand,
  SignedInResponse,
} from '../../domain/types';
import { SignedInPublisher, SignedUpPublisher } from '../events';
import { ValueObjectExceptionFilter } from '../exception-filters/value-object.exception-filter';
import { SessionRepository, UserRepository } from '../persistence';

@Controller()
export class SecurityController {
  private readonly delegate: UseCaseDelegate;
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly signedUpPublisher: SignedUpPublisher,
    private readonly signedInPublisher: SignedInPublisher,
  ) {
    this.delegate = new UseCaseDelegate(
      this.userRepository,
      this.sessionRepository,
    );
  }

  @UseFilters(ValueObjectExceptionFilter)
  @GrpcMethod('SecurityService', 'Register')
  register(data: CreateUserCommand): Observable<CreatedOrUpdatedUserResponse> {
    const result = this.delegate
      .toSignUpUser(data)
      .execute<CreatedOrUpdatedUserResponse>(this.signedUpPublisher);
    return result instanceof Observable
      ? result
      : new Observable<CreatedOrUpdatedUserResponse>((subscriber) => {
          subscriber.error(
            new RpcException({
              code: status.INTERNAL,
              message:
                'Error al ejecutar el caso de uso "SignUpUser" porque no hay un Observable como resultado',
            }),
          );
          subscriber.complete();
        });
  }

  @GrpcMethod('SecurityService', 'Login')
  login(data: SignInCommand): Observable<SignedInResponse> {
    const result = this.delegate
      .toSignInUser(data)
      .execute<SignedInResponse>(this.signedInPublisher);
    return result instanceof Promise
      ? from(result)
      : new Observable<SignedInResponse>((subscriber) => {
          subscriber.error(
            new RpcException({
              code: status.INTERNAL,
              message:
                'Error al ejecutar el caso de uso "SignInUser" porque no hay una Promesa como resultado',
            }),
          );
          subscriber.complete();
        });
  }
}
