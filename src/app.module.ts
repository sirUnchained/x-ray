import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { XRayModule } from './x_ray/x_ray.module';
import { RabbitModule } from './rabbitmq/rabbit.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/ph_ta'),
    XRayModule,
    RabbitModule,
  ],
})
export class AppModule {}
