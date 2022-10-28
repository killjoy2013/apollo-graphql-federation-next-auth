import {
  Parent,
  ResolveField,
  Resolver,
  ResolveReference,
} from "@nestjs/graphql";
import { Address } from "./entities/address.entity";
import { City } from "./entities/city.proxy.entity";
import { PersonService } from "./person.service";

@Resolver(() => Address)
export class AddressResolver {
  constructor(private readonly personService: PersonService) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }) {
    return this.personService.findAddressById(reference.id);
  }

  @ResolveField((of) => City)
  city(@Parent() address: Address) {
    return { __typename: "City", id: address.cityId };
  }
}
