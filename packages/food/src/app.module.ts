// import { OnentModule } from './onent/onent.module';
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
import { Meal } from './meal/entities/meal.entity';
import { MealModule } from './meal/meal.module';
import { City } from './restaurant/entities/city.proxy.entity';
import { Restaurant } from './restaurant/entities/restaurant.entity';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,

      autoSchemaFile: {
        federation: 2,
        path: join(process.cwd(), 'food.schema.graphql'),
      },

      buildSchemaOptions: {
        orphanedTypes: [City],
      },
      context: ({ req }) => {
        const user = req.headers.user ? JSON.parse(req.headers.user) : null;
        return { user };
      },
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Restaurant, Meal],
    }),

    RestaurantModule,
    MealModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}