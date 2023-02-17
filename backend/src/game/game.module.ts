import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { JwtService, JwtModule } from '@nestjs/jwt';

import { PrismaService } from '../prisma/prisma.service';
import { GameController } from './game.controller';


@Module({
    imports: [JwtModule],
    controllers: [GameController],
    providers: [GameGateway, GameService, PrismaService],
})
export class gameModule { }
