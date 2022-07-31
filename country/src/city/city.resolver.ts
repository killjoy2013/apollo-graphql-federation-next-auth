import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { GetUser } from '../../src/auth/get-user.decorator';
import { CityService } from '../../src/city/city.service';
import { CreateCityInput } from '../../src/city/dto/create-city.input';
import { UpdateCityInput } from '../../src/city/dto/update-city.input';
import { City } from '../../src/city/entities/city.entity';

@Resolver(() => City)
export class CityResolver {
  constructor(private readonly cityService: CityService) {}

  @Mutation(() => City)
  createCity(@Args('input') input: CreateCityInput) {
    return this.cityService.create(input);
  }

  @Query(() => [City], { name: 'cities' })
  findAll(@Args('name', { type: () => String, nullable: true }) name: string) {
    return this.cityService.findAll(name);
  }

  @Query(() => City, { name: 'city' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.cityService.findOne(id);
  }

  @Mutation(() => City)
  updateCity(@Args('input') input: UpdateCityInput) {
    return this.cityService.update(input);
  }

  @Mutation(() => Int, { nullable: true })
  removeCity(
    // @GetUser() user: any,
    @Args('id', { type: () => Int, nullable: false }) id: number,
  ) {
    return this.cityService.remove(id);
  }
  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }) {
    return this.cityService.findOne(reference.id);
  }
}
