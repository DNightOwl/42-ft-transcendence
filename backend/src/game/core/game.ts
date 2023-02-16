import { GameGateway } from '../game.gateway';
import { GameService } from '../game.service';

interface player {
    name: string;
    avatar: string;
    id: string;
    paddleY: number;
    height: number;
    score: number;
}

export class Game {
    private WIDTH: number = 1000;
    private HEIGHT: number = 600;
    private BALL_RADIUS: number = 10;
    private SPEED: number = 6;
    private FRAME_RATE: number = 60;
    private gameID: string;
    private gameMode: string;
    public interval: any;
    player1: player = {
        id: '',
        name: '',
        avatar: '',
        height: 100,
        paddleY: this.HEIGHT / 2,
        score: 0,
    };
    player2: player = {
        id: '',
        name: '',
        avatar: '',
        height: 100,
        paddleY: this.HEIGHT / 2,
        score: 0,
    };
    status: "waiting" | "playing" | "pause" | "finished" = "waiting";
    ballX: number = this.WIDTH / 2;
    ballY: number = this.HEIGHT / 2;

    ballSpeedX: number = this.SPEED;
    ballSpeedY: number = this.SPEED;

    constructor(
        private readonly gameGateway: GameGateway,
        private readonly gameService: GameService,
        player1Id: string,
        player2Id: string,
        player1Name: string,
        player2Name: string,
        player1Avatar: string,
        player2Avatar: string,
        gameMode: string,
    ) {
        this.player1.id = player1Id;
        this.player2.id = player2Id;
        this.player1.name = player1Name;
        this.player2.name = player2Name;
        this.player1.avatar = player1Avatar;
        this.player2.avatar = player2Avatar;
        this.gameID = this.player1.id + this.player2.id;
        this.gameMode = gameMode || "classic";
    }

    public get gameId(): string {
        return this.gameID;
    }

    public get getGameMode(): string {
        return this.gameMode;
    }

    public startGame() {
        this.status = "playing";
        this.gameLoop();
        console.log("Starting game");
    }

    public gameCore() {
        this.moveBall();
        this.gameGateway.server.to(this.gameID).emit('game_state', {
            player1Y: this.player1.paddleY / this.HEIGHT,
            player2Y: this.player2.paddleY / this.HEIGHT,
            player1Height: this.player1.height / this.HEIGHT,
            player2Height: this.player2.height / this.HEIGHT,
            ballX: this.ballX / this.WIDTH,
            ballY: this.ballY / this.HEIGHT,
            status: this.status
        });
    }

    private moveBall = () => {
        const tmp1 = this.ballX + this.ballSpeedX;
        const tmp2 = this.ballY + this.ballSpeedY;
        this.checkCollision(tmp1, tmp2);
        if (tmp2 > this.HEIGHT - this.BALL_RADIUS || tmp2 < this.BALL_RADIUS) {
            this.ballSpeedY *= -1;
        }
        this.checkGoal();
        this.ballX += this.ballSpeedX;
        this.ballY += this.ballSpeedY;
    }

    private checkCollision = (tmp1: number, tmp2: number) => {
        const [x1, y1, w1, h1] = [0, this.player1.paddleY, 20, this.player1.height];
        const [x2, y2, w2, h2] = [this.WIDTH - this.BALL_RADIUS, this.player2.paddleY, 20, this.player2.height];
        if (tmp1 > x1 && tmp1 < x1 + w1 && tmp2 > y1 && tmp2 < y1 + h1) {
            this.ballSpeedX *= -1;
        }
        if (tmp1 > x2 && tmp1 < x2 + w2 && tmp2 > y2 && tmp2 < y2 + h2) {
            this.ballSpeedX *= -1;
        }
    }

    private checkGoal = () => {
        var goalScored = false;
        if (this.ballX > this.WIDTH) {
            this.player1.score++;
            this.resetGame();
            goalScored = true;
            if (this.gameMode === "paddle--") {
                this.player2.height -= 10;
                console.log("Player 2 height", this.player2.height);
            }
        }
        if (this.ballX < 0) {
            this.player2.score++;
            this.resetGame();
            goalScored = true;
            if (this.gameMode === "paddle--") {
                this.player1.height -= 10;
                console.log("Player 1 height", this.player1.height);
            }
        }
        if (goalScored) {
            this.gameGateway.server.emit('goal_score', {
                player1Score: this.player1.score,
                player2Score: this.player2.score,
            });
        }
        if (this.player1.score === 5 || this.player2.score === 5) {
            this.status = "finished";
            this.gameGateway.server.to(this.gameID).emit('game_over', {
                winner: this.player1.score === 5 ? this.player1.name : this.player2.name,
                loser: this.player1.score === 5 ? this.player2.name : this.player1.name,
            });
            this.gameGateway.server.emit('live_games', this.gameService.getLiveGames(this.gameID));
            this.gameService.gameFinished(this.gameID);
        }
    }

    public movePlayer = (deltaY: number, playerId: string) => {
        if (playerId === this.player1.id) {
            if (deltaY < 0) {
                this.player1.paddleY = 0;
                return;
            }
            if (deltaY > this.HEIGHT - this.player1.height) {
                this.player1.paddleY = this.HEIGHT - this.player1.height;
                return;
            }
            this.player1.paddleY = deltaY;
        }
        if (playerId === this.player2.id) {
            if (deltaY < 0) {
                this.player2.paddleY = 0;
                return;
            }
            if (deltaY > this.HEIGHT - this.player2.height) {
                this.player2.paddleY = this.HEIGHT - this.player2.height;
                return;
            }
            this.player2.paddleY = deltaY;
        }
    }

    private resetGame = () => {
        this.ballX = this.WIDTH / 2;
        this.ballY = this.HEIGHT / 2;
        this.ballSpeedX = this.SPEED;
        this.ballSpeedY = this.SPEED;
        this.player1.paddleY = this.HEIGHT / 2 - this.player1.height / 2;
        this.player2.paddleY = this.HEIGHT / 2 - this.player2.height / 2;
        this.status = "pause";
    }

    public gameLoop() {
        var timer_simulator = 0;
        var timer = 0;
        this.interval = setInterval(() => {
            timer_simulator++;
            if (timer_simulator >= 60) {
                timer++;
                timer_simulator = 0;
                if (timer === 2) {
                    console.log("Round started");
                    timer = 0;
                    this.status = "playing";
                }
            }
            if (this.status === "playing") {
                timer = 0;
                this.gameCore();
            }
        }, 1000 / this.FRAME_RATE);
    }
}
