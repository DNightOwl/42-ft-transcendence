import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AchievementsController } from './achievements.controller';
import { AchievementsService } from './achievements.service';

@Module({
  controllers: [AchievementsController],
  providers: [AchievementsService,PrismaService]
})
export class AchievementsModule {}
