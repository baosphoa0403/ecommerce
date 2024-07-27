import { UserRepository } from './repository/user.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './database';

@Module({
  imports: [TypeOrmModule.forRoot(dataSource.options)],
})
export class DatabaseModule {}
