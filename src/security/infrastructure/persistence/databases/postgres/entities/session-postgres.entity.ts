import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { SessionType } from '../../../../../core/domain/types';
import { UserPostgresEntity } from './user-postgres.entity';

@Index('session_pk', ['token'], { unique: true })
@Entity({ name: 'session', schema: 'security' })
export class SessionPostgresEntity implements SessionType {
  @Column({
    name: 'session_token',
    type: 'varchar',
    length: 2048,
    primary: true,
  })
  token: string;

  @Column({
    name: 'session_created_at',
    type: 'timestamp with time zone',
    nullable: false,
    default: () => 'now()',
  })
  createdAt: Date;

  @Column({
    name: 'session_expires_at',
    type: 'timestamp with time zone',
    nullable: false,
  })
  expiresAt: Date;

  @OneToOne(() => UserPostgresEntity, (user) => user.sessions)
  @JoinColumn()
  user: UserPostgresEntity;
}
