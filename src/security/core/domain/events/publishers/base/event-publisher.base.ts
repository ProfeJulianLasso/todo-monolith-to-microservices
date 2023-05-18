import { IEventPublisher } from '@sofkau/ddd';
import { Observable } from 'rxjs';

export abstract class EventPublisherBase implements IEventPublisher {
  emit<ResultType = any, InputType = any>(
    pattern: any,
    data: InputType,
  ): Observable<ResultType> {
    throw new Error('Method not implemented.');
  }

  abstract publish<Result = any>(): Promise<Result>;
}
