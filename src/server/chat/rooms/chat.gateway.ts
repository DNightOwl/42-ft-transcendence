import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
   } from '@nestjs/websockets';
   import { Logger,  UseGuards, Req } from '@nestjs/common';
   import { Socket, Server } from 'socket.io';
   import { PrismaService } from "src/server/prisma/prisma.service";
   import { RoomService } from "./room.service";
   import { JwtAuthGuard } from '../../auth/jwt/jwt.guard';
   import { dbUser } from '../../users/dto/types';
   
   @WebSocketGateway({
     cors: {
       origin: '*',
     },
   })
   export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
   constructor(private prisma: PrismaService, private roomservice: RoomService) {}
    @WebSocketServer() server: Server;

   
    @SubscribeMessage('msgServer')
   async handleMessage(clien: Socket, @MessageBody() Body, @Req() req: dbUser) {
      const msg = await this.prisma.messages.create({
        data: {
            roomName: Body.name,
            data: Body.data,
            userLogin: Body.login
        }
    })
  }
   
    // afterInit(server: Server) {
    //  console.log('Init');
    // } 

   
    handleDisconnect(client: Socket) {
    // console.log(`Client disconnected: ${client.id}`);
    console.log(client.id);

    }
   
   async  handleConnection(client: Socket) {
     //console.log(`Client connected: ${client.id}`); 
     const jwttoken : string= this.roomservice.parseCookie(client.handshake.headers.cookie);
     //const jwttoken = client.handshake.headers.cookie;
    const user = await this.roomservice.getUserFromAuthenticationToken(jwttoken);
  
     console.log(client.id);
     //console.log(user);
    }
   }