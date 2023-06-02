import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  RequestMethod,
} from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RedisService } from '@app/redis';
import { Reflector } from '@nestjs/core';
import type { Observable } from 'rxjs';

import { RATE_LIMIT } from '../metadatas';
import { date, logger } from '../utils';

export const RATE_LIMIT_KEY = 'rate-limit';

export interface RateLimitInterceptorRequest {
  ip: string;
  originalUrl: string;
  method: RequestMethod;
}

@Injectable()
export class RateLimitInterceptor implements NestInterceptor {
  private readonly log = logger(RateLimitInterceptor.name);

  constructor(
    private reflector: Reflector,

    private readonly redisService: RedisService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctxClass = context.getClass();
    const ctxHandler = context.getHandler();

    let { type, options } =
      this.reflector.getAllAndOverride<{
        options: { path?: string; ttl: number; limit: number };
        type: 'ip';
      }>(RATE_LIMIT, [ctxHandler, ctxClass]) ?? {};

    let req: RateLimitInterceptorRequest;
    if (context.getType() === 'http') {
      req = context.switchToHttp().getRequest();
    } else if ((context.getType() as GqlContextType) === 'graphql') {
      req = GqlExecutionContext.create(context).getContext()['req'];
    } else throw new Error('RateLimitInterceptor only support http protocol');

    if (!options) options = { path: req.originalUrl, limit: 100, ttl: 1 };

    type = type ?? 'ip';

    const redis = this.redisService;

    let key = `${RATE_LIMIT_KEY}`;
    if (options.path) key += `:${options.path}`;

    key += `:${req.ip}`;

    const cache = parseInt(await redis.get(key));

    this.log
      .get(this.intercept.name)
      .debug(
        date(
          `rate limit with value ${cache} called at path ${req.originalUrl} with method ${req.method} and type ${type} and options %j`,
        ),
        options,
      );

    if (!cache) {
      await redis.setex(key, 1, options.ttl);
    } else {
      if (cache > options.limit) {
        throw new HttpException(
          'Too many request rate limit exceeded',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }

      await redis.setex(key, cache + 1, options.ttl);
    }

    return next.handle();
  }
}
