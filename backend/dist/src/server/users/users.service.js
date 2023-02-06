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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findProfile(login) {
        const id1 = await this.prisma.user.findUnique({
            where: {
                login: login
            },
            select: {
                login: true,
                id: true,
                nickname: true,
                email: true
            }
        });
        if (!id1.login)
            throw new common_1.ForbiddenException('Credentials incorrect');
        return id1;
    }
    async updateuserinfo(login, nickname) {
        const id1 = await this.prisma.user.update({
            where: {
                login: login
            },
            data: {
                nickname: nickname
            }
        });
    }
    async getfreind(login) {
        const myfreinds = await this.prisma.user.findUnique({
            where: {
                login: login
            },
            select: {
                freinds: true
            }
        });
        return myfreinds;
    }
    async addfreind(login, freindlogin) {
        const blockedUser = await this.prisma.user.findUnique({
            where: {
                login: login
            }
        });
        const table = await this.prisma.freinds.create({
            data: {
                userLogin: login,
                friendLogin: freindlogin,
            }
        });
        await this.prisma.freinds.create({
            data: {
                userLogin: freindlogin,
                friendLogin: login
            }
        });
    }
    async unfreind(login, freind) {
        await this.prisma.freinds.deleteMany({
            where: {
                AND: [
                    { userLogin: login },
                    { friendLogin: freind.login },
                ]
            }
        });
        await this.prisma.freinds.deleteMany({
            where: {
                AND: [
                    { userLogin: freind.login },
                    { friendLogin: login }
                ]
            }
        });
        const room = await this.prisma.room.findUnique({
            where: {
                name: login + freind.login
            }
        });
        if (room) {
            await this.prisma.room.deleteMany({
                where: {
                    name: login + freind.login
                }
            });
        }
        else {
            await this.prisma.room.deleteMany({
                where: {
                    name: freind.login + login
                }
            });
        }
    }
    async banuser(login, flogin) {
        const user_blocked = await this.prisma.user.update({
            where: {
                login: login
            },
            data: {
                blocked: {
                    push: flogin,
                },
            },
        });
    }
    async unblocked(login, flogin) {
        const userblocked = await this.prisma.user.findUnique({
            where: {
                login: login
            }
        });
        const userUpdate = await this.prisma.user.update({
            where: {
                login: login
            },
            data: {
                blocked: {
                    set: userblocked.blocked.filter((login) => login != flogin)
                }
            }
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map