import { PrismaService } from "src/prisma/prisma.service";
import { chanel, typeObject } from "./utils/typeObject";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from '@nestjs/config';
export declare class RoomService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    getUserFromAuthenticationToken(token: string): Promise<{
        id: string;
        login: string;
        pictureLink: string;
        nickname: string;
        status: string;
    }>;
    CreateRoom(userlogin: string, name: string, type: string): Promise<void>;
    CreateRoomprotected(userlogin: string, name: string, type: string, password: string): Promise<void>;
    addroom(user: any, name: string): Promise<void>;
    addroomprotected(user: any, room: any): Promise<void>;
    addtoroom(user: any, room: any): Promise<void>;
    getallUserswithRoom(name: string): Promise<string[]>;
    getallRooms(): Promise<any[]>;
    getRoomsForUser(user: any): Promise<any[]>;
    adduseradmins(user: any, room: any): Promise<void>;
    banmember(user: any, room: any): Promise<void>;
    unblockfromroom(user: any, room: any): Promise<void>;
    quite_room(user: any, rom: any): Promise<void>;
    getMessage(name: string): Promise<import(".prisma/client").Messages>;
    getDM(type: string, user1: any): Promise<typeObject[]>;
    getRM(user: any): Promise<chanel[]>;
    parseCookie(cookie: string): string;
    muted(user: any, room: any): Promise<void>;
    unmuted(user: any, room: any): Promise<void>;
}
