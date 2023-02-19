import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { JwtService, JwtModule } from '@nestjs/jwt';

import { PrismaService } from '../prisma/prisma.service';
import { GameController } from './game.controller';
import { AchievementsModule } from 'src/achievements/achievements.module';


@Module({
    imports: [JwtModule, AchievementsModule],
    controllers: [GameController],
    providers: [GameGateway, GameService, PrismaService],
})
export class gameModule { }
