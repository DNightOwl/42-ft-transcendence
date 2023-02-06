"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const prisma_service_1 = require("../../prisma/prisma.service");
const room_service_1 = require("./room.service");
const moment = require("moment");
let ChatGateway = class ChatGateway {
    constructor(prisma, roomservice) {
        this.prisma = prisma;
        this.roomservice = roomservice;
        this.OnlineUser = [];
        this.id = 0;
    }
    async handleMessage(Body, client) {
        const user1 = client.user;
        this.id += 1;
        let roomName = `<${client.user.login}_${this.id}>`;
        console.log(this.id);
        if (Body.type.toString() == 'DM') {
            for (let index = 0; index < this.OnlineUser.length; index++) {
                if (this.OnlineUser[index].user.login == Body.name) {
                    this.OnlineUser[index].join(roomName);
                }
            }
            const room = await this.prisma.room.findUnique({
                where: {
                    name: (Body.name + user1.login)
                }
            });
            if (room) {
                const msg = await this.prisma.messages.create({
                    data: {
                        roomName: (Body.name + user1.login),
                        data: Body.data,
                        userLogin: Body.name
                    }
                });
                this.server.to(roomName).emit("msgFromServer", Body.data);
            }
            else {
                const room_freind = await this.prisma.room.findUnique({
                    where: {
                        name: (user1.login + Body.name)
                    }
                });
                if (room_freind) {
                    const msg = await this.prisma.messages.create({
                        data: {
                            roomName: (user1.login + Body.name),
                            data: Body.data,
                            userLogin: Body.name
                        }
                    });
                    this.server.to(roomName).emit("msgFromServer", Body.data);
                }
                else
                    return;
            }
        }
        else {
            const rom = await this.prisma.room.findUnique({
                where: {
                    name: Body.name
                }
            });
            const user2 = await this.prisma.muted.findMany({
                where: {
                    userLogin: user1.login,
                    roomName: Body.name
                }
            });
            if (user2[0]) {
                console.log('============>');
                if (user2[0].time < moment().format('YYYY-MM-DD hh:mm:ss')) {
                    this.roomservice.unmuted(user1, Body);
                }
                else
                    return;
            }
            if (rom) {
                for (let i = 0; i < this.OnlineUser.length; i++) {
                    const login = rom.members.find((login) => login == this.OnlineUser[i].user.login);
                    if (login && this.OnlineUser[i].user.login != user1.login)
                        this.OnlineUser[i].join(roomName);
                }
                this.server.to(roomName).emit("msgFromServer", Body.data);
                const msg = await this.prisma.messages.create({
                    data: {
                        roomName: Body.name,
                        data: Body.data,
                        userLogin: user1.login
                    }
                });
            }
        }
    }
    async handleDisconnect(client) {
        for (let index = 0; index < this.OnlineUser.length; index++) {
            if (this.OnlineUser[index].id == client.id) {
                this.OnlineUser.splice(index, 1);
                break;
            }
        }
        const jwttoken = this.roomservice.parseCookie(client.handshake.headers.cookie);
        const user = await this.roomservice.getUserFromAuthenticationToken(jwttoken);
        const test = this.OnlineUser.find((user) => user == user);
        if (!test) {
            await this.prisma.user.update({
                where: {
                    login: user.login
                },
                data: {
                    status: "of"
                }
            });
        }
    }
    async handleConnection(client) {
        const jwttoken = this.roomservice.parseCookie(client.handshake.headers.cookie);
        const user = await this.roomservice.getUserFromAuthenticationToken(jwttoken);
        client.user = user;
        if (user.status == "of") {
            console.log(user.status);
            const user1 = await this.prisma.user.update({
                where: {
                    login: user.login
                },
                data: {
                    status: "on"
                }
            });
        }
        this.OnlineUser.push(client);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('msgServer'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMessage", null);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleDisconnect", null);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleConnection", null);
ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, room_service_1.RoomService])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map