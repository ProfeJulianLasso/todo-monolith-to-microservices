import { Controller, Post } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { SignInUseCase } from 'src/security/application';
import { SignedInResponse } from 'src/security/domain/types';
import { SignInCommand } from '../../domain/commands';
import { SessionRepository, UserRepository } from '../persistence';

@Controller('security')
export class LoginAPI {
  private readonly useCase: SignInUseCase;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
  ) {
    this.useCase = new SignInUseCase(
      this.userRepository,
      this.sessionRepository,
    );
  }

  @Post('login')
  execute(data: SignInCommand): Observable<SignedInResponse> {
    return from(this.useCase.execute(data));
  }
}
