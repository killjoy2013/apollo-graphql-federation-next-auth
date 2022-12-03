import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAddressInput {
  @Field({ nullable: false })
  detail: string;

  @Field((type) => Int, { nullable: false })
  cityId: number;
}
