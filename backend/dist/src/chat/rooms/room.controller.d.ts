import { PrismaService } from "src/prisma/prisma.service";
import { RoomService } from './room.service';
import { dbUser } from '../../users/dto/types';
export declare class RoomController {
    private prisma;
    private roomservice;
    constructor(prisma: PrismaService, roomservice: RoomService);
    CreateRoom(req: dbUser, room: any): Promise<void>;
    addroom(req: dbUser, room: any): Promise<void>;
    addtoroom(req: dbUser, room: any): Promise<void>;
    getallUserswithRoom(name: string): Promise<string[]>;
    quite_room(req: dbUser, rom: any): Promise<void>;
    getallRooms(): Promise<any[]>;
    getRoomsForUser(req: dbUser): Promise<any[]>;
    setuseradmins(req: dbUser, room: any): Promise<void>;
    banmember(req: dbUser, room: any): Promise<void>;
    unblock(req: dbUser, room: any): Promise<void>;
    getMessage(room: any): Promise<import(".prisma/client").Messages>;
    getDM(req: dbUser): Promise<import("./utils/typeObject").typeObject[]>;
    getRM(req: dbUser): Promise<import("./utils/typeObject").chanel[]>;
    muteduser(req: dbUser, room: any): Promise<void>;
    unmuteduser(req: dbUser, room: any): Promise<void>;
}
