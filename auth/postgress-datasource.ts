import path from 'path';
import dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { setupDatabaseSchema } from 'typeorm-extension';

const dotenv_path = path.resolve(process.cwd(), `.env`);
dotenv.config({ path: dotenv_path });

const options: PostgresConnectionOptions = {
  type: 'postgres',
  entities: ['dist/src/**/*entity.js'],
  migrations: ['dist/src/migrations/**/*.js'],
  migrationsRun: true,
  url: process.env.DATABASE_URL,
  schema: 'auth',
};

console.log({ options });

export default new DataSource(options);
