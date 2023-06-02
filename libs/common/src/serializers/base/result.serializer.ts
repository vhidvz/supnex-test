import { ResultInterface } from '@app/common/interfaces';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ResultSerializer implements ResultInterface {
  @Expose()
  @ApiProperty({ type: String, enum: ['OK'] })
  result: 'OK';

  static build(result: 'OK'): ResultSerializer {
    return new ResultSerializer({ result });
  }

  constructor(data?: Partial<ResultSerializer>) {
    if (data) Object.assign(this, data);
  }
}
