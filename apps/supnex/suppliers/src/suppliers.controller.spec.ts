import { Test, TestingModule } from '@nestjs/testing';
import { SuppliersController } from './suppliers.controller';
import { SuppliersService } from './suppliers.service';

describe('SuppliersController', () => {
  let suppliersController: SuppliersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SuppliersController],
      providers: [SuppliersService],
    }).compile();

    suppliersController = app.get<SuppliersController>(SuppliersController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(suppliersController.getHello()).toBe('Hello World!');
    });
  });
});
