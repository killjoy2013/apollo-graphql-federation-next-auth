import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql';

import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entitites/user.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, { name: 'createUser' })
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { nullable: false }) id: number) {
    return this.userService.findOne(id);
  }

  @Query(() => [User], { name: 'users' })
  findAll(@Args('userName', { nullable: true }) userName: string) {
    return this.userService.findAll(userName);
  }

  @Mutation(() => User, { name: 'updateUser' })
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput);
  }

  @Mutation(() => Int, { name: 'removeUser' })
  remove(@Args('id') id: number) {
    return this.userService.remove(id);
  }
}
