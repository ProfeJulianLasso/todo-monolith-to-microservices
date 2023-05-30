import { RoleType, UserType } from '../types/entities';
import {
  EmailValueObject,
  NameValueObject,
  PasswordValueObject,
  StatusValueObject,
  UserIdValueObject,
} from '../value-objects/user';
import { RoleEntity } from './role.entity';

export class UserEntity<UserTypeGeneric extends UserType = UserType> {
  userId: UserIdValueObject;
  name: NameValueObject;
  email: EmailValueObject;
  password: PasswordValueObject;
  status: StatusValueObject;
  role: RoleEntity;

  constructor(user?: UserTypeGeneric) {
    this.userId = new UserIdValueObject(user?.userId);
    this.name = new NameValueObject(user?.name);
    this.email = new EmailValueObject(user?.email);
    this.password = new PasswordValueObject(user?.password);
    this.status = new StatusValueObject(user?.status ?? true);
    this.role = new RoleEntity(user?.role);
  }

  changeName(name: string): void {
    this.name.value = name;
  }

  changeEmail(email: string): void {
    this.email.value = email;
  }

  changePassword(password: string): void {
    this.password.value = password;
  }

  changeStatus(status: boolean): void {
    this.status.value = status;
  }

  changeRole(role: RoleType): void {
    this.role = new RoleEntity(role);
  }

  toPrimitives(): UserTypeGeneric {
    return {
      userId: this.userId.valueOf(),
      name: this.name.valueOf(),
      email: this.email.valueOf(),
      password: this.password.valueOf(),
      status: this.status.valueOf(),
      role: this.role?.toPrimitives(),
    } as UserTypeGeneric;
  }
}
