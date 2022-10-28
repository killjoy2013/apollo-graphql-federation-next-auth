import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityResolver } from './city.resolver';
import { City } from './entities/city.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([City]), AuthModule],
  providers: [CityResolver, CityService],
})
export class CityModule {}
