import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';
import * as crypto from 'crypto';

import { date, logger } from '../utils';

@Injectable()
export class XRequestIdInterceptor implements NestInterceptor {
  private readonly log = logger(XRequestIdInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let xRequestId: string = crypto.randomUUID();

    switch (context.getType()) {
      case 'http': {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();

        xRequestId = req.headers['x-request-id'] ?? xRequestId;

        req.headers['x-request-id'] = xRequestId;
        res.setHeader('x-request-id', xRequestId);

        return next.handle();
      }
      case 'rpc': {
        throw new Error('gRPC x request id interceptor is not implemented yet');
      }
      case 'ws': {
        throw new Error(
          'WebSocket x request id interceptor is not implemented yet',
        );
      }
      default: {
        if ((context.getType() as GqlContextType) === 'graphql') {
          const req = GqlExecutionContext.create(context).getContext()['req'];

          xRequestId = req.headers['x-request-id'] ?? xRequestId;

          req.headers['x-request-id'] = xRequestId;
        } else throw new Error('Unknown context type');
      }
    }

    this.log
      .get(this.intercept.name)
      .info(date(`request received with request id: ${xRequestId}`));

    return next.handle();
  }
}
