import {
  ValueObjectAbstract,
  ValueObjectsErrorHandlerAbstract,
} from '@sofkau/ddd';
import { RoleIdValueObject } from '../../value-objects/role';
import {
  EmailValueObject,
  NameValueObject,
  PasswordValueObject,
  StatusValueObject,
  UserIdValueObject,
} from '../../value-objects/user';
import { CreateUserCommand } from './create-user.command';

export class CreateUserValidator extends ValueObjectsErrorHandlerAbstract {
  userId: UserIdValueObject;
  name: NameValueObject;
  email: EmailValueObject;
  password: PasswordValueObject;
  status?: StatusValueObject;
  role?: RoleIdValueObject;

  constructor(private readonly command: CreateUserCommand) {
    super();

    this.userId = new UserIdValueObject(this.command.userId);
    this.name = new NameValueObject(this.command.name);
    this.email = new EmailValueObject(this.command.email);
    this.password = new PasswordValueObject(this.command.password);
    this.status = new StatusValueObject(this.command.status ?? true);
    this.role = new RoleIdValueObject(this.command.roleId);

    this.checkValidateValueObjects();
  }

  createArrayFromValueObjects(): ValueObjectAbstract<string | boolean>[] {
    const result = new Array<ValueObjectAbstract<string | boolean>>();

    if (this.userId.hasValue()) result.push(this.userId);
    if (this.name.hasValue()) result.push(this.name);
    if (this.email.hasValue()) result.push(this.email);
    if (this.password.hasValue()) result.push(this.password);
    if (this.status?.hasValue()) result.push(this.status);
    if (this.role?.hasValue()) result.push(this.role);

    return result;
  }

  toPrimitives(): CreateUserCommand {
    this.checkValidateValueObjects();
    return {
      userId: this.userId.valueOf(),
      name: this.name.valueOf(),
      email: this.email.valueOf(),
      password: this.password.valueOf(),
      status: this.status?.valueOf(),
      role: this.role?.valueOf(),
    } as CreateUserCommand;
  }
}
