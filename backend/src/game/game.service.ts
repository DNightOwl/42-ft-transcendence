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
    gameMode: "classic" | "paddle--";
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

    private matchPlayers(gameGateway: any) {
        if (this.WaitingPlayers.length >= 2) {
            let lastPlayer = this.WaitingPlayers.at(-1);
            let potentialMatch = this.WaitingPlayers.find((player) => player.gameMode === lastPlayer.gameMode);
            if (potentialMatch && potentialMatch.id !== lastPlayer.id) {
                this.WaitingPlayers = this.WaitingPlayers.filter((player) => player.id !== potentialMatch.id);
                this.WaitingPlayers = this.WaitingPlayers.filter((player) => player.id !== lastPlayer.id);
                let game = new Game(gameGateway, this, potentialMatch.id, lastPlayer.id, potentialMatch.name, lastPlayer.name, potentialMatch.avatar, lastPlayer.avatar, potentialMatch.gameMode);
                this.activeGames.push(game);
                potentialMatch.client.emit("matched", game.gameId);
                lastPlayer.client.emit("matched", game.gameId);
                potentialMatch.client.join(game.gameId);
                lastPlayer.client.join(game.gameId);
                gameGateway.server.emit("live_games", this.getLiveGames());
            }
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
            await this.prisma.game.create({
                data: {
                    winner: { connect: { id: game.player1.score > game.player2.score ? game.player1.id : game.player2.id } },
                    loser: { connect: { id: game.player1.score < game.player2.score ? game.player1.id : game.player2.id } },
                    WinnerScore: game.player1.score > game.player2.score ? game.player1.score : game.player2.score,
                    LoserScore: game.player1.score < game.player2.score ? game.player1.score : game.player2.score,
                    gameMode: game.getGameMode,
                }
            })
        }
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

    async removePlayerFromQueue(playerId: string) {
        this.WaitingPlayers = this.WaitingPlayers.filter((player) => player.id !== playerId);
    }

    public getLiveGames(notToInclude?: string) {
        const processedGames = this.activeGames.map((game) => {
            return {
                gameId: game.gameId,
                player1: game.player1.name,
                player2: game.player2.name,
                player1Avatar: game.player1.avatar,
                player2Avatar: game.player2.avatar,
                gameMode: game.getGameMode,
            }
        });
        if (notToInclude) {
            return processedGames.filter((game) => game.gameId !== notToInclude);
        }
        return processedGames;
    }
}