import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { PrismaService } from "src/server/prisma/prisma.service";
import { ChatGateway } from './chat.gateway';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [RoomService, PrismaService, ChatGateway, JwtService],
  controllers: [RoomController]
})
export class RoomModule {}