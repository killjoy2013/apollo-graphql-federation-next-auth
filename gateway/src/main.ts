import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import expressPlayground from 'graphql-playground-middleware-express';

import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as jwt from 'express-jwt';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.useGlobalPipes(new ValidationPipe());

  server.use(
    cors({
      credentials: true,
      origin: process.env.ALLOWED_URL,
    }),
  );

  server.use(cookieParser());

  server.use((req, res, next) => {
    let secureTag = '';

    if (process.env.NODE_ENV != 'development') {
      secureTag = '__Secure-';
    }

    const httpsCookie = req.cookies?.[`${secureTag}next-auth.session-token`];
    const httpCookie = req.cookies?.[`next-auth.session-token`];

    const token_in_cookie = httpsCookie ? httpsCookie : httpCookie;

    if (token_in_cookie) {
      req.headers['authorization'] = `Bearer ${token_in_cookie}`;
    }

    const handleErrorNext = (err) => {
      if (err) {
        console.log(
          `handleErrorNext on ${new Date().toLocaleTimeString()}`,
          err,
        );

        if (
          err.name === 'UnauthorizedError' &&
          err.inner.name === 'TokenExpiredError'
        ) {
          return next();
        }
      }
      next(err);
    };
    const middleware = jwt({
      secret: process.env.TOKEN_SECRET,
      algorithms: ['HS512'],
      credentialsRequired: false,
    });

    middleware(req, res, handleErrorNext);
  });

  server.use(express.json());

  await app.listen(PORT);
}

bootstrap();
