import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { SuppliersService } from '@app/common/interfaces';
import { ClientGrpc } from '@nestjs/microservices';
import { APP } from '@app/common/consts';

const { SUPPLIERS } = APP;

@Injectable()
export class SuppliersProvider implements OnModuleInit {
  public service: SuppliersService;

  constructor(@Inject(SUPPLIERS.PACKAGE.SYMBOL) protected client: ClientGrpc) {}

  onModuleInit() {
    this.service = this.client.getService<SuppliersService>(
      SUPPLIERS.SERVICE.NAME,
    );
  }
}
