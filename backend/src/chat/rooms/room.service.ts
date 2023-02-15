import { ForbiddenException, Injectable} from "@nestjs/common";
import { use } from "passport";
import { PrismaService } from "src/prisma/prisma.service";
import { comparepassword, hashPassword} from "./utils/bcrypt";
import { chanel, typeObject } from "./utils/typeObject";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from '@nestjs/config';
import { usersObject, profileObject } from '../../users/utils/usersObject';
import * as moment from 'moment';





@Injectable()
export class RoomService
{

    constructor(
      private prisma: PrismaService,
      private jwt: JwtService,
      private config: ConfigService
      ) {}

    public async getUserFromAuthenticationToken(token: string) {
      if (token) {
        const payload = await this.jwt.verify(token, {
            secret: this.config.get("ACCESS_TOKEN_SECRET"),
        })

        if (payload.login) {
            const user =  await this.prisma.user.findUnique({
                where: {
                    login: payload.login
                },
                select: {
                    id: true,
                    nickname: true,
                    pictureLink: true,
                    login: true,
                    status: true
                }
            });
            return user;
        }

      }
  }
    async CreateRoom(userlogin: string, name: string, type: string) {
      console.log(name);
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
      async addroom(user: any, name: string) {
        const rooms = await this.prisma.room.findUnique({
            where: {
                name: name
            }
        });
        const id_ban = rooms.blocked.find((login) => login==user.login)
        if (id_ban)
          throw new ForbiddenException('you are  banned');
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

    async addroomprotected(user: any, room: any) {
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

  async addtoroomNopublic(user: any, room: any)
  {
    const user_freind = await this.prisma.user.findUnique({
      where: {
          nickname: room.login
       }
    });
    const rooms = await this.prisma.room.findFirst({
      where: {
        name: room.name
      }
    })
    const id1 =  rooms.admins.find((login) =>login==user_freind.login)
    if (!id1)
        throw new ForbiddenException('you are  Not admins');
    const rom = await this.prisma.room.findUnique({
      where: {
          name: room.name
      }
    });
    const id_ban = rooms.blocked.find((login) => login==user_freind.login)
    if (id_ban)
      throw new ForbiddenException('user banned');
      const user_members = rooms.members.find((login) => login==user_freind.login)
      if (user_members)
          throw new ForbiddenException('user already members');
    const userUpdate = await this.prisma.room.update({
      where: {
        name: room.name,
      },
      data: {
        members: {
          push: user_freind.login,
        },
      },
    })
  }

  async addtoroom(user: any, room: any)
  {
    const user_freind = await this.prisma.user.findUnique({
      where: {
          nickname: room.login
       }
    });
    const rooms = await this.prisma.room.findFirst({
      where: {
        name: room.name
      }
    })
    const rom = await this.prisma.room.findUnique({
      where: {
          name: room.name
      }
    });
    const id_ban = rooms.blocked.find((login) => login==user_freind.login)
    if (id_ban)
      throw new ForbiddenException('user banned');
    const user_members = rooms.members.find((login) => login==user_freind.login)
    if (user_members)
        throw new ForbiddenException('user already members');
    const userUpdate = await this.prisma.room.update({
      where: {
        name: room.name,
      },
      data: {
        members: {
          push: user_freind.login,
        },
      },
    })
  }


  async getfreindNotjoinRoom(user: any, name: string)
  {
      const user_freind = await this.prisma.freinds.findMany({
        where: {
          userLogin: user.login
        }
      })
      let obj: usersObject[] = [];
      const room = await this.prisma.room.findFirst({
        where: {
            name: name
        }
      })
      for (let index = 0; index < user_freind.length; index++)
      {
          const user_in_room = room.members.find((login) => login==user_freind[index].friendLogin);
          if (!user_in_room)
          {
            const user2 = await this.prisma.user.findUnique({
              where: {
                login: user_freind[index].friendLogin
              }
            })
            let freind : usersObject = {id: user2.id, username: user2.nickname, status: user2.status, pictureLink: user2.pictureLink, freind: "freind", blocked: "",  NumberofFreinds: 0}
            obj.push(freind);
          }
      }
      return obj;
  }


  async getallUsersinRoom(user1: any, name: string)
  {
        let obj: usersObject[] = [];
        const users = await this.prisma.room.findFirst({
          where: {
            name: name,
          },
          select: {
            members: true
          }
        })
        for (let index = 0; index < users.members.length; index++)
        {
          const user = await this.prisma.user.findUnique({
            where: {
              login: users.members[index]
            }
          })
          if (user1.login == user.login)
              continue;
          let freind : usersObject = {id: user.id, username: user.nickname, status: user.status, pictureLink: user.pictureLink, freind: "freind", blocked: "",  NumberofFreinds: 0}
          obj.push(freind);
          
        }
        return (obj);
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
    const user_freind = await this.prisma.user.findUnique({
      where: {
          nickname: room.login
       }
    });
      const rooms = await this.prisma.room.findUnique({
          where: {
              name: room.name
          }
      });
      if (rooms.owner != user.login)
        throw new ForbiddenException('you are not owner');
      const id1 =  rooms.admins.find((login) =>login==user_freind.login)
      if (id1)
          throw new ForbiddenException('already admins');
         const id2 =  rooms.members.find((login) =>login==user_freind.login)
         if (!id2)
            throw new ForbiddenException('is not member');
      const userUpdate = await this.prisma.room.update({
          where: {
            name: room.name,
          },
          data: {
            admins: {
              push: user_freind.login,
            },
          },
        })
  }

    async   banmember(user: any, room: any)
    {
      const user_freind = await this.prisma.user.findUnique({
        where: {
            nickname: room.login
         }
      });
      const rooms = await this.prisma.room.findUnique({
          where: {
            name: room.name
          }
        })
        const id1 =  rooms.admins.find((login) =>login==user.login)
        if (!id1)
            throw new ForbiddenException('you are  Not admins');
        const id2 = rooms.admins.find((login) =>login==user_freind.login)
        if (id2 && rooms.owner != user.login)
          throw new ForbiddenException('you are not owner, impossiple to remove admin');
          const userUpdate = await this.prisma.room.update({
          where: {
           name: room.name
          },
          data: {
            members: {
              set: rooms.members.filter((login) => login != user_freind.login)
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
                set: rooms.admins.filter((login) => login != user_freind.login)
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
                push: user_freind.login,
              },
            },
          })
        }

  async unblockfromroom(user: any, room: any)
  {
    const user_freind = await this.prisma.user.findUnique({
      where: {
          nickname: room.login
       }
    });
    const rooms = await this.prisma.room.findUnique({
      where: {
        name: room.name
      }
    })
    const id1 =  rooms.admins.find((login) =>login==user.login)
    if (!id1)
      throw new ForbiddenException('you are  Not admins');
      const userUpdate = await this.prisma.room.update({
        where: {
         name: room.name
        },
        data: {
          blocked: {
            set: rooms.blocked.filter((login) => login != user_freind.login)
            }
          }
    })
    const userupdate = await this.prisma.room.update({
      where: {
       name: room.name
      },
      data: {
        members: {
          push: user_freind.login
          }
        }
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

  async   getDMWithAllUsers(type: string, user1: any):Promise<typeObject[]>
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
        const id1 =  rooms[index].members.find((login) =>login==user1.login)
        if (id1)
        {
          let login;
          if (rooms[index].name == (user1.login + rooms[index].members[0]))
          {
            login = rooms[index].members[0];
          }
          else
              login = rooms[index].members[1];
          const user = await this.prisma.user.findUnique({
            where: {
                login: login     
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
        if (allmessage.message.length != 0)
        {
          let person : typeObject = {id : user.id, username : user.nickname, status: user.status ,latestMessage: allmessage.message[allmessage.message.length - 1].data, picture: user.pictureLink, conversation : []};
          person.conversation = allmessage.message.map((x) =>    ({type :"", message :x.data }));
          for (let i = allmessage.message.length - 1; i >= 0 ;i--)
          {
            //person.conversation[i].message = allmessage.message[i].data;
            if (user1.login == allmessage.message[i].userLogin)
                person.conversation[i].type = "user";
            else
              person.conversation[i].type = "friend"; 
          }
          obj.push(person);
        }
      }
    }
    const user_freind = await this.prisma.freinds.findMany({
      where: {
          userLogin: user1.login
      }
    });
    for (let i = 0; i < user_freind.length; i++)
    {
        const users = await this.prisma.user.findUnique({
          where: {
            login: user_freind[i].friendLogin
          }
        })
        let index = 0;
        for (index; index < obj.length; index++)
        {
            if (users.nickname == obj[index].username)
              break;
        }
        if (index == obj.length && users.login != user1.login)
        {
          let person : typeObject = {id : users.id, username : users.nickname, status: users.status ,latestMessage: "" , picture: users.pictureLink, conversation : []};
          obj.push(person);
        }
    }
    return obj;
  }

  async   getDM(type: string, user1: any):Promise<typeObject[]>
  {
      let obj: typeObject[] = [];
      const rooms = await this.prisma.room.findMany({
        where: {
          type: type
        }
      })
      for (let index = 0; index < rooms.length; index++)
      {
        // let person : typeObject = {÷};
        const id1 =  rooms[index].members.find((login) =>login==user1.login)
        if (id1)
        {
          let login;
          if (rooms[index].name == (user1.login + rooms[index].members[0]))
          {
            login = rooms[index].members[0];
          }
          else
              login = rooms[index].members[1];
          const user = await this.prisma.user.findUnique({
            where: {
                login: login     
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
        const message_user = await this.prisma.messages.findFirst({
          where: 
          {
              roomName: rooms[index].name
          }
        })
        if (!message_user)
          continue ;
        let person : typeObject = {id : user.id, username : user.nickname, status: user.status ,latestMessage: "" , picture: user.pictureLink, conversation : []};
        if (message_user)
        {
            person.latestMessage = allmessage.message[allmessage.message.length - 1].data;
            person.conversation = allmessage.message.map((x) =>    ({type :"", message :x.data }));
        }
        for (let i = allmessage.message.length - 1; i >= 0 ;i--)
        {
          //person.conversation[i].message = allmessage.message[i].data;
          if (user1.login == allmessage.message[i].userLogin)
            person.conversation[i].type = "friend";
          else
            person.conversation[i].type = "user";
        }
        obj.push(person);
      }
    }
    return obj;
  }

  async getRM(user : any):Promise<chanel[]>
  {
    const rooms = await this.prisma.room.findMany({
        where: {
          OR : [
            {type: "protected"},
            {type: "public"},
            {type: "private"}
          ]
        }
    })
    let obj: chanel[] = []; 
    for (let index = 0; index < rooms.length; index++)
    {
      const id1 =  rooms[index].members.find((login) =>login==user.login)
      if (id1)
      {
        const allmessage = await this.prisma.room.findUnique({
          where: {
              name: rooms[index].name
          },
              select: {
                  message: true
              }
        })
        let role;
        if (rooms[index].owner == user.login)
          role = "owner";
        else 
        {
          const admin = rooms[index].admins.find((login) =>login==user.login)
          if (admin)
            role = "admins";
          else
            role = "members";
        }
        let person : chanel = {id : rooms[index].id, name: rooms[index].name, members: rooms[index].members.length, latestMessage: "", role: role, type: rooms[index].type, conversation : []};
        person.conversation = allmessage.message.map((x) =>    ({type :"", message : "", picture: "" }));
        const message_user = await this.prisma.messages.findFirst({
          where: 
          {
              roomName: rooms[index].name
          }
      })
        if (message_user)
        {
          person.latestMessage = allmessage.message[allmessage.message.length - 1].data;
          person.conversation = allmessage.message.map((x) =>    ({type :"", message :x.data, picture: "" }));
          for (let i = allmessage.message.length - 1; i >= 0 ;i--)
          {
            const user_chanel = await this.prisma.user.findUnique({
              where: {
                login: allmessage.message[i].userLogin
              }
            })
            if (user.login == allmessage.message[i].userLogin)
                person.conversation[i].type = "user";
            else
            {
              person.conversation[i].type = "member";
              person.conversation[i].picture = user_chanel.pictureLink
            }

          }
        }
          obj.push(person);
      }
    }
    return obj;
  }
  
  async muted(user: any, room: any)
  {
    const user_freind = await this.prisma.user.findUnique({
      where: {
          nickname: room.login
       }
    });
    const rooms = await this.prisma.room.findUnique({
      where: {
        name: room.name
      }
    })
    const id1 =  rooms.admins.find((login) =>login==user.login)
    if (!id1)
        throw new ForbiddenException('you are Not admins');
    const id2 = rooms.admins.find((login) =>login==user_freind.login)
    if (id2 && rooms.owner != user.login)
      throw new ForbiddenException('you are not owner, impossiple to mute admin');
    //   const userUpdate = await this.prisma.room.update({
    //   where: {
    //    name: room.name
    //   },
    //   data: {
    //     members: {
    //       set: rooms.members.filter((login) => login != room.login)
    //       }
    //     }
    // })
    if (id2)
    {
      const adminupdate = await this.prisma.room.update({
        where: {
         name: room.name
        },
        data: {
          admins: {
            set: rooms.admins.filter((login) => login != user_freind.login)
            }
          }
      })
    }
    const time = moment().add(1, 'm').format('YYYY-MM-DD hh:mm:ss')
    const mute = await this.prisma.muted.create({
      data: {
        roomName: room.name,
        userLogin: user_freind.login,
        time: time
      }
    }) 
  }

  async unmuted(user: any, room: any)
  {
        await this.prisma.muted.deleteMany({
          where: {
              AND: [
                  {userLogin: user.login},
                  {roomName: room.name}
              ]
          }
          
      })
  }

  async deleteroom(user: any, room: any)
  {
      const testOwner = await this.prisma.room.findUnique({
        where: {
          name: room.name
        }
      })
      const id1 =  testOwner.admins.find((login) =>login==user.login)
      if (!id1)
          throw new ForbiddenException('you are not admin');
          const rom = await this.prisma.room.delete({
            where: {
                name: room.name
            }
        })  
  }      
}