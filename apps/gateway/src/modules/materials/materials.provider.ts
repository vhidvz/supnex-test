import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { MaterialsService } from '@app/common/interfaces';
import { ClientGrpc } from '@nestjs/microservices';
import { APP } from '@app/common/consts';

const { MATERIALS } = APP;

@Injectable()
export class MaterialsProvider implements OnModuleInit {
  public service: MaterialsService;

  constructor(@Inject(MATERIALS.PACKAGE.SYMBOL) protected client: ClientGrpc) {}

  onModuleInit() {
    this.service = this.client.getService<MaterialsService>(
      MATERIALS.SERVICE.NAME,
    );
  }
}
