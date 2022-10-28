import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { CityModule } from './city/city.module';
import { City } from './city/entities/city.entity';
import { CountryModule } from './country/country.module';
import { Country } from './country/entities/country.entity';
import { Treaty } from './treaty/entities/treaty.entity';
import { TreatyModule } from './treaty/treaty.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,

      autoSchemaFile: {
        federation: 2,
        path: join(process.cwd(), 'country.schema.graphql'),
      },

      context: ({ req }) => {
        const user = req.headers.user ? JSON.parse(req.headers.user) : null;
        return { user };
      },
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Country, City, Treaty],
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