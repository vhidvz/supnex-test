import { Test, TestingModule } from '@nestjs/testing';
import { MaterialsController } from './materials.controller';
import { MaterialsService } from './materials.service';

describe('MaterialsController', () => {
  let materialsController: MaterialsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MaterialsController],
      providers: [MaterialsService],
    }).compile();

    materialsController = app.get<MaterialsController>(MaterialsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(materialsController.getHello()).toBe('Hello World!');
    });
  });
});
