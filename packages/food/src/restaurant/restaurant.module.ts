import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CityResolver } from './city.proxy.resolver';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantResolver } from './restaurant.resolver';
import { RestaurantService } from './restaurant.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant]), AuthModule],

  providers: [RestaurantResolver, RestaurantService, CityResolver],
  exports: [],
  controllers: [],
})
export class RestaurantModule {}
