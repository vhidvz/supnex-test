import { MeasurementInterface } from '@app/common/interfaces';
import { IsNotEmpty, IsString } from 'class-validator';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateMeasurementDto implements MeasurementInterface {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  symbol: string;
}
