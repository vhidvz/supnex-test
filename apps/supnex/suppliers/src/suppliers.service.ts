import { Injectable } from '@nestjs/common';

@Injectable()
export class SuppliersService {
  getHello(): string {
    return 'Hello World!';
  }
}
