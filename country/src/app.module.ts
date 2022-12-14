// import { OnentModule } from './onent/onent.module';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import * as PostgressConnectionStringParser from 'pg-connection-string';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Treaty } from '../src/treaty/entities/treaty.entity';
import { AuthModule } from './auth/auth.module';
import { CityModule } from './city/city.module';
import { City } from './city/entities/city.entity';
import { CountryModule } from './country/country.module';
import { Country } from './country/entities/country.entity';
import { TreatyModule } from './treaty/treaty.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      context: ({ req }) => {
        const user = req.headers.user ? JSON.parse(req.headers.user) : null;
        return { user };
      },
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      // host: process.env.DB_HOST,
      // port: parseInt(process.env.DB_PORT),
      // database: process.env.DB_NAME,
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      entities: [Country, City, Treaty],
      //synchronize: true,
      //logging: true,
    }),

    CountryModule,
    CityModule,
    TreatyModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
