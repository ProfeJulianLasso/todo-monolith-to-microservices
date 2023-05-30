import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserType } from '../../../../../domain/types';
import { RolePostgresEntity } from './role-postgres.entity';
import { SessionPostgresEntity } from './session-postgres.entity';

@Index('user_email_password_index', ['email', 'password', 'deletedAt'])
@Index('user_email_index', ['email', 'deletedAt'], { unique: true })
@Index('user_status_index', ['status', 'deletedAt'])
@Index('user_pk', ['userId'], { unique: true })
@Entity({ name: 'user', schema: 'security' })
export class UserPostgresEntity implements UserType {
  @PrimaryGeneratedColumn('uuid', { name: 'user_user_id' })
  userId: string;

  @Column({
    name: 'user_name',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'user_email',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  email: string;

  @Column({
    name: 'user_password',
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  password: string;

  @Column({
    name: 'user_status',
    type: 'boolean',
    nullable: false,
    default: true,
  })
  status: boolean;

  @Column({
    name: 'user_created_at',
    type: 'timestamp with time zone',
    nullable: false,
    default: () => 'now()',
  })
  createdAt: Date;

  @Column({
    name: 'user_updated_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  updateAt?: Date;

  @Column({
    name: 'user_deleted_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt?: Date;

  @ManyToOne(() => RolePostgresEntity, (role) => role.users)
  role: RolePostgresEntity;

  @OneToMany(() => SessionPostgresEntity, (session) => session.user)
  sessions: SessionPostgresEntity[];
}
