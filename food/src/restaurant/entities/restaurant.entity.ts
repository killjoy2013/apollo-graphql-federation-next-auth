import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';
import { Meal } from 'src/meal/entities/meal.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToMany(() => Meal, (meal) => meal.restaurants)
  @Field(() => [Meal], { nullable: true })
  @JoinTable({
    name: 'restaurant_meal',
    joinColumn: {
      name: 'restaurant_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'meal_id',
      referencedColumnName: 'id',
    },
  })
  meals: Meal[];

  // @Field(() => City)
  // city: City;

  @Column()
  @Field()
  cityId: number;
}
