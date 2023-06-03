import { ClientKafka } from '@nestjs/microservices';
import { OnModuleInit } from '@nestjs/common';

import {
  KafkaServiceInterface,
  RawUniqueFilter as UniqueFilter,
  RawCountFilter as CountFilter,
  RawFilter as Filter,
  Total,
  KafkaObj,
} from '../interfaces';

export class Provider<Entity>
  implements KafkaServiceInterface<Entity>, OnModuleInit
{
  constructor(
    private readonly topic: string,
    protected readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf(`${this.topic}.count`);
    this.client.subscribeToResponseOf(`${this.topic}.create`);
    this.client.subscribeToResponseOf(`${this.topic}.find`);
    this.client.subscribeToResponseOf(`${this.topic}.findById`);
    this.client.subscribeToResponseOf(`${this.topic}.updateById`);

    await this.client.connect();
  }

  count(filter: CountFilter): KafkaObj<Total> {
    return this.client.send(`${this.topic}.count`, { value: filter });
  }

  create(data: Entity): KafkaObj<Entity> {
    return this.client.send(`${this.topic}.create`, { value: data });
  }

  find(filter: Filter): KafkaObj<Entity[]> {
    return this.client.send(`${this.topic}.find`, { value: filter });
  }

  findById(filter: UniqueFilter): KafkaObj<Entity> {
    return this.client.send(`${this.topic}.findById`, { value: filter });
  }

  updateById(data: Entity, filter: UniqueFilter): KafkaObj<Entity> {
    return this.client.send(`${this.topic}.updateById`, {
      value: { data, filter },
    });
  }
}
