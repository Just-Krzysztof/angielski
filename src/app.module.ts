import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordsModule } from './words/words.module';
import { UsersModule } from './users/users.module';
import { getDatabaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...getDatabaseConfig(),
        autoLoadEntities: true,
      }),
    }),
    WordsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
