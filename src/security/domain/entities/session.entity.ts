import { SessionType } from '../types';
import {
  CreatedAtValueObject,
  ExpiresAtValueObject,
  TokenValueObject,
} from '../value-objects/session';
import { UserEntity } from './user.entity';

export class SessionEntity<
  SessionTypeGeneric extends SessionType = SessionType,
> {
  token: TokenValueObject;
  user: UserEntity;
  createdAt: CreatedAtValueObject;
  expiresAt: ExpiresAtValueObject;

  constructor(session?: SessionTypeGeneric) {
    this.token = new TokenValueObject(session?.token);
    this.user = new UserEntity(session?.user);
    this.createdAt = new CreatedAtValueObject(session?.createdAt);
    this.expiresAt = new ExpiresAtValueObject();
  }

  toPrimitives() {
    return {
      token: this.token.valueOf(),
      user: this.user.toPrimitives(),
      createdAt: this.createdAt.valueOf(),
      expiresAt: this.expiresAt.valueOf(),
    } as SessionType;
  }
}
