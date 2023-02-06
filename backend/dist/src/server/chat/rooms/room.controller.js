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
exports.RoomController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const jwt_guard_1 = require("../../auth/jwt/jwt.guard");
const room_service_1 = require("./room.service");
let RoomController = class RoomController {
    constructor(prisma, roomservice) {
        this.prisma = prisma;
        this.roomservice = roomservice;
    }
    async CreateRoom(req, room) {
        const user = req.user;
        if (room.type === "public" || room.type === "private")
            await this.roomservice.CreateRoom(user.login, room.name, room.type);
        else
            await this.roomservice.CreateRoomprotected(user.login, room.name, room.type, room.password);
    }
    async addroom(req, room) {
        const user = req.user;
        if (room.type === "public")
            await this.roomservice.addroom(user, room.name);
        else
            await this.roomservice.addroomprotected(user, room);
    }
    async addtoroom(req, room) {
        const user = req.user;
        await this.roomservice.addtoroom(user, room);
    }
    async getallUserswithRoom(name) {
        return await this.roomservice.getallUserswithRoom(name);
    }
    async quite_room(req, rom) {
        const user = req.user;
        return await this.roomservice.quite_room(user, rom);
    }
    async getallRooms() {
        return await this.roomservice.getallRooms();
    }
    async getRoomsForUser(req) {
        const user = req.user;
        return await this.roomservice.getRoomsForUser(user);
    }
    async setuseradmins(req, room) {
        const user = req.user;
        await this.roomservice.adduseradmins(user, room);
    }
    async banmember(req, room) {
        const user = req.user;
        await this.roomservice.banmember(user, room);
    }
    async unblock(req, room) {
        const user = req.user;
        await this.roomservice.unblockfromroom(user, room);
    }
    async getMessage(room) {
        return await this.roomservice.getMessage(room.name);
    }
    async getDM(req) {
        const user = req.user;
        return await this.roomservice.getDM("personnel", user);
    }
    async getRM(req) {
        const user = req.user;
        return await this.roomservice.getRM(user);
    }
    async muteduser(req, room) {
        const user = req.user;
        return await this.roomservice.muted(user, room);
    }
    async unmuteduser(req, room) {
        const user = req.user;
        return await this.roomservice.unmuted(user, room);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('createroom'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "CreateRoom", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/addroom'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "addroom", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/addtoroom'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "addtoroom", null);
__decorate([
    (0, common_1.Get)('/userswithroom/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getallUserswithRoom", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('quiteRoom'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "quite_room", null);
__decorate([
    (0, common_1.Get)('allrooms'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getallRooms", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getRoomsForUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/setadmins'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "setuseradmins", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('/ban'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "banmember", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('/unblockfromroom'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "unblock", null);
__decorate([
    (0, common_1.Get)('allmessages'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getMessage", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('DM'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getDM", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('RoomMessage'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getRM", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('muted'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "muteduser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('unmuted'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "unmuteduser", null);
RoomController = __decorate([
    (0, common_1.Controller)('rooms'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, room_service_1.RoomService])
], RoomController);
exports.RoomController = RoomController;
//# sourceMappingURL=room.controller.js.map