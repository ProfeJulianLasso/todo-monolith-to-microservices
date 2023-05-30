import { Observable } from 'rxjs';
import { UserType } from '../../types/entities';

export interface UserRepository<Entity extends UserType = UserType> {
  findBy(...where: any[]): Observable<Entity[]>;
  findOneBy(...where: any[]): Observable<Entity>;
  findAll(...options: any[]): Observable<Entity[]>;
  create(user: Entity): Observable<Entity>;
  update(userId: string, user: Entity): Observable<Entity>;
  delete(userId: string): Observable<boolean>;
}
