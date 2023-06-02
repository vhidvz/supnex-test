import {
  CreateDto as BaseCreateDto,
  UpdateDto as BaseUpdateDto,
} from '@app/common/dto';
import type { Document, Model } from 'mongoose';

import { CountFilter, Filter, UniqueFilter } from '../interfaces';

export class Repository<
  Entity,
  CreateDto = BaseCreateDto<Entity>,
  UpdateDto = BaseUpdateDto<Entity>,
> {
  constructor(protected readonly model: Model<Document & Entity>) {}

  public async count(filter: CountFilter<Entity>): Promise<number> {
    return await this.model.countDocuments(filter.query).exec();
  }

  public async create(createDto: CreateDto): Promise<Document & Entity> {
    return await this.model.create({ ...createDto });
  }

  public async find(filter: Filter<Entity>): Promise<(Document & Entity)[]> {
    return await this.model
      .find(filter.query, filter.projection)
      .skip(filter.pagination?.skip)
      .sort(filter.pagination?.sort)
      .limit(filter.pagination?.limit)
      .exec();
  }

  public async findById(
    filter: UniqueFilter<Entity>,
  ): Promise<Document & Entity> {
    return await this.model.findById(filter.id, filter.projection).exec();
  }

  public async updateById(
    filter: UniqueFilter<Entity>,
    update: UpdateDto,
  ): Promise<Document & Entity> {
    return await this.model
      .findByIdAndUpdate(filter.id, { ...update }, { new: true })
      .select(filter.projection)
      .exec();
  }
}
