import { SupplierInterface } from '@app/common/interfaces';
import { IsNotEmpty, IsString } from 'class-validator';

import { CreateDto } from '../base';

export class CreateSupplierDto
  extends CreateDto<SupplierInterface>
  implements SupplierInterface
{
  @IsString()
  @IsNotEmpty()
  name: string;
}
