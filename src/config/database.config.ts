import { Word } from '../words/word.entity';
import { User } from '../users/user.entity';
export const getDatabaseConfig = () => ({
  type: 'postgres' as const,
  url: process.env.DATABASE_URL,
  entities: [User, Word],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false,
  },
});
