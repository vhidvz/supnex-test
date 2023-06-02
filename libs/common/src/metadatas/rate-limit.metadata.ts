import { SetMetadata } from '@nestjs/common';

export const RATE_LIMIT = Symbol('RATE_LIMIT');
export const RateLimit = (
  options: { path?: string; ttl: number; limit: number } = {
    limit: 100,
    ttl: 1,
  },
  type: 'ip' = 'ip',
) => SetMetadata(RATE_LIMIT, { type, options });
