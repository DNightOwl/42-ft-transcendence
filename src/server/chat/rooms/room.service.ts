import { ForbiddenException, Injectable} from "@nestjs/common";
import { PrismaService } from "src/server/prisma/prisma.service";
import { comparepassword, hashPassword} from "./utils/bcrypt";

@Injectable()
export class RoomService 
{
    constructor(private prisma: PrismaService) {}
    async CreateRoom(userlogin: string, name: string, type: string) {
        const rooms = await this.prisma.room.findUnique({
          where: {
              name: name
          }
      });
      if (rooms)
        throw new ForbiddenException('name existe'); 
      const id1 = await this.prisma.room.create({
            data: {
                    name: name,
                    admins: userlogin,
                    members: userlogin,
                    owner: userlogin,
                    type: type
                }
            })
      }
  
      async CreateRoomprotected(userlogin: string, name: string, type: string, password: string){
        if (!password)
        throw new ForbiddenException('entrez password');
        const rooms = await this.prisma.room.findUnique({
          where: {
              name: name
          }
      });
      if (rooms)
        throw new ForbiddenException('name existe');
      const rawPassword = await hashPassword(password);
      const id1 = await this.prisma.room.create({
        data: {
                name: name,
                admins: userlogin,
                members: userlogin,
                owner: userlogin,
                type: type,
                hash: rawPassword
            }
        })
      }
      async addtoroom(user: any, name: string) {
        const rooms = await this.prisma.room.findUnique({
            where: {
                name: name
            }
        });
        const id_ban = rooms.blocked.find((login) => login==user.login)
        if (id_ban)
          throw new ForbiddenException('user banned');
       const id1 =  rooms.members.find((login) => login==user.login)
       if (id1)
            throw new ForbiddenException('already members');
        const userUpdate = await this.prisma.room.update({
            where: {
              name: name,
            },
            data: {
              members: {
                push: user.login,
              },
            },
        })
    }

    async addtoroomprotected(user: any, room: any) {
      const rooms = await this.prisma.room.findUnique({
          where: {
              name: room.name
          }
      });
      const matched = comparepassword(room.password, rooms.hash);
      if (!matched)
        throw new ForbiddenException('password incorrect');
      const id_ban = rooms.blocked.find((login) => login==user.login)
      if (id_ban)
        throw new ForbiddenException('user banned');
     const id1 =  rooms.members.find((login) => login==user.login)
     if (id1)
      throw new ForbiddenException('already members');
      const userUpdate = await this.prisma.room.update({
          where: {
            name: room.name,
          },
          data: {
            members: {
              push: user.login,
            },
          },
      })
  }

  async getRoomsForUser(){
    let allRooms = [];

    const rooms = await this.prisma.room.findMany();
    rooms.forEach(element => {
        let obj = {
            id: element.id,
            admins: element.admins,
            members: element.members,
            name: element.name,
            type: element.type,
            owner: element.owner
            
        }
        if (obj.type === "public" || obj.type === "protected")
          allRooms.push(obj);
        });
        return allRooms;
    }

    async   adduseradmins(user: any, room: any)
    {
        const rooms = await this.prisma.room.findUnique({
            where: {
                name: room.name
            }
        });
        if (rooms.owner != user.login)
          throw new ForbiddenException('is not owner');
        const id1 =  rooms.admins.find((login) =>login==room.login)
        if (id1)
            throw new ForbiddenException('already admins');
            // const r = await this.prisma.room.findUnique({
            //     where: {
            //         name: user.name
            //     }
            // });
           const id2 =  rooms.members.find((login) =>login==room.login)
           if (!id2)
            throw new ForbiddenException('is not member');
        const userUpdate = await this.prisma.room.update({
            where: {
              name: room.name,
            },
            data: {
              admins: {
                push: room.login,
              },
            },
          })
    }

    async   banmember(user: any, room: any)
    {
        const rooms = await this.prisma.room.findUnique({
            where: {
              name: room.name
            }
          })
          const id1 =  rooms.admins.find((login) =>login==user.login)
          if (!id1)
              throw new ForbiddenException('is Not admins');
          const id2 = rooms.admins.find((login) =>login==room.login)
          if (id2 && rooms.owner != user.login)
            throw new ForbiddenException('you are not owner, impossiple to remove admin');
            const userUpdate = await this.prisma.room.update({
            where: {
             name: room.name
            },
            data: {
              members: {
                set: rooms.members.filter((login) => login != room.login)
                }
              }
          })
          if (id2)
          {
            const adminupdate = await this.prisma.room.update({
              where: {
               name: room.name
              },
              data: {
                admins: {
                  set: rooms.admins.filter((login) => login != room.login)
                  }
                }
            })
          }
          const addtoblock = await this.prisma.room.update({
            where: {
              name: room.name,
            },
            data: {
              blocked: {
                push: room.login,
              },
            },
          })
        }
}