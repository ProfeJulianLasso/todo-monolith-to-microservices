import { status } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, catchError, from, map } from 'rxjs';
import { FindManyOptions, FindOptionsWhere, IsNull, Repository } from 'typeorm';
import { UserRepository } from '../../../../../core/domain/repositories';
import { UserPostgresEntity } from '../entities';

export class UserPostgresRepository
  implements UserRepository<UserPostgresEntity>
{
  constructor(
    @InjectRepository(UserPostgresEntity)
    private readonly userRepository: Repository<UserPostgresEntity>,
  ) {}

  findBy(
    where:
      | FindOptionsWhere<UserPostgresEntity>
      | FindOptionsWhere<UserPostgresEntity>[],
  ): Observable<UserPostgresEntity[]> {
    return from(
      this.userRepository.findBy({ ...where, deletedAt: IsNull() }),
    ).pipe(
      catchError((error) => {
        throw new RpcException({
          code: status.INTERNAL,
          message: error.message,
        });
      }),
    );
  }

  findOneBy(
    where:
      | FindOptionsWhere<UserPostgresEntity>[]
      | FindOptionsWhere<UserPostgresEntity>,
  ): Observable<UserPostgresEntity> {
    return from(
      this.userRepository.findOne({ where: { ...where, deletedAt: IsNull() } }),
    ).pipe(
      map((user) => {
        if (!user)
          throw new RpcException({
            code: status.NOT_FOUND,
            message: 'User not found',
          });
        return user;
      }),
      catchError((error) => {
        if (error instanceof RpcException) throw error;
        throw new RpcException({
          code: status.INTERNAL,
          message: error.message,
        });
      }),
    );
  }

  findAll(
    options?: FindManyOptions<UserPostgresEntity>,
  ): Observable<UserPostgresEntity[]> {
    const tmpWhere = options?.where || {};
    const finalOptions = { ...options };
    finalOptions.where = { ...tmpWhere, deletedAt: IsNull() };
    return from(this.userRepository.find(finalOptions)).pipe(
      catchError((error) => {
        throw new RpcException({
          code: status.INTERNAL,
          message: error.message,
        });
      }),
    );
  }

  create(user: UserPostgresEntity): Observable<UserPostgresEntity> {
    return from(
      this.userRepository
        .findOneBy([
          { userId: user.userId, deletedAt: IsNull() },
          { email: user.email, deletedAt: IsNull() },
        ])
        .then((userFound) => {
          if (userFound)
            throw new RpcException({
              code: status.ALREADY_EXISTS,
              message: 'User already exists',
            });
          return this.userRepository.save(user);
        })
        .catch((error) => {
          if (error instanceof RpcException) throw error;
          throw new RpcException({
            code: status.INTERNAL,
            message: error.message,
          });
        }),
    );
  }

  update(
    userId: string,
    user: UserPostgresEntity,
  ): Observable<UserPostgresEntity> {
    return from(
      this.userRepository
        .findOneBy({ userId, deletedAt: IsNull() })
        .then((userFound) => {
          if (!userFound)
            throw new RpcException({
              code: status.NOT_FOUND,
              message: 'User not found',
            });
          return this.userRepository.save({
            ...userFound,
            ...user,
            userId,
            updatedAt: new Date(),
          });
        })
        .catch((error) => {
          if (error instanceof RpcException) throw error;
          throw new RpcException({
            code: status.INTERNAL,
            message: error.message,
          });
        }),
    );
  }

  delete(userId: string): Observable<boolean> {
    const user = new UserPostgresEntity();
    user.deletedAt = new Date();
    return this.update(userId, user).pipe(map((user) => !!user.deletedAt));
  }
}
