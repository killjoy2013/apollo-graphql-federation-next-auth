// import { OnentModule } from './onent/onent.module';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { AuthModule } from "./auth/auth.module";
import { Hobby } from "./hobby/entities/hobby.entity";
import { HobbyModule } from "./hobby/hobby.module";
import { Address } from "./person/entities/address.entity";
import { City } from "./person/entities/city.proxy.entity";
import { Person } from "./person/entities/person.entity";

import { PersonModule } from "./person/person.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: join(process.cwd(), "schema.gql"),
      buildSchemaOptions: {
        orphanedTypes: [City],
      },

      context: ({ req }) => {
        const user = req.headers.user ? JSON.parse(req.headers.user) : null;
        return { user };
      },
    }),

    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL,

      entities: [Person, Hobby, Address],
    }),

    HobbyModule,
    PersonModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
