import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ProductsService } from '@app/common/interfaces';
import { ClientGrpc } from '@nestjs/microservices';
import { APP } from '@app/common/consts';

const { PRODUCTS } = APP;

@Injectable()
export class ProductsProvider implements OnModuleInit {
  public service: ProductsService;

  constructor(@Inject(PRODUCTS.PACKAGE.SYMBOL) protected client: ClientGrpc) {}

  onModuleInit() {
    this.service = this.client.getService<ProductsService>(
      PRODUCTS.SERVICE.NAME,
    );
  }
}
