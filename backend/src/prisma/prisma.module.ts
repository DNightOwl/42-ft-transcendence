import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaController } from './prisma.controller';

@Module({
  controllers: [],
  providers: [PrismaService],
  exports : [PrismaService],
})
export class PrismaModule {}
