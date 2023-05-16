import {
  ValueObjectAbstract,
  ValueObjectsErrorHandlerAbstract,
} from '@sofkau/ddd';
import { RoleType } from '../types/entities';
import {
  DescriptionValueObject,
  NameValueObject,
  RoleIdValueObject,
  StatusValueObject,
} from '../value-objects/role';
import { UserEntity } from './user.entity';

export class RoleEntity<
  RoleTypeGeneric extends RoleType = RoleType,
> extends ValueObjectsErrorHandlerAbstract {
  roleId: RoleIdValueObject;
  name: NameValueObject;
  description?: DescriptionValueObject;
  status: StatusValueObject;
  users?: UserEntity[];

  constructor(role?: RoleTypeGeneric) {
    super();

    this.roleId = new RoleIdValueObject(role?.roleId);
    this.name = new NameValueObject(role?.name);
    this.description = new DescriptionValueObject(role?.description);
    this.status = new StatusValueObject(role?.status ?? true);
    this.users = role?.users?.map((user) => new UserEntity(user));

    this.checkValidateValueObjects();
  }

  changeName(name: string): void {
    this.name = new NameValueObject(name);
  }

  changeDescription(description: string): void {
    this.description = new DescriptionValueObject(description);
  }

  changeStatus(status: boolean): void {
    this.status = new StatusValueObject(status);
  }

  createArrayFromValueObjects(): ValueObjectAbstract<any>[] {
    const result = new Array<ValueObjectAbstract<any>>();

    if (this.roleId) result.push(this.roleId);
    if (this.name) result.push(this.name);
    if (this.description) result.push(this.description);
    if (this.status) result.push(this.status);
    if (this.users && this.users.length > 0) {
      this.users.forEach((user) => {
        result.push(...user.createArrayFromValueObjects());
      });
    }

    return result;
  }

  toPrimitives(): RoleTypeGeneric {
    this.checkValidateValueObjects();
    return {
      roleId: this.roleId.valueOf(),
      name: this.name.valueOf(),
      description: this.description?.valueOf(),
      status: this.status.valueOf(),
      users: this.users?.map((user) => user.toPrimitives()),
    } as RoleTypeGeneric;
  }
}
