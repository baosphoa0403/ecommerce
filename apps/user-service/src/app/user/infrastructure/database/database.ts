import { DataSource } from 'typeorm';
import { UserEntity } from '../../domain/user/entities/user.entity';
import * as migrations from "./migrations/index"

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  database: "user-db",
  port: 5435,
  username: "root",
  password: "123",
  entities: [UserEntity],
  migrations: [...Object.values({...migrations})],
  logging: true,
  synchronize: true,
  migrationsTableName: "migrations",
})
