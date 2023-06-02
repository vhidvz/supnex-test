import { IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { MaterialInterface } from '@app/common/interfaces';
import { Field, InputType } from '@nestjs/graphql';
import { Category } from '@app/common/enums';
import { Type } from 'class-transformer';

import { CreateMeasurementDto } from './create-measurement.dto';
import { CreateDto } from '../base';

@InputType()
export class CreateMaterialDto
  extends CreateDto<MaterialInterface>
  implements MaterialInterface
{
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(Category)
  category: Category;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateMeasurementDto)
  @Field(() => CreateMeasurementDto)
  measurement: CreateMeasurementDto;
}
