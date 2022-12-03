import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AddressResolver } from './address.resolver';
import { CityResolver } from './city.proxy.resolver';
import { Person } from './entities/person.entity';
import { PersonResolver } from './person.resolver';
import { PersonService } from './person.service';

@Module({
  imports: [TypeOrmModule.forFeature([Person]), AuthModule],

  providers: [PersonResolver, PersonService, CityResolver, AddressResolver],
  exports: [],
  controllers: [],
})
export class PersonModule {}
