import { ForbiddenException, Injectable} from "@nestjs/common";
import { use } from "passport";
import { PrismaService } from "src/server/prisma/prisma.service";
import { comparepassword, hashPassword} from "./utils/bcrypt";
import { typeObject } from "./utils/typeObject";




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

  async getallRooms(){
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

    async getRoomsForUser(user: any){
      let allRooms = [];
  
      const rooms = await this.prisma.room.findMany();
      rooms.forEach( element => {
          let obj = {
              id: element.id,
              admins: element.admins,
              members: element.members,
              name: element.name,
              type: element.type,
              owner: element.owner
              
          }
          const id = obj.members.find((login) => login==user.login)
          if (id)
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

        async quite_room(user: any, rom: any)
        {
          const rooms = await this.prisma.room.findUnique({
            where: {
              name: rom.name
            }
          })
        const id1 =  rooms.admins.find((login) =>login==user.login)
        if (id1)
        {
            await this.prisma.room.update({
                where: {
                    name: rom.name
                },
                data: {
                    admins: {
                        set: rooms.admins.filter((log) => log != user.login)
                    }
                }
            });
        }
        await this.prisma.room.update({
            where: {
                name: rom.name
            },
            data: {
                members: {
                    set: rooms.members.filter((name) => name != user.login)
                }
            }
        });
      }

      async   getMessage(name: string)
    {
      // interface typeobject{
      //   type: string
      //   message: string
      // }
      // interface typeObject{
      //   id:string
      //   username:string
      //   latestMessage: string
      //   conversation:typeObject[]
      // }
      // for (let index = 0; index < 8; index++) {
      //   let person:typeObject;

      // }
        const allmessage = await this.prisma.room.findUnique({
            where: {
                name: name
            },
                select: {
                    message: true
                }
        })
        let v = allmessage.message.length;
        return allmessage.message[v - 1];
    }

    async   getMessagepers(type: string, user1: any):Promise<typeObject[]>
    {
        const rooms = await this.prisma.room.findMany({
          where: {
            type: type
          }
        })
        let obj: typeObject[] = []; 
        for (let index = 0; index < rooms.length; index++)
        {
          // let person : typeObject = {÷};
            const user = await this.prisma.user.findUnique({
              where: {
                login: rooms[index].name
              } 
            });
            const allmessage = await this.prisma.room.findUnique({
              where: {
                  name: rooms[index].name
              },
                  select: {
                      message: true
                  }
          })
            let person : typeObject = {id : user.id, username : user.login, latestMessage: allmessage.message[allmessage.message.length - 1].data   , conversation : []};
          person.conversation = allmessage.message.map((x) =>    ({type :"", message :x.data }));
          for (let i = allmessage.message.length - 1; i >= 0 ;i--)
          {
            //person.conversation[i].message = allmessage.message[i].data;
            if (user1.login == allmessage.message[i].userLogin)
                person.conversation[i].type = "user";
            else
              person.conversation[i].type = "freind";  

          }
          obj.push(person);
        }
        return obj;
    }
}