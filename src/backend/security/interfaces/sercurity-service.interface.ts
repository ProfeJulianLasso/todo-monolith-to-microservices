import { Observable } from 'rxjs';
import {
  CreateUserCommand,
  CreatedOrUpdatedUserResponse,
  SignInCommand,
  SignedInResponse,
} from '../types';

export interface ISecurityService {
  Register(data: CreateUserCommand): Observable<CreatedOrUpdatedUserResponse>;
  Login(data: SignInCommand): Observable<SignedInResponse>;
}
