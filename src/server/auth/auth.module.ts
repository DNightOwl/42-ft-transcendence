import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { IntraStrategy } from './intra/42Intra.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, IntraStrategy],
  imports : [PrismaModule,JwtModule]
})
export class AuthModule {}