import { status } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, catchError, from, map } from 'rxjs';
import { FindManyOptions, FindOptionsWhere, IsNull, Repository } from 'typeorm';
import { RoleRepository } from '../../../../../domain/interfaces/repositories';
import { RolePostgresEntity } from '../entities';

export class RolePostgresRepository
  implements RoleRepository<RolePostgresEntity>
{
  constructor(
    @InjectRepository(RolePostgresEntity)
    private readonly roleRepository: Repository<RolePostgresEntity>,
  ) {}

  findBy(
    where:
      | FindOptionsWhere<RolePostgresEntity>
      | FindOptionsWhere<RolePostgresEntity>[],
  ): Observable<RolePostgresEntity[]> {
    return from(
      this.roleRepository.findBy({ ...where, deletedAt: IsNull() }),
    ).pipe(
      catchError((error) => {
        throw new RpcException({
          code: status.INTERNAL,
          message: error.message,
        });
      }),
    );
  }

  findAll(
    options?: FindManyOptions<RolePostgresEntity>,
  ): Observable<RolePostgresEntity[]> {
    const tmpWhere = options?.where || {};
    const finalOptions = { ...options };
    finalOptions.where = { ...tmpWhere, deletedAt: IsNull() };
    return from(this.roleRepository.find(finalOptions)).pipe(
      catchError((error) => {
        throw new RpcException({
          code: status.INTERNAL,
          message: error.message,
        });
      }),
    );
  }

  findById(roleId: string): Observable<RolePostgresEntity> {
    return from(
      this.roleRepository.findOne({
        where: { roleId, deletedAt: IsNull() },
      }),
    ).pipe(
      map((role) => {
        if (!role)
          throw new RpcException({
            code: status.NOT_FOUND,
            message: 'User not found',
          });
        return role;
      }),
      catchError((error) => {
        throw new RpcException({
          code: status.INTERNAL,
          message: error.message,
        });
      }),
    );
  }

  create(role: RolePostgresEntity): Observable<RolePostgresEntity> {
    return from(
      this.roleRepository
        .findOneBy({ roleId: role.roleId, deletedAt: IsNull() })
        .then((roleFound) => {
          if (roleFound)
            throw new RpcException({
              code: status.ALREADY_EXISTS,
              message: 'Role already exists',
            });
          return this.roleRepository.save(role);
        })
        .catch((error) => {
          throw new RpcException({
            code: status.INTERNAL,
            message: error.message,
          });
        }),
    );
  }

  update(
    roleId: string,
    role: RolePostgresEntity,
  ): Observable<RolePostgresEntity> {
    return from(
      this.roleRepository
        .findOneBy({ roleId, deletedAt: IsNull() })
        .then((roleFound) => {
          if (!roleFound)
            throw new RpcException({
              code: status.NOT_FOUND,
              message: 'User not found',
            });
          return this.roleRepository.save({
            ...roleFound,
            ...role,
            roleId,
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

  delete(roleId: string): Observable<boolean> {
    const role = new RolePostgresEntity();
    role.deletedAt = new Date();
    return this.update(roleId, role).pipe(map((role) => !!role.deletedAt));
  }
}
