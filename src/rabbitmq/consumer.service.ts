import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { QueueService } from './queue.service';
import { ConfirmChannel } from 'amqplib';
import { InjectModel } from '@nestjs/mongoose';
import { Signal } from 'src/x_ray/entities/x_ray.entity';
import { Model } from 'mongoose';
import { sign } from 'crypto';

type signal = {
  [key: string]: {
    data: [[number, [number, number, number]]];
    time: number;
  };
};

// this function is checking rabbitMQ input, if it is not as we want so we can know this
function isSignal(obj: any): obj is signal {
  if (typeof obj !== 'object' || obj === null) return false;

  const keys = Object.keys(obj);
  if (keys.length !== 1) return false;

  const key = keys[0];
  const value = obj[key];

  if (
    typeof value !== 'object' ||
    value === null ||
    !Array.isArray(value.data) ||
    typeof value.time !== 'number'
  ) {
    return false;
  }

  return value.data.every(
    (dataItem: any) =>
      Array.isArray(dataItem) &&
      dataItem.length === 2 &&
      typeof dataItem[0] === 'number' &&
      Array.isArray(dataItem[1]) &&
      dataItem[1].length === 3 &&
      dataItem[1].every((num: any) => typeof num === 'number'),
  );
}

@Injectable()
export class ConsumerService implements OnModuleInit {
  private channelWrapper: ChannelWrapper;

  constructor(
    private queue: QueueService,
    @InjectModel(Signal.name) private signalModel: Model<Signal>,
  ) {
    const connection = amqp.connect([
      process.env.RABBIT_URI || 'amqp://localhost',
    ]);
    this.channelWrapper = connection.createChannel();
  }

  public async onModuleInit() {
    try {
      await this.channelWrapper.addSetup(async (channel: ConfirmChannel) => {
        await channel.assertQueue('x-ray', { durable: true });
        await channel.consume('x-ray', async (msg) => {
          if (msg) {
            const content = JSON.parse(msg.content.toString()) as signal;
            const result = isSignal(content);

            // if the content is valid add result to db, else just ignore
            if (result) {
              channel.ack(msg);
              let insertingData = {
                device_id: '',
                device_data: [
                  {
                    time: 0,
                    coordinates: {
                      'x-coordination': 0,
                      'y-coordination': 0,
                      speed: 0,
                    },
                  },
                ],
                time_stamp: 0,
              };

              const deviceId = Object.keys(content)[0];
              insertingData.device_id = deviceId;
              insertingData.time_stamp = content[deviceId].time;
              insertingData.device_data = content[deviceId].data.map(
                (data) => ({
                  time: data[0],
                  coordinates: {
                    'x-coordination': data[1][0],
                    'y-coordination': data[1][1],
                    speed: data[1][2],
                  },
                }),
              );

              this.signalModel.create(insertingData);
            } else {
              channel.ack(msg);
              console.log('invalid datas =>', content);
            }
          }
        });
      });
      console.log('consumer start listen to queue.');
    } catch (error) {
      console.log('consumer faild to start listen to queue =>', error);
    }
  }
}
