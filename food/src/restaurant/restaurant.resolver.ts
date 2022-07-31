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
import { GetUser } from '../../src/auth/get-user.decorator';
import { Restaurant } from '../restaurant/entities/restaurant.entity';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { City } from './entities/city.proxy.entity';
import { RestaurantService } from './restaurant.service';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation(() => Restaurant)
  createRestaurant(@Args('input') input: CreateRestaurantInput) {
    return this.restaurantService.create(input);
  }

  @Query(() => [Restaurant], { name: 'restaurants' })
  findAll(@Args('name', { type: () => String, nullable: true }) name: string) {
    return this.restaurantService.findAll(name);
  }

  @Query(() => Restaurant, { name: 'restaurant' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.restaurantService.findOne(id);
  }

  @Mutation(() => Restaurant)
  updateRestaurant(@Args('input') input: UpdateRestaurantInput) {
    return this.restaurantService.update(input);
  }

  @Mutation(() => Int, { nullable: true })
  removeRestaurant(
    // @GetUser() user: any,
    @Args('id', { type: () => Int, nullable: false }) id: number,
  ) {
    return this.restaurantService.remove(id);
  }
  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }) {
    return this.restaurantService.findOne(reference.id);
  }

  @ResolveField((of) => City)
  city(@Parent() restaurant: Restaurant) {
    return { __typename: 'City', id: restaurant.cityId };
  }
}
