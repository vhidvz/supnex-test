import { SupplierInterface } from '@app/common/interfaces';
import { Injectable } from '@nestjs/common';
import { Service } from '@app/common/core';

import { SuppliersRepository } from './suppliers.repository';

@Injectable()
export class SuppliersService extends Service<SupplierInterface> {
  constructor(repository: SuppliersRepository) {
    super(repository);
  }
}
