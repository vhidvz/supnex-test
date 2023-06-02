import { ClientsModuleOptions, Transport } from '@nestjs/microservices';
import { APP } from '@app/common/consts';
import { join } from 'path';

const { SUPPLIERS } = APP;

export const clientsModuleOptions: ClientsModuleOptions = [
  {
    // Supplier Service
    name: SUPPLIERS.PACKAGE.SYMBOL,
    transport: Transport.GRPC,
    options: {
      loader: { keepCase: true },
      package: SUPPLIERS.PACKAGE.NAME,
      url: `0.0.0.0:${SUPPLIERS.GRPC_PORT}`,
      protoPath: join(__dirname, 'modules/suppliers/suppliers.proto'),
    },
  },
];
