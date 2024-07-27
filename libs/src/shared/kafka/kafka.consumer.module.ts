import { Module } from '@nestjs/common';
import { ConsumerService } from 'libs/src/shared/kafka/consumer.service';

@Module({
  providers: [ConsumerService],
  exports: [ConsumerService],
})
export class kafkaConsumerModule {}
