import { RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import {
  SDLValidationContext,
  ValidationContext,
} from 'graphql/validation/ValidationContext';

function jwtValidationRule(context: ValidationContext | SDLValidationContext) {
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
          origin: '*',
          credentials: true,
        },
        introspection: true,
        //plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
        //playground: false,
        context: ({ req }) => {
          if (req.user) {
            const user = req.user;
            return { user };
          } else {
            console.error(
              'Authentication error while creating GQL Context',
              new Date().toLocaleTimeString(),
            );
            throw new Error('Authentication error while creating GQL Context');
          }
        },
        validationRules: [jwtValidationRule],
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
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
