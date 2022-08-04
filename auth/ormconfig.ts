import dotenv from 'dotenv';
import path from 'path';

const dotenv_path = path.resolve(process.cwd(), `.env`);
dotenv.config({ path: dotenv_path });

const DatabaseConfigForMigrations = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  // host: process.env.DB_HOST,
  // port: process.env.DB_PORT,
  // username: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: ['dist/src/**/*entity.js'],
  migrations: ['dist/src/migrations/**/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  options: { trustServerCertificate: true },
};

export default DatabaseConfigForMigrations;
