import { InputType, Int, Field } from "@nestjs/graphql";
import { CreateAddressInput } from "./create-address.input";

@InputType()
export class CreatePersonInput {
  @Field({ nullable: false })
  firstName: string;

  @Field({ nullable: false })
  lastName: string;

  @Field({ nullable: false })
  occupation: string;

  @Field((type) => CreateAddressInput, { nullable: false })
  address: CreateAddressInput;
}
