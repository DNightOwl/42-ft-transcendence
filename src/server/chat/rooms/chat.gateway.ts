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
import { Console } from 'console';
   
   @WebSocketGateway({
     cors: {
       origin: '*',
     },
   })
   export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
   constructor(private prisma: PrismaService, private roomservice: RoomService) {}
    @WebSocketServer() server: Server;
    OnlineUser: any[] = [];

    @SubscribeMessage('msgServer')
   async handleMessage(@MessageBody() Body, @ConnectedSocket() client: any) {
    // const jwttoken : string= this.roomservice.parseCookie(client.handshake.headers.cookie);
    // const user1 = await this.roomservice.getUserFromAuthenticationToken(jwttoken);
    let room;
    // for (let index = 0; index < this.OnlineUser.length; index++)
    // {
    //   if (this.OnlineUser[index].user.login == Body.name)
    //   {
    //     this.OnlineUser[index].client.join(room);
    //   }
    // }
    // this.server.to(room).emit('msgServer', Body.data);
    const user1 = client.user;
    console.log(Body.type);
      if (Body.type.toString() == 'DM')
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
    for (let index = 0; index < this.OnlineUser.length; index++)
    {
      if (this.OnlineUser[index].user.login == client.user.login)
      {
        this.OnlineUser.splice(index, 1);
        break;
      }
    }

    }
   
   async  handleConnection(@ConnectedSocket() client: any) {
     const jwttoken : string= this.roomservice.parseCookie(client.handshake.headers.cookie);
    const user = await this.roomservice.getUserFromAuthenticationToken(jwttoken);
    client.user = user;
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
      this.OnlineUser.push(client);
    }
}