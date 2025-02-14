import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { getDatabaseConfig } from './database.config';

config({
  path: '.env',
  encoding: 'utf8',
  debug: true,
  override: false,
});

export default new DataSource({
  ...getDatabaseConfig(),
  migrations: [__dirname + '/../migrations/*.ts'],
  migrationsTableName: 'migrations',
  migrationsRun: true,
});
