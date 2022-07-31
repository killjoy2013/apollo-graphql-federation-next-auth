import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    const fieldName = context.getHandler().name;
    console.log({ fieldName });
    const ctx = GqlExecutionContext.create(context).getContext();
    const user = ctx.user;
    console.log({ user });
    const rights = user.rights as string[];
    console.log({ rights });

    if (!rights.includes(fieldName)) {
      throw new UnauthorizedException(`You must have ${fieldName} right`);
    }

    return user;
  },
);
