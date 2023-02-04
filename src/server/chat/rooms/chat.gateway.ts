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
import { userInfo } from 'os';
import * as moment from 'moment';
   
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
    const user1 = client.user;
    const roomName = ""
      if (Body.type.toString() == 'DM')
      {
        for (let index = 0; index < this.OnlineUser.length; index++)
        {
          if (this.OnlineUser[index].user.login == Body.name)
          {

            this.OnlineUser[index].join(roomName);
          }
        }
        const room = await this.prisma.room.findUnique({
          where: {
            name: (Body.name + user1.login)
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
          this.server.to(roomName).emit("msgFromServer",Body.data);
        }
        else
        {
          const room_freind = await this.prisma.room.findUnique({
            where: {
              name: (user1.login + Body.name)
            }
          })
          if (room_freind)
          {
            const msg = await this.prisma.messages.create({
              data: {
                  roomName: (user1.login + Body.name),
                  data: Body.data,
                  userLogin: Body.name
                }
            })
            this.server.to(roomName).emit("msgFromServer",Body.data);
          }
          else
            return ;
        }
      }
      else
      {
        const rom = await this.prisma.room.findUnique({
          where: {
            name: Body.name
            }
          })
        const user2 = await this.prisma.muted.findMany({
          where: {
            userLogin: user1.login,
            roomName: Body.name
            }
          })

        if (user2[0])
        {
            if (user2[0].time < moment().format('YYYY-MM-DD hh:mm:ss'))
            {
              this.roomservice.unmuted(user1, Body);
            }
            else return;
        }
        if (rom)
        {
          for (let i = 0; i < this.OnlineUser.length; i++)
          {
            const login = rom.members.find((login) => login==this.OnlineUser[i].user.login);
            if (login && this.OnlineUser[i].user.login != user1.login)
              this.OnlineUser[i].join(roomName);
          }
          this.server.to(roomName).emit("msgFromServer",Body.data);
          const msg = await this.prisma.messages.create({
            data: {
              roomName: Body.name,
              data: Body.data,
              userLogin: user1.login
            }
            })
        }
      }
    }
   
    // afterInit(server: Server) {
    //  console.log('Init');
    // } 

   
   async handleDisconnect(@ConnectedSocket() client: any) {
    for (let index = 0; index < this.OnlineUser.length; index++)
    {
      if (this.OnlineUser[index].id == client.id)
      {
        this.OnlineUser.splice(index, 1);
        break;
      }
    }
    //console.log(this.OnlineUser[0].user);
    const jwttoken : string= this.roomservice.parseCookie(client.handshake.headers.cookie);
    const user = await this.roomservice.getUserFromAuthenticationToken(jwttoken);
     const test = this.OnlineUser.find((user) => user==user);
     if (!test)
     {
        await this.prisma.user.update({
        where: {
          login: user.login
        },
        data: {
          status: "of"
        }
      })
     }


  }
   
   async  handleConnection(@ConnectedSocket() client: any) {
     const jwttoken : string= this.roomservice.parseCookie(client.handshake.headers.cookie);
    const user = await this.roomservice.getUserFromAuthenticationToken(jwttoken);
    client.user = user;
    console.log(user.login);
    if (user.status == "of")
    {
      console.log(user.status);
      const user1 = await this.prisma.user.update({
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