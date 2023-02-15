import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { GameGateway } from './game.gateway';
import { Game } from './core/game';

interface Player {
    name: string;
    avatar: string;
    id: string;
    client: any;
}

@Injectable()
export class GameService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }

    private activeGames: Game[] = [];
    private WaitingPlayers: Player[] = [];


    public addPlayerToQueue(player: Player, gameGateway: any) {
        this.WaitingPlayers.push(player);
        this.matchPlayers(gameGateway);
    }

    public startGame(gameId: string) {
        let game = this.getGameById(gameId);
        if (game) {
            game.startGame();
        } else {
            console.log("Game not found");
        }
    }


    /////////

    private matchPlayers(gameGateway: any) {
        if (this.WaitingPlayers.length >= 2) {
            console.log("Matched players");
            let player1 = this.WaitingPlayers.pop();
            let player2 = this.WaitingPlayers.pop();
            let game = new Game(gameGateway, this, player1.id, player2.id, player1.name, player2.name, player1.avatar, player2.avatar);
            this.activeGames.push(game);
            player1.client.emit("matched", game.gameId);
            player2.client.emit("matched", game.gameId);
            player1.client.join(game.gameId);
            player2.client.join(game.gameId);
        }
        console.table(this.WaitingPlayers);
    }

    public getGameById(gameId: string): Game {
        return this.activeGames.find(game => game.gameId === gameId);
    }

    async gameFinished(gameId: string) {
        const game = this.getGameById(gameId);
        if (game) {
            this.activeGames = this.activeGames.filter((g) => g.gameId !== gameId);
            clearInterval(game.interval);
        }
        console.table(this.activeGames);
    }

    async getUserFromSocket(socket: Socket) {
        const cookies = socket.handshake.headers.cookie;
        if (cookies) {
            const token = cookies.split(';').find((c) => c.trim().startsWith('token='));
            if (token) {
                const payload: any = this.jwtService.decode(token.split('=')[1]);
                const user = await this.prisma.user.findUnique({
                    where: { login: payload.login },
                });
                return user;
            }
        }
        return null;
    }

}