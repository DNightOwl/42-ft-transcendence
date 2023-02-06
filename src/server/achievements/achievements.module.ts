import { Module } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { AchievementsController } from './achievements.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AchievementsController],
  providers: [AchievementsService,PrismaService]
})
export class AchievementsModule {}
