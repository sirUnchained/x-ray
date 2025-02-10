import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsumerService } from './consumer.service';
import { QueueService } from './queue.service';
import { Signal, SingnalSchema } from 'src/x_ray/entities/x_ray.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Signal.name, schema: SingnalSchema }]),
  ],
  controllers: [],
  providers: [QueueService, ConsumerService],
})
export class RabbitModule {}
