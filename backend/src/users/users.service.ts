import { Injectable, ForbiddenException, UploadedFile } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { usersObject } from './utils/usersObject';



@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async getAllUsers(user: any) :Promise<usersObject[]>
    {
		let obj: usersObject[] = []
        const users = await this.prisma.user.findMany({});
        console.log(user.login);
        for (let index = 0; index < users.length; index++)
        {
            if (users[index].login == user.login)
                continue;
            const blocked = users[index].blocked.find((login) =>login==user.login);
            if (blocked)
                continue;
            const id = this.prisma.freinds.findMany({
                where: {
                    userLogin: user.login,
                    friendLogin: users[index].login
                }
            })
            let pers : usersObject = {id: users[index].id, username: users[index].login, status: users[index].status, pictureLink: users[index].pictureLink, freind: ""}
            if ((await id).length == 0)
                pers.freind = "Not friend";
            else
                pers.freind = "friend"
            obj.push(pers);
        }
        return obj;
		
	}

	async findProfile(login : string) {
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

    async   updatepicture(login: string, @UploadedFile() file: Express.Multer.File)
    {
        const id1 = await this.prisma.user.update({
            where:{
                login: login,
            },
            data: {
                pictureLink: file.path
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
        for(let index = 0; index < myfreinds.freinds.length; index++)
        {
            const user = await this.prisma.user.findFirst({
                where: {
                    login: myfreinds.freinds[index].friendLogin
                }
            })
            let freind : usersObject = {id: user.id, username: user.login, status: user.status, pictureLink: user.pictureLink, freind: "freind"}
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

