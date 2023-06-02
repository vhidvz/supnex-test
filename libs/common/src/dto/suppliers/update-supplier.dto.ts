import { SupplierInterface } from '@app/common/interfaces';
import { IsOptional, IsString } from 'class-validator';

import { UpdateDto } from '../base';

export class UpdateSupplierDto
  extends UpdateDto<SupplierInterface>
  implements SupplierInterface
{
  @IsString()
  @IsOptional()
  name: string;
}
