import { MaterialInterface } from '@app/common/interfaces';
import { MaterialDocument } from '@app/common/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Repository } from '@app/common/core';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Material } from './schema';

@Injectable()
export class MaterialsRepository extends Repository<MaterialInterface> {
  constructor(
    @InjectModel(Material.name) readonly model: Model<MaterialDocument>,
  ) {
    super(model);
  }
}
