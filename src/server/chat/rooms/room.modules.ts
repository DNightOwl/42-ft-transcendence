import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { PrismaService } from "src/server/prisma/prisma.service";

@Module({
  providers: [RoomService, PrismaService],
  controllers: [RoomController]
})
export class RoomModule {}