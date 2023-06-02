import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { KafkaContext } from '@nestjs/microservices';
import { FilterDto } from '@app/common/dto';

export const Filter = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    switch (ctx.getType()) {
      case 'graphql' as GqlContextType:
      case 'http': {
        const filter: FilterDto = { query: {} };

        let req: { filter: any };
        if (ctx.getType() === 'http') {
          req = ctx.switchToHttp().getRequest();
          Object.assign(filter, req.filter);
        } else if ((ctx.getType() as GqlContextType) === 'graphql') {
          req = GqlExecutionContext.create(ctx).getContext()['req'];

          const { fieldName } = GqlExecutionContext.create(ctx).getInfo<{
            fieldName: string;
          }>();

          const make = (key: 'query' | 'projection' | 'pagination') => {
            const { [`$$${fieldName}`]: obj, ...restObj } = req.filter[key];

            const rest: any = {};
            for (const [k, val] of Object.entries(restObj)) {
              if (!k.startsWith('$$')) rest[k] = val;
            }

            return obj ? { ...obj, ...rest } : rest;
          };

          Object.assign(filter, {
            query: make('query'),
            projection: make('projection'),
            pagination: make('pagination'),
          });
        } else
          throw new Error('Filter param decorator only support http protocol');

        if (!req.filter)
          throw new Error(
            'Filter param decorator must be used with AuthorityInterceptor',
          );

        return filter;
      }
      case 'rpc':
        const context = ctx.switchToRpc().getContext();

        if (context instanceof KafkaContext) {
          return context.getMessage()['value'];
        } else return ctx.switchToRpc().getData();
      case 'ws':
        throw new Error('Filter param decorator is not implemented yet');
      default:
        throw new Error('Unknown context type');
    }
  },
);
