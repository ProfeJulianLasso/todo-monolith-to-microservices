import { IUseCase } from '@sofkau/ddd';
import { Observable, map } from 'rxjs';
import { UserAggregateRoot } from '../../domain/aggregates';
import { UserRepository } from '../../domain/repositories';
import {
  CreateUserCommand,
  CreatedOrUpdatedUserResponse,
} from '../../domain/types';
import { UserType } from '../../domain/types/entities';

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
    const user = this.aggregateRoot.createUser(command as UserType);
    return this.repository.create(user.toPrimitives()).pipe(
      map((user) => {
        return { message: 'User created successfully', data: user };
      }),
    );
  }
}
