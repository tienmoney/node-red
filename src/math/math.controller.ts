import { Controller, Get, Inject } from '@nestjs/common';
import {
  Client,
  ClientProxy,
  ClientProxyFactory,
  MessagePattern,
  Payload,
  Transport,
} from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
@ApiTags('math')
@Controller()
export class MathController {
  private client: ClientProxy;
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
    });
  }
  @Get()
  add(): Observable<number> {
    return this.client.send<number, number[]>('add', [1, 2, 3, 4, 5]);
  }

  @MessagePattern('add')
  accumulate(@Payload() data: number[]): number {
    return data.reduce((a, b) => a + b);
  }
}
