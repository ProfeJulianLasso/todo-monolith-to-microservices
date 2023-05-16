import { Injectable } from '@nestjs/common';
import { UserPostgresRepository } from '../databases/postgres/repositories';

@Injectable()
export class UserRepository extends UserPostgresRepository {}
