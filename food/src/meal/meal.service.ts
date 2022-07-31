import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMealInput } from './dto/create-meal.input';
import { UpdateMealInput } from './dto/update-meal.input';
import { Meal } from './entities/meal.entity';

@Injectable()
export class MealService {
  constructor(@InjectRepository(Meal) private mealRepo: Repository<Meal>) {}

  async create(input: CreateMealInput): Promise<Meal> {
    return await this.mealRepo.save(input);
  }

  async findAll(name: string = null): Promise<Meal[]> {
    if (name !== null) {
      return await this.mealRepo
        .createQueryBuilder('meal')
        .where('meal.name like :name', { name: `%${name}%` })
        .getMany();
    } else {
      return await this.mealRepo.find();
    }
  }

  async findOne(id: number): Promise<Meal> {
    return await this.mealRepo.findOne(id);
  }

  async update(input: UpdateMealInput): Promise<Meal> {
    let found = await this.mealRepo.findOne(input.id);
    return await this.mealRepo.save({ ...found, ...input });
  }

  async remove(id: number) {
    let found = await this.mealRepo.findOne(id);
    if (found) {
      await this.mealRepo.remove(found);
      return id;
    } else {
      return null;
    }
  }
}
