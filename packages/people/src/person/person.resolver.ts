import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from "@nestjs/graphql";
import { GetUser } from "../auth/get-user.decorator";

import { CreatePersonInput } from "./dto/create-person.input";
import { Address } from "./entities/address.entity";
import { City } from "./entities/city.proxy.entity";

import { Person } from "./entities/person.entity";
import { PersonService } from "./person.service";

@Resolver(() => Person)
export class PersonResolver {
  constructor(private readonly personService: PersonService) {}

  @Mutation(() => Person)
  createPerson(@Args("input") input: CreatePersonInput) {
    return this.personService.create(input);
  }

  @Query(() => [Person], { name: "persons" })
  findAll(
    @Args("firstName", { type: () => String, nullable: true }) firstName: string
  ) {
    return this.personService.findAll(firstName);
  }

  @Query(() => Person, { name: "person" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.personService.findOne(id);
  }

  @Mutation(() => Int, { nullable: true })
  removePerson(
    // @GetUser() user: any,
    @Args("id", { type: () => Int, nullable: false }) id: number
  ) {
    return this.personService.remove(id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }) {
    return this.personService.findOne(reference.id);
  }

  // @ResolveField((of) => City)
  // city(@Parent() address: Address) {
  //   return { __typename: "City", id: address.cityId };
  // }
}
