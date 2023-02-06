import { UsersService } from './users.service';
import { RequestWithUser, dbUser } from './dto/types';
import { PrismaService } from "src/prisma/prisma.service";
import { RoomService } from '../chat/rooms/room.service';
export declare class UsersController {
    private readonly usersService;
    private prisma;
    private roomservice;
    constructor(usersService: UsersService, prisma: PrismaService, roomservice: RoomService);
    GetProfile(req: dbUser): Promise<{
        id: string;
        email: string;
        login: string;
        nickname: string;
    }>;
    UpdateProfile(req: dbUser, modify: any): Promise<void>;
    getFreinds(req: RequestWithUser): Promise<{
        freinds: import(".prisma/client").Freinds[];
    }>;
    addfriend(req: dbUser, freind: any): Promise<void>;
    unfriend(req: dbUser, freind: any): Promise<void>;
    blockedUser(req: dbUser, freind: any): Promise<void>;
    unblockedUser(req: dbUser, freind: any): Promise<void>;
}
