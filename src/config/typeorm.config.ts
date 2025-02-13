import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Word } from '../words/word.entity';
import { User } from '../users/user.entity';

config({
  path: '.env',
  encoding: 'utf8',
  debug: true,
  override: false,
});

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Word, User],
  migrations: [__dirname + '/../migrations/*.ts'],
  synchronize: false,
});
