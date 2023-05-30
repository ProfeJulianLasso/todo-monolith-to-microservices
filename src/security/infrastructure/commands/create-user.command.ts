import { CreateUserCommand as CreateUserCommandDomain } from 'src/security/domain/commands';

export class CreateUserCommand implements CreateUserCommandDomain {
  userId: string;
  name: string;
  email: string;
  password: string;
  status?: boolean;
  roleId?: string;
}
