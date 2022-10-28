import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { Hobby } from "./entities/hobby.entity";
import { HobbyResolver } from "./hobby.resolver";
import { HobbyService } from "./hobby.service";

@Module({
  imports: [TypeOrmModule.forFeature([Hobby]), AuthModule],
  providers: [HobbyResolver, HobbyService],
  exports: [],
})
export class HobbyModule {}
