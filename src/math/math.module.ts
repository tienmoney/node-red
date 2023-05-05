import { Module } from '@nestjs/common';
import { MathController } from './math.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MathService } from './math.service';

@Module({
  imports: [],
  controllers: [MathController],
  providers: [MathService],
})
export class MathModule {}
