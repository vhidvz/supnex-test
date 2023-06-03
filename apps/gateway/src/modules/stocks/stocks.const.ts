import { ClientsModuleOptions, Transport } from '@nestjs/microservices';
import { KAFKA_CONFIG } from '@app/common/configs';
import { deserializer } from '@app/common/utils';
import { APP } from '@app/common/consts';

const { STOCKS } = APP;

export const clientsModuleOptions: ClientsModuleOptions = [
  {
    // Stock Service
    name: STOCKS.SERVICE.SYMBOL,
    transport: Transport.KAFKA,
    options: {
      deserializer: deserializer,
      subscribe: { fromBeginning: true },
      consumer: { groupId: STOCKS.CONSUMER.GROUP_ID },
      client: { clientId: STOCKS.CLIENT.ID, brokers: [KAFKA_CONFIG()] },
    },
  },
];
