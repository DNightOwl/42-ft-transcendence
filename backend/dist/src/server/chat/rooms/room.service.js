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
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt_1 = require("./utils/bcrypt");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const moment = require("moment");
let RoomService = class RoomService {
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async getUserFromAuthenticationToken(token) {
        if (token) {
            const payload = await this.jwt.verify(token, {
                secret: this.config.get("ACCESS_TOKEN_SECRET"),
            });
            if (payload.login) {
                const user = await this.prisma.user.findUnique({
                    where: {
                        login: payload.login
                    },
                    select: {
                        id: true,
                        nickname: true,
                        pictureLink: true,
                        login: true,
                        status: true
                    }
                });
                return user;
            }
        }
    }
    async CreateRoom(userlogin, name, type) {
        const rooms = await this.prisma.room.findUnique({
            where: {
                name: name
            }
        });
        if (rooms)
            throw new common_1.ForbiddenException('name existe');
        const id1 = await this.prisma.room.create({
            data: {
                name: name,
                admins: userlogin,
                members: userlogin,
                owner: userlogin,
                type: type
            }
        });
    }
    async CreateRoomprotected(userlogin, name, type, password) {
        if (!password)
            throw new common_1.ForbiddenException('entrez password');
        const rooms = await this.prisma.room.findUnique({
            where: {
                name: name
            }
        });
        if (rooms)
            throw new common_1.ForbiddenException('name existe');
        const rawPassword = await (0, bcrypt_1.hashPassword)(password);
        const id1 = await this.prisma.room.create({
            data: {
                name: name,
                admins: userlogin,
                members: userlogin,
                owner: userlogin,
                type: type,
                hash: rawPassword
            }
        });
    }
    async addroom(user, name) {
        const rooms = await this.prisma.room.findUnique({
            where: {
                name: name
            }
        });
        const id_ban = rooms.blocked.find((login) => login == user.login);
        if (id_ban)
            throw new common_1.ForbiddenException('you are  banned');
        const id1 = rooms.members.find((login) => login == user.login);
        if (id1)
            throw new common_1.ForbiddenException('already members');
        const userUpdate = await this.prisma.room.update({
            where: {
                name: name,
            },
            data: {
                members: {
                    push: user.login,
                },
            },
        });
    }
    async addroomprotected(user, room) {
        const rooms = await this.prisma.room.findUnique({
            where: {
                name: room.name
            }
        });
        const matched = (0, bcrypt_1.comparepassword)(room.password, rooms.hash);
        if (!matched)
            throw new common_1.ForbiddenException('password incorrect');
        const id_ban = rooms.blocked.find((login) => login == user.login);
        if (id_ban)
            throw new common_1.ForbiddenException('user banned');
        const id1 = rooms.members.find((login) => login == user.login);
        if (id1)
            throw new common_1.ForbiddenException('already members');
        const userUpdate = await this.prisma.room.update({
            where: {
                name: room.name,
            },
            data: {
                members: {
                    push: user.login,
                },
            },
        });
    }
    async addtoroom(user, room) {
        const rooms = await this.prisma.room.findUnique({
            where: {
                name: room.name
            }
        });
        const id1 = rooms.admins.find((login) => login == user.login);
        if (!id1)
            throw new common_1.ForbiddenException('you are  Not admins');
        const rom = await this.prisma.room.findUnique({
            where: {
                name: room.name
            }
        });
        const id_ban = rooms.blocked.find((login) => login == room.login);
        if (id_ban)
            throw new common_1.ForbiddenException('user banned');
        const userUpdate = await this.prisma.room.update({
            where: {
                name: room.name,
            },
            data: {
                members: {
                    push: room.login,
                },
            },
        });
    }
    async getallUserswithRoom(name) {
        const users = await this.prisma.room.findMany({
            where: {
                name: name,
            },
            select: {
                members: true
            }
        });
        return (users[0].members);
    }
    async getallRooms() {
        let allRooms = [];
        const rooms = await this.prisma.room.findMany();
        rooms.forEach(element => {
            let obj = {
                id: element.id,
                admins: element.admins,
                members: element.members,
                name: element.name,
                type: element.type,
                owner: element.owner
            };
            if (obj.type === "public" || obj.type === "protected")
                allRooms.push(obj);
        });
        return allRooms;
    }
    async getRoomsForUser(user) {
        let allRooms = [];
        const rooms = await this.prisma.room.findMany();
        rooms.forEach(element => {
            let obj = {
                id: element.id,
                admins: element.admins,
                members: element.members,
                name: element.name,
                type: element.type,
                owner: element.owner
            };
            const id = obj.members.find((login) => login == user.login);
            if (id)
                allRooms.push(obj);
        });
        return allRooms;
    }
    async adduseradmins(user, room) {
        const rooms = await this.prisma.room.findUnique({
            where: {
                name: room.name
            }
        });
        if (rooms.owner != user.login)
            throw new common_1.ForbiddenException('you are not owner');
        const id1 = rooms.admins.find((login) => login == room.login);
        if (id1)
            throw new common_1.ForbiddenException('already admins');
        const id2 = rooms.members.find((login) => login == room.login);
        if (!id2)
            throw new common_1.ForbiddenException('is not member');
        const userUpdate = await this.prisma.room.update({
            where: {
                name: room.name,
            },
            data: {
                admins: {
                    push: room.login,
                },
            },
        });
    }
    async banmember(user, room) {
        const rooms = await this.prisma.room.findUnique({
            where: {
                name: room.name
            }
        });
        const id1 = rooms.admins.find((login) => login == user.login);
        if (!id1)
            throw new common_1.ForbiddenException('you are  Not admins');
        const id2 = rooms.admins.find((login) => login == room.login);
        if (id2 && rooms.owner != user.login)
            throw new common_1.ForbiddenException('you are not owner, impossiple to remove admin');
        const userUpdate = await this.prisma.room.update({
            where: {
                name: room.name
            },
            data: {
                members: {
                    set: rooms.members.filter((login) => login != room.login)
                }
            }
        });
        if (id2) {
            const adminupdate = await this.prisma.room.update({
                where: {
                    name: room.name
                },
                data: {
                    admins: {
                        set: rooms.admins.filter((login) => login != room.login)
                    }
                }
            });
        }
        const addtoblock = await this.prisma.room.update({
            where: {
                name: room.name,
            },
            data: {
                blocked: {
                    push: room.login,
                },
            },
        });
    }
    async unblockfromroom(user, room) {
        const rooms = await this.prisma.room.findUnique({
            where: {
                name: room.name
            }
        });
        const id1 = rooms.admins.find((login) => login == user.login);
        if (!id1)
            throw new common_1.ForbiddenException('you are  Not admins');
        const userUpdate = await this.prisma.room.update({
            where: {
                name: room.name
            },
            data: {
                blocked: {
                    set: rooms.blocked.filter((login) => login != room.login)
                }
            }
        });
    }
    async quite_room(user, rom) {
        const rooms = await this.prisma.room.findUnique({
            where: {
                name: rom.name
            }
        });
        const id1 = rooms.admins.find((login) => login == user.login);
        if (id1) {
            await this.prisma.room.update({
                where: {
                    name: rom.name
                },
                data: {
                    admins: {
                        set: rooms.admins.filter((log) => log != user.login)
                    }
                }
            });
        }
        await this.prisma.room.update({
            where: {
                name: rom.name
            },
            data: {
                members: {
                    set: rooms.members.filter((name) => name != user.login)
                }
            }
        });
    }
    async getMessage(name) {
        const allmessage = await this.prisma.room.findUnique({
            where: {
                name: name
            },
            select: {
                message: true
            }
        });
        let v = allmessage.message.length;
        return allmessage.message[v - 1];
    }
    async getDM(type, user1) {
        const rooms = await this.prisma.room.findMany({
            where: {
                type: type
            }
        });
        let obj = [];
        for (let index = 0; index < rooms.length; index++) {
            const id1 = rooms[index].members.find((login) => login == user1.login);
            if (id1) {
                let login;
                if (rooms[index].name == (user1.login + rooms[index].members[0])) {
                    login = rooms[index].members[0];
                }
                else
                    login = rooms[index].members[1];
                const user = await this.prisma.user.findUnique({
                    where: {
                        login: login
                    }
                });
                const allmessage = await this.prisma.room.findUnique({
                    where: {
                        name: rooms[index].name
                    },
                    select: {
                        message: true
                    }
                });
                let person = { id: user.id, username: user.login, status: user.status, latestMessage: allmessage.message[allmessage.message.length - 1].data, conversation: [] };
                person.conversation = allmessage.message.map((x) => ({ type: "", message: x.data }));
                for (let i = allmessage.message.length - 1; i >= 0; i--) {
                    if (user1.login == allmessage.message[i].userLogin)
                        person.conversation[i].type = "user";
                    else
                        person.conversation[i].type = "freind";
                }
                obj.push(person);
            }
        }
        return obj;
    }
    async getRM(user) {
        const rooms = await this.prisma.room.findMany({
            where: {
                OR: [
                    { type: "protected" },
                    { type: "public" },
                    { type: "private" }
                ]
            }
        });
        let obj = [];
        for (let index = 0; index < rooms.length; index++) {
            const id1 = rooms[index].members.find((login) => login == user.login);
            if (id1) {
                const allmessage = await this.prisma.room.findUnique({
                    where: {
                        name: rooms[index].name
                    },
                    select: {
                        message: true
                    }
                });
                let role;
                if (rooms[index].owner == user.login)
                    role = "owner";
                else {
                    const admin = rooms[index].admins.find((login) => login == user.login);
                    if (admin)
                        role = "admins";
                    else
                        role = "members";
                }
                let person = { id: rooms[index].id, name: rooms[index].name, members: rooms[index].members.length, latestMessage: allmessage.message[allmessage.message.length - 1].data, role: role, conversation: [] };
                person.conversation = allmessage.message.map((x) => ({ type: "", message: x.data }));
                for (let i = allmessage.message.length - 1; i >= 0; i--) {
                    if (user.login == allmessage.message[i].userLogin)
                        person.conversation[i].type = "user";
                    else
                        person.conversation[i].type = "member";
                }
                obj.push(person);
            }
        }
        return obj;
    }
    parseCookie(cookie) {
        let jwttoken = "";
        for (let index = 0; index < cookie.length; index++) {
            if (cookie[index] == "=") {
                index++;
                let i = 0;
                while (index != cookie.length) {
                    jwttoken += cookie[index];
                    i++;
                    index++;
                }
                break;
            }
        }
        return jwttoken;
    }
    async muted(user, room) {
        const rooms = await this.prisma.room.findUnique({
            where: {
                name: room.name
            }
        });
        const id1 = rooms.admins.find((login) => login == user.login);
        if (!id1)
            throw new common_1.ForbiddenException('you are Not admins');
        const id2 = rooms.admins.find((login) => login == room.login);
        if (id2 && rooms.owner != user.login)
            throw new common_1.ForbiddenException('you are not owner, impossiple to mute admin');
        if (id2) {
            const adminupdate = await this.prisma.room.update({
                where: {
                    name: room.name
                },
                data: {
                    admins: {
                        set: rooms.admins.filter((login) => login != room.login)
                    }
                }
            });
        }
        const time = moment().add(1, 'm').format('YYYY-MM-DD hh:mm:ss');
        const mute = await this.prisma.muted.create({
            data: {
                roomName: room.name,
                userLogin: room.login,
                time: time
            }
        });
    }
    async unmuted(user, room) {
        await this.prisma.muted.deleteMany({
            where: {
                AND: [
                    { userLogin: user.login },
                    { roomName: room.name }
                ]
            }
        });
    }
};
RoomService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], RoomService);
exports.RoomService = RoomService;
//# sourceMappingURL=room.service.js.map