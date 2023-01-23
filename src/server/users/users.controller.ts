import { Controller, Get, Req, Post, UseGuards, Delete, ForbiddenException, Param, Patch, Body,   UseInterceptors,
  UploadedFile } from '@nestjs/common';
import { types } from 'joi';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { UsersService } from './users.service';
import { RequestWithUser } from './dto/types';
import { PrismaService } from "src/server/prisma/prisma.service";
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { GetUserReq } from 'src/server/decorator';



@Controller('profile')
export class UsersController {
  constructor(private readonly usersService: UsersService, private prisma: PrismaService) {}

  // @Get()
  // getAllUsers(req: RequestWithUser) {
    //   const user = req.user;
    
    // }
  @UseGuards(JwtAuthGuard)
  @Get()
  async GetProfile(@Req() req: RequestWithUser){
    // console.log(req);
     const user = req.user;
      return await this.usersService.findProfile(user.login);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async UpdateProfile(@Req() req: RequestWithUser, @Body() modify) {
      const user = req.user;
      console.log(modify.nickname);
      return await this.usersService.updateuserinfo(user.login, modify.nickname);
  }

  // @UseGuards(JwtAuthGuard)
  // @Patch('picture')
  //       @UseInterceptors(FileInterceptor('file', {
  //         storage: diskStorage({
  //             destination: './files',
  //             filename: (req, file, callback) => {
  //                 const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  //                 const ext = extname(file.originalname);
  //                 const filename = `${uniqueSuffix}${ext}`;
  //                 callback(null, filename)
  //             }
  //         })
  //       }))
  //       async UpdatePicture(@Req() req: RequestWithUser, @UploadedFile() file: Express.Multer.File)
  //       {
  //         const user = req.user;
  //           this.usersService.updatepicture(user.login, file);
  //       }

  @UseGuards(JwtAuthGuard)
  @Get('getfreind')
  async   getFreinds(@Req() req: RequestWithUser)
  {
    const user = req.user
    return await this.usersService.getfreind(user.login);
  }

  @UseGuards(JwtAuthGuard)
  @Post('addfreind')
  async addfriend(@Req() req: RequestWithUser, @Body() freind)
  {
      const user = req.user
      const blockedUser = await this.prisma.user.findUnique({
        where: {
            login: user.login
        }
    });
    const id =  blockedUser.blocked.find((login) =>login==freind.login)
    if (id)
        throw new ForbiddenException('this user is blocked');
      const id1 = await this.prisma.freinds.findFirst ({
          where: {
              userLogin: user.login,
              friendLogin : freind.login   
          }
      })
      if (id1)
          throw new ForbiddenException('already freinds');
      this.usersService.addfreind(user.login, freind.login)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('unfreind')
  async   unfriend (@Req() req: RequestWithUser, @Body() freind)
  {
    const user = req.user;
      this.usersService.unfreind(user.login, freind);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/blocked')
  async blockedUser(@Req() req: RequestWithUser, @Body() freind)
  {
      const user = req.user;
      await this.usersService.unfreind(user.login, freind);
      return await this.usersService.banuser(user.login, freind.login);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('/unblocked')
  async unblockedUser(@Req() req: RequestWithUser, @Body() freind)
  {
    const user = req.user;
    return await this.usersService.unblocked(user.login, freind.login);
  }

}
