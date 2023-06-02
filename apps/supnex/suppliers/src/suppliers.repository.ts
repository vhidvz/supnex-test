import { SupplierInterface } from '@app/common/interfaces';
import { SupplierDocument } from '@app/common/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Repository } from '@app/common/core';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Supplier } from './schema';

@Injectable()
export class SuppliersRepository extends Repository<SupplierInterface> {
  constructor(
    @InjectModel(Supplier.name) readonly model: Model<SupplierDocument>,
  ) {
    super(model);
  }
}
