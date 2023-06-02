import { SupplierInterface } from '@app/common/interfaces';
import { IsOptional, IsString } from 'class-validator';
import { InputType } from '@nestjs/graphql';

import { UpdateDto } from '../base';

@InputType()
export class UpdateSupplierDto
  extends UpdateDto<SupplierInterface>
  implements SupplierInterface
{
  @IsString()
  @IsOptional()
  name: string;
}
