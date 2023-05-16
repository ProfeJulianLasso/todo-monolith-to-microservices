import { RoleEntity, UserEntity } from '../entities';
import { RoleType, UserType } from '../types/entities';

export class UserAggregateRoot {
  createUser(user: UserType): UserEntity {
    return new UserEntity(user);
  }

  changeUserName(name: string, user: UserEntity): UserEntity {
    user.changeName(name);
    return user;
  }

  changeUserEmail(email: string, user: UserEntity): UserEntity {
    user.changeEmail(email);
    return user;
  }

  changeUserPassword(password: string, user: UserEntity): UserEntity {
    user.changePassword(password);
    return user;
  }

  changeUserStatus(status: boolean, user: UserEntity): UserEntity {
    user.changeStatus(status);
    return user;
  }

  changeUserRole(role: RoleType, user: UserEntity): UserEntity {
    user.changeRole(role);
    return user;
  }

  changeRoleName(name: string, role: RoleEntity): RoleEntity {
    role.changeName(name);
    return role;
  }

  changeRoleDescription(description: string, role: RoleEntity): RoleEntity {
    role.changeDescription(description);
    return role;
  }

  changeRoleStatus(status: boolean, role: RoleEntity): RoleEntity {
    role.changeStatus(status);
    return role;
  }
}
