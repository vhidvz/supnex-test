import {
  IsEnum,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ProductInterface } from '@app/common/interfaces';
import { Category } from '@app/common/enums';
import { InputType } from '@nestjs/graphql';

import { UpdateDto } from '../base';

@InputType()
export class UpdateProductDto
  extends UpdateDto<ProductInterface>
  implements ProductInterface
{
  @IsMongoId()
  @IsOptional()
  supplier_id: string;

  @IsString()
  @IsOptional()
  name: string;

  @Min(0)
  @IsInt()
  @IsOptional()
  price: number;

  @IsOptional()
  @IsEnum(Category)
  category: Category;
}
