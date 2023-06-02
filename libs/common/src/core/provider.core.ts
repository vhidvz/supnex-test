import {
  CreateDto as BaseCreateDto,
  UpdateDto as BaseUpdateDto,
} from '@app/common/dto';
import { ClientKafka } from '@nestjs/microservices';
import { Observable, lastValueFrom } from 'rxjs';

import {
  Base,
  KafkaServiceInterface,
  Options,
  RawUniqueFilter as UniqueFilter,
  RawCountFilter as CountFilter,
  RawFilter as Filter,
  Total,
} from '../interfaces';

export class Provider<
  Entity,
  CreateDto = BaseCreateDto<Entity>,
  UpdateDto = BaseUpdateDto<Entity>,
> implements KafkaServiceInterface<Base>
{
  constructor(
    private readonly topic: string,
    protected readonly client: ClientKafka,
  ) {}

  count: (filter: CountFilter, options?: Options) => Observable<Total>;
  create: (data: CreateDto, options?: Options) => Observable<Entity>;
  find: (filter: Filter, options?: Options) => Observable<Entity[]>;
  findById: (filter: UniqueFilter, options?: Options) => Observable<Entity>;
  updateById: (
    data: Entity,
    filter: UniqueFilter,
    options?: Options,
  ) => Observable<Entity>;
}
