import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
    ConnectedSocket,
   } from '@nestjs/websockets';
   import { Logger,  UseGuards, Req } from '@nestjs/common';
   import { Socket, Server } from 'socket.io';
   import { PrismaService } from "src/server/prisma/prisma.service";
   import { RoomService } from "./room.service";
   import { JwtAuthGuard } from '../../auth/jwt/jwt.guard';
   import { dbUser } from '../../users/dto/types';
import { Client } from 'socket.io/dist/client';
   
   @WebSocketGateway({
     cors: {
       origin: '*',
     },
   })
   export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
   constructor(private prisma: PrismaService, private roomservice: RoomService) {}
    @WebSocketServer() server: Server;

    @SubscribeMessage('msgServer')
   async handleMessage(@MessageBody() Body, @ConnectedSocket() client: any) {
    // const jwttoken : string= this.roomservice.parseCookie(client.handshake.headers.cookie);
    // const user1 = await this.roomservice.getUserFromAuthenticationToken(jwttoken);
    const user1 = client.user;
      if (Body.type == "DM")
      {
        const room = await this.prisma.room.findUnique({
          where: {
            name: (Body.login + user1.login)
          }
        })
        if (room)
        {
          const msg = await this.prisma.messages.create({
            data: {
                roomName: (Body.name + user1.login),
                data: Body.data,
                userLogin: Body.name
            }
          })
        }
        else
        {
          const msg = await this.prisma.messages.create({
            data: {
                roomName: (user1.login + Body.name),
                data: Body.data,
                userLogin: Body.name
            }
          })
        }
      }
      else
      {
        const msg = await this.prisma.messages.create({
          data: {
              roomName: Body.name,
              data: Body.data,
              userLogin: user1.login
          }
        })
      }
      

  }
   
    // afterInit(server: Server) {
    //  console.log('Init');
    // } 

   
    handleDisconnect(@ConnectedSocket() client: any) {
    // console.log(`Client disconnected: ${client.id}`);
    console.log(client.id);

    }
   
   async  handleConnection(@ConnectedSocket() client: any) {
     //console.log(`Client connected: ${client.id}`); 
     const jwttoken : string= this.roomservice.parseCookie(client.handshake.headers.cookie);
     //const jwttoken = client.handshake.headers.cookie;
    const user = await this.roomservice.getUserFromAuthenticationToken(jwttoken);
    client.user = user;
    console.log(user.login);
    if (user.status == "of")
    {
      const user1 = this.prisma.user.update({
        where: {
          login: user.login
        },
        data: {
          status: "on"
        }
      })
    }
  }
}