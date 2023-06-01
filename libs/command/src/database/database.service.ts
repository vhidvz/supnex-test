import { Command, CommandRunner, Option } from 'nest-commander';
import { Injectable } from '@nestjs/common';

import { MongoService } from './mongo/mongo.service';

interface DatabaseCommandOptions {
  database?: true | { mongo?: boolean };
}

@Injectable()
@Command({
  name: 'db',
  arguments: '<task>',
  description: 'db commands',
  subCommands: [MongoService as any],
})
export class DatabaseService extends CommandRunner {
  constructor(private readonly mongoService: MongoService) {
    super();
  }

  async run(
    passedParams: string[],
    options?: DatabaseCommandOptions,
  ): Promise<void> {
    if (passedParams.includes('mock')) await this.mock(options);
    if (passedParams.includes('clean')) await this.clean(options);
  }

  async mock(options?: DatabaseCommandOptions): Promise<void> {
    console.log('Mocking database...');

    const cond = (db: string) =>
      (typeof options?.database === 'boolean' && options.database) ||
      (typeof options?.database === 'object' && options.database[db]);

    if (cond('mongo')) await this.mongoService.mock({ collection: true });

    console.log('Database mocked ;)');
  }

  async clean(options?: DatabaseCommandOptions): Promise<void> {
    console.log('Clearing database ...');

    const cond = (db: string) =>
      (typeof options?.database === 'boolean' && options.database) ||
      (typeof options?.database === 'object' && options.database[db]);

    if (cond('mongo')) await this.mongoService.drop({ collection: true });

    console.log('Database cleared ;)');
  }

  @Option({
    required: false,
    defaultValue: true,
    flags: '-db, --database [string]',
    description: 'database',
  })
  parseString(val: string): DatabaseCommandOptions['database'] {
    return {
      mongo: val.split(',').includes('mongo'),
    };
  }
}
