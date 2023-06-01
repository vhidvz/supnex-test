import type { Document, Model } from 'mongoose';

import { CreateDto as BaseCreateDto, UpdateDto as BaseUpdateDto } from '../dto';
import type { CountFilter, Filter, OneFilter } from '../interfaces';

export class Repository<
  Schema,
  CreateDto = BaseCreateDto<Schema>,
  UpdateDto = BaseUpdateDto<Schema>,
> {
  constructor(protected readonly model: Model<Document & Schema>) {}

  public async count(filter: CountFilter<Schema>): Promise<number> {
    return await this.model.countDocuments(filter.query).exec();
  }

  public async create(createDto: CreateDto): Promise<Document & Schema> {
    return await this.model.create({ ...createDto });
  }

  public async findOne(filter: OneFilter<Schema>): Promise<Document & Schema> {
    return await this.model.findOne(filter.query, filter.projection).exec();
  }

  public async find(filter: Filter<Schema>): Promise<(Document & Schema)[]> {
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

  public async updateById(
    filter: OneFilter<Schema>,
    update: UpdateDto,
  ): Promise<Document & Schema> {
    return await this.model
      .findOneAndUpdate(filter.query, { ...update }, { new: true })
      .select(filter.projection)
      .exec();
  }
}
