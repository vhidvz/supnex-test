import { ProductInterface } from '@app/common/interfaces';
import { ProductDocument } from '@app/common/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Repository } from '@app/common/core';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Product } from './schema';

@Injectable()
export class ProductsRepository extends Repository<ProductInterface> {
  constructor(
    @InjectModel(Product.name) readonly model: Model<ProductDocument>,
  ) {
    super(model);
  }
}
