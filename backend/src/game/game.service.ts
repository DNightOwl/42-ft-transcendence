import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
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

interface OnlinePlayer {
    name: string;
    avatar: string;
    id: string;
    client: any;
}

interface Invitation {
    sender: string;
    senderId: string;
    senderAvatar: string;
    receiver: string;
    receiverId: string;
}

@Injectable()
export class GameService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        @Inject(forwardRef(() => GameGateway))
        private readonly gameGateway: GameGateway,
    ) { }

    private activeGames: Game[] = [];
    private WaitingPlayers: Player[] = [];
    private OnlinePlayers: OnlinePlayer[] = [];
    private Invitations: Invitation[] = [];

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

    public addPlayerToOnlineList(player: OnlinePlayer) {
        const index = this.OnlinePlayers.findIndex((p) => p.id === player.id);
        if (index !== -1) {
            this.OnlinePlayers[index].client = player.client;
            return;
        }
        this.OnlinePlayers.push(player);
        console.table(this.OnlinePlayers);
    }

    public removePlayerFromOnlineList(playerId: string) {
        this.OnlinePlayers = this.OnlinePlayers.filter((player) => player.id !== playerId);
        console.table(this.OnlinePlayers);
    }

    async sendInvitation(sender: any, receiverId: string) {
        const reciver = await this.prisma.user.findUnique({ where: { id: receiverId } });
        let receiverSocket = this.OnlinePlayers.find((player) => player.id === receiverId);
        if (!receiverSocket) throw new HttpException("Player not found", HttpStatus.NOT_FOUND);
        receiverSocket.client.emit("game_invitation", {
            sender: sender.login,
            senderId: sender.id,
            senderAvatar: sender.pictureLink,
        });
        this.Invitations.push({
            sender: sender.login,
            senderId: sender.id,
            senderAvatar: sender.pictureLink,
            receiver: reciver.login,
            receiverId: receiverId
        });

    }

    async acceptInvitation(receiver: any, senderId: string) {
        const senderClient = this.OnlinePlayers.find((player) => player.id === senderId);
        const recipientClient = this.OnlinePlayers.find((player) => player.id === receiver.id);
        if (!senderClient) throw new HttpException("Player not found", HttpStatus.NOT_FOUND);
        let game = new Game(this.gameGateway, this, receiver.id, senderId, receiver.login, senderClient.name, receiver.pictureLink, senderClient.avatar, "classic");
        senderClient.client.emit("game_accepted", {
            gameId: game.gameId,
        });
        this.Invitations = this.Invitations.filter((invitation) => invitation.senderId !== senderId);
        this.activeGames.push(game);
        senderClient.client.join(game.gameId);
        recipientClient.client.join(game.gameId);
        return game.gameId;
    }

    async declineInvitation(receiver: any, senderId: string) {
        const senderClient = this.OnlinePlayers.find((player) => player.id === senderId);
        if (!senderClient) throw new HttpException("Player not found", HttpStatus.NOT_FOUND);
        senderClient.client.emit("game_declined", {});
        this.Invitations = this.Invitations.filter((invitation) => invitation.senderId !== senderId);
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

    public playerLeft(playerId: string, gameId: string) {
        const game = this.getGameById(gameId);
        console.log("player left on game", gameId, "player id", playerId);
        if (game) {
            game.playerLeft(playerId);
        }
    }
}