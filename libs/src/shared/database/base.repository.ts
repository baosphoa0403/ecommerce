// src/common/repositories/base.repository.ts
import {
  Repository,
  DeepPartial,
  FindOneOptions,
  FindManyOptions,
  ObjectLiteral,
} from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

export abstract class BaseRepository<T extends ObjectLiteral> {
  constructor(private readonly repository: Repository<T>) {}

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async update(
    id: string | number,
    data: QueryDeepPartialEntity<T>
  ): Promise<UpdateResult> {
    return await this.repository.update(id, data);
  }

  async delete(id: string | number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
  }

  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    return await this.repository.findOne(options);
  }

  async findMany(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

  async findById(id: string | number): Promise<T> {
    const entity = await this.repository.findOne({
      where: { id } as any,
    } as FindOneOptions<T>);
    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return entity;
  }
}
