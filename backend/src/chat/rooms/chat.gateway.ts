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
   import { PrismaService } from "src/prisma/prisma.service";
   import { RoomService } from "./room.service";
   import { Client } from 'socket.io/dist/client';
   import { Console } from 'console';
   import { userInfo } from 'os';
   import * as moment from 'moment';
   import * as cookie from 'cookie';

   @WebSocketGateway({
     cors: {
       origin: '*',
     },
   })
   export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
   constructor(private prisma: PrismaService, private roomservice: RoomService) {}
    @WebSocketServer() server: Server;
    OnlineUser: any[] = [];
    id : number = 0;

    @SubscribeMessage('msgServer')
   async handleMessage(@MessageBody() Body, @ConnectedSocket() client: any) {
    const user1 = client.user;
    this.id += 1;
    let roomName = `<${client.user.login}_${this.id}>`
    console.log(this.id);
      if (Body.type.toString() == 'DM')
      {
        const user_freind = await this.prisma.user.findUnique({
          where: {
              nickname: Body.name
          }
      });
        for (let index = 0; index < this.OnlineUser.length; index++)
        {
          if (this.OnlineUser[index].user.login == user_freind.login)
          {
            this.OnlineUser[index].join(roomName);
          }
        }
        const room = await this.prisma.room.findUnique({
          where: {
            name: (user_freind.login + user1.login)
          }
        })
        if (room)
        {
          const msg = await this.prisma.messages.create({
            data: {
                roomName: (user_freind.login + user1.login),
                data: Body.data,
                userLogin: user_freind.login
            }
          })
          this.server.to(roomName).emit("msgFromServer",Body.data);
        }
        else
        {
          const room_freind = await this.prisma.room.findUnique({
            where: {
              name: (user1.login + user_freind.login)
            }
          })
          if (room_freind)
          {
            const msg = await this.prisma.messages.create({
              data: {
                  roomName: (user1.login + user_freind.login),
                  data: Body.data,
                  userLogin: user_freind.login
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

   
   async handleDisconnect(@ConnectedSocket() client: any){
    for (let index = 0; index < this.OnlineUser.length; index++)
      {
        if (this.OnlineUser[index].id == client.id)
        {
          this.OnlineUser.splice(index, 1);
          break;
        }
      }
    const cookies = cookie.parse(client.handshake.headers.cookie);
    if (!cookies['accessToken'])
    {
      client.emit('error', 'unauthorized');
      return;
    }
    const jwttoken : string= cookies['accessToken'];
    if(!jwttoken)
    {
      client.emit('error', 'unauthorized');
      return;
    }
    try {
      const user = await this.roomservice.getUserFromAuthenticationToken(jwttoken);
      const test = this.OnlineUser.find((user) => user==client.user);
      if (!test)
      {
        console.log('=======>');
         await this.prisma.user.update({
         where: {
           login: user.login
         },
         data: {
           status: "of"
         }
       })
      }
    } catch (error) {
      client.emit('error', 'unauthorized');
    }
  }
   
   async  handleConnection(@ConnectedSocket() client: any) {

    const cookies = cookie.parse(client.handshake.headers.cookie);
    if (!cookies['accessToken'])
    {
      client.emit('error', 'unauthorized');
      client.disconnect();
      return;
    }
    const jwttoken : string= cookies['accessToken'];
    if(!jwttoken)
    {
      client.emit('error', 'unauthorized');
      client.disconnect();
      return;
    }
    try {
      const user = await this.roomservice.getUserFromAuthenticationToken(jwttoken);
      if (!user)
      {
        client.disconnect();
        return;
      }
      client.user = user;
      if (user.status == "of")
      {
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
    } catch (error) {
      client.emit('error', 'unauthorized');
      client.disconnect();
    }
  }
}