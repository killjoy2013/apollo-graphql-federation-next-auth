import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRestaurantInput {
  @Field({ nullable: false })
  name: string;

  @Field((type) => Int)
  cityId: number;
}
