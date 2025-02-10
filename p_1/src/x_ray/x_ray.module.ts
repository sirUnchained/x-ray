import { Module } from '@nestjs/common';
import { XRayService } from './x_ray.service';
import { XRayController } from './x_ray.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Signal, SingnalSchema } from './entities/x_ray.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Signal.name, schema: SingnalSchema }]),
  ],
  controllers: [XRayController],
  providers: [XRayService],
})
export class XRayModule {}
