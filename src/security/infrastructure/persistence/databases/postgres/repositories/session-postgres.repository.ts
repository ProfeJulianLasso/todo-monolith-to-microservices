import {
  ConflictException,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
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
        throw new NotImplementedException(error.message);
      }),
    );
  }

  findOneBy(...where: any[]): Observable<SessionPostgresEntity> {
    return from(this.sessionRepository.findOneBy(where)).pipe(
      catchError((error) => {
        throw new NotImplementedException(error.message);
      }),
      map((session) => {
        if (!session) throw new NotFoundException('Session not found');
        return session;
      }),
    );
  }

  findAll(
    options?: FindManyOptions<SessionPostgresEntity>,
  ): Observable<SessionPostgresEntity[]> {
    return from(this.sessionRepository.find(options)).pipe(
      catchError((error) => {
        throw new NotImplementedException(error.message);
      }),
    );
  }

  create(token: SessionPostgresEntity): Observable<SessionPostgresEntity> {
    return from(
      this.sessionRepository
        .findOneBy({ token: token.token })
        .then((tokenFound) => {
          if (!tokenFound)
            throw new ConflictException('Session already exists');
          return this.sessionRepository.save(token);
        })
        .catch((error) => {
          throw new NotImplementedException(error.message);
        }),
    );
  }
}
