import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],

  providers: [],
  exports: [],
  controllers: [],
})
export class AuthModule {}
