import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Restaurant } from './restaurant.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class City {
  @Field((type) => Int)
  @Directive('@external')
  id: number;

  @Field((type) => [Restaurant], { nullable: true })
  restaurants: Restaurant[];
}
