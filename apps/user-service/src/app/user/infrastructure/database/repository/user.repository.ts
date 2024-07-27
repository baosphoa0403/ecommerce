import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@ecommerce/libs';
import { UserEntity } from '../../../domain/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {
    super(userRepository);
  }
}
