import { Controller, Get } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';

@Controller()
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Get()
  getHello(): string {
    return this.suppliersService.getHello();
  }
}
