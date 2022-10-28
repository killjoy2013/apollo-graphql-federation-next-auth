import { InputType, Int, Field } from "@nestjs/graphql";
import { Difficulty } from "../enums";

@InputType()
export class CreateHobbyInput {
  @Field({ nullable: false })
  name: string;

  @Field((type) => Difficulty)
  difficulty: Difficulty;

  @Field((type) => Int)
  cityId: number;
}
