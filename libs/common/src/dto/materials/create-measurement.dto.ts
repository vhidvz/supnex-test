import { MeasurementInterface } from '@app/common/interfaces';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMeasurementDto implements MeasurementInterface {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  symbol: string;
}
