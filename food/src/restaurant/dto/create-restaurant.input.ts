import { InputType, Int, Field } from '@nestjs/graphql';
import { PriceRange } from '../enums';

@InputType()
export class CreateRestaurantInput {
  @Field({ nullable: false })
  name: string;

  @Field((type) => PriceRange)
  priceRange: PriceRange;

  @Field((type) => Int)
  cityId: number;
}
