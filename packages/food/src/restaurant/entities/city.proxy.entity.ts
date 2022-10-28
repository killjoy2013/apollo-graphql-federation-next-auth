import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Restaurant } from './restaurant.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class City {
  @Field((type) => Int)
  id: number;

  @Field((type) => [Restaurant], { nullable: true })
  restaurants: Restaurant[];
}
