import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';
import { Meal } from 'src/meal/entities/meal.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PriceRange } from '../enums';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class Restaurant {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({
    type: 'enum',
    enum: PriceRange,
    name: 'price_range',
    nullable: true,
  })
  @Field(() => PriceRange, { nullable: true })
  priceRange: PriceRange;

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

  @Column()
  //@Field()
  cityId: number;
}
