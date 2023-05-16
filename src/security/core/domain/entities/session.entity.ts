import {
  ValueObjectAbstract,
  ValueObjectsErrorHandlerAbstract,
} from '@sofkau/ddd';
import { SessionType } from '../types';
import {
  CreatedAtValueObject,
  ExpiresAtValueObject,
  TokenValueObject,
} from '../value-objects/session';
import { UserEntity } from './user.entity';

export class SessionEntity<
  SessionTypeGeneric extends SessionType = SessionType,
> extends ValueObjectsErrorHandlerAbstract {
  token: TokenValueObject;
  user: UserEntity;
  createdAt: CreatedAtValueObject;
  expiresAt: ExpiresAtValueObject;

  constructor(session?: SessionTypeGeneric) {
    super();

    this.token = new TokenValueObject(session?.token);
    this.user = new UserEntity(session?.user);
    this.createdAt = new CreatedAtValueObject(session?.createdAt);
    this.expiresAt = new ExpiresAtValueObject();

    this.checkValidateValueObjects();
  }

  createArrayFromValueObjects(): ValueObjectAbstract<any>[] {
    const result = new Array<ValueObjectAbstract<any>>();

    if (this.token.hasValue()) result.push(this.token);
    const user = this.user.createArrayFromValueObjects();
    if (user.length > 0) result.push(...user);
    if (this.createdAt.hasValue()) result.push(this.createdAt);
    if (this.expiresAt.hasValue()) result.push(this.expiresAt);

    return result;
  }

  toPrimitives() {
    this.checkValidateValueObjects();
    return {
      token: this.token.valueOf(),
      user: this.user.toPrimitives(),
      createdAt: this.createdAt.valueOf(),
      expiresAt: this.expiresAt.valueOf(),
    } as SessionType;
  }
}
