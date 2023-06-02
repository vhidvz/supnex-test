import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { date, logger } from '../utils/logger.util';
import { GqlContextType } from '@nestjs/graphql';
import { WsException } from '@nestjs/websockets';
import { Response } from 'express';
import { throwError } from 'rxjs';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly log = logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    this.log
      .get(this.catch.name)
      .error(
        date(`exception type ${host.getType()} occurred with error %j`),
        'message' in exception ? exception.message : exception,
      );

    this.log
      .get(this.catch.name)
      .debug(
        date(`exception type ${host.getType()} occurred with stack %j`),
        'stack' in exception ? exception.stack : exception,
      );

    switch (host.getType()) {
      case 'http':
        {
          const res = host.switchToHttp().getResponse<Response>();

          const status =
            exception instanceof HttpException
              ? exception.getStatus()
              : HttpStatus.INTERNAL_SERVER_ERROR;

          res
            .status(status)
            .json({
              statusCode: status,
              message: exception.message,
              ...('code' in exception ? { error: exception.code } : {}),
            })
            .end();
        }
        break;
      case 'rpc': {
        return throwError(() =>
          exception instanceof RpcException
            ? exception
            : new RpcException(exception),
        );
      }
      case 'ws': {
        return throwError(() =>
          exception instanceof WsException
            ? exception
            : new WsException(exception),
        );
      }
      default: {
        if ((host.getType() as GqlContextType) === 'graphql') {
          return exception;
        } else throw new Error('Unknown context type');
      }
    }
  }
}
