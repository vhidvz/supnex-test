import { IsInt, IsMongoId, IsOptional, Min } from 'class-validator';
import { StockInterface } from '@app/common/interfaces';

import { UpdateDto } from '../base';

export class UpdateStockDto
  extends UpdateDto<StockInterface>
  implements StockInterface
{
  @IsMongoId()
  @IsOptional()
  product_id: string;

  @IsMongoId()
  @IsOptional()
  material_id: string;

  @Min(0)
  @IsInt()
  @IsOptional()
  amount: number;
}
