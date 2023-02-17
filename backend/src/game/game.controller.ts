import {
    Controller,
    Get,
    Param,
    Post,
    UseGuards,
    Patch,
    Delete,
    Req,
    Body,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { GameService } from './game.service';

@Controller('game')
export class GameController {

    constructor(
        private readonly gameService: GameService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post('sendInvitation')
    async sendInvitation(@Req() req, @Body() body) {
        const sender = req.user;
        return await this.gameService.sendInvitation(sender, body.receiverId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('acceptInvitation')
    async acceptInvitation(@Req() req, @Body() body) {
        const receiver = req.user;
        return await this.gameService.acceptInvitation(receiver, body.senderId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('declineInvitation')
    async declineInvitation(@Req() req, @Body() body) {
        const receiver = req.user;
        return await this.gameService.declineInvitation(receiver, body.senderId);
    }
}