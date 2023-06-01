import { Inject, Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';

import { MONGO_URL } from './consts';

@Injectable()
export class MongoProvider extends MongoClient {
  constructor(@Inject(MONGO_URL) protected readonly url: string) {
    super(url);
  }
}
