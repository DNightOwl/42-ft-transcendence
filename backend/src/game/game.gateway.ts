
import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Game } from './core/game';
import { GameService } from './game.service';


@WebSocketGateway({
    namespace: 'game',
    cors: {
        origin: 'http://localhost:3001',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
    },
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private readonly gameService: GameService,
    ) {
    }
    @WebSocketServer()
    server: Server;

    async handleConnection(client: Socket) {
        const user: any = await this.gameService.getUserFromSocket(client);
        if (user) {
            this.gameService.addPlayerToOnlineList({
                name: user.login,
                avatar: user.pictureLink,
                id: user.id,
                client: client,
            });
        }
    }

    handleDisconnect(client: Socket) {
        const user: any = this.gameService.getUserFromSocket(client);
        if (user) {
            this.gameService.removePlayerFromOnlineList(user.id);
        }
    }

    @SubscribeMessage('game_update')
    handleGameUpdate(client: Socket, data: any) {
        this.server.emit('game_update', data);
    }

    @SubscribeMessage('join_game')
    async handleJoinGame(client: Socket, data: any) {
        const user: any = await this.gameService.getUserFromSocket(client);
        this.gameService.addPlayerToQueue(
            {
                name: user.login,
                id: user.id,
                avatar: user.pictureLink,
                client: client,
                gameMode: data.gameMode,
            },
            this
        )
    }

    @SubscribeMessage('start_game')
    handleStartGame(client: Socket, data: any) {
        this.gameService.startGame(data.gameId);
        this.server.to(data.gameId).emit('game_started', {});
    }

    @SubscribeMessage('game_data')
    handleGameData(client: Socket, data: any) {
        let game = this.gameService.getGameById(data.gameId);
        if (game) {
            this.server.to(game.gameId).emit('game_data', {
                player1: game.player1.name,
                player2: game.player2.name,
                player1Score: game.player1.score,
                player2Score: game.player2.score,
                player1Avatar: game.player1.avatar,
                player2Avatar: game.player2.avatar,
                gameMode: game.getGameMode,
            });
        } else {
            
        }
    }

    @SubscribeMessage('leave_queue')
    async handleLeaveQueue(client: Socket, data: any) {
        const user = await this.gameService.getUserFromSocket(client);
        this.gameService.removePlayerFromQueue(user.id);
    }

    @SubscribeMessage('watch')
    async handleWatch(client: Socket, data: any) {
        let game = this.gameService.getGameById(data.gameId);
        if (game) {
            client.join(data.gameId);
            this.server.to(data.gameId).emit('game_data', {
                player1: game.player1.name,
                player2: game.player2.name,
                player1Score: game.player1.score,
                player2Score: game.player2.score,
                player1Avatar: game.player1.avatar,
                player2Avatar: game.player2.avatar,
                gameMode: game.getGameMode,
            });
        } else {;
        }
    }

    @SubscribeMessage('move_player')
    async handleMovePaddle(client: Socket, data: any) {
        const user = await this.gameService.getUserFromSocket(client);
        let game = this.gameService.getGameById(data.gameId);
        if (game) {
            game.movePlayer(data.y, user.id);
        } else {
        }
    }

    @SubscribeMessage('live_games')
    async handleLiveGames(client: Socket, data: any) {
        let games = this.gameService.getLiveGames();
        client.emit('live_games', games);
    }

    @SubscribeMessage('player_left')
    async handlePlayerLeft(client: Socket, data: any) {
        const user = await this.gameService.getUserFromSocket(client);
        if (user) {
            this.gameService.playerLeft(user.id, data.gameId);
        }
    }
}
