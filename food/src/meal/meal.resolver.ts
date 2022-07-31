import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from '../../src/auth/get-user.decorator';
import { Meal } from '../meal/entities/meal.entity';
import { CreateMealInput } from './dto/create-meal.input';
import { UpdateMealInput } from './dto/update-meal.input';
import { MealService } from './meal.service';

@Resolver(() => Meal)
export class MealResolver {
  constructor(private readonly mealService: MealService) {}

  @Mutation(() => Meal)
  createMeal(@Args('input') input: CreateMealInput) {
    return this.mealService.create(input);
  }

  @Query(() => [Meal], { name: 'meals' })
  findAll(@Args('name', { type: () => String, nullable: true }) name: string) {
    return this.mealService.findAll(name);
  }

  @Query(() => Meal, { name: 'meal' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.mealService.findOne(id);
  }

  @Mutation(() => Meal)
  updateMeal(@Args('input') input: UpdateMealInput) {
    return this.mealService.update(input);
  }

  @Mutation(() => Int, { nullable: true })
  removeMeal(
    // @GetUser() user: any,
    @Args('id', { type: () => Int, nullable: false }) id: number,
  ) {
    return this.mealService.remove(id);
  }
}
