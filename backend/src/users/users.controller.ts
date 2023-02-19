import { Controller, Get, Req, Post, UseGuards, Delete, ForbiddenException, Param, Patch, Body,   UseInterceptors,
  UploadedFile, 
  Res,
  BadRequestException, UseFilters} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { UsersService } from './users.service';
import { dbUser } from './dto/types';
import { PrismaService } from "src/prisma/prisma.service";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { RoomService } from '../chat/rooms/room.service';
import {Response} from 'express'
import { HttpExceptionFilter } from '../chat/rooms/room.exception'



@Controller('profile')
export class UsersController {
  constructor(private readonly usersService: UsersService, private prisma: PrismaService, private roomservice: RoomService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/AllUsers')
  getAllUsers(@Req() req : dbUser) {
      const user = req.user;
      return this.usersService.getAllUsers(user);
    
    }

  @UseGuards(JwtAuthGuard)
  @Get()
  async GetProfile(@Req() req : dbUser){
    const user = req.user;
    return await this.usersService.findProfile(user.login);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getprofile/:login')
  async GetProfileUser(@Param('login') login: string){
    return await this.usersService.findProfile(login);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('seting')
  async UpdateProfile(@Req() req : dbUser, @Body() modify) {
      const user = req.user;
      if (modify.nickname)
        return await this.usersService.updateuserinfo(user.login, modify.nickname);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('upload-photo')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './files',
      filename: (req:any, file, callback) => {
        const name: string = file.originalname.split('.')[0];
        const fileExtention: string = file.originalname.split(".")[1];
        const newFileName: string = req?.user?.login  + "." + fileExtention;
        callback(null, newFileName)
      }
    }),
          fileFilter : (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
              return(callback(null, false));
      }
      callback(null, true);
    }
  }))
        async UpdatePicture(@Req() req : dbUser, @UploadedFile() file: Express.Multer.File)
        {
    const user = req.user;
    if (!file)
      throw new BadRequestException("File is not image");
            else
            {
      const response = {
        filePath: `http://localhost:3000/profile/picture/${file.filename}`
      }
      this.usersService.updatepicture(user.login, response);
      return response;
    }
  }

  @Get('picture/:filename')
        async getPicture(@Param('filename') filename, @Res() res: Response)
        {
            res.sendFile(filename, {root: './files'});
  }

  @UseGuards(JwtAuthGuard)
  @Get('getfreind')
  async   getFreinds(@Req() req : dbUser)
  {
    const user = req.user
    return await this.usersService.getfreind(user.nickname);
  }

  @Get('getfreindUser/:login')
  async   getFreindsUser(@Param() user)
  {
    const user_freind = await this.prisma.user.findUnique({
      where: {
          nickname: user.login
      }
  });
    return await this.usersService.getfreind(user.login);
  }

  @UseGuards(JwtAuthGuard)
  @Get('matchhistorique')
  async getMatchhistorique(@Req() req : dbUser)
  {
    const user = req.user;
    return await this.usersService.historiqueMatch(user.id);
  }

  @Get('matchhistorique/:login')
  async getMatchhistoriqueUser(@Param() user)
  {
    const user_freind = await this.prisma.user.findUnique({
      where: {
          nickname: user.login
      }
  });
    console.log(user.login);
    return await this.usersService.historiqueMatch(user_freind.id);
  }

  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  @Post('addfreind')
  async addfriend(@Req() req : dbUser, @Body() freind)
  {
      const user = req.user
      const user_freind = await this.prisma.user.findUnique({
        where: {
            nickname: freind.login
        }
    });
      const blockedUser = await this.prisma.user.findUnique({
        where: {
            nickname: user.login
        }
    });
    const id =  blockedUser.blocked.find((login) =>login==user_freind.login)
    if (id)
        throw new ForbiddenException('this user is blocked');
      const id1 = await this.prisma.freinds.findFirst ({
          where: {
              userLogin: user.login,
              friendLogin : user_freind.login 
          }
      })
      if (id1)
          throw new ForbiddenException('already freinds');
      this.usersService.addfreind(user.login, user_freind.login)
      await this.roomservice.CreateRoom(user.login, user_freind.login + user.login, "personnel");
      await this.roomservice.joinroom(freind, user_freind.login + user.login);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('unfreind/:login')
  async   unfriend (@Req() req : dbUser, @Param() freind)
  {
      const user = req.user;
      const user_freind = await this.prisma.user.findUnique({
        where: {
            nickname: freind.login
        }
    });
      this.usersService.unfreind(user.login, user_freind);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/blocked')
  async blockedUser(@Req() req : dbUser, @Body() freind)
  {
      const user = req.user;
      await this.usersService.unfreind(user.login, freind);
      return await this.usersService.banuser(user.login, freind.login);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('/unblocked')
  async unblockedUser(@Req() req : dbUser, @Body() freind)
  {
    const user = req.user;
    return await this.usersService.unblocked(user.login, freind.login);
  }

}
