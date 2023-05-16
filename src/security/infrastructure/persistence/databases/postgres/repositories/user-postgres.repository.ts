import { NotFoundException } from '@nestjs/common';
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
        throw new Error(error.message);
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
      catchError((error) => {
        throw new Error(error.message);
      }),
      map((user) => {
        if (!user) throw new NotFoundException('User not found');
        return user;
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
        throw new Error(error.message);
      }),
    );
  }

  create(user: UserPostgresEntity): Observable<UserPostgresEntity> {
    return from(this.userRepository.save(user)).pipe(
      catchError((error) => {
        throw new Error(error.message);
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
        .catch((error) => {
          throw new Error(error.message);
        })
        .then((userFound) => {
          if (!userFound) throw new NotFoundException('User not found');
          return this.userRepository.save({
            ...userFound,
            ...user,
            userId,
            updatedAt: new Date(),
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
