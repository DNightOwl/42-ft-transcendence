import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtStrategy } from '../auth/jwt/jwt.strategy';
import { PrismaModule } from '../prisma/prisma.module';
import { RoomModule } from '../chat/rooms/room.modules';
import { RoomService } from '../chat/rooms/room.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [UsersService,JwtStrategy, RoomService, JwtService],
  imports: [PrismaModule, RoomModule]
})
export class UsersModule {}

