import type { Cursor, Document } from 'mongoose';
import { Metadata } from '@grpc/grpc-js';

import {
  CreateRepositoryOptions,
  DeleteRepositoryOptions,
  RestoreRepositoryOptions,
  UpdateRepositoryOptions,
} from './options';
import { CreateDto as BaseCreateDto, UpdateDto as BaseUpdateDto } from '../dto';
import type { CountFilter, Filter, JwtToken, OneFilter } from '../interfaces';
import { Repository } from './repository.core';

export class Service<
  Schema,
  CreateDto = BaseCreateDto<Schema>,
  UpdateDto = BaseUpdateDto<Schema>,
> {
  constructor(
    protected readonly repository: Repository<Schema, CreateDto, UpdateDto>,
  ) {}

  public async count(filter: CountFilter<Document & Schema>): Promise<number> {
    return await this.repository.count(filter);
  }

  public async create(
    createDto: CreateDto,
    meta: Metadata,
  ): Promise<Document & Schema> {
    return await this.repository.create(
      createDto,
      this.makeRepositoryOptions('create', meta),
    );
  }

  public cursor(
    filter: Filter<Document & Schema, Schema>,
  ): Cursor<Document & Schema, any> {
    return this.repository.cursor(filter);
  }

  public async findOne(
    filter: OneFilter<Document & Schema>,
  ): Promise<Document & Schema> {
    return await this.repository.findOne(filter);
  }

  public async findMany(
    filter: Filter<Document & Schema, Schema>,
  ): Promise<(Document & Schema)[]> {
    return await this.repository.findMany(filter);
  }

  public async findById(
    filter: OneFilter<Document & Schema>,
  ): Promise<Document & Schema> {
    return await this.repository.findById(filter);
  }

  public async deleteById(
    filter: OneFilter<Document & Schema>,
    meta: Metadata,
  ): Promise<Document & Schema> {
    return await this.repository.deleteById(
      filter,
      this.makeRepositoryOptions('delete', meta),
    );
  }

  public async restoreById(
    filter: OneFilter<Document & Schema>,
    meta: Metadata,
  ): Promise<Document & Schema> {
    return await this.repository.restoreById(
      filter,
      this.makeRepositoryOptions('restore', meta),
    );
  }

  public async updateById(
    filter: OneFilter<Document & Schema>,
    update: UpdateDto,
    meta: Metadata,
  ): Promise<Document & Schema> {
    return await this.repository.updateById(
      filter,
      update,
      this.makeRepositoryOptions('update', meta),
    );
  }

  public async updateBulk(
    filter: CountFilter<Document & Schema>,
    update: UpdateDto,
    meta: Metadata,
  ): Promise<number> {
    return await this.repository.updateBulk(
      filter,
      update,
      this.makeRepositoryOptions('update', meta),
    );
  }

  public async destroyById(
    filter: OneFilter<Document & Schema>,
  ): Promise<Document & Schema> {
    return await this.repository.destroyById(filter);
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
