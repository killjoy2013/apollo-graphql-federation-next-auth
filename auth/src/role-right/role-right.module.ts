import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Right } from './entities/right.entity';
import { Role } from './entities/role.entity';

import { RightResolver } from './right.resolver';
import { RightService } from './right.service';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Right]), AuthModule],

  providers: [RoleResolver, RoleService, RightResolver, RightService],
  exports: [],
  controllers: [],
})
export class RoleRightModule {}
