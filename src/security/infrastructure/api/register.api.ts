import { Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SignUpUseCase } from 'src/security/application';
import { CreatedOrUpdatedUserResponse } from '../../domain/types';
import { CreateUserCommand } from '../commands';
import { UserRepository } from '../persistence';

@Controller('security')
export class RegisterAPI {
  private readonly useCase: SignUpUseCase;

  constructor(private readonly userRepository: UserRepository) {
    this.useCase = new SignUpUseCase(this.userRepository);
  }

  @Post('register')
  execute(
    @Body() data: CreateUserCommand,
  ): Observable<CreatedOrUpdatedUserResponse> {
    return this.useCase.execute(data);
  }
}
