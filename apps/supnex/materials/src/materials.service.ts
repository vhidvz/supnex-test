import { Injectable } from '@nestjs/common';

@Injectable()
export class MaterialsService {
  getHello(): string {
    return 'Hello World!';
  }
}
