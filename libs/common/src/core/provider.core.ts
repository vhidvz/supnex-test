import type { Document } from 'mongoose';
import { Metadata } from '@grpc/grpc-js';

import {
  CreateRepositoryOptions,
  DeleteRepositoryOptions,
  RestoreRepositoryOptions,
  UpdateRepositoryOptions,
} from './options';
import { CreateDto as BaseCreateDto, UpdateDto as BaseUpdateDto } from '../dto';
import type {
  Count,
  CountFilter,
  Filter,
  JwtToken,
  OneFilter,
} from '../interfaces';
import { ClientKafka } from '@nestjs/microservices';
import { Observable, lastValueFrom, map } from 'rxjs';

export type Topic = {
  count: string;
  create: string;
  cursor: string;
  findOne: string;
  findMany: string;
  findById: string;
  deleteById: string;
  restoreById: string;
  destroyById: string;
  updateById: string;
  updateBulk: string;
};

export class Provider<
  Schema,
  CreateDto = BaseCreateDto<Schema>,
  UpdateDto = BaseUpdateDto<Schema>,
> {
  constructor(
    private readonly topic: Topic,
    protected readonly client: ClientKafka,
  ) {}

  async count(filter: CountFilter<Document & Schema>): Promise<number> {
    return (
      await lastValueFrom(
        this.client.send<{ value: Count }>(this.topic.count, { value: filter }),
      )
    ).value.count;
  }

  public async create(
    createDto: CreateDto,
    meta: Metadata,
  ): Promise<Document & Schema> {
    return (
      await lastValueFrom(
        this.client.send<{ value: Document & Schema }>(this.topic.create, {
          value: createDto,
          headers: meta.getMap(),
        }),
      )
    ).value;
  }

  public cursor(
    filter: Filter<Document & Schema, Schema>,
  ): Observable<Document & Schema> {
    return this.client
      .send<{ value: Document & Schema }>(this.topic.cursor, {
        value: filter,
      })
      .pipe(map((res) => res.value));
  }

  public async findOne(
    filter: OneFilter<Document & Schema>,
  ): Promise<Document & Schema> {
    return (
      await lastValueFrom(
        this.client.send<{ value: Document & Schema }>(this.topic.findOne, {
          value: filter,
        }),
      )
    ).value;
  }

  public async findMany(
    filter: Filter<Document & Schema, Schema>,
  ): Promise<(Document & Schema)[]> {
    return (
      await lastValueFrom(
        this.client.send<{ value: (Document & Schema)[] }>(
          this.topic.findMany,
          {
            value: filter,
          },
        ),
      )
    ).value;
  }

  public async findById(
    filter: OneFilter<Document & Schema>,
  ): Promise<Document & Schema> {
    return (
      await lastValueFrom(
        this.client.send<{ value: Document & Schema }>(this.topic.findById, {
          value: filter,
        }),
      )
    ).value;
  }

  public async deleteById(
    filter: OneFilter<Document & Schema>,
    meta: Metadata,
  ): Promise<Document & Schema> {
    return (
      await lastValueFrom(
        this.client.send<{ value: Document & Schema }>(this.topic.deleteById, {
          value: filter,
          headers: meta,
        }),
      )
    ).value;
  }

  public async restoreById(
    filter: OneFilter<Document & Schema>,
    meta: Metadata,
  ): Promise<Document & Schema> {
    return (
      await lastValueFrom(
        this.client.send<{ value: Document & Schema }>(this.topic.restoreById, {
          value: filter,
          headers: meta,
        }),
      )
    ).value;
  }

  public async updateById(
    filter: OneFilter<Document & Schema>,
    update: UpdateDto,
    meta: Metadata,
  ): Promise<Document & Schema> {
    return (
      await lastValueFrom(
        this.client.send<{ value: Document & Schema }>(this.topic.updateById, {
          value: { update, filter },
          headers: meta,
        }),
      )
    ).value;
  }

  public async updateBulk(
    filter: CountFilter<Document & Schema>,
    update: UpdateDto,
    meta: Metadata,
  ): Promise<number> {
    return (
      await lastValueFrom(
        this.client.send<{ value: Count }>(this.topic.updateById, {
          value: { update, filter },
          headers: meta,
        }),
      )
    ).value.count;
  }

  public async destroyById(
    filter: OneFilter<Document & Schema>,
  ): Promise<Document & Schema> {
    return (
      await lastValueFrom(
        this.client.send<{ value: Document & Schema }>(this.topic.destroyById, {
          value: filter,
        }),
      )
    ).value;
  }

  protected makeRepositoryOptions(
    type: 'create' | 'update' | 'delete' | 'restore',
    meta: Metadata,
  ) {
    const rawToken = String(meta.get('token'));
    if (!rawToken)
      throw new Error('token to make repository options is required');

    const token: JwtToken = JSON.parse(rawToken);

    const options = {};
    options[type + 'd_by'] = token.uid ?? token.cid;
    options[type + 'd_in'] = token.aid ?? token.cid;

    return options as
      | CreateRepositoryOptions
      | UpdateRepositoryOptions
      | DeleteRepositoryOptions
      | RestoreRepositoryOptions as any;
  }
}
