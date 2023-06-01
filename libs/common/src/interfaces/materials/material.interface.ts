import { Category } from '@app/common/enums';

import { Measurement } from './measurement.interface';
import { BaseInterface } from '../base';

export interface Material extends BaseInterface {
  name: string;
  category: Category;
  measurement: Measurement;
}

export type MaterialInterface = Material;
