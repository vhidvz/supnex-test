import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { GatewayModule } from '../../src/gateway.module';

describe('GatewayController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [GatewayModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/products/count (GET)', () => {
    return request(app.getHttpServer())
      .get('/products/count')
      .expect(200, { count: 3 });
  });
});
