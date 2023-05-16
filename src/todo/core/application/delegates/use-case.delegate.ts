import { IUseCase } from '@sofkau/ddd';
import { Observable, tap } from 'rxjs';
import { ISignedUpPublisher } from '../../domain/events/publishers/signed-up.publisher';
import { SessionRepository, UserRepository } from '../../domain/repositories';
import { CreateUserCommand, SignInCommand } from '../../domain/types';
import { SignInUseCase, SignUpUseCase } from '../use-cases';

export class UseCaseDelegate {
  private delegate: IUseCase<any, any>;
  private args: any[];

  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
  ) {}

  execute<Response>(
    eventPublisher: ISignedUpPublisher,
  ): Response | Observable<Response> | Promise<Response> {
    const result = this.delegate.execute(...this.args);
    if (result instanceof Promise) {
      return result.then((data) => {
        console.log('🗣️ Emitir evento', data);
        eventPublisher.publish(data);
        return data as Promise<Response>;
      });
    } else if (result instanceof Observable) {
      return result.pipe(
        tap((data) => {
          console.log('🗣️ Emitir evento', data);
          eventPublisher.publish(data);
        }),
      ) as Observable<Response>;
    } else {
      console.log('🗣️ Emitir evento', result);
      eventPublisher.publish(result);
      return result as Response;
    }
  }

  toSignUpUser(command: CreateUserCommand): this {
    this.delegate = new SignUpUseCase(this.userRepository);
    this.args = [command];
    return this;
  }

  toSignInUser(command: SignInCommand): this {
    this.delegate = new SignInUseCase(
      this.userRepository,
      this.sessionRepository,
    );
    this.args = [command];
    return this;
  }
}
