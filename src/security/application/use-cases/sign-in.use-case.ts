import { IUseCase } from '@sofkau/ddd';
import { lastValueFrom } from 'rxjs';
import { UserAggregateRoot } from '../../domain/aggregates';
import { SignInCommand } from '../../domain/commands';
import { SessionEntity } from '../../domain/entities/session.entity';
import {
  SessionRepository,
  UserRepository,
} from '../../domain/interfaces/repositories';
import { SignedInResponse, UserType } from '../../domain/types';
import {
  EmailValueObject,
  PasswordValueObject,
} from '../../domain/value-objects/user';

export class SignInUseCase
  implements IUseCase<SignInCommand, SignedInResponse>
{
  private readonly aggregateRoot: UserAggregateRoot;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
  ) {
    this.aggregateRoot = new UserAggregateRoot();
  }

  async execute(command: SignInCommand): Promise<SignedInResponse> {
    const email = new EmailValueObject(command.email);
    const password = new PasswordValueObject(command.password);

    if (email.hasErrors() || password.hasErrors()) {
      throw new Error('Existen algunos errores en el comando "SignInCommand"');
    }

    const user = await lastValueFrom(
      this.userRepository.findOneBy({
        email: email.valueOf(),
        password: password.valueOf(),
      }),
    );

    const session = new SessionEntity({
      token: this.generateToken(user),
      user,
      createdAt: new Date(),
    });

    const result = await lastValueFrom(
      this.sessionRepository.create(session.toPrimitives()),
    );

    return {
      message: 'User has been authenticated',
      token: result.token.valueOf(),
    } as SignedInResponse;
  }

  private generateToken(user: UserType): string {
    return `Hay que generar un token JWT ${user}`;
  }
}
