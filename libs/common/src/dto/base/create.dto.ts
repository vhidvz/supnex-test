import { HideField, InputType } from '@nestjs/graphql';
import { BaseInterface } from '@app/common/interfaces';
import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@InputType()
export class CreateDto<T> implements BaseInterface {
  @Exclude()
  @HideField()
  @ApiHideProperty()
  id?: string;

  @Exclude()
  @HideField()
  @ApiHideProperty()
  created_at?: Date;

  @Exclude()
  @HideField()
  @ApiHideProperty()
  updated_at?: Date;

  constructor(data?: Partial<T>) {
    if (data) Object.assign(this, data);
  }
}
