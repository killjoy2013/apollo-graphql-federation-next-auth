import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import {
  SDLValidationContext,
  ValidationContext,
} from 'graphql/validation/ValidationContext';

function jwtValidationRule(context: ValidationContext | SDLValidationContext) {
  console.log({ context });
  return false;
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        // ... Apollo server options
        cors: {
          origin: process.env.ALLOWED_URL,
          credentials: true,
        },
        plugins: [
          ApolloServerPluginLandingPageGraphQLPlayground({
            settings: {
              'editor.theme': 'dark',
              'request.credentials': 'include',
            },
          }),
        ],
        playground: false,
        // context: ({ req }) => {
        //   if (req.user) {
        //     const user = req.user;
        //     return { user };
        //   } else {
        //     console.error(
        //       'Authentication error while creating GQL Context',
        //       new Date().toLocaleTimeString(),
        //     );
        //     throw new Error('Authentication error while creating GQL Context');
        //   }
        // },
        // validationRules: [jwtValidationRule],
      },
      gateway: {
        buildService({ name, url }) {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
              request.http.headers.set(
                'user',
                context['user'] ? JSON.stringify(context['user']) : null,
              );
            },
          });
        },
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: 'auth',
              url: process.env.AUTH_SUBGRAPH,
            },
            {
              name: 'country',
              url: process.env.COUNTRY_SUBGRAPH,
            },
            {
              name: 'food',
              url: process.env.FOOD_SUBGRAPH,
            },
            {
              name: 'people',
              url: process.env.PEOPLE_SUBGRAPH,
            },
          ],
        }),
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
