import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { City } from './entities/city.proxy.entity';
import { Person } from './entities/person.entity';
import { PersonService } from './person.service';

@Resolver((of) => City)
export class CityResolver {
  constructor(private readonly personService: PersonService) {}

  @ResolveField((of) => [Person], { nullable: true })
  public persons(@Parent() city: City): Promise<Person[]> {
    return this.personService.findByCityId(city.id);
  }
}
