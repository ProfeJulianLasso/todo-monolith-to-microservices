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
    const userWithRole = this.assignUserRole(user);
    const newUser = this.aggregateRoot.createUser(userWithRole).toPrimitives();
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

  private assignUserRole(user: UserType): UserType {
    user.role = { roleId: Role.USER, name: 'user' } as RoleType;
    return user;
  }

  private hashPassword(password: string): string {
    return crypto.createHash(HASH_ALGORITHM).update(password).digest('hex');
  }
}
