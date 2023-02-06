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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/jwt/jwt.guard");
const users_service_1 = require("./users.service");
const prisma_service_1 = require("../prisma/prisma.service");
const room_service_1 = require("../chat/rooms/room.service");
let UsersController = class UsersController {
    constructor(usersService, prisma, roomservice) {
        this.usersService = usersService;
        this.prisma = prisma;
        this.roomservice = roomservice;
    }
    async GetProfile(req) {
        const user = req.user;
        return await this.usersService.findProfile(user.login);
    }
    async UpdateProfile(req, modify) {
        const user = req.user;
        console.log(modify.nickname);
        return await this.usersService.updateuserinfo(user.login, modify.nickname);
    }
    async getFreinds(req) {
        const user = req.user;
        return await this.usersService.getfreind(user.login);
    }
    async addfriend(req, freind) {
        const user = req.user;
        const blockedUser = await this.prisma.user.findUnique({
            where: {
                login: user.login
            }
        });
        const id = blockedUser.blocked.find((login) => login == freind.login);
        if (id)
            throw new common_1.ForbiddenException('this user is blocked');
        const id1 = await this.prisma.freinds.findFirst({
            where: {
                userLogin: user.login,
                friendLogin: freind.login
            }
        });
        if (id1)
            throw new common_1.ForbiddenException('already freinds');
        this.usersService.addfreind(user.login, freind.login);
        await this.roomservice.CreateRoom(user.login, freind.login + user.login, "personnel");
        await this.roomservice.addtoroom(freind, freind.login + user.login);
    }
    async unfriend(req, freind) {
        const user = req.user;
        this.usersService.unfreind(user.login, freind);
    }
    async blockedUser(req, freind) {
        const user = req.user;
        await this.usersService.unfreind(user.login, freind);
        return await this.usersService.banuser(user.login, freind.login);
    }
    async unblockedUser(req, freind) {
        const user = req.user;
        return await this.usersService.unblocked(user.login, freind.login);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "GetProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "UpdateProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('getfreind'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getFreinds", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('addfreind'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addfriend", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('unfreind'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "unfriend", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('/blocked'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "blockedUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('/unblocked'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "unblockedUser", null);
UsersController = __decorate([
    (0, common_1.Controller)('profile'),
    __metadata("design:paramtypes", [users_service_1.UsersService, prisma_service_1.PrismaService, room_service_1.RoomService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map