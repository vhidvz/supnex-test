import type { Document } from 'mongoose';

import { CreateDto as BaseCreateDto, UpdateDto as BaseUpdateDto } from '../dto';
import type { CountFilter, Filter, UniqueFilter } from '../interfaces';
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

  public async create(createDto: CreateDto): Promise<Document & Schema> {
    return await this.repository.create(createDto);
  }

  public async find(
    filter: Filter<Document & Schema>,
  ): Promise<(Document & Schema)[]> {
    return await this.repository.find(filter);
  }

  public async findById(
    filter: UniqueFilter<Document & Schema>,
  ): Promise<Document & Schema> {
    return await this.repository.findById(filter);
  }

  public async updateById(
    filter: UniqueFilter<Document & Schema>,
    update: UpdateDto,
  ): Promise<Document & Schema> {
    return await this.repository.updateById(filter, update);
  }
}
