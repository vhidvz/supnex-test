import {
  IsEnum,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';
import { ProductInterface } from '@app/common/interfaces';
import { Category } from '@app/common/enums';

import { CreateDto } from '../base';

export class CreateProductDto
  extends CreateDto<ProductInterface>
  implements ProductInterface
{
  @IsMongoId()
  @IsNotEmpty()
  supplier_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @Min(0)
  @IsInt()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsEnum(Category)
  category: Category;
}
