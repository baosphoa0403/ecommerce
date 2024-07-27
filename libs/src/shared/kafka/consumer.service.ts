import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { Consumer, Kafka } from 'kafkajs';

@Injectable()
export class ConsumerService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private consumer: Consumer;
  private topics: string[];

  constructor() {
    // topics: string[] // groupId: string, // brokers: string[], // clientId: ClientType,
    const clientId = 'Auth-Client';
    const brokers = ['localhost:9092'];
    const groupId = 'auth-consumer-client';
    const topics = ['public.auth.create.user'];
    const kafka = new Kafka({
      brokers,
      clientId,
    });

    this.consumer = kafka.consumer({ groupId: groupId });
    this.topics = topics;
  }

  onApplicationShutdown(signal?: string | undefined) {
    throw new Error('Method not implemented.');
  }

  async consumerMessage() {
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
        console.log(`- ${prefix} ${message.key}#${message.value}`);
      },
    });
  }

  async onApplicationBootstrap() {
    // subcribe topic
    await this.consumer.subscribe({ topics: this.topics });
  }
}
