import { CreateRightInput } from './create-right.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRightInput extends PartialType(CreateRightInput) {
  @Field(() => Int, { nullable: false })
  id: number;

  @Field({ nullable: true })
  name: string;
}
