import { RoleType } from '../types/entities';
import {
  DescriptionValueObject,
  NameValueObject,
  RoleIdValueObject,
  StatusValueObject,
} from '../value-objects/role';
import { UserEntity } from './user.entity';

export class RoleEntity<RoleTypeGeneric extends RoleType = RoleType> {
  roleId: RoleIdValueObject;
  name: NameValueObject;
  description?: DescriptionValueObject;
  status: StatusValueObject;
  users?: UserEntity[];

  constructor(role?: RoleTypeGeneric) {
    this.roleId = new RoleIdValueObject(role?.roleId);
    this.name = new NameValueObject(role?.name);
    this.description = new DescriptionValueObject(role?.description);
    this.status = new StatusValueObject(role?.status ?? true);
    this.users = role?.users?.map((user) => new UserEntity(user));
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

  toPrimitives(): RoleTypeGeneric {
    return {
      roleId: this.roleId.valueOf(),
      name: this.name.valueOf(),
      description: this.description?.valueOf(),
      status: this.status.valueOf(),
      users: this.users?.map((user) => user.toPrimitives()),
    } as RoleTypeGeneric;
  }
}
