import { status } from '@grpc/grpc-js';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, catchError, from, map } from 'rxjs';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { SessionRepository } from '../../../../../core/domain/repositories';
import { SessionPostgresEntity } from '../entities';

@Injectable()
export class SessionPostgresRepository
  implements SessionRepository<SessionPostgresEntity>
{
  constructor(
    @InjectRepository(SessionPostgresEntity)
    private readonly sessionRepository: Repository<SessionPostgresEntity>,
  ) {}

  findBy(
    where:
      | FindOptionsWhere<SessionPostgresEntity>
      | FindOptionsWhere<SessionPostgresEntity>[],
  ) {
    return from(this.sessionRepository.findBy(where)).pipe(
      catchError((error) => {
        throw new RpcException({
          code: status.INTERNAL,
          message: error.message,
        });
      }),
    );
  }

  findOneBy(...where: any[]): Observable<SessionPostgresEntity> {
    return from(this.sessionRepository.findOneBy(where)).pipe(
      map((session) => {
        if (!session)
          throw new RpcException({
            code: status.NOT_FOUND,
            message: 'Session not found',
          });
        return session;
      }),
      catchError((error) => {
        throw new RpcException({
          code: status.INTERNAL,
          message: error.message,
        });
      }),
    );
  }

  findAll(
    options?: FindManyOptions<SessionPostgresEntity>,
  ): Observable<SessionPostgresEntity[]> {
    return from(this.sessionRepository.find(options)).pipe(
      catchError((error) => {
        throw new RpcException({
          code: status.INTERNAL,
          message: error.message,
        });
      }),
    );
  }

  create(token: SessionPostgresEntity): Observable<SessionPostgresEntity> {
    return from(
      this.sessionRepository
        .findOneBy({ token: token.token })
        .then((tokenFound) => {
          if (tokenFound)
            throw new RpcException({
              code: status.ALREADY_EXISTS,
              message: 'Session already exists',
            });
          return this.sessionRepository.save(token);
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
}
