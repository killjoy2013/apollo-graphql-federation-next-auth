import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { GetUser } from '../auth/get-user.decorator';
import { Hobby } from './entities/hobby.entity';
import { CreateHobbyInput } from './dto/create-hobby.input';
import { HobbyService } from './hobby.service';

@Resolver(() => Hobby)
export class HobbyResolver {
  constructor(private readonly hobbyService: HobbyService) {}

  @Mutation(() => Hobby)
  createHobby(@Args('input') input: CreateHobbyInput) {
    return this.hobbyService.create(input);
  }

  @Query(() => [Hobby], { name: 'hobbies' })
  findAll(@Args('name', { type: () => String, nullable: true }) name: string) {
    return this.hobbyService.findAll(name);
  }

  @Query(() => Hobby, { name: 'hobby' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.hobbyService.findOne(id);
  }

  @Mutation(() => Int, { nullable: true })
  removeHobby(
    // @GetUser() user: any,
    @Args('id', { type: () => Int, nullable: false }) id: number,
  ) {
    return this.hobbyService.remove(id);
  }
  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }) {
    return this.hobbyService.findOne(reference.id);
  }
}
