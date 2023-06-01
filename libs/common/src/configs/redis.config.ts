import type { RedisOptions } from 'ioredis';

export function REDIS_CONFIG(): RedisOptions {
  const password = process.env.REDIS_PASS;
  const host = process.env.REDIS_HOST || 'localhost';
  const port = parseInt(process.env.REDIS_PORT || '6379');

  return { port, host, password };
}
