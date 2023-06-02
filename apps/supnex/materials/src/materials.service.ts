import { MaterialInterface } from '@app/common/interfaces';
import { Injectable } from '@nestjs/common';
import { Service } from '@app/common/core';

import { MaterialsRepository } from './materials.repository';

@Injectable()
export class MaterialsService extends Service<MaterialInterface> {
  constructor(repository: MaterialsRepository) {
    super(repository);
  }
}
