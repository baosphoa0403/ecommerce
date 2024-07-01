import { DataSource } from 'typeorm';

export enum  GenderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE"
}

export enum ServiceEnum {
  ApiGateWay = "ApiGateWay",
  ProductCatalogService = "ProductCatalogService",
  UserService = "UserService",
  OrderService = "OrderService"
}

export interface IEnvironment {
  APP_PORT: string;
  APP_NAME: string;
  ENABLE_MIGRATE: string;
}

export const runMigration = async (dataSource: DataSource) => {
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
