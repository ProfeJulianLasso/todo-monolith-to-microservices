import { Observable } from 'rxjs';
import { SessionType } from '../types/entities';

export interface SessionRepository<Entity extends SessionType = SessionType> {
  findBy(...where: any[]): Observable<Entity[]>;
  findOneBy(...where: any[]): Observable<Entity>;
  findAll(...options: any[]): Observable<Entity[]>;
  create(token: Entity): Observable<Entity>;
  delete(token: string): Observable<boolean>;
}
