import { IUseCase } from '@sofkau/ddd';
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
    command.roleId = Role.USER;
    const user = new CreateUserValidator(command).toPrimitives() as UserType;
    user.role = { roleId: command.roleId, name: 'user' } as RoleType;

    const newUser = this.aggregateRoot.createUser(user);
    return this.repository.create(newUser.toPrimitives()).pipe(
      map((user) => {
        return { message: 'User created successfully', data: user };
      }),
    );
  }
}
