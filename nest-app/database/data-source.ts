import 'dotenv/config';
import { DataSource } from 'typeorm';
import { SupplierCategoryEntity } from '../src/features/categories/entity/supplier-category.entity';
import { MarketplaceCategoryEntity } from '../src/features/categories/entity/marketplace-category.entity';

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [SupplierCategoryEntity, MarketplaceCategoryEntity],
  migrations: ['database/migrations/*.ts'],
  synchronize: false,
});

async function bootstrap() {
  try {
    await dataSource.initialize();
    console.log('Data Source has been initialized!');
  } catch (error) {
    console.log('Error during Data Source initialization', error);
  }
}

void bootstrap();
