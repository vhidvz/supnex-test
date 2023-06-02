import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { MaterialInterface } from '@app/common/interfaces';
import { Field, InputType } from '@nestjs/graphql';
import { Category } from '@app/common/enums';
import { Type } from 'class-transformer';

import { UpdateMeasurementDto } from './update-measurement.dto';
import { UpdateDto } from '../base';

@InputType()
export class UpdateMaterialDto
  extends UpdateDto<MaterialInterface>
  implements MaterialInterface
{
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  @IsEnum(Category)
  category: Category;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateMeasurementDto)
  @Field(() => UpdateMeasurementDto)
  measurement: UpdateMeasurementDto;
}
