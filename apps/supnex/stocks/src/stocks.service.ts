import { Injectable } from '@nestjs/common';

@Injectable()
export class StocksService {
  getHello(): string {
    return 'Hello World!';
  }
}
