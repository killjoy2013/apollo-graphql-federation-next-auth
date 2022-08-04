import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRightInput {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: true })
  description: string;
}
