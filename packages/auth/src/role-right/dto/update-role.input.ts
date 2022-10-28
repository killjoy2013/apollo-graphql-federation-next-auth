import { CreateRoleInput } from './create-role.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
  @Field(() => Int, { nullable: false })
  id: number;

  @Field({ nullable: true })
  name: string;
}
