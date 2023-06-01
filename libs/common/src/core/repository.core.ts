import type { Cursor, Document, Model } from 'mongoose';

import { CreateDto as BaseCreateDto, UpdateDto as BaseUpdateDto } from '../dto';
import type { CountFilter, Filter, OneFilter } from '../interfaces';
import {
  CreateRepositoryOptions,
  DeleteRepositoryOptions,
  RestoreRepositoryOptions,
  UpdateRepositoryOptions,
} from './options';

export class Repository<
  Schema,
  CreateDto = BaseCreateDto<Schema>,
  UpdateDto = BaseUpdateDto<Schema>,
> {
  constructor(protected readonly model: Model<Document & Schema>) {}

  public async count(filter: CountFilter<Schema>): Promise<number> {
    return await this.model.countDocuments(filter.query).exec();
  }

  public async create(
    createDto: CreateDto,
    options: CreateRepositoryOptions,
  ): Promise<Document & Schema> {
    return await this.model.create({ ...createDto, ...options });
  }

  public cursor(filter: Filter<Schema>): Cursor<Document & Schema, any> {
    return this.model
      .find(filter.query, filter.projection)
      .skip(filter.pagination?.skip)
      .sort(filter.pagination?.sort)
      .limit(filter.pagination?.limit)
      .cursor();
  }

  public async findOne(filter: OneFilter<Schema>): Promise<Document & Schema> {
    return await this.model.findOne(filter.query, filter.projection).exec();
  }

  public async findMany(
    filter: Filter<Schema>,
  ): Promise<(Document & Schema)[]> {
    return await this.model
      .find(filter.query, filter.projection)
      .skip(filter.pagination?.skip)
      .sort(filter.pagination?.sort)
      .limit(filter.pagination?.limit)
      .exec();
  }

  public async findById(filter: OneFilter<Schema>): Promise<Document & Schema> {
    return await this.model.findOne(filter.query, filter.projection).exec();
  }

  public async deleteById(
    filter: OneFilter<Schema>,
    options: DeleteRepositoryOptions,
  ): Promise<Document & Schema> {
    options.deleted_at = options.deleted_at ?? new Date();

    return await this.model
      .findOneAndUpdate(filter.query, options, { new: true })
      .select(filter.projection)
      .exec();
  }

  public async restoreById(
    filter: OneFilter<Schema>,
    options: RestoreRepositoryOptions,
  ): Promise<Document & Schema> {
    options.restored_at = options.restored_at ?? new Date();

    return await this.model
      .findOneAndUpdate(filter.query, options, { new: true })
      .select(filter.projection)
      .exec();
  }

  public async updateById(
    filter: OneFilter<Schema>,
    update: UpdateDto,
    options: UpdateRepositoryOptions,
  ): Promise<Document & Schema> {
    options.updated_at = options.updated_at ?? new Date();

    return await this.model
      .findOneAndUpdate(filter.query, { ...update, ...options }, { new: true })
      .select(filter.projection)
      .exec();
  }

  public async updateBulk(
    filter: OneFilter<Schema>,
    update: UpdateDto,
    options: UpdateRepositoryOptions,
  ): Promise<number> {
    options.updated_at = options.updated_at ?? new Date();

    return (
      await this.model
        .updateMany(filter.query, { ...update, ...options })
        .exec()
    ).modifiedCount;
  }

  public async destroyById(
    filter: OneFilter<Schema>,
  ): Promise<Document & Schema> {
    return await this.model
      .findOneAndDelete(filter.query)
      .select(filter.projection)
      .exec();
  }
}
