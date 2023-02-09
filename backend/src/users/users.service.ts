import { Injectable, ForbiddenException, UploadedFile } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";


@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	// async getAllUsers() {
		
	// 	return {msg : "users"};
	// }

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
                pictureLink: true

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
        return myfreinds;
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