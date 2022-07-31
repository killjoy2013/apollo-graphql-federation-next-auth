import { CreateRestaurantInput } from './create-restaurant.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRestaurantInput extends PartialType(CreateRestaurantInput) {
  @Field(() => Int, { nullable: false })
  id: number;

  @Field({ nullable: true })
  name: string;
}
