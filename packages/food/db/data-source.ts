import { resolve } from 'path';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

const dotenv_path = resolve(process.cwd(), `.env`);

config({ path: dotenv_path });

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  entities: ['dist/**/*entity.js'],
  migrations: ['dist/db/migrations/**/*.js'],
  migrationsRun: true,
  url: process.env.DATABASE_URL,
  schema: 'food',
};

export default new DataSource(dataSourceOptions);
