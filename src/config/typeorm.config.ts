import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Word } from '../words/word.entity';

config({
  path: '.env',
  encoding: 'utf8',
  debug: true,
  override: false,
});

console.log(process.env.DB_HOST);
console.log(process.env.DB_PORT);
console.log(process.env.DB_USERNAME);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_NAME);

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Word],
  migrations: [__dirname + '/../migrations/*.ts'],
  synchronize: false,
});
