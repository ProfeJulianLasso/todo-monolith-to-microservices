import { IUseCase } from '@sofkau/ddd';
import crypto from 'node:crypto';
import { Observable, map } from 'rxjs';
import { UserAggregateRoot } from '../../domain/aggregates';
import { CreateUserCommand, CreateUserValidator } from '../../domain/commands';
import { Role } from '../../domain/enums';
import { UserRepository } from '../../domain/interfaces/repositories';
import {
  CreatedOrUpdatedUserResponse,
  RoleType,
  UserType,
} from '../../domain/types';

const HASH_ALGORITHM = 'sha512';

export class SignUpUseCase
  implements IUseCase<CreateUserCommand, CreatedOrUpdatedUserResponse>
{
  private readonly aggregateRoot: UserAggregateRoot;

  constructor(private readonly repository: UserRepository) {
    this.aggregateRoot = new UserAggregateRoot();
  }

  execute(
    command: CreateUserCommand,
  ): Observable<CreatedOrUpdatedUserResponse> {
    const user = this.validateCommand(command);
    user.role = this.assignUserRole();
    const newUser = this.getDataForNewUser(user);
    newUser.password = this.hashPassword(newUser.password);
    return this.repository.create(newUser).pipe(
      map((user) => {
        return { message: 'User created successfully', data: user };
      }),
    );
  }

  private validateCommand(command: CreateUserCommand): UserType {
    command.roleId = Role.USER;
    return new CreateUserValidator(command).toPrimitives() as UserType;
  }

  private assignUserRole(): RoleType {
    return { roleId: Role.USER, name: 'user' } as RoleType;
  }

  private hashPassword(password: string): string {
    return crypto.createHash(HASH_ALGORITHM).update(password).digest('hex');
  }

  private getDataForNewUser(user: UserType): UserType {
    return this.aggregateRoot.createUser(user).toPrimitives();
  }
}
