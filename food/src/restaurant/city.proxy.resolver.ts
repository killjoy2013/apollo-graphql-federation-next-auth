import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { City } from './entities/city.proxy.entity';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurant.service';

@Resolver((of) => City)
export class CityResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @ResolveField((of) => [Restaurant], { nullable: true })
  public restaurants(@Parent() city: City): Promise<Restaurant[]> {
    return this.restaurantService.findByCityId(city.id);
  }
}
