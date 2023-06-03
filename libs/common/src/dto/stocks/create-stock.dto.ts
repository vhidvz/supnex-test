import { IsInt, IsMongoId, IsNotEmpty, Min } from 'class-validator';
import { StockInterface } from '@app/common/interfaces';
import { InputType } from '@nestjs/graphql';

import { CreateDto } from '../base';

@InputType()
export class CreateStockDto
  extends CreateDto<StockInterface>
  implements StockInterface
{
  @IsMongoId()
  @IsNotEmpty()
  product_id: string;

  @IsMongoId()
  @IsNotEmpty()
  material_id: string;

  @Min(0)
  @IsInt()
  @IsNotEmpty()
  amount: number;
}
