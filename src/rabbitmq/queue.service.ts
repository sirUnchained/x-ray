import { Injectable } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';

@Injectable()
export class QueueService {
  private channelWrapper: ChannelWrapper;

  constructor() {
    const connection = amqp.connect([
      process.env.RABBIT_URI || 'amqp://localhost',
    ]);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue('x-ray', { durable: true }); // make sure that the queue will survive server restart
      },
    });
  }
}
