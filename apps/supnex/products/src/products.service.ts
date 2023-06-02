import { ProductInterface } from '@app/common/interfaces';
import { Injectable } from '@nestjs/common';
import { Service } from '@app/common/core';

import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService extends Service<ProductInterface> {
  constructor(repository: ProductsRepository) {
    super(repository);
  }
}
