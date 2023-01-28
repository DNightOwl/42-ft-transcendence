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
   export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
   constructor(private prisma: PrismaService, private roomservice: RoomService) {}
    @WebSocketServer() server: Server;

   
    @UseGuards(JwtAuthGuard)
    @SubscribeMessage('msgToServer')
   async  handleMessage(client: Socket, @MessageBody() Body, @Req() req: dbUser) {
    const user = req.user
    //   console.log(payload)
    //  this.server.emit('msgToClient', payload);
      const msg = await this.prisma.messages.create({
        data: {
            roomName: Body.name,
            data: Body.data,
            userLogin: user.login
      }
  })
  console.log(msg.roomName);
    }
   
    afterInit(server: Server) {
     console.log('Init');
    } 

   
    handleDisconnect(client: Socket) {
     console.log(`Client disconnected: ${client.id}`);
    }
   
    handleConnection(client: Socket) {
     console.log(`Client connected: ${client.id}`); 
    }
   }