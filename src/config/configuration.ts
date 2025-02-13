import { config } from 'dotenv';

config({
  path: '.env',
  encoding: 'utf8',
  debug: true,
  override: false,
});

export default () => ({
  database: {
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
});
