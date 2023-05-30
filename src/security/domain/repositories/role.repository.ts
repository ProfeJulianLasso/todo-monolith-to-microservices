import { Observable } from 'rxjs';
import { RoleType } from '../types/entities';

export interface RoleRepository<Entity extends RoleType = RoleType> {
  findBy(...where: any[]): Observable<Entity[]>;
  findAll(...options: any[]): Observable<Entity[]>;
  findById(roleId: string): Observable<Entity>;
  create(role: Entity): Observable<Entity>;
  update(roleId: string, role: Entity): Observable<Entity>;
  delete(roleId: string): Observable<boolean>;
}
