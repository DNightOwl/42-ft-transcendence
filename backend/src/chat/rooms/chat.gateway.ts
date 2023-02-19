import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
    ConnectedSocket,
   } from '@nestjs/websockets';
   import { Socket, Server } from 'socket.io';
   import { PrismaService } from "src/prisma/prisma.service";
   import { RoomService } from "./room.service";
   import * as moment from 'moment';
   import * as cookie from 'cookie';

   @WebSocketGateway({
     cors: {
       origin: "http://"+process.env.DOMAIN+":3001",
       credentials: true,
       allowedHeaders : ["Cookie"]
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
    let roomName = `<${client.user.loginacs }_${this.id}>`
      if (Body.type.toString() == 'DM')
      {
        const user_freind = await this.prisma.user.findUnique({
          where: {
              nickname: Body.name
          }
      });
        for (let index = 0; index < this.OnlineUser.length; index++)
        {
          if (this.OnlineUser[index].user.login == user_freind.login || this.OnlineUser[index].user.login == user1.login)
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
          this.server.to(roomName).emit("msgFromServer", await this.roomservice.emit_message(user1, room));
          for (let index = 0; index < this.OnlineUser.length; index++)
          {
            if (this.OnlineUser[index].user.login == user1.login)
            {
              client.emit("msgFromServer", await this.roomservice.emit_message(user_freind, room));
            }
          }
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
            this.server.to(roomName).emit("msgFromServer", await this.roomservice.emit_message(user1, room_freind));
            for (let index = 0; index < this.OnlineUser.length; index++)
            {
              if (this.OnlineUser[index].user.login == user1.login)
              {
                client.emit("msgFromServer", await this.roomservice.emit_message(user_freind, room_freind));
              }
            }
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
            if (login)
              this.OnlineUser[i].join(roomName);
          }
          const msg = await this.prisma.messages.create({
            data: {
              roomName: Body.name,
              data: Body.data,
              userLogin: user1.login
            }
            })
            this.server.to(roomName).emit("msgFromServer",await this.roomservice.emit_messagetoRoom(user1, rom));
        }
      }
    }
   
   async handleDisconnect(@ConnectedSocket() client: any){
    for (let index = 0; index < this.OnlineUser.length; index++)
      {
        if (this.OnlineUser[index].id == client.id)
        {
          this.OnlineUser.splice(index, 1);
          break;
        }
      }
    const cookies :{ [key: string]: string } = cookie.parse(client.handshake.headers.cookie || "");
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
      const test = this.OnlineUser.find((client) => client.user.login === user.login);
      if (!test)
      {
         await this.prisma.user.update({
         where: {
           login: client.user.login
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
    const cookies :{ [key: string]: string } = cookie.parse(client.handshake.headers.cookie || "");
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
      if (!user)
      {
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