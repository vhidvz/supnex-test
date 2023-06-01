import { Command, CommandRunner, Option } from 'nest-commander';
import { Injectable } from '@nestjs/common';

import { MongoProvider } from './mongo.provider';
import * as mocks from './collections/mocks';

interface MongoCommandOptions {
  collection?: string[] | true;
}

@Injectable()
@Command({
  name: 'mongo',
  arguments: '<task>',
  options: { isDefault: true },
  description: 'MongoDB commands',
})
export class MongoService extends CommandRunner {
  constructor(private readonly mongoProvider: MongoProvider) {
    super();
  }

  async run(
    passedParams: string[],
    options?: MongoCommandOptions,
  ): Promise<void> {
    if (passedParams.includes('mock')) await this.mock(options);
    if (passedParams.includes('drop')) await this.drop(options);
  }

  async mock(options?: MongoCommandOptions): Promise<void> {
    await this.mongoProvider.connect();
    console.log('Mocking mongo...');

    for (const collectionName of Object.keys(mocks)) {
      if (this.cond(collectionName, options)) {
        await this.mongoProvider
          .db()
          .collection(collectionName)
          .insertMany(mocks[collectionName]);

        console.log(
          '\x1b[32m%s\x1b[0m',
          `Inserted ${mocks[collectionName].length} documents into the ${collectionName} collection`,
        );
      }
    }

    await this.mongoProvider.close();
    console.log('Mongo mocked ;)');
  }

  async drop(options?: MongoCommandOptions): Promise<void> {
    await this.mongoProvider.connect();
    console.log('Dropping mongo...');

    const collections = await this.mongoProvider
      .db()
      .listCollections()
      .toArray();

    for (const collection of collections) {
      if (this.cond(collection.name, options)) {
        await this.mongoProvider.db().collection(collection.name).dropIndexes();
        await this.mongoProvider.db().collection(collection.name).drop();

        console.log(
          '\x1b[32m%s\x1b[0m',
          `Dropped ${collection.name} collection from database.`,
        );
      }
    }

    await this.mongoProvider.close();
    console.log('Mongo Dropped ;)');
  }

  @Option({
    required: false,
    defaultValue: true,
    flags: '-c, --collection [string]',
    description: 'Collection names',
  })
  parseString(val: string): MongoCommandOptions['collection'] {
    return val.split(',');
  }

  private cond(collection: string, options?: MongoCommandOptions): boolean {
    return (
      (typeof options?.collection === 'boolean' && options.collection) ||
      (typeof options?.collection === 'object' &&
        options.collection.includes(collection))
    );
  }
}
