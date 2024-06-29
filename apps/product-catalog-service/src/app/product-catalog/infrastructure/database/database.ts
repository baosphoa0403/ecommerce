import * as migrations from "./migrations/index"
import { DataSource } from 'typeorm';
import { CatalogEntity } from '../../domain/catalog/entities/catalog.entity';
import { ProductEntity } from '../../domain/product/entities/product.entity';

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  database: "product-catalog-db",
  port: 5432,
  username: "root",
  password: "123",
  entities: [CatalogEntity, ProductEntity],
  migrations: [...Object.values({...migrations})],
  logging: true,
  synchronize: true,
  migrationsTableName: "migrations",
})



