import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PrismaService } from "src/server/prisma/prisma.service";
import { RoomService } from "./room.service";
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private prisma;
    private roomservice;
    constructor(prisma: PrismaService, roomservice: RoomService);
    server: Server;
    OnlineUser: any[];
    id: number;
    handleMessage(Body: any, client: any): Promise<void>;
    handleDisconnect(client: any): Promise<void>;
    handleConnection(client: any): Promise<void>;
}
