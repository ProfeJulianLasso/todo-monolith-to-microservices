import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, catchError, from, map } from 'rxjs';
import { FindManyOptions, FindOptionsWhere, IsNull, Repository } from 'typeorm';
import { RoleRepository } from '../../../../../core/domain/repositories';
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
        throw new Error(error.message);
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
        throw new Error(error.message);
      }),
    );
  }

  findById(roleId: string): Observable<RolePostgresEntity> {
    return from(
      this.roleRepository.findOne({
        where: { roleId, deletedAt: IsNull() },
      }),
    ).pipe(
      catchError((error) => {
        throw new Error(error.message);
      }),
      map((role) => {
        if (!role) throw new Error('Role not found');
        return role;
      }),
    );
  }

  create(role: RolePostgresEntity): Observable<RolePostgresEntity> {
    return from(this.roleRepository.save(role)).pipe(
      catchError((error) => {
        throw new Error(error.message);
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
        .catch((error) => {
          throw new Error(error.message);
        })
        .then((roleFound) => {
          if (!roleFound) throw new NotFoundException('Role not found');
          return this.roleRepository.save({
            ...roleFound,
            ...role,
            roleId,
            updatedAt: new Date(),
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
