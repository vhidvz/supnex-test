import { Transport } from '@nestjs/microservices';

export type Check =
  | 'disk'
  | 'memory'
  | 'mongo'
  | 'redis'
  | 'micro'
  | 'kafka'
  | 'grpc';

export type HealthCheckOptions = (
  | {
      [key in Check]?:
        | {
            key?: string;
            options?: any;
            service?: string; // grpc
            transport?: Transport; // micro
          }
        | undefined
        | null;
    }
  | Check
)[];
