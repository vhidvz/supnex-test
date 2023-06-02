import { ClientsModuleOptions, Transport } from '@nestjs/microservices';
import { APP } from '@app/common/consts';
import { join } from 'path';

const { PRODUCTS } = APP;

export const clientsModuleOptions: ClientsModuleOptions = [
  {
    // Product Service
    name: PRODUCTS.PACKAGE.SYMBOL,
    transport: Transport.GRPC,
    options: {
      loader: { keepCase: true },
      package: PRODUCTS.PACKAGE.NAME,
      url: `0.0.0.0:${PRODUCTS.GRPC_PORT}`,
      protoPath: join(__dirname, 'modules/products/products.proto'),
    },
  },
];
