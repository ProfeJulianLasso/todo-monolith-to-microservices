import { Injectable } from '@nestjs/common';
import { SessionPostgresRepository } from '../databases/postgres/repositories';

@Injectable()
export class SessionRepository extends SessionPostgresRepository {}
