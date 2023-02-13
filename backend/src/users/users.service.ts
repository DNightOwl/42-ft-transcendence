import { Injectable, ForbiddenException, UploadedFile } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { usersObject } from './utils/usersObject';
import { number } from 'joi';



@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async getAllUsers(user: any) :Promise<usersObject[]>
    {
		let obj: usersObject[] = []
        const users = await this.prisma.user.findMany({});
        for (let index = 0; index < users.length; index++)
        {
            if (users[index].login == user.login)
                continue;
            const block = users[index].blocked.find((login) =>login==user.login);
            if (block)
                continue;
            const id = await this.prisma.freinds.findMany({
                where: {
                    userLogin: user.login,
                    friendLogin: users[index].login
                }
            })
            const NumberofFreinds = await this.prisma.freinds.findMany({
                where: {
                    userLogin: users[index].login,
                }
            })
            let pers : usersObject = {id: users[index].id, username: users[index].nickname, status: users[index].status, pictureLink: users[index].pictureLink, freind: "", blocked: "", NumberofFreinds:  NumberofFreinds.length}
            if ( id.length == 0)
                pers.freind = "Not friend";
            else
                pers.freind = "friend";
            const blockedUser = user.blocked.find((login) =>login==users[index].login);
            if (blockedUser)
                pers.blocked = "blocked";
            else
                pers.blocked = "No blocked"
            
            obj.push(pers);
        }
        return obj;
		
	}

	async findProfile(login : string) {
        console.log(login);
        const id1 = await this.prisma.user.findUnique ({
            where: {
                login: login
            },
            select: {
                login: true,
                id: true,
                nickname: true,
                email: true,
                pictureLink: true,
                status: true

            }
        });
        if (!id1.login)
            throw new ForbiddenException('Credentials incorrect');
        return id1;
    }

    async   updateuserinfo(login : string, nickname: string) {
        const id1 = await this.prisma.user.update({
            where:{
                login: login
            },
            data: {
                nickname: nickname
            }
       })
    }

    async   updatepicture(login: string, response: any)
    {
        const id1 = await this.prisma.user.update({
            where:{
                login: login,
            },
            data: {
                pictureLink: response.filePath
            }
        })
    }
    async   getfreind(login: string) {
        const myfreinds = await this.prisma.user.findUnique({
            where: {
                login: login
            },
                select : { 
                    freinds: true
                }
        })
        let obj: usersObject[] = [];
        if (!myfreinds)
            return obj;
        for(let index = 0; index < myfreinds.freinds.length; index++)
        {
            const user = await this.prisma.user.findFirst({
                where: {
                    login: myfreinds.freinds[index].friendLogin
                }
            })
            let freind : usersObject = {id: user.id, username: user.nickname, status: user.status, pictureLink: user.pictureLink, freind: "freind", blocked: "",  NumberofFreinds: myfreinds.freinds.length}
            obj.push(freind);
        }
        return obj;
    }

    async   addfreind(login: string, freindlogin: string) {
            const blockedUser = await this.prisma.user.findUnique({
                where: {
                    login: login
                }
            });
            const table = await this.prisma.freinds.create({
                data: {
                    userLogin: login,
                    friendLogin : freindlogin,
                }
            })
            await this.prisma.freinds.create({
                data: {
                    userLogin: freindlogin,
                    friendLogin: login
                }
            })
    }

    async unfreind(login: string, freind){
        console.log(login);
        await this.prisma.freinds.deleteMany({
            where: {
                AND: [
                    {userLogin: login},
                    {friendLogin : freind.login},
                ]
            }
            
        })
        await this.prisma.freinds.deleteMany({
            where: {
                AND: [
                    {userLogin: freind.login},
                    {friendLogin: login}
                ]
            }
            
        })
        const room = await this.prisma.room.findUnique({
            where: {
                name: login + freind.login
            }
        })
        if (room)
        {
            await this.prisma.room.deleteMany({
                where: {
                        name: login + freind.login
                }
                
            })
        }
        else
        {
            await this.prisma.room.deleteMany({
                where: {
                        name: freind.login + login
                }
                
            })
        }
    }

    async   banuser(login: string, flogin: string)
    {
       const user_blocked = await this.prisma.user.update({
            where: {
                login: login
            },
            data: {
                blocked: {
                    push: flogin,
                },
            },
        })
    }

    async   unblocked(login: string, flogin: string)
    {
        const userblocked = await this.prisma.user.findUnique({
            where: {
              login: login
            }
          })
        const userUpdate = await this.prisma.user.update({
            where: {
             login: login
            },
            data: {
              blocked: {
                set: userblocked.blocked.filter((login) => login != flogin)
                }
              }
          })
    }

}

