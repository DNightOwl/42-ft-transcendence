import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { PrismaService } from "src/server/prisma/prisma.service";
import { ChatGateway } from './chat.gateway';

@Module({
  providers: [RoomService, PrismaService, ChatGateway],
  controllers: [RoomController]
})
export class RoomModule {}