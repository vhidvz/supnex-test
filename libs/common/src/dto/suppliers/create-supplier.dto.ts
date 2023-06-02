import { SupplierInterface } from '@app/common/interfaces';
import { IsNotEmpty, IsString } from 'class-validator';
import { InputType } from '@nestjs/graphql';

import { CreateDto } from '../base';

@InputType()
export class CreateSupplierDto
  extends CreateDto<SupplierInterface>
  implements SupplierInterface
{
  @IsString()
  @IsNotEmpty()
  name: string;
}
