import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { AchievementsService } from './achievements.service';

@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  getUserAchievements(@Body('id') userId: string) {
    return this.achievementsService.getUserAchievements(userId);
  }

  
}
