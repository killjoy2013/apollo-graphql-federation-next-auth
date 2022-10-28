import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveReference,
} from '@nestjs/graphql';
import { CountryService } from './country.service';
import { Country } from './entities/country.entity';
import { CreateCountryInput } from './dto/create-country.input';
import { UpdateCountryInput } from './dto/update-country.input';
import { UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/get-user.decorator';

@Resolver(() => Country)
export class CountryResolver {
  constructor(private readonly countryService: CountryService) {}

  @Mutation(() => Country)
  createCountry(
    @Args('input', { nullable: false })
    input: CreateCountryInput,
  ) {
    return this.countryService.create(input);
  }

  @Query(() => [Country])
  countries(@GetUser() user: any) {
    return this.countryService.findAll();
  }

  @Query(() => Country)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.countryService.findOne(id);
  }

  @Mutation(() => Country)
  updateCountry(@Args('input') input: UpdateCountryInput) {
    return this.countryService.update(input);
  }

  @Mutation(() => Int, { nullable: true })
  removeCountry(
    @GetUser() user: any,
    @Args('id', { type: () => Int, nullable: false }) id: number,
  ) {
    return this.countryService.remove(id);
  }

  @Mutation(() => Country, { name: 'addCountryToTreaty' })
  addToTreaty(
    @Args('countryId', { type: () => Int, nullable: false }) countryId: number,
    @Args('treatyId', { type: () => Int, nullable: false }) treatyId: number,
  ) {
    return this.countryService.addToTreaty(countryId, treatyId);
  }
  @Mutation(() => Country, { name: 'removeCountryFromTreaty' })
  removeFromTreaty(
    @Args('countryId', { type: () => Int, nullable: false }) countryId: number,
    @Args('treatyId', { type: () => Int, nullable: false }) treatyId: number,
  ) {
    return this.countryService.removeFromTreaty(countryId, treatyId);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }) {
    return this.countryService.findOne(reference.id);
  }
}
