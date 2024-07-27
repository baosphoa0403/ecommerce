import { ConfigService } from '@nestjs/config';
import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { Kafka, Message, Partitioners, Producer } from 'kafkajs';

@Injectable()
export class KafkaProducerService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly kafka: Kafka;
  private readonly producer: Producer;

  constructor(private configService: ConfigService) {
    const brokers = this.configService.get<string>('KAFKA_BROKER') as string;
    this.kafka = new Kafka({
      brokers: [brokers],
    });
    this.producer = this.kafka.producer({
      createPartitioner: Partitioners.LegacyPartitioner,
    });
  }

  async produceSend(topic: string, messages: Message[]) {
    await this.producer.connect();
    await this.producer.send({ topic, messages });
  }

  async produceEmit(topic: string, messages: Message[]) {
    await this.producer.connect();
    await this.producer.send({ topic, messages });
  }

  async onApplicationShutdown(signal?: string | undefined) {
    // throw new Error('Method not implemented.');
    console.log('shut down', signal);
    await this.producer.disconnect();
  }

  onApplicationBootstrap() {
    // throw new Error('Method not implemented.');
    console.log('onApplicationBootstrap api gateway connect producer ');
  }
}
