import { Injectable } from '@nestjs/common';
import { RolePostgresRepository } from '../databases/postgres/repositories';

@Injectable()
export class RoleRepository extends RolePostgresRepository {}
