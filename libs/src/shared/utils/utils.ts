import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { OptionService, ServiceEnum } from '../enum';

export const getOptionsByService: Record<
  OptionService,
  { clientId: string; groupId: string }
> = {
  [ServiceEnum.AUTH_SERVICE]: {
    clientId: 'auth', // auth-client
    groupId: 'auth-consumer', // auth-consumer-client
  },
  [ServiceEnum.ORDER_SERVICE]: {
    clientId: 'order', // order-client
    groupId: 'order-consumer', // order-consumer-client
  },
  [ServiceEnum.PRODUCT_CATALOG_SERVICE]: {
    clientId: 'product-catalog', // product-catalog-client
    groupId: 'product-catalog-consumer', // product-catalog-consumer-client
  },
  [ServiceEnum.USER_SERVICE]: {
    clientId: 'user', // user-client
    groupId: 'user-consumer', // user-consumer-client
  },
};

export const runInit = async (dataSource: DataSource) => {
  try {
    const connect = await dataSource.initialize();
    if (connect) {
      console.log('Data Source has been initialized!');
      console.info('Run Migrations');
      const migrations = await dataSource.runMigrations();
      if (migrations.length > 0) {
        console.table(migrations);
      }
      await createDatabaseInit(dataSource);
    }
  } catch (error) {
    console.error('Error during Data Source initialization', error);
  }
};

export const createDatabaseInit = async (dataSource: DataSource) => {
  const queryRunner = dataSource.createQueryRunner();
  try {
    console.log('Initializing database creation');

    // Check if the database already exists
    const hasDatabases = await queryRunner.hasDatabase('user-db');
    if (hasDatabases) {
      console.log('Database "user-db" already exists');
      return;
    }

    // Create the database
    await queryRunner.createDatabase('user-db', true);
    console.log('Database "user-db" has been created successfully');
  } catch (error) {
    console.error('Error during database creation:', error);
  } finally {
    // Release the query runner
    await queryRunner.release();
  }
};

export function generateHash(password: string): string {
  return bcrypt.hashSync(password, 10);
}
