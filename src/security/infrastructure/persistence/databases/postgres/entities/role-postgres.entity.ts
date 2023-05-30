import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleType } from '../../../../../domain/types';
import { UserPostgresEntity } from './user-postgres.entity';

@Index('role_name_index', ['name', 'deletedAt'], { unique: true })
@Index('role_status_index', ['status', 'deletedAt'])
@Index('role_pk', ['roleId'], { unique: true })
@Entity({ name: 'role', schema: 'security' })
export class RolePostgresEntity implements RoleType {
  @PrimaryGeneratedColumn('uuid', { name: 'rol_role_id' })
  roleId: string;

  @Column({
    name: 'rol_name',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'rol_description',
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  description?: string;

  @Column({
    name: 'rol_status',
    type: 'boolean',
    nullable: false,
    default: true,
  })
  status: boolean;

  @Column({
    name: 'rol_created_at',
    type: 'timestamp with time zone',
    nullable: false,
    default: () => 'now()',
  })
  createdAt: Date;

  @Column({
    name: 'rol_updated_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  updateAt?: Date;

  @Column({
    name: 'rol_deleted_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt?: Date;

  @OneToMany(() => UserPostgresEntity, (user) => user.role)
  users: UserPostgresEntity[];
}
