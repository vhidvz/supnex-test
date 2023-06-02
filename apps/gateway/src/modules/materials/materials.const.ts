import { ClientsModuleOptions, Transport } from '@nestjs/microservices';
import { APP } from '@app/common/consts';
import { join } from 'path';

const { MATERIALS } = APP;

export const clientsModuleOptions: ClientsModuleOptions = [
  {
    // Material Service
    name: MATERIALS.PACKAGE.SYMBOL,
    transport: Transport.GRPC,
    options: {
      loader: { keepCase: true },
      package: MATERIALS.PACKAGE.NAME,
      url: `0.0.0.0:${MATERIALS.GRPC_PORT}`,
      protoPath: join(__dirname, 'modules/materials/materials.proto'),
    },
  },
];
