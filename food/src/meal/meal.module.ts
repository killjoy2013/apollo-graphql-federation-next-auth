import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Meal } from './entities/meal.entity';
import { MealResolver } from './meal.resolver';
import { MealService } from './meal.service';

@Module({
  imports: [TypeOrmModule.forFeature([Meal]), AuthModule],

  providers: [MealResolver, MealService],
  exports: [],
  controllers: [],
})
export class MealModule {}
