import { Module } from '@nestjs/common';
import { KafkaProducerService } from './producer.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [KafkaProducerService],
  exports: [KafkaProducerService],
})
export class KafkaProducerModule {}
