import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepo: Repository<Restaurant>,
  ) {}

  async create(input: CreateRestaurantInput): Promise<Restaurant> {
    return await this.restaurantRepo.save(input);
  }

  async findAll(name: string = null): Promise<Restaurant[]> {
    if (name !== null) {
      return await this.restaurantRepo
        .createQueryBuilder('restaurant')
        .where('restaurant.name like :name', { name: `%${name}%` })
        .getMany();
    } else {
      return await this.restaurantRepo.find();
    }
  }

  async findByCityId(cityId: number): Promise<Restaurant[]> {
    return await this.restaurantRepo.find({
      where: {
        cityId,
      },
    });
  }

  async findOne(id: number): Promise<Restaurant> {
    return await this.restaurantRepo.findOne({ where: { id } });
  }

  async update(input: UpdateRestaurantInput): Promise<Restaurant> {
    const found = await this.restaurantRepo.findOne({
      where: {
        id: input.id,
      },
    });
    return await this.restaurantRepo.save({ ...found, ...input });
  }

  async remove(id: number) {
    const found = await this.restaurantRepo.findOne({
      where: {
        id,
      },
    });
    if (found) {
      await this.restaurantRepo.remove(found);
      return id;
    } else {
      return null;
    }
  }
}
