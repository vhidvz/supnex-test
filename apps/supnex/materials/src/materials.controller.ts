import { Controller, Get } from '@nestjs/common';
import { MaterialsService } from './materials.service';

@Controller()
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Get()
  getHello(): string {
    return this.materialsService.getHello();
  }
}
