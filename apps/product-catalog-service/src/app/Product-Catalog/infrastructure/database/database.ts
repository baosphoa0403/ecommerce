import {CatalogEntity} from "../../domain/catalog/entities/catalog.entity";
import { ProductEntity } from '../../domain/product/entities/product.entity';
import * as abc from "./migrations/index"
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  database: "product-catalog-db",
  port: 5432,
  username: "root",
  password: "123",
  entities: [CatalogEntity, ProductEntity],
  migrations: [...Object.values({...abc})],
  logging: true,
  synchronize: true,
  migrationsTableName: "migrations",
})

export const runMigration = async () => {
  try {
    const connect = await dataSource.initialize();
    if (connect) {
      console.log("Data Source has been initialized!")
      console.info("Run Migrations")
      const migrations = await dataSource.runMigrations();
      if (migrations.length > 0)  {
        console.table(migrations);
      }
    }
  }catch (error){
    console.error("Error during Data Source initialization", error)
  }
}

