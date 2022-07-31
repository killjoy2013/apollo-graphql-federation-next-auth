import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMealInput {
  @Field({ nullable: false })
  name: string;
}
