import { SupplierInterface } from '@app/common/interfaces';
import { Exclude, Expose, Type } from 'class-transformer';

import { SupplierSerializer } from './supplier.serializer';
import { ArraySerializer } from '../base';

@Exclude()
export class SuppliersSerializer implements ArraySerializer<SupplierInterface> {
  @Expose()
  @Type(() => SupplierSerializer)
  items: SupplierSerializer[];
}
